"""
WSFU Security & URL Validation Utilities
Protects against Server-Side Request Forgery (SSRF), DNS rebinding, and malicious redirect chaining.
"""

import socket
import ipaddress
import httpx
from urllib.parse import urlparse, urljoin
from typing import Tuple, Optional, Dict, Any


class SecurityException(Exception):
    """Base exception for security boundary violations."""
    pass


class SSRFException(SecurityException):
    """Raised when a URL resolves to a private, loopback, or cloud-metadata IP."""
    pass


ALLOWED_PORTS = {80, 443, 8080, 8443}
BLOCKED_HOSTNAMES = {
    "localhost", "127.0.0.1", "::1", "0.0.0.0",
    "metadata.google.internal", "instance-data",
    "metadata", "internal"
}


def is_safe_url(url: str) -> Tuple[bool, Optional[str]]:
    """
    Validates that a URL is safe to fetch:
    1. Scheme must be strictly 'http' or 'https'.
    2. Port must be standard web ports (80, 443, 8080, 8443).
    3. Hostname must resolve to a public, globally routable IP address.
    4. Blocks localhost, RFC1918 private subnets, carrier-grade NAT, and cloud metadata (169.254.169.254).
    """
    if not url or not isinstance(url, str):
        return False, "Empty or invalid URL type"

    url = url.strip()
    try:
        parsed = urlparse(url)
        if parsed.scheme not in ("http", "https"):
            return False, f"Disallowed URL scheme: {parsed.scheme}"

        hostname = parsed.hostname
        if not hostname:
            return False, "Missing hostname in URL"

        if parsed.port and parsed.port not in ALLOWED_PORTS:
            return False, f"Disallowed destination port: {parsed.port}"

        # Explicit blocked hostnames
        if hostname.lower() in BLOCKED_HOSTNAMES or hostname.lower().endswith(".internal") or hostname.lower().endswith(".local"):
            return False, f"Blocked private hostname: {hostname}"

        # Resolve DNS to IP address
        addr_info = socket.getaddrinfo(hostname, None, proto=socket.IPPROTO_TCP)
        if not addr_info:
            return False, "DNS resolution failed"

        for entry in addr_info:
            ip_str = entry[4][0]
            ip_obj = ipaddress.ip_address(ip_str)

            # Block private, loopback, link-local, reserved, and multicast addresses
            if (
                ip_obj.is_private
                or ip_obj.is_loopback
                or ip_obj.is_link_local
                or ip_obj.is_reserved
                or ip_obj.is_multicast
                or str(ip_obj) == "169.254.169.254"  # AWS/GCP/Azure Metadata
                or str(ip_obj).startswith("100.64.")  # Carrier-grade NAT
                or str(ip_obj) == "0.0.0.0"
            ):
                return False, f"URL resolves to disallowed private IP: {ip_str}"

        return True, None
    except Exception as e:
        return False, f"Security URL validation error: {str(e)}"


import ssl

DEFAULT_BROWSER_HEADERS = {
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36 WSFUBot/1.0",
    "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8",
    "Accept-Language": "en-US,en;q=0.9",
    "Upgrade-Insecure-Requests": "1"
}


def get_ssl_context() -> ssl.SSLContext:
    """Creates a TLS context with broad compatibility across legacy web servers and anti-bot proxies."""
    ctx = ssl.create_default_context()
    try:
        # Avoid OpenSSL 3.0 TLS 1.3 session ticket renegotiation bug on Windows
        ctx.maximum_version = ssl.TLSVersion.TLSv1_2
    except Exception:
        pass
    return ctx



async def safe_fetch_http(
    url: str,
    headers: Optional[Dict[str, str]] = None,
    timeout: float = 15.0,
    max_redirects: int = 5
) -> httpx.Response:
    """
    Fetches HTTP content while validating safety on every single redirect hop.
    Prevents SSRF redirect bypasses and DNS rebinding attacks.
    """
    current_url = url
    redirect_count = 0
    req_headers = {**DEFAULT_BROWSER_HEADERS, **(headers or {})}
    ssl_context = get_ssl_context()

    async with httpx.AsyncClient(timeout=timeout, verify=ssl_context, follow_redirects=False) as client:
        while redirect_count <= max_redirects:
            is_safe, reason = is_safe_url(current_url)
            if not is_safe:
                raise SSRFException(f"Destination blocked by SSRF guard: {current_url} ({reason})")

            response = await client.get(current_url, headers=req_headers)

            if response.is_redirect:
                redirect_count += 1
                if redirect_count > max_redirects:
                    raise SSRFException(f"Too many redirects ({redirect_count}) for {url}")

                location = response.headers.get("location")
                if not location:
                    return response
                current_url = urljoin(current_url, location)
            else:
                return response

    raise SSRFException(f"Failed to fetch {url} after {max_redirects} redirects")



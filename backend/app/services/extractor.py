"""
Full-Text Article Extractor using BeautifulSoup
Extracts clean article body, stripping ads, navigation, headers, scripts, and comments.
100% Pure Python with zero compiled DLL dependencies.
"""

import re
from bs4 import BeautifulSoup
from typing import Optional, Dict, Any
from app.core.security import is_safe_url, safe_fetch_http, SSRFException


HEADERS = {
    "User-Agent": (
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) "
        "AppleWebKit/537.36 (KHTML, like Gecko) "
        "Chrome/124.0.0.0 Safari/537.36 WSFUBot/1.0"
    ),
    "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
}


def _extract_image_url(soup: BeautifulSoup) -> Optional[str]:
    """Extracts hero image URL from OpenGraph, Twitter Cards, or article tags."""
    # 1. Check og:image meta tag
    og_img = soup.find("meta", property="og:image") or soup.find("meta", attrs={"name": "og:image"})
    if og_img and og_img.get("content"):
        candidate = og_img["content"].strip()
        if candidate.startswith("http://") or candidate.startswith("https://"):
            return candidate

    # 2. Check twitter:image meta tag
    tw_img = soup.find("meta", attrs={"name": "twitter:image"}) or soup.find("meta", property="twitter:image")
    if tw_img and tw_img.get("content"):
        candidate = tw_img["content"].strip()
        if candidate.startswith("http://") or candidate.startswith("https://"):
            return candidate

    # 3. Check link rel="image_src"
    link_img = soup.find("link", rel="image_src")
    if link_img and link_img.get("href"):
        candidate = link_img["href"].strip()
        if candidate.startswith("http://") or candidate.startswith("https://"):
            return candidate

    # 4. Check first image in article container
    article_tag = soup.find("article") or soup.find("main")
    if article_tag:
        first_img = article_tag.find("img")
        if first_img:
            src = first_img.get("src") or first_img.get("data-src")
            if src and (src.startswith("http://") or src.startswith("https://")):
                return src.strip()

    return None


async def extract_article_content(url: str) -> Optional[Dict[str, Any]]:
    """
    Downloads and extracts clean article body, title, author, and hero image.
    Strictly validates destination URL against SSRF boundaries on every redirect hop.
    """
    is_safe, reason = is_safe_url(url)
    if not is_safe:
        print(f"[SSRF GUARD] Disallowed URL rejected in extractor: {url} ({reason})")
        return None

    try:
        response = await safe_fetch_http(url, headers=HEADERS, timeout=15.0)
        if response.status_code != 200:
            return None
        
        html = response.text
        soup = BeautifulSoup(html, "html.parser")
        
        # Extract hero image before decomposing elements
        image_url = _extract_image_url(soup)
        
        # Remove scripts, styles, forms, headers, footers, navs
        for tag in soup(["script", "style", "nav", "header", "footer", "form", "aside", "noscript", "iframe"]):
            tag.decompose()
            
        # Extract title
        title = ""
        if soup.title and soup.title.string:
            title = soup.title.string.strip()
        h1 = soup.find("h1")
        if h1:
            title = h1.get_text().strip()
            
        # Extract main content: look for <article> or <main> or generic <p> tags
        article_tag = soup.find("article") or soup.find("main") or soup.find(class_=re.compile(r"content|post|entry|article", re.I))
        
        if article_tag:
            paragraphs = article_tag.find_all("p")
        else:
            paragraphs = soup.find_all("p")
            
        text_lines = [p.get_text().strip() for p in paragraphs if len(p.get_text().strip()) > 30]
        clean_text = "\n\n".join(text_lines)
        
        if not clean_text or len(clean_text.split()) < 30:
            return None
            
        return {
            "text": clean_text,
            "title": title,
            "author": "",
            "date": "",
            "image_url": image_url
        }
    except SSRFException as e:
        print(f"[SSRF BLOCKED] {e}")
        return None
    except Exception as e:
        print(f"Extraction error for {url}: {e}")
        return None



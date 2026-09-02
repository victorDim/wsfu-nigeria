import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  TextInput,
  RefreshControl,
  StyleSheet,
  Linking,
  Image,
  Share
} from 'react-native';
import { Article } from '../types';
import { fetchNewsFeed } from '../lib/api';
import { Flame, Search, ExternalLink, ShieldCheck, Newspaper, Share2, MessageSquare } from 'lucide-react-native';

export const FeedScreen: React.FC = () => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [selectedSource, setSelectedSource] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [refreshing, setRefreshing] = useState(false);

  const loadFeed = async (source?: string, q?: string) => {
    const res = await fetchNewsFeed(source, q);
    setArticles(res.items);
  };

  useEffect(() => {
    loadFeed(selectedSource, searchQuery);
  }, [selectedSource, searchQuery]);

  const onRefresh = async () => {
    setRefreshing(true);
    await loadFeed(selectedSource, searchQuery);
    setRefreshing(false);
  };

  const getFormattedShareText = (art: Article) => {
    const summary = art.article_summaries;
    let text = `🇳🇬 *WSFU CITIZEN ACCOUNTABILITY BRIEF*\n\n`;
    text += `📰 *${art.title.trim()}*\n`;
    text += `📡 *Source:* ${art.sources?.name || 'Verified Media'}\n\n`;

    if (summary?.tldr_bullets && summary.tldr_bullets.length > 0) {
      text += `⚡ *KEY FACTS:*\n`;
      summary.tldr_bullets.forEach(b => {
        text += `• ${b}\n`;
      });
      text += `\n`;
    }

    if (summary?.figures_mentioned && summary.figures_mentioned.length > 0) {
      text += `💰 *FIGURES:* ${summary.figures_mentioned.map(f => f.amount).join(', ')}\n\n`;
    }

    if (summary?.civic_impact) {
      text += `🌍 *CIVIC IMPACT:*\n${summary.civic_impact}\n\n`;
    }

    text += `🔍 Track this story & government spending on WSFU.\n${art.url}`;
    return text;
  };

  const handleWhatsAppShare = (art: Article) => {
    const text = encodeURIComponent(getFormattedShareText(art));
    Linking.openURL(`whatsapp://send?text=${text}`).catch(() => {
      Share.share({ message: getFormattedShareText(art) });
    });
  };

  const handleNativeShare = (art: Article) => {
    Share.share({
      title: art.title,
      message: getFormattedShareText(art)
    }).catch(() => {});
  };


  const sources = [
    { name: 'All Sources', slug: 'all' },
    { name: 'Premium Times', slug: 'premium-times' },
    { name: 'The Cable', slug: 'the-cable' },
    { name: 'Punch', slug: 'punch-newspapers' },
    { name: 'Daily Trust', slug: 'daily-trust' },
    { name: 'BusinessDay', slug: 'businessday' },
  ];

  return (
    <View style={styles.container}>
      {/* Header Search Bar */}
      <View style={styles.searchContainer}>
        <Search size={16} color="#71717a" style={styles.searchIcon} />
        <TextInput
          placeholder="Search corruption, spending, projects..."
          placeholderTextColor="#71717a"
          value={searchQuery}
          onChangeText={setSearchQuery}
          style={styles.searchInput}
        />
      </View>

      {/* Source Category Pills */}
      <View style={styles.sourceScrollContainer}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.sourceScroll}>
          {sources.map((s) => (
            <TouchableOpacity
              key={s.slug}
              onPress={() => setSelectedSource(s.slug)}
              style={[
                styles.sourcePill,
                selectedSource === s.slug ? styles.sourcePillActive : styles.sourcePillInactive
              ]}
            >
              <Text
                style={[
                  styles.sourcePillText,
                  selectedSource === s.slug ? styles.sourcePillTextActive : styles.sourcePillTextInactive
                ]}
              >
                {s.name}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {/* Main Articles Stream */}
      <ScrollView
        style={styles.articlesList}
        contentContainerStyle={styles.articlesContent}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor="#10b981" />}
      >
        {/* Breaking Banner */}
        <View style={styles.wireHeader}>
          <Flame size={18} color="#10b981" />
          <Text style={styles.wireHeaderText}>Live Corroborated News Wire</Text>
        </View>

        {articles.map((art) => (
          <View key={art.id} style={styles.articleCard}>
            {/* Source & Reliability Header */}
            <View style={styles.cardHeader}>
              <View style={styles.sourceBadge}>
                <Newspaper size={12} color="#10b981" />
                <Text style={styles.sourceBadgeText}>{art.sources.name}</Text>
                {art.category && (
                  <View style={styles.categoryPill}>
                    <Text style={styles.categoryText}>{art.category}</Text>
                  </View>
                )}
              </View>
              <View style={styles.tierBadge}>
                <ShieldCheck size={12} color="#34d399" />
                <Text style={styles.tierBadgeText}>Verified</Text>
              </View>
            </View>

            {/* Optional Banner Image */}
            {art.image_url && (
              <Image
                source={{ uri: art.image_url }}
                style={styles.articleImage}
                resizeMode="cover"
              />
            )}

            {/* Headline */}
            <Text style={styles.articleTitle}>{art.title}</Text>

            {/* AI Summary TLDR Bullets */}
            {art.article_summaries && (
              <View style={styles.summaryBox}>
                <Text style={styles.summaryHeading}>⚡ Citizen TL;DR Brief:</Text>
                {art.article_summaries.tldr_bullets.map((bullet, idx) => (
                  <View key={idx} style={styles.bulletRow}>
                    <View style={styles.bulletDot} />
                    <Text style={styles.bulletText}>{bullet}</Text>
                  </View>
                ))}

                {/* Civic Impact */}
                {art.article_summaries.civic_impact && (
                  <View style={styles.impactBox}>
                    <Text style={styles.impactTitle}>Civic Impact:</Text>
                    <Text style={styles.impactText}>{art.article_summaries.civic_impact}</Text>
                  </View>
                )}

                {/* Figures Mentioned */}
                {art.article_summaries.figures_mentioned && art.article_summaries.figures_mentioned.length > 0 && (
                  <View style={styles.figuresRow}>
                    {art.article_summaries.figures_mentioned.map((fig, idx) => (
                      <View key={idx} style={styles.figureTag}>
                        <Text style={styles.figureText}>{fig.amount}</Text>
                      </View>
                    ))}
                  </View>
                )}
              </View>
            )}

            {/* Card Footer */}
            <View style={styles.cardFooter}>
              <View style={styles.footerLeft}>
                <TouchableOpacity
                  onPress={() => handleWhatsAppShare(art)}
                  style={styles.whatsappButton}
                >
                  <MessageSquare size={12} color="#ffffff" />
                  <Text style={styles.whatsappButtonText}>WhatsApp</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={() => handleNativeShare(art)}
                  style={styles.shareIconButton}
                >
                  <Share2 size={12} color="#d4d4d8" />
                </TouchableOpacity>
              </View>

              <TouchableOpacity
                onPress={() => Linking.openURL(art.url)}
                style={styles.sourceLink}
              >
                <Text style={styles.sourceLinkText}>Full Article</Text>
                <ExternalLink size={12} color="#10b981" />
              </TouchableOpacity>
            </View>
          </View>

        ))}
      </ScrollView>
    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#09090b',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#18181b',
    borderRadius: 12,
    marginHorizontal: 16,
    marginTop: 12,
    marginBottom: 8,
    paddingHorizontal: 12,
    borderWidth: 1,
    borderColor: '#27272a',
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    height: 40,
    color: '#ffffff',
    fontSize: 13,
  },
  sourceScrollContainer: {
    marginVertical: 6,
  },
  sourceScroll: {
    paddingHorizontal: 16,
    gap: 8,
  },
  sourcePill: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
  },
  sourcePillActive: {
    backgroundColor: '#10b981',
  },
  sourcePillInactive: {
    backgroundColor: '#18181b',
    borderWidth: 1,
    borderColor: '#27272a',
  },
  sourcePillText: {
    fontSize: 12,
    fontWeight: '700',
  },
  sourcePillTextActive: {
    color: '#000000',
  },
  sourcePillTextInactive: {
    color: '#a1a1aa',
  },
  articlesList: {
    flex: 1,
  },
  articlesContent: {
    padding: 16,
    gap: 16,
  },
  wireHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 4,
  },
  wireHeaderText: {
    color: '#ffffff',
    fontWeight: '800',
    fontSize: 13,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  articleCard: {
    backgroundColor: '#18181b',
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: '#27272a',
    gap: 12,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  sourceBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  sourceBadgeText: {
    color: '#10b981',
    fontWeight: '800',
    fontSize: 11,
  },
  tierBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: '#064e3b',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 6,
  },
  tierBadgeText: {
    color: '#34d399',
    fontWeight: '700',
    fontSize: 10,
  },
  articleTitle: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '800',
    lineHeight: 22,
  },
  summaryBox: {
    backgroundColor: '#09090b',
    borderRadius: 12,
    padding: 12,
    borderWidth: 1,
    borderColor: '#27272a',
    gap: 8,
  },
  summaryHeading: {
    color: '#10b981',
    fontWeight: '800',
    fontSize: 11,
    textTransform: 'uppercase',
  },
  bulletRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 8,
  },
  bulletDot: {
    width: 5,
    height: 5,
    borderRadius: 3,
    backgroundColor: '#10b981',
    marginTop: 6,
  },
  bulletText: {
    flex: 1,
    color: '#d4d4d8',
    fontSize: 12,
    lineHeight: 18,
  },
  impactBox: {
    marginTop: 6,
    paddingTop: 8,
    borderTopWidth: 1,
    borderTopColor: '#27272a',
  },
  impactTitle: {
    color: '#fbbf24',
    fontSize: 10,
    fontWeight: '800',
    textTransform: 'uppercase',
  },
  impactText: {
    color: '#e4e4e7',
    fontSize: 12,
    lineHeight: 16,
    marginTop: 2,
  },
  figuresRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
    marginTop: 4,
  },
  figureTag: {
    backgroundColor: '#064e3b',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: '#059669',
  },
  figureText: {
    color: '#6ee7b7',
    fontSize: 11,
    fontWeight: '800',
  },
  cardFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: 10,
    borderTopWidth: 1,
    borderTopColor: '#27272a',
  },
  footerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  whatsappButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: '#059669',
    paddingHorizontal: 8,
    paddingVertical: 5,
    borderRadius: 6,
  },
  whatsappButtonText: {
    color: '#ffffff',
    fontSize: 10,
    fontWeight: '800',
  },
  shareIconButton: {
    backgroundColor: '#27272a',
    padding: 6,
    borderRadius: 6,
  },
  sourceLink: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  sourceLinkText: {
    color: '#10b981',
    fontSize: 11,
    fontWeight: '700',
  },

  categoryPill: {
    backgroundColor: '#064e3b',
    paddingHorizontal: 6,
    paddingVertical: 1,
    borderRadius: 4,
    marginLeft: 6,
  },
  categoryText: {
    color: '#34d399',
    fontSize: 9,
    fontWeight: '700',
  },
  articleImage: {
    width: '100%',
    height: 160,
    borderRadius: 10,
    backgroundColor: '#27272a',
  },
});


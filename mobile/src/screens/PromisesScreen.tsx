import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Modal,
  Image
} from 'react-native';
import { ALL_NIGERIAN_STATES, fetchOfficials, getOfficialsForState, submitCitizenRating } from '../lib/api';
import { NIGERIA_DISCO_ALLOCATIONS } from '../lib/officials_data';
import {
  ShieldCheck,
  Building2,
  Landmark,
  Users,
  ChevronDown,
  Check,
  Star,
  Zap,
  Droplets,
  Route,
  Activity,
  BookOpen,
  ShieldAlert,
  GraduationCap,
  Briefcase,
  CheckCircle,
  Clock,
  XCircle,
  AlertTriangle
} from 'lucide-react-native';
import { TrackedPromise } from '../types';

export const PromisesScreen: React.FC = () => {
  const [selectedStateCode, setSelectedStateCode] = useState('AB');
  const [officials, setOfficials] = useState(() => getOfficialsForState('AB'));
  const [activeTier, setActiveTier] = useState<'governor' | 'senator' | 'house_of_rep'>('governor');
  const [selectedOfficialId, setSelectedOfficialId] = useState('gov-ab');
  const [modalVisible, setModalVisible] = useState(false);
  const [benchmarkModalVisible, setBenchmarkModalVisible] = useState(false);
  const [userVoted, setUserVoted] = useState<Record<string, number>>({});
  const [ratingToast, setRatingToast] = useState<string | null>(null);

  const handleStateChange = async (code: string) => {
    setSelectedStateCode(code);
    const list = getOfficialsForState(code);
    setOfficials(list);
    setModalVisible(false);

    const matchingInTier = list.filter(o => {
      if (activeTier === 'governor') return o.role === 'governor' || o.role === 'president';
      return o.role === activeTier;
    });

    const target = matchingInTier[0] || list[0];
    if (target) setSelectedOfficialId(target.id);

    try {
      const liveList = await fetchOfficials(code);
      if (liveList && liveList.length > 0) {
        setOfficials(liveList);
      }
    } catch {
      // Offline fallback
    }
  };


  const handleTierChange = (tier: 'governor' | 'senator' | 'house_of_rep') => {
    setActiveTier(tier);
    const first = officials.find(o => {
      if (tier === 'governor') return o.role === 'governor' || o.role === 'president';
      return o.role === tier;
    });
    if (first) setSelectedOfficialId(first.id);
  };

  const tierOfficials = officials.filter(o => {
    if (activeTier === 'governor') return o.role === 'governor' || o.role === 'president';
    return o.role === activeTier;
  });

  const currentOfficial = officials.find(o => o.id === selectedOfficialId) || tierOfficials[0] || officials[0];
  const matchingDisCo = NIGERIA_DISCO_ALLOCATIONS.find(d => d.coverage_states.includes(selectedStateCode));

  const handleVote = async (stars: number) => {
    if (!currentOfficial) return;
    setUserVoted(prev => ({ ...prev, [currentOfficial.id]: stars }));
    setRatingToast(`Saved ${stars}-Star Rating for ${currentOfficial.name.split(' ')[0]}`);
    await submitCitizenRating(currentOfficial.id, stars * 20);
    setTimeout(() => setRatingToast(null), 3000);
  };

  const renderStatusBadge = (status: TrackedPromise['status']) => {
    switch (status) {
      case 'fulfilled':
        return (
          <View style={[styles.statusPill, { backgroundColor: '#064e3b', borderColor: '#059669' }]}>
            <CheckCircle size={10} color="#34d399" />
            <Text style={[styles.statusText, { color: '#34d399' }]}>Fulfilled</Text>
          </View>
        );
      case 'in_progress':
        return (
          <View style={[styles.statusPill, { backgroundColor: '#451a03', borderColor: '#d97706' }]}>
            <Clock size={10} color="#fbbf24" />
            <Text style={[styles.statusText, { color: '#fbbf24' }]}>In Progress</Text>
          </View>
        );
      default:
        return (
          <View style={[styles.statusPill, { backgroundColor: '#27272a', borderColor: '#3f3f46' }]}>
            <AlertTriangle size={10} color="#a1a1aa" />
            <Text style={[styles.statusText, { color: '#a1a1aa' }]}>Untouched</Text>
          </View>
        );
    }
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      {/* Top Banner & State Picker */}
      <View style={styles.headerCard}>
        <View style={styles.bannerRow}>
          <ShieldCheck size={16} color="#10b981" />
          <Text style={styles.bannerSubtitle}>Elected Officials & Promises</Text>
        </View>
        <Text style={styles.bannerTitle}>Governance Meter</Text>

        <TouchableOpacity
          onPress={() => setModalVisible(true)}
          style={styles.pickerButton}
        >
          <Text style={styles.pickerButtonText}>
            {currentOfficial.state_name} ({selectedStateCode})
          </Text>
          <ChevronDown size={18} color="#10b981" />
        </TouchableOpacity>

        {/* 3-Tier Buttons */}
        <View style={styles.tierContainer}>
          <TouchableOpacity
            onPress={() => handleTierChange('governor')}
            style={[styles.tierButton, activeTier === 'governor' && styles.tierButtonActive]}
          >
            <Building2 size={14} color={activeTier === 'governor' ? '#000000' : '#d4d4d8'} />
            <Text style={[styles.tierButtonText, activeTier === 'governor' && styles.tierButtonTextActive]}>
              Governor
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => handleTierChange('senator')}
            style={[styles.tierButton, activeTier === 'senator' && styles.tierButtonActive]}
          >
            <Landmark size={14} color={activeTier === 'senator' ? '#000000' : '#d4d4d8'} />
            <Text style={[styles.tierButtonText, activeTier === 'senator' && styles.tierButtonTextActive]}>
              Senators (3)
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => handleTierChange('house_of_rep')}
            style={[styles.tierButton, activeTier === 'house_of_rep' && styles.tierButtonActive]}
          >
            <Users size={14} color={activeTier === 'house_of_rep' ? '#000000' : '#d4d4d8'} />
            <Text style={[styles.tierButtonText, activeTier === 'house_of_rep' && styles.tierButtonTextActive]}>
              Reps ({tierOfficials.length})
            </Text>
          </TouchableOpacity>
        </View>

        {/* Multi-Lawmaker Delegation Horizontal Bar */}
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.delegationRow}>
          {tierOfficials.map((off, idx) => {
            const isSelected = selectedOfficialId === off.id;
            return (
              <TouchableOpacity
                key={off.id}
                onPress={() => setSelectedOfficialId(off.id)}
                style={[styles.delegationCard, isSelected && styles.delegationCardActive]}
              >
                <View style={styles.delegationHeader}>
                  <Text style={[styles.delegationSeat, isSelected && { color: '#000000', backgroundColor: '#10b981' }]}>
                    {off.role === 'senator' ? `District ${idx + 1}` : off.role === 'house_of_rep' ? `Seat ${idx + 1}` : 'Executive'}
                  </Text>
                  <Text style={styles.delegationParty}>{off.party.split(' ')[0]}</Text>
                </View>
                <Text style={[styles.delegationName, isSelected && { color: '#ffffff' }]} numberOfLines={1}>
                  {off.name}
                </Text>
                {off.district_constituency && (
                  <Text style={styles.delegationDistrict} numberOfLines={1}>
                    {off.district_constituency}
                  </Text>
                )}
              </TouchableOpacity>
            );
          })}
        </ScrollView>
      </View>

      {/* State Picker Modal */}
      <Modal visible={modalVisible} animationType="slide" transparent={true}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Select State / Jurisdiction</Text>
              <TouchableOpacity onPress={() => setModalVisible(false)}>
                <Text style={styles.modalCloseText}>Done</Text>
              </TouchableOpacity>
            </View>
            <ScrollView style={styles.modalList}>
              {ALL_NIGERIAN_STATES.map((st) => (
                <TouchableOpacity
                  key={st.code}
                  onPress={() => handleStateChange(st.code)}
                  style={[styles.modalItem, selectedStateCode === st.code && styles.modalItemActive]}
                >
                  <Text style={[styles.modalItemText, selectedStateCode === st.code && styles.modalItemTextActive]}>
                    {st.name} ({st.geopolitical_zone})
                  </Text>
                  {selectedStateCode === st.code && <Check size={16} color="#10b981" />}
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
        </View>
      </Modal>

      {/* National Quality of Life & Utilities Benchmark Modal */}
      <Modal visible={benchmarkModalVisible} animationType="slide" transparent={true}>
        <View style={styles.modalOverlay}>
          <View style={[styles.modalContent, { maxHeight: '85%' }]}>
            <View style={styles.modalHeader}>
              <View>
                <Text style={styles.modalTitle}>National Quality of Life Benchmark</Text>
                <Text style={{ color: '#a1a1aa', fontSize: 10, marginTop: 2 }}>
                  NDHS 2024 Water Access & NERC DisCo Power Rankings
                </Text>
              </View>
              <TouchableOpacity onPress={() => setBenchmarkModalVisible(false)}>
                <Text style={styles.modalCloseText}>Close</Text>
              </TouchableOpacity>
            </View>

            <ScrollView style={styles.modalList}>
              {ALL_NIGERIAN_STATES.filter(s => s.code !== 'NAT').map((st) => {
                const stOfficials = getOfficialsForState(st.code);
                const stGov = stOfficials[0];
                const qol = stGov?.quality_of_life || {
                  score: 50,
                  rating_label: 'Moderate' as const,
                  clean_water_pct: 40,
                  daily_power_hours: 8,
                  paved_roads_pct: 35,
                  primary_healthcare_access: 'Fair',
                  public_school_quality: 'Fair',
                  youth_unemployment_pct: 25,
                  security_safety_score: 55
                };
                const isCurrent = selectedStateCode === st.code;



                return (
                  <TouchableOpacity
                    key={st.code}
                    onPress={() => {
                      handleStateChange(st.code);
                      setBenchmarkModalVisible(false);
                    }}
                    style={[
                      styles.modalItem,
                      isCurrent && styles.modalItemActive,
                      { flexDirection: 'column', alignItems: 'stretch', gap: 6 }
                    ]}
                  >
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                      <Text style={[styles.modalItemText, isCurrent && styles.modalItemTextActive, { fontSize: 13 }]}>
                        {st.name} ({st.geopolitical_zone})
                      </Text>
                      <Text style={{ color: '#10b981', fontWeight: '900', fontSize: 12, fontFamily: 'monospace' }}>
                        {qol.score}/100 ({qol.rating_label})
                      </Text>
                    </View>

                    <View style={{ flexDirection: 'row', gap: 8, backgroundColor: '#09090b', padding: 8, borderRadius: 8 }}>
                      <View style={{ flex: 1, alignItems: 'center' }}>
                        <Text style={{ color: '#60a5fa', fontSize: 9, fontWeight: '700' }}>💧 Water</Text>
                        <Text style={{ color: '#ffffff', fontSize: 11, fontWeight: '800' }}>{qol.clean_water_pct}%</Text>
                      </View>
                      <View style={{ flex: 1, alignItems: 'center' }}>
                        <Text style={{ color: '#fbbf24', fontSize: 9, fontWeight: '700' }}>⚡ Power</Text>
                        <Text style={{ color: '#ffffff', fontSize: 11, fontWeight: '800' }}>{qol.daily_power_hours} hrs</Text>
                      </View>
                      <View style={{ flex: 1, alignItems: 'center' }}>
                        <Text style={{ color: '#34d399', fontSize: 9, fontWeight: '700' }}>🛣️ Roads</Text>
                        <Text style={{ color: '#ffffff', fontSize: 11, fontWeight: '800' }}>{qol.paved_roads_pct}%</Text>
                      </View>
                      <View style={{ flex: 1, alignItems: 'center' }}>
                        <Text style={{ color: '#f87171', fontSize: 9, fontWeight: '700' }}>🛡️ Safety</Text>
                        <Text style={{ color: '#ffffff', fontSize: 11, fontWeight: '800' }}>{qol.security_safety_score}/10</Text>
                      </View>
                    </View>
                  </TouchableOpacity>
                );
              })}
            </ScrollView>
          </View>
        </View>
      </Modal>

      {/* Official Profile Card */}
      <View style={styles.profileCard}>
        <View style={styles.profileHeader}>
          {/* Portrait or Initials */}
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>{currentOfficial.initials}</Text>
          </View>

          <View style={styles.profileMeta}>
            <View style={styles.officeBadgeRow}>
              <Text style={styles.officeBadge}>{currentOfficial.office_title}</Text>
              <Text style={styles.partyBadge}>{currentOfficial.party.split(' ')[0]}</Text>
            </View>
            <Text style={styles.officialName}>{currentOfficial.name}</Text>
            {currentOfficial.district_constituency && (
              <Text style={styles.constituencyText}>{currentOfficial.district_constituency}</Text>
            )}
          </View>
        </View>

        <Text style={styles.bioText}>{currentOfficial.bio_summary}</Text>

        {/* Citizen Rating & Stars */}
        <View style={styles.ratingBox}>
          <View style={styles.ratingSummary}>
            <Text style={styles.ratingScore}>{currentOfficial.citizen_rating.overall_score} ★</Text>
            <Text style={styles.ratingSub}>
              ({currentOfficial.citizen_rating.approval_pct}% Approved • {currentOfficial.citizen_rating.total_votes.toLocaleString()} Votes)
            </Text>
          </View>

          <View style={styles.starRow}>
            <Text style={styles.ratePrompt}>Tap to rate:</Text>
            {[1, 2, 3, 4, 5].map((star) => (
              <TouchableOpacity key={star} onPress={() => handleVote(star)}>
                <Star
                  size={20}
                  color="#fbbf24"
                  fill={userVoted[currentOfficial.id] && userVoted[currentOfficial.id] >= star ? '#fbbf24' : 'transparent'}
                />
              </TouchableOpacity>
            ))}
          </View>

          {ratingToast && (
            <Text style={styles.toastText}>{ratingToast}</Text>
          )}
        </View>

        {/* Quality of Life (QoL) Metrics Grid */}
        <View style={styles.qolSection}>
          <View style={styles.qolHeader}>
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6 }}>
              <Activity size={14} color="#10b981" />
              <Text style={styles.qolTitle}>Constituency Quality of Life Index</Text>
            </View>
            <TouchableOpacity onPress={() => setBenchmarkModalVisible(true)}>
              <Text style={{ color: '#10b981', fontSize: 10, fontWeight: '800' }}>Compare All States →</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.qolGrid}>
            <View style={styles.qolCard}>
              <View style={styles.qolIconRow}>
                <Droplets size={12} color="#60a5fa" />
                <Text style={styles.qolLabel}>Water</Text>
              </View>
              <Text style={styles.qolValue}>{currentOfficial.quality_of_life.clean_water_pct}%</Text>
              <Text style={styles.qolSub}>NDHS 2024</Text>
            </View>

            <View style={styles.qolCard}>
              <View style={styles.qolIconRow}>
                <Zap size={12} color="#fbbf24" />
                <Text style={styles.qolLabel}>Power</Text>
              </View>
              <Text style={styles.qolValue}>{currentOfficial.quality_of_life.daily_power_hours} hrs</Text>
              <Text style={styles.qolSub}>Daily Grid</Text>
            </View>

            <View style={styles.qolCard}>
              <View style={styles.qolIconRow}>
                <Route size={12} color="#34d399" />
                <Text style={styles.qolLabel}>Roads</Text>
              </View>
              <Text style={styles.qolValue}>{currentOfficial.quality_of_life.paved_roads_pct}%</Text>
              <Text style={styles.qolSub}>Paved Arterials</Text>
            </View>

            <View style={styles.qolCard}>
              <View style={styles.qolIconRow}>
                <ShieldAlert size={12} color="#34d399" />
                <Text style={styles.qolLabel}>Safety</Text>
              </View>
              <Text style={styles.qolValue}>{currentOfficial.quality_of_life.security_safety_score}/10</Text>
              <Text style={styles.qolSub}>Security Index</Text>
            </View>
          </View>
        </View>

        {/* Regional DisCo & Water Dossier Card */}
        <View style={styles.discoCard}>
          <View style={styles.discoHeader}>
            <Zap size={12} color="#fbbf24" />
            <Text style={styles.discoTitle}>Regional Electricity Distribution</Text>
          </View>
          <Text style={styles.discoName}>
            {matchingDisCo ? matchingDisCo.disco : 'Regional Interconnected Grid'}
          </Text>
          <Text style={styles.discoDetails}>
            Daily Load Allocation: <Text style={{ color: '#fbbf24', fontWeight: '800' }}>~{matchingDisCo?.load_mw || 239} MW ({matchingDisCo?.share_pct || 7.0}%)</Text>
          </Text>
        </View>

        {/* Educational Credentials */}
        <View style={styles.historySection}>
          <View style={styles.historyHeader}>
            <GraduationCap size={14} color="#10b981" />
            <Text style={styles.historyTitle}>Education from Secondary School</Text>
          </View>
          {currentOfficial.education.map((edu, idx) => (
            <View key={idx} style={styles.historyItem}>
              <Text style={styles.schoolName}>{edu.school}</Text>
              <Text style={styles.schoolDegree}>{edu.degree_or_cert}</Text>
            </View>
          ))}
        </View>
      </View>

      {/* Campaign Manifesto Commitments & Projects */}
      <View style={styles.promisesSection}>
        <Text style={styles.promisesTitle}>
          Campaign Commitments vs Delivery ({currentOfficial.promises.length})
        </Text>

        {currentOfficial.promises.map((p) => (
          <View key={p.id} style={styles.promiseCard}>
            <View style={styles.promiseTopRow}>
              <View style={styles.categoryBadge}>
                <Text style={styles.categoryText}>{p.category}</Text>
              </View>
              {renderStatusBadge(p.status)}
            </View>

            <Text style={styles.promiseName}>{p.title}</Text>
            <Text style={styles.promiseDesc}>{p.description}</Text>

            {/* Progress Bar */}
            <View style={styles.progressContainer}>
              <View style={styles.progressHeader}>
                <Text style={styles.progressLabel}>Delivery Execution:</Text>
                <Text style={styles.progressValue}>{p.progress_pct}%</Text>
              </View>
              <View style={styles.progressBarTrack}>
                <View
                  style={[
                    styles.progressBarFill,
                    { width: `${p.progress_pct}%`, backgroundColor: p.progress_pct === 100 ? '#10b981' : '#f59e0b' }
                  ]}
                />
              </View>
            </View>

            {/* Milestones */}
            <View style={styles.milestonesBox}>
              <Text style={styles.milestonesHeader}>Verifiable Milestones:</Text>
              {p.milestones.map((m, idx) => (
                <View key={idx} style={styles.milestoneRow}>
                  <View style={styles.milestoneDot} />
                  <Text style={styles.milestoneText}>{m}</Text>
                </View>
              ))}
            </View>
          </View>
        ))}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#09090b',
  },
  content: {
    padding: 16,
    gap: 16,
  },
  headerCard: {
    backgroundColor: '#18181b',
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: '#065f46',
    gap: 10,
  },
  bannerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  bannerSubtitle: {
    color: '#10b981',
    fontWeight: '800',
    fontSize: 10,
    textTransform: 'uppercase',
  },
  bannerTitle: {
    color: '#ffffff',
    fontSize: 20,
    fontWeight: '900',
  },
  pickerButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#09090b',
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderWidth: 1,
    borderColor: '#27272a',
  },
  pickerButtonText: {
    color: '#10b981',
    fontWeight: '800',
    fontSize: 13,
  },
  tierContainer: {
    flexDirection: 'row',
    gap: 8,
    marginTop: 4,
  },
  tierButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 4,
    backgroundColor: '#09090b',
    paddingVertical: 8,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#27272a',
  },
  tierButtonActive: {
    backgroundColor: '#10b981',
    borderColor: '#10b981',
  },
  tierButtonText: {
    color: '#a1a1aa',
    fontSize: 11,
    fontWeight: '700',
  },
  tierButtonTextActive: {
    color: '#000000',
    fontWeight: '800',
  },
  delegationRow: {
    gap: 8,
    paddingVertical: 4,
  },
  delegationCard: {
    backgroundColor: '#09090b',
    borderRadius: 10,
    padding: 10,
    width: 140,
    borderWidth: 1,
    borderColor: '#27272a',
  },
  delegationCardActive: {
    borderColor: '#10b981',
    backgroundColor: '#064e3b',
  },
  delegationHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  delegationSeat: {
    color: '#a1a1aa',
    fontSize: 9,
    fontWeight: '800',
    backgroundColor: '#18181b',
    paddingHorizontal: 4,
    paddingVertical: 1,
    borderRadius: 4,
  },
  delegationParty: {
    color: '#71717a',
    fontSize: 9,
    fontWeight: '700',
  },
  delegationName: {
    color: '#d4d4d8',
    fontSize: 12,
    fontWeight: '800',
    marginTop: 4,
  },
  delegationDistrict: {
    color: '#10b981',
    fontSize: 10,
    fontWeight: '600',
    marginTop: 2,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.7)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: '#18181b',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    maxHeight: '70%',
    padding: 16,
  },
  modalHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#27272a',
  },
  modalTitle: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '800',
  },
  modalCloseText: {
    color: '#10b981',
    fontSize: 14,
    fontWeight: '800',
  },
  modalList: {
    marginTop: 8,
  },
  modalItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#27272a',
  },
  modalItemActive: {
    backgroundColor: '#09090b',
  },
  modalItemText: {
    color: '#d4d4d8',
    fontSize: 13,
    fontWeight: '600',
  },
  modalItemTextActive: {
    color: '#10b981',
    fontWeight: '800',
  },
  profileCard: {
    backgroundColor: '#18181b',
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: '#27272a',
    gap: 14,
  },
  profileHeader: {
    flexDirection: 'row',
    gap: 12,
  },
  avatar: {
    width: 60,
    height: 70,
    borderRadius: 12,
    backgroundColor: '#064e3b',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: '#10b981',
  },
  avatarText: {
    color: '#6ee7b7',
    fontSize: 20,
    fontWeight: '900',
  },
  profileMeta: {
    flex: 1,
    justifyContent: 'center',
    gap: 2,
  },
  officeBadgeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  officeBadge: {
    color: '#34d399',
    backgroundColor: '#064e3b',
    fontSize: 9,
    fontWeight: '800',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
  },
  partyBadge: {
    color: '#a1a1aa',
    backgroundColor: '#27272a',
    fontSize: 9,
    fontWeight: '800',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
  },
  officialName: {
    color: '#ffffff',
    fontSize: 17,
    fontWeight: '900',
    marginTop: 2,
  },
  constituencyText: {
    color: '#10b981',
    fontSize: 11,
    fontWeight: '700',
  },
  bioText: {
    color: '#d4d4d8',
    fontSize: 12,
    lineHeight: 18,
  },
  ratingBox: {
    backgroundColor: '#09090b',
    borderRadius: 12,
    padding: 12,
    borderWidth: 1,
    borderColor: '#27272a',
    gap: 8,
  },
  ratingSummary: {
    flexDirection: 'row',
    alignItems: 'baseline',
    gap: 6,
  },
  ratingScore: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: '900',
  },
  ratingSub: {
    color: '#a1a1aa',
    fontSize: 11,
    fontWeight: '600',
  },
  starRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  ratePrompt: {
    color: '#71717a',
    fontSize: 11,
    fontWeight: '700',
  },
  toastText: {
    color: '#34d399',
    fontSize: 11,
    fontWeight: '700',
  },
  qolSection: {
    gap: 8,
  },
  qolHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  qolTitle: {
    color: '#10b981',
    fontSize: 11,
    fontWeight: '800',
    textTransform: 'uppercase',
  },
  qolGrid: {
    flexDirection: 'row',
    gap: 8,
  },
  qolCard: {
    flex: 1,
    backgroundColor: '#09090b',
    padding: 8,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#27272a',
  },
  qolIconRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  qolLabel: {
    color: '#a1a1aa',
    fontSize: 9,
    fontWeight: '700',
  },
  qolValue: {
    color: '#ffffff',
    fontSize: 13,
    fontWeight: '900',
    marginTop: 2,
  },
  qolSub: {
    color: '#52525b',
    fontSize: 8,
    fontWeight: '600',
  },
  discoCard: {
    backgroundColor: '#09090b',
    padding: 12,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#27272a',
    gap: 4,
  },
  discoHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  discoTitle: {
    color: '#fbbf24',
    fontSize: 10,
    fontWeight: '800',
    textTransform: 'uppercase',
  },
  discoName: {
    color: '#ffffff',
    fontSize: 13,
    fontWeight: '800',
  },
  discoDetails: {
    color: '#a1a1aa',
    fontSize: 11,
  },
  historySection: {
    gap: 6,
    paddingTop: 8,
    borderTopWidth: 1,
    borderTopColor: '#27272a',
  },
  historyHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  historyTitle: {
    color: '#10b981',
    fontSize: 11,
    fontWeight: '800',
    textTransform: 'uppercase',
  },
  historyItem: {
    backgroundColor: '#09090b',
    padding: 8,
    borderRadius: 8,
  },
  schoolName: {
    color: '#ffffff',
    fontSize: 11,
    fontWeight: '800',
  },
  schoolDegree: {
    color: '#34d399',
    fontSize: 10,
    fontWeight: '600',
  },
  promisesSection: {
    gap: 12,
  },
  promisesTitle: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '800',
  },
  promiseCard: {
    backgroundColor: '#18181b',
    borderRadius: 16,
    padding: 14,
    borderWidth: 1,
    borderColor: '#27272a',
    gap: 10,
  },
  promiseTopRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  categoryBadge: {
    backgroundColor: '#27272a',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 6,
  },
  categoryText: {
    color: '#d4d4d8',
    fontSize: 10,
    fontWeight: '800',
    textTransform: 'uppercase',
  },
  statusPill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 6,
    borderWidth: 1,
  },
  statusText: {
    fontSize: 10,
    fontWeight: '800',
  },
  promiseName: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: '800',
  },
  promiseDesc: {
    color: '#a1a1aa',
    fontSize: 12,
    lineHeight: 16,
  },
  progressContainer: {
    backgroundColor: '#09090b',
    padding: 10,
    borderRadius: 10,
    gap: 6,
  },
  progressHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  progressLabel: {
    color: '#71717a',
    fontSize: 10,
    fontWeight: '700',
    textTransform: 'uppercase',
  },
  progressValue: {
    color: '#10b981',
    fontSize: 11,
    fontWeight: '900',
  },
  progressBarTrack: {
    height: 6,
    backgroundColor: '#27272a',
    borderRadius: 3,
    overflow: 'hidden',
  },
  progressBarFill: {
    height: '100%',
    borderRadius: 3,
  },
  milestonesBox: {
    gap: 4,
  },
  milestonesHeader: {
    color: '#71717a',
    fontSize: 10,
    fontWeight: '800',
    textTransform: 'uppercase',
  },
  milestoneRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  milestoneDot: {
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: '#10b981',
  },
  milestoneText: {
    color: '#d4d4d8',
    fontSize: 11,
  },
});

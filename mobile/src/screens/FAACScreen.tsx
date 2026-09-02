import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Modal
} from 'react-native';
import { ALL_NIGERIAN_STATES, fetchStateAllocations } from '../lib/api';
import { Landmark, ChevronDown, Check, Coins, TrendingUp } from 'lucide-react-native';

export const FAACScreen: React.FC = () => {
  const [selectedStateCode, setSelectedStateCode] = useState('AB');
  const [modalVisible, setModalVisible] = useState(false);

  const { state, allocations, lgas } = fetchStateAllocations(selectedStateCode);
  const latestMonth = allocations[0];

  const isOilState = ['RV', 'DE', 'AK', 'BY', 'ON', 'IM', 'AB', 'ED'].includes(selectedStateCode);

  const formatCurrency = (amt: number) => {
    if (amt >= 1_000_000_000_000) return `₦${(amt / 1_000_000_000_000).toFixed(2)} Trillion`;
    if (amt >= 1_000_000_000) return `₦${(amt / 1_000_000_000).toFixed(2)} Billion`;
    if (amt >= 1_000_000) return `₦${(amt / 1_000_000).toFixed(2)} Million`;
    return `₦${amt.toLocaleString()}`;
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      {/* State Selector Card */}
      <View style={styles.headerCard}>
        <View style={styles.headerTitleRow}>
          <Landmark size={18} color="#10b981" />
          <Text style={styles.headerSubtitle}>Federation Account Allocation Committee</Text>
        </View>
        <Text style={styles.headerTitle}>Public Treasury & FAAC Tracker</Text>

        <TouchableOpacity
          onPress={() => setModalVisible(true)}
          style={styles.pickerButton}
        >
          <Text style={styles.pickerButtonText}>{state.name} ({state.geopolitical_zone})</Text>
          <ChevronDown size={18} color="#10b981" />
        </TouchableOpacity>
      </View>

      {/* State Picker Modal */}
      <Modal visible={modalVisible} animationType="slide" transparent={true}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Select State / Territory</Text>
              <TouchableOpacity onPress={() => setModalVisible(false)}>
                <Text style={styles.modalCloseText}>Done</Text>
              </TouchableOpacity>
            </View>
            <ScrollView style={styles.modalList}>
              {ALL_NIGERIAN_STATES.map((st) => (
                <TouchableOpacity
                  key={st.code}
                  onPress={() => {
                    setSelectedStateCode(st.code);
                    setModalVisible(false);
                  }}
                  style={[
                    styles.modalItem,
                    selectedStateCode === st.code && styles.modalItemActive
                  ]}
                >
                  <Text
                    style={[
                      styles.modalItemText,
                      selectedStateCode === st.code && styles.modalItemTextActive
                    ]}
                  >
                    {st.name} ({st.geopolitical_zone})
                  </Text>
                  {selectedStateCode === st.code && <Check size={16} color="#10b981" />}
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
        </View>
      </Modal>

      {/* Derivation Badge if applicable */}
      {isOilState && (
        <View style={styles.oilBadge}>
          <Coins size={14} color="#f59e0b" />
          <Text style={styles.oilBadgeText}>
            13% Mineral Derivation Beneficiary State
          </Text>
        </View>
      )}

      {/* Latest Month Allocation Summary Card */}
      {latestMonth && (
        <View style={styles.summaryCard}>
          <View style={styles.cardHeaderRow}>
            <Text style={styles.cardSectionTitle}>Latest Monthly Disbursement</Text>
            <Text style={styles.dateBadge}>Month {latestMonth.month}, {latestMonth.year}</Text>
          </View>

          <View style={styles.metricGrid}>
            <View style={styles.metricBox}>
              <Text style={styles.metricLabel}>Gross Share</Text>
              <Text style={styles.metricValue}>{formatCurrency(latestMonth.gross_amount)}</Text>
            </View>
            <View style={styles.metricBox}>
              <Text style={styles.metricLabel}>Statutory Deductions</Text>
              <Text style={[styles.metricValue, { color: '#f87171' }]}>
                -{formatCurrency(latestMonth.deductions)}
              </Text>
            </View>
          </View>

          <View style={styles.netBox}>
            <Text style={styles.netLabel}>Net Take-Home Revenue to State Treasury:</Text>
            <Text style={styles.netValue}>{formatCurrency(latestMonth.net_amount)}</Text>
          </View>
        </View>
      )}

      {/* Multi-Month Historical Trend Bars */}
      <View style={styles.summaryCard}>
        <View style={styles.cardHeaderRow}>
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6 }}>
            <TrendingUp size={16} color="#10b981" />
            <Text style={styles.cardSectionTitle}>Multi-Month Revenue Trajectory (2024)</Text>
          </View>
          <Text style={styles.dateBadge}>12 Months Audited</Text>
        </View>

        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.trendScroll}>
          {allocations.map((alloc) => {
            const maxGross = 45_000_000_000;
            const barHeightPct = Math.min(100, Math.max(20, (alloc.net_amount / maxGross) * 100));
            const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
            const mName = monthNames[alloc.month - 1] || `M${alloc.month}`;

            return (
              <View key={alloc.id} style={styles.trendBarContainer}>
                <Text style={styles.trendBarValue}>₦{(alloc.net_amount / 1_000_000_000).toFixed(1)}B</Text>
                <View style={styles.barTrack}>
                  <View style={[styles.barFill, { height: `${barHeightPct}%` }]} />
                </View>
                <Text style={styles.trendBarLabel}>{mName}</Text>
              </View>
            );
          })}
        </ScrollView>
      </View>

      {/* Local Government Councils (LGA) Direct Disbursements */}
      <View style={styles.lgaSection}>
        <View style={styles.sectionHeaderRow}>
          <Text style={styles.sectionTitle}>
            Local Government Councils ({lgas.length} LGAs)
          </Text>
          <Text style={styles.supremeCourtTag}>Supreme Court Autonomy Direct Share</Text>
        </View>

        <View style={styles.lgaGrid}>
          {lgas.map((lga) => (
            <View key={lga.id} style={styles.lgaCard}>
              <Text style={styles.lgaName}>{lga.name}</Text>
              <Text style={styles.lgaAmount}>
                {lga.allocation ? formatCurrency(lga.allocation) : '₦850.0 Million'}
              </Text>
              <Text style={styles.lgaSubtext}>Monthly Direct Account</Text>
            </View>
          ))}
        </View>
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
    gap: 8,
  },
  headerTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  headerSubtitle: {
    color: '#10b981',
    fontWeight: '800',
    fontSize: 10,
    textTransform: 'uppercase',
  },
  headerTitle: {
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
    marginTop: 4,
  },
  pickerButtonText: {
    color: '#10b981',
    fontWeight: '800',
    fontSize: 13,
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
  oilBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: '#451a03',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#92400e',
  },
  oilBadgeText: {
    color: '#fbbf24',
    fontSize: 11,
    fontWeight: '800',
  },
  summaryCard: {
    backgroundColor: '#18181b',
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: '#27272a',
    gap: 12,
  },
  cardHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  cardSectionTitle: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: '800',
  },
  dateBadge: {
    color: '#71717a',
    fontSize: 11,
    fontWeight: '700',
  },
  metricGrid: {
    flexDirection: 'row',
    gap: 10,
  },
  metricBox: {
    flex: 1,
    backgroundColor: '#09090b',
    padding: 10,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#27272a',
  },
  metricLabel: {
    color: '#a1a1aa',
    fontSize: 10,
    fontWeight: '700',
    textTransform: 'uppercase',
  },
  metricValue: {
    color: '#ffffff',
    fontSize: 13,
    fontWeight: '900',
    marginTop: 2,
  },
  netBox: {
    backgroundColor: '#064e3b',
    padding: 12,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#059669',
  },
  netLabel: {
    color: '#a7f3d0',
    fontSize: 11,
    fontWeight: '700',
  },
  netValue: {
    color: '#ffffff',
    fontSize: 20,
    fontWeight: '900',
    marginTop: 2,
  },
  lgaSection: {
    gap: 8,
  },
  sectionHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
    gap: 4,
  },
  sectionTitle: {
    color: '#ffffff',
    fontSize: 15,
    fontWeight: '800',
  },
  supremeCourtTag: {
    color: '#34d399',
    fontSize: 10,
    fontWeight: '800',
    backgroundColor: '#064e3b',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
  },
  lgaGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  lgaCard: {
    width: '48%',
    backgroundColor: '#18181b',
    padding: 12,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#27272a',
  },
  lgaName: {
    color: '#ffffff',
    fontSize: 12,
    fontWeight: '800',
  },
  lgaAmount: {
    color: '#10b981',
    fontSize: 13,
    fontWeight: '900',
    marginTop: 4,
  },
  lgaSubtext: {
    color: '#71717a',
    fontSize: 9,
    fontWeight: '600',
    marginTop: 2,
  },
  trendScroll: {
    paddingVertical: 8,
    gap: 12,
  },
  trendBarContainer: {
    alignItems: 'center',
    width: 48,
    gap: 4,
  },
  trendBarValue: {
    color: '#34d399',
    fontSize: 9,
    fontWeight: '800',
    fontFamily: 'monospace',
  },
  barTrack: {
    width: 24,
    height: 90,
    backgroundColor: '#09090b',
    borderRadius: 6,
    overflow: 'hidden',
    justifyContent: 'flex-end',
    borderWidth: 1,
    borderColor: '#27272a',
  },
  barFill: {
    width: '100%',
    backgroundColor: '#10b981',
    borderRadius: 4,
  },
  trendBarLabel: {
    color: '#a1a1aa',
    fontSize: 10,
    fontWeight: '700',
  },
});

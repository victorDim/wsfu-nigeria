import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Switch,
  StyleSheet,
  Linking
} from 'react-native';
import { Shield, Lock, Bell, Wifi, ExternalLink, HelpCircle } from 'lucide-react-native';

export const SettingsScreen: React.FC = () => {
  const [offlineCache, setOfflineCache] = useState(true);
  const [pushNotifications, setPushNotifications] = useState(true);

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      {/* App Branding Card */}
      <View style={styles.brandCard}>
        <View style={styles.brandIcon}>
          <Text style={styles.brandLetter}>W</Text>
        </View>
        <Text style={styles.brandTitle}>WSFU (Who Swear For Us) 🇳🇬</Text>
        <Text style={styles.brandVersion}>Citizen Accountability Engine • Mobile v1.0.0</Text>
      </View>

      {/* Offline & Preferences */}
      <View style={styles.sectionCard}>
        <Text style={styles.sectionHeader}>App Preferences & Cache</Text>

        <View style={styles.settingRow}>
          <View style={styles.settingTextGroup}>
            <Text style={styles.settingTitle}>Offline Mode & Local Storage</Text>
            <Text style={styles.settingSubtitle}>
              Keep 109 Senators, 360 Reps, and NDHS 2024 data accessible without internet.
            </Text>
          </View>
          <Switch
            value={offlineCache}
            onValueChange={setOfflineCache}
            thumbColor={offlineCache ? '#10b981' : '#71717a'}
            trackColor={{ false: '#27272a', true: '#064e3b' }}
          />
        </View>

        <View style={styles.settingRow}>
          <View style={styles.settingTextGroup}>
            <Text style={styles.settingTitle}>Investigative Breaking Alerts</Text>
            <Text style={styles.settingSubtitle}>
              Notifications for verified Tier 1 corruption reports & treasury disbursements.
            </Text>
          </View>
          <Switch
            value={pushNotifications}
            onValueChange={setPushNotifications}
            thumbColor={pushNotifications ? '#10b981' : '#71717a'}
            trackColor={{ false: '#27272a', true: '#064e3b' }}
          />
        </View>
      </View>

      {/* Legal & Compliance */}
      <View style={styles.sectionCard}>
        <Text style={styles.sectionHeader}>Legal, Privacy & Compliance</Text>

        <View style={styles.legalItem}>
          <Shield size={16} color="#10b981" />
          <View style={{ flex: 1 }}>
            <Text style={styles.legalTitle}>NDPR & Nigeria Data Protection Act 2023</Text>
            <Text style={styles.legalText}>
              WSFU does not track personal identifying data. Citizen ratings and FOI templates are processed locally on device.
            </Text>
          </View>
        </View>

        <View style={styles.legalItem}>
          <HelpCircle size={16} color="#fbbf24" />
          <View style={{ flex: 1 }}>
            <Text style={styles.legalTitle}>Fair Use & Public Interest Reporting</Text>
            <Text style={styles.legalText}>
              All materials aggregated under Nigerian Copyright Fair Use (Cap C28 LFN 2004) and Freedom of Information Act 2011.
            </Text>
          </View>
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
  brandCard: {
    backgroundColor: '#18181b',
    borderRadius: 16,
    padding: 20,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#065f46',
    gap: 6,
  },
  brandIcon: {
    width: 50,
    height: 50,
    borderRadius: 14,
    backgroundColor: '#10b981',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 4,
  },
  brandLetter: {
    color: '#000000',
    fontSize: 26,
    fontWeight: '900',
  },
  brandTitle: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: '900',
  },
  brandVersion: {
    color: '#71717a',
    fontSize: 11,
    fontWeight: '600',
  },
  sectionCard: {
    backgroundColor: '#18181b',
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: '#27272a',
    gap: 14,
  },
  sectionHeader: {
    color: '#10b981',
    fontSize: 11,
    fontWeight: '800',
    textTransform: 'uppercase',
  },
  settingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 12,
  },
  settingTextGroup: {
    flex: 1,
    gap: 2,
  },
  settingTitle: {
    color: '#ffffff',
    fontSize: 13,
    fontWeight: '700',
  },
  settingSubtitle: {
    color: '#a1a1aa',
    fontSize: 11,
    lineHeight: 15,
  },
  legalItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 10,
    backgroundColor: '#09090b',
    padding: 12,
    borderRadius: 12,
  },
  legalTitle: {
    color: '#ffffff',
    fontSize: 12,
    fontWeight: '800',
    marginBottom: 2,
  },
  legalText: {
    color: '#a1a1aa',
    fontSize: 11,
    lineHeight: 16,
  },
});

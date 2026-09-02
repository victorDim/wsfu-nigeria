import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  Alert,
  Share
} from 'react-native';
import { submitFOIRequest } from '../lib/api';
import { FOIRequest } from '../types';
import { FileText, Send, Share2, CheckCircle2, Clock, ShieldCheck } from 'lucide-react-native';

export const FOIScreen: React.FC = () => {
  const [mdaName, setMdaName] = useState('');
  const [subject, setSubject] = useState('');
  const [details, setDetails] = useState('');
  const [submittedRequests, setSubmittedRequests] = useState<FOIRequest[]>([
    {
      id: 'foi-demo-1',
      tracking_code: 'FOI-2026-FMW409',
      mda_name: 'Federal Ministry of Works',
      subject: 'Lagos-Calabar Coastal Highway Environmental Assessment & Procurement Ledger',
      details: 'Request for the comprehensive Environmental Impact Assessment (EIA) and procurement award records.',
      date_filed: '2026-08-20',
      due_date: '2026-08-27',
      status: 'acknowledged'
    }

  ]);
  const [lastSubmitted, setLastSubmitted] = useState<FOIRequest | null>(null);
  const [submitting, setSubmitting] = useState(false);



  const handleSubmit = async () => {
    if (!mdaName.trim() || !subject.trim() || !details.trim()) {
      Alert.alert('Required Fields', 'Please fill in the MDA Name, Subject, and Details.');
      return;
    }

    setSubmitting(true);
    try {
      const newReq = await submitFOIRequest({
        mda_name: mdaName.trim(),
        subject: subject.trim(),
        details: details.trim()
      });

      setSubmittedRequests(prev => [newReq, ...prev]);
      setLastSubmitted(newReq);
      setMdaName('');
      setSubject('');
      setDetails('');
    } catch {
      Alert.alert('Error', 'Could not record FOI request.');
    } finally {
      setSubmitting(false);
    }
  };


  const handleShare = async (req: FOIRequest) => {
    try {
      await Share.share({
        message: `🇳🇬 WSFU FOI Petition Tracking Code: ${req.tracking_code}\nMDA: ${req.mda_name}\nSubject: ${req.subject}\nFiled on: ${req.date_filed} | Statutory 7-Day Deadline: ${req.due_date}\n\nGenerated via WSFU Citizen Accountability Engine.`
      });
    } catch {
      // ignore
    }
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      {/* Header Banner */}
      <View style={styles.headerCard}>
        <View style={styles.headerTitleRow}>
          <FileText size={18} color="#10b981" />
          <Text style={styles.headerSubtitle}>Section 1(1) FOI Act 2011</Text>
        </View>
        <Text style={styles.headerTitle}>Freedom of Information (FOI) Builder</Text>
        <Text style={styles.headerDesc}>
          Draft legally-binding transparency requests to any Federal, State, or Local Government agency with an automatic 7-day statutory deadline.
        </Text>
      </View>

      {/* Petition Builder Form */}
      <View style={styles.formCard}>
        <Text style={styles.formHeading}>Draft New FOI Petition</Text>

        <View style={styles.inputGroup}>
          <Text style={styles.inputLabel}>Target Ministry, Department or Agency (MDA):</Text>
          <TextInput
            placeholder="e.g. Federal Ministry of Works, NNPCL, FERMA"
            placeholderTextColor="#71717a"
            value={mdaName}
            onChangeText={setMdaName}
            style={styles.textInput}
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.inputLabel}>Subject / Project Description:</Text>
          <TextInput
            placeholder="e.g. Request for Procurement Records on Road Contract"
            placeholderTextColor="#71717a"
            value={subject}
            onChangeText={setSubject}
            style={styles.textInput}
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.inputLabel}>Specific Information / Documents Requested:</Text>
          <TextInput
            placeholder="State the exact contract figures, bank disbursement trails, or audit reports requested..."
            placeholderTextColor="#71717a"
            value={details}
            onChangeText={setDetails}
            multiline
            numberOfLines={4}
            style={[styles.textInput, styles.textArea]}
          />
        </View>

        <TouchableOpacity onPress={handleSubmit} style={styles.submitButton}>
          <Send size={16} color="#000000" />
          <Text style={styles.submitButtonText}>Generate Official Legal FOI Letter</Text>
        </TouchableOpacity>
      </View>

      {/* Confirmation Card if just submitted */}
      {lastSubmitted && (
        <View style={styles.successCard}>
          <View style={styles.successHeader}>
            <CheckCircle2 size={18} color="#34d399" />
            <Text style={styles.successTitle}>Official FOI Generated Successfully</Text>
          </View>
          <Text style={styles.trackingCodeText}>Tracking Code: {lastSubmitted.tracking_code}</Text>
          <Text style={styles.deadlineNotice}>
            Statutory 7-Day Deadline: <Text style={{ color: '#fbbf24', fontWeight: '800' }}>{lastSubmitted.due_date}</Text>
          </Text>

          <TouchableOpacity onPress={() => handleShare(lastSubmitted)} style={styles.shareButton}>
            <Share2 size={14} color="#ffffff" />
            <Text style={styles.shareButtonText}>Share / Copy Petition Text</Text>
          </TouchableOpacity>
        </View>
      )}

      {/* Tracked Citizen Petitions */}
      <View style={styles.requestsSection}>
        <Text style={styles.sectionHeading}>Your Active FOI Petitions ({submittedRequests.length})</Text>
        {submittedRequests.map((req) => (
          <View key={req.id} style={styles.requestCard}>
            <View style={styles.requestTopRow}>
              <Text style={styles.reqCode}>{req.tracking_code}</Text>
              <View style={styles.statusPill}>
                <Clock size={10} color="#34d399" />
                <Text style={styles.statusText}>{req.status.toUpperCase()}</Text>
              </View>
            </View>

            <Text style={styles.reqMda}>{req.mda_name}</Text>
            <Text style={styles.reqSubject}>{req.subject}</Text>

            <View style={styles.reqFooter}>
              <Text style={styles.dateText}>Filed: {req.date_filed}</Text>
              <TouchableOpacity onPress={() => handleShare(req)} style={styles.miniShare}>
                <Share2 size={12} color="#10b981" />
                <Text style={styles.miniShareText}>Share</Text>
              </TouchableOpacity>
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
    fontSize: 19,
    fontWeight: '900',
  },
  headerDesc: {
    color: '#a1a1aa',
    fontSize: 12,
    lineHeight: 17,
  },
  formCard: {
    backgroundColor: '#18181b',
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: '#27272a',
    gap: 12,
  },
  formHeading: {
    color: '#ffffff',
    fontSize: 15,
    fontWeight: '800',
  },
  inputGroup: {
    gap: 4,
  },
  inputLabel: {
    color: '#d4d4d8',
    fontSize: 11,
    fontWeight: '700',
  },
  textInput: {
    backgroundColor: '#09090b',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#27272a',
    color: '#ffffff',
    fontSize: 13,
    paddingHorizontal: 12,
    paddingVertical: 10,
  },
  textArea: {
    height: 90,
    textAlignVertical: 'top',
  },
  submitButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    backgroundColor: '#10b981',
    borderRadius: 12,
    paddingVertical: 12,
    marginTop: 4,
  },
  submitButtonText: {
    color: '#000000',
    fontSize: 13,
    fontWeight: '900',
  },
  successCard: {
    backgroundColor: '#064e3b',
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: '#059669',
    gap: 8,
  },
  successHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  successTitle: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: '800',
  },
  trackingCodeText: {
    color: '#6ee7b7',
    fontSize: 15,
    fontWeight: '900',
    fontFamily: 'monospace',
  },
  deadlineNotice: {
    color: '#e4e4e7',
    fontSize: 12,
  },
  shareButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    backgroundColor: '#047857',
    paddingVertical: 10,
    borderRadius: 10,
    marginTop: 4,
  },
  shareButtonText: {
    color: '#ffffff',
    fontSize: 12,
    fontWeight: '800',
  },
  requestsSection: {
    gap: 10,
  },
  sectionHeading: {
    color: '#ffffff',
    fontSize: 15,
    fontWeight: '800',
  },
  requestCard: {
    backgroundColor: '#18181b',
    borderRadius: 14,
    padding: 14,
    borderWidth: 1,
    borderColor: '#27272a',
    gap: 6,
  },
  requestTopRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  reqCode: {
    color: '#10b981',
    fontSize: 12,
    fontWeight: '900',
    fontFamily: 'monospace',
  },
  statusPill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: '#064e3b',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
  },
  statusText: {
    color: '#34d399',
    fontSize: 9,
    fontWeight: '800',
  },
  reqMda: {
    color: '#ffffff',
    fontSize: 13,
    fontWeight: '800',
  },
  reqSubject: {
    color: '#a1a1aa',
    fontSize: 12,
  },
  reqFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: 6,
    borderTopWidth: 1,
    borderTopColor: '#27272a',
    marginTop: 4,
  },
  dateText: {
    color: '#71717a',
    fontSize: 10,
  },
  miniShare: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  miniShareText: {
    color: '#10b981',
    fontSize: 11,
    fontWeight: '700',
  },
});

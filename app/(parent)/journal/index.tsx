import React, { useState } from 'react';
import { ScrollView, TouchableOpacity, StyleSheet, FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme } from '@shopify/restyle';
import { Ionicons } from '@expo/vector-icons';
import { Box, Text } from '@/theme/components';
import type { Theme } from '@/theme';

interface LogEntry {
  id: string;
  date: string;
  displayDate: string;
  activityTitle: string;
  icon: string;
  noteText: string;
  photoCount: number;
  hasVoice: boolean;
  durationMinutes: number;
  zone: string;
}

const MOCK_LOGS: LogEntry[] = [
  {
    id: 'l1',
    date: '2025-06-10',
    displayDate: 'Tuesday, June 10',
    activityTitle: 'Backyard Build Session',
    icon: '🏗️',
    noteText: 'Built a "dinosaur fort" using the cinderblocks. Insisted the T-Rex needed a moat.',
    photoCount: 2,
    hasVoice: false,
    durationMinutes: 45,
    zone: 'Backyard zone',
  },
  {
    id: 'l2',
    date: '2025-06-09',
    displayDate: 'Monday, June 9',
    activityTitle: 'Letter Hunt: Letter B',
    icon: '🔤',
    noteText: 'Found 14 things! Ball, book, bug, banana...',
    photoCount: 0,
    hasVoice: true,
    durationMinutes: 20,
    zone: 'Indoor active',
  },
  {
    id: 'l3',
    date: '2025-06-09',
    displayDate: 'Monday, June 9',
    activityTitle: 'Dinosaur Excavation Dig',
    icon: '🦕',
    noteText: 'Found all 8 dinosaurs! Loves the T-Rex best. Asked amazing questions about what they ate.',
    photoCount: 3,
    hasVoice: false,
    durationMinutes: 25,
    zone: 'Backyard',
  },
];

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

export default function JournalScreen() {
  const theme = useTheme<Theme>();
  const now = new Date();
  const [currentMonth, setCurrentMonth] = useState(now.getMonth());

  function prevMonth() {
    setCurrentMonth((m) => (m === 0 ? 11 : m - 1));
  }
  function nextMonth() {
    setCurrentMonth((m) => (m === 11 ? 0 : m + 1));
  }

  const groupedLogs = MOCK_LOGS.reduce<Record<string, LogEntry[]>>((acc, log) => {
    if (!acc[log.displayDate]) acc[log.displayDate] = [];
    acc[log.displayDate].push(log);
    return acc;
  }, {});

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: theme.colors.background }}>
      <Box
        flexDirection="row"
        alignItems="center"
        justifyContent="space-between"
        paddingHorizontal="l"
        paddingVertical="m"
        style={{ borderBottomWidth: 1, borderBottomColor: theme.colors.border }}
      >
        <Text variant="heading2">Journal</Text>
        <Box flexDirection="row" gap="s">
          <TouchableOpacity style={styles.headerBtn}>
            <Ionicons name="add" size={22} color={theme.colors.primary} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.headerBtn}>
            <Ionicons name="calendar-outline" size={22} color={theme.colors.textSecondary} />
          </TouchableOpacity>
        </Box>
      </Box>

      <ScrollView contentContainerStyle={{ paddingBottom: 40 }}>
        {/* Month Navigator */}
        <Box
          flexDirection="row"
          alignItems="center"
          justifyContent="center"
          gap="l"
          paddingVertical="m"
        >
          <TouchableOpacity onPress={prevMonth}>
            <Ionicons name="chevron-back" size={20} color={theme.colors.primary} />
          </TouchableOpacity>
          <Text variant="heading3">{MONTHS[currentMonth]} 2025</Text>
          <TouchableOpacity onPress={nextMonth}>
            <Ionicons name="chevron-forward" size={20} color={theme.colors.primary} />
          </TouchableOpacity>
        </Box>

        {/* Weekly Summary */}
        <Box
          marginHorizontal="l"
          marginBottom="l"
          backgroundColor="cardBackground"
          borderRadius="l"
          padding="m"
          style={{ borderWidth: 1, borderColor: theme.colors.border }}
        >
          <Text variant="label" color="textMuted" marginBottom="s">THIS WEEK</Text>
          <Box flexDirection="row" gap="l" flexWrap="wrap">
            <Box flexDirection="row" alignItems="center" gap="xs">
              <Ionicons name="leaf-outline" size={16} color={theme.colors.primary} />
              <Text variant="bodySmall">6h 20min outdoors</Text>
            </Box>
            <Box flexDirection="row" alignItems="center" gap="xs">
              <Ionicons name="flash-outline" size={16} color={theme.colors.accent} />
              <Text variant="bodySmall">4 focus activities</Text>
            </Box>
            <Box flexDirection="row" alignItems="center" gap="xs">
              <Ionicons name="camera-outline" size={16} color={theme.colors.highlight} />
              <Text variant="bodySmall">12 photos</Text>
            </Box>
          </Box>
        </Box>

        {/* Log Feed grouped by day */}
        {Object.entries(groupedLogs).map(([dateLabel, entries]) => (
          <Box key={dateLabel} marginHorizontal="l" marginBottom="l">
            <Text variant="heading3" marginBottom="s">{dateLabel}</Text>
            {entries.map((entry) => (
              <Box
                key={entry.id}
                backgroundColor="cardBackground"
                borderRadius="l"
                padding="m"
                marginBottom="s"
                style={{ borderWidth: 1, borderColor: theme.colors.border }}
              >
                <Box flexDirection="row" alignItems="center" gap="s" marginBottom="s">
                  <Text style={{ fontSize: 24 }}>{entry.icon}</Text>
                  <Text variant="heading3" flex={1}>{entry.activityTitle}</Text>
                </Box>

                {(entry.photoCount > 0 || entry.hasVoice) && (
                  <Box flexDirection="row" gap="s" marginBottom="s">
                    {entry.photoCount > 0 && (
                      <Box
                        style={[styles.mediaBadge, { backgroundColor: theme.colors.highlight + '22' }]}
                      >
                        <Ionicons name="camera" size={12} color={theme.colors.highlight} />
                        <Text variant="caption" style={{ color: theme.colors.highlight }}>
                          {' '}{entry.photoCount} photos
                        </Text>
                      </Box>
                    )}
                    {entry.hasVoice && (
                      <Box
                        style={[styles.mediaBadge, { backgroundColor: theme.colors.accent + '22' }]}
                      >
                        <Ionicons name="mic" size={12} color={theme.colors.accentDark} />
                        <Text variant="caption" style={{ color: theme.colors.accentDark }}>
                          {' '}Voice memo
                        </Text>
                      </Box>
                    )}
                  </Box>
                )}

                {entry.noteText && (
                  <Text variant="bodySmall" color="textSecondary" marginBottom="s">
                    "{entry.noteText}"
                  </Text>
                )}

                <Box flexDirection="row" gap="l">
                  <Box flexDirection="row" alignItems="center" gap="xs">
                    <Ionicons name="heart-outline" size={12} color={theme.colors.textMuted} />
                    <Text variant="caption" color="textMuted">{entry.durationMinutes} min</Text>
                  </Box>
                  <Text variant="caption" color="textMuted">{entry.zone}</Text>
                </Box>
              </Box>
            ))}
          </Box>
        ))}

        {/* Export Button */}
        <Box marginHorizontal="l">
          <TouchableOpacity
            style={[styles.exportBtn, { borderColor: theme.colors.border, backgroundColor: theme.colors.cardBackground }]}
          >
            <Ionicons name="document-text-outline" size={18} color={theme.colors.primary} />
            <Text variant="body" color="primary" marginLeft="s">Export Week as PDF</Text>
          </TouchableOpacity>
        </Box>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  headerBtn: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  mediaBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  exportBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 14,
    borderRadius: 12,
    borderWidth: 1,
  },
});

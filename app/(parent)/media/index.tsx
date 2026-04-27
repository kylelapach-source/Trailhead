import React, { useState } from 'react';
import { ScrollView, TouchableOpacity, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme } from '@shopify/restyle';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { Box, Text } from '@/theme/components';
import type { Theme } from '@/theme';
import { useUIStore } from '@/store';

const CATEGORIES = ['Phonics', 'Counting', 'Brain Breaks', 'Read-Alouds', 'Nature', 'Building'];

interface VideoItem {
  id: string;
  title: string;
  youtubeId: string;
  category: string;
  durationSeconds: number;
  ageTags: string[];
}

const SEED_VIDEOS: VideoItem[] = [
  { id: 'v1', title: 'Letter B Song', youtubeId: 'dQw4w9WgXcQ', category: 'Phonics', durationSeconds: 240, ageTags: ['3-4', '4-5'] },
  { id: 'v2', title: 'Counting to 20 with Blippi', youtubeId: 'dQw4w9WgXcQ', category: 'Counting', durationSeconds: 360, ageTags: ['3-4', '4-5'] },
  { id: 'v3', title: 'Freeze Dance Brain Break', youtubeId: 'dQw4w9WgXcQ', category: 'Brain Breaks', durationSeconds: 300, ageTags: ['3-4', '4-5', '5-6'] },
  { id: 'v4', title: 'The Very Hungry Caterpillar', youtubeId: 'dQw4w9WgXcQ', category: 'Read-Alouds', durationSeconds: 480, ageTags: ['3-4', '4-5'] },
  { id: 'v5', title: 'Amazing Animals: Dinosaurs', youtubeId: 'dQw4w9WgXcQ', category: 'Nature', durationSeconds: 420, ageTags: ['4-5', '5-6'] },
  { id: 'v6', title: 'How Bridges Are Built', youtubeId: 'dQw4w9WgXcQ', category: 'Building', durationSeconds: 390, ageTags: ['4-5', '5-6'] },
];

function formatDuration(seconds: number) {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${m}:${s.toString().padStart(2, '0')}`;
}

export default function MediaLibraryScreen() {
  const theme = useTheme<Theme>();
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const screenTimeUsed = useUIStore((s) => s.screenTimeUsedSeconds);
  const screenTimeLimit = useUIStore((s) => s.screenTimeLimitSeconds);
  const remaining = Math.max(0, screenTimeLimit - screenTimeUsed);
  const remainingMin = Math.floor(remaining / 60);

  const filtered = activeCategory
    ? SEED_VIDEOS.filter((v) => v.category === activeCategory)
    : SEED_VIDEOS;

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: theme.colors.background }}>
      {/* Header */}
      <Box
        flexDirection="row"
        alignItems="center"
        justifyContent="space-between"
        paddingHorizontal="l"
        paddingVertical="m"
        style={{ borderBottomWidth: 1, borderBottomColor: theme.colors.border }}
      >
        <Text variant="heading2">Videos</Text>
        <Box
          flexDirection="row"
          alignItems="center"
          gap="xs"
          style={[styles.timerBadge, { backgroundColor: remaining < 300 ? theme.colors.error + '22' : theme.colors.surface }]}
        >
          <Ionicons
            name="time-outline"
            size={14}
            color={remaining < 300 ? theme.colors.error : theme.colors.textSecondary}
          />
          <Text
            variant="caption"
            style={{ color: remaining < 300 ? theme.colors.error : theme.colors.textSecondary }}
          >
            {remainingMin}m remaining
          </Text>
        </Box>
      </Box>

      <ScrollView>
        {/* Category Pills */}
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.pillsRow}>
          <TouchableOpacity
            style={[
              styles.pill,
              { borderColor: theme.colors.border, backgroundColor: !activeCategory ? theme.colors.primary : theme.colors.cardBackground },
            ]}
            onPress={() => setActiveCategory(null)}
          >
            <Text variant="caption" style={{ color: !activeCategory ? '#fff' : theme.colors.textSecondary }}>
              All
            </Text>
          </TouchableOpacity>
          {CATEGORIES.map((cat) => (
            <TouchableOpacity
              key={cat}
              style={[
                styles.pill,
                {
                  borderColor: theme.colors.border,
                  backgroundColor: activeCategory === cat ? theme.colors.primary : theme.colors.cardBackground,
                },
              ]}
              onPress={() => setActiveCategory(cat === activeCategory ? null : cat)}
            >
              <Text variant="caption" style={{ color: activeCategory === cat ? '#fff' : theme.colors.textSecondary }}>
                {cat}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* Video Grid */}
        <Box padding="m" gap="s">
          {filtered.map((video) => (
            <TouchableOpacity
              key={video.id}
              onPress={() => {}}
              style={[styles.videoCard, { backgroundColor: theme.colors.cardBackground, borderColor: theme.colors.border }]}
            >
              <Box
                width={80}
                height={56}
                borderRadius="s"
                alignItems="center"
                justifyContent="center"
                style={{ backgroundColor: '#1A1A2E' }}
              >
                <Ionicons name="play-circle" size={28} color="#fff" />
              </Box>
              <Box flex={1} gap="xs">
                <Text variant="body">{video.title}</Text>
                <Box flexDirection="row" gap="s" alignItems="center">
                  <Box style={[styles.catBadge, { backgroundColor: theme.colors.primary + '22' }]}>
                    <Text variant="caption" style={{ color: theme.colors.primary }}>{video.category}</Text>
                  </Box>
                  <Text variant="caption" color="textMuted">{formatDuration(video.durationSeconds)}</Text>
                </Box>
              </Box>
              <Ionicons name="chevron-forward" size={18} color={theme.colors.textMuted} />
            </TouchableOpacity>
          ))}
        </Box>

        {/* Screen time notice */}
        {remaining < 600 && (
          <Box
            marginHorizontal="l"
            marginBottom="l"
            padding="m"
            borderRadius="l"
            style={{ backgroundColor: theme.colors.warning + '22', borderWidth: 1, borderColor: theme.colors.warning }}
          >
            <Box flexDirection="row" gap="s" alignItems="center">
              <Ionicons name="warning-outline" size={18} color={theme.colors.warning} />
              <Text variant="bodySmall" style={{ color: theme.colors.warning, flex: 1 }}>
                Screen time ends in {remainingMin} minutes. A 5-min warning will play aloud.
              </Text>
            </Box>
          </Box>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  timerBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
    gap: 4,
  },
  pillsRow: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    gap: 8,
  },
  pill: {
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 20,
    borderWidth: 1,
    marginRight: 6,
  },
  videoCard: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    padding: 12,
    borderRadius: 12,
    borderWidth: 1,
  },
  catBadge: {
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 6,
  },
});

import React, { useState } from 'react';
import { ScrollView, TouchableOpacity, StyleSheet, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme } from '@shopify/restyle';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { Box, Text } from '@/theme/components';
import type { Theme } from '@/theme';
import { useAuth } from '@/lib/AuthContext';
import { useUIStore } from '@/store';
import { BLOCK_TYPE_CONFIG, MOCK_TODAY_BLOCKS } from '@/lib/constants';

const DAYS = ['M', 'T', 'W', 'Th', 'F'];

export default function DashboardScreen() {
  const theme = useTheme<Theme>();
  const { user, familyProfile } = useAuth();
  const enterChildMode = useUIStore((s) => s.enterChildMode);

  const now = new Date();
  const greeting =
    now.getHours() < 12 ? 'Good morning' : now.getHours() < 17 ? 'Good afternoon' : 'Good evening';
  const displayName = user?.user_metadata?.display_name ?? 'Explorer';
  const todayLabel = now.toLocaleDateString('en-US', { weekday: 'long' });

  const [blocks, setBlocks] = useState(MOCK_TODAY_BLOCKS);
  const [expandedBlockId, setExpandedBlockId] = useState<string | null>(null);

  function cycleBlockStatus(blockId: string) {
    setBlocks((prev) =>
      prev.map((b) => {
        if (b.id !== blockId) return b;
        const cycle: Record<string, string> = {
          pending: 'in_progress',
          in_progress: 'completed',
          completed: 'skipped',
          skipped: 'pending',
        };
        return { ...b, status: cycle[b.status] ?? 'pending' };
      }),
    );
  }

  function getStatusIcon(status: string) {
    switch (status) {
      case 'completed': return 'checkmark-circle';
      case 'in_progress': return 'ellipse';
      case 'skipped': return 'close-circle-outline';
      default: return 'ellipse-outline';
    }
  }

  function getStatusColor(status: string) {
    switch (status) {
      case 'completed': return theme.colors.success;
      case 'in_progress': return theme.colors.accent;
      case 'skipped': return theme.colors.textMuted;
      default: return theme.colors.border;
    }
  }

  const todayIdx = (now.getDay() + 6) % 7; // Mon = 0

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: theme.colors.background }}>
      <ScrollView contentContainerStyle={{ paddingBottom: 32 }}>
        {/* Header */}
        <Box
          flexDirection="row"
          justifyContent="space-between"
          alignItems="center"
          paddingHorizontal="l"
          paddingTop="l"
          paddingBottom="m"
        >
          <Box>
            <Text variant="heading2">{greeting}, {displayName}!</Text>
            <Text variant="bodySmall" color="textSecondary">
              {todayLabel} · Adventure Mode
            </Text>
          </Box>
          <Box flexDirection="row" gap="s">
            <TouchableOpacity
              onPress={() => router.push('/settings')}
              style={[styles.iconButton, { backgroundColor: theme.colors.surface }]}
            >
              <Ionicons name="settings-outline" size={20} color={theme.colors.textSecondary} />
            </TouchableOpacity>
          </Box>
        </Box>

        {/* Today's Rhythm */}
        <Box marginHorizontal="l" marginBottom="l">
          <Box flexDirection="row" justifyContent="space-between" alignItems="center" marginBottom="s">
            <Text variant="label" color="textMuted">TODAY'S RHYTHM</Text>
            <TouchableOpacity onPress={() => router.push('/rhythm')}>
              <Text variant="bodySmall" color="primary">Edit</Text>
            </TouchableOpacity>
          </Box>

          <Box
            backgroundColor="cardBackground"
            borderRadius="l"
            overflow="hidden"
            style={{ borderWidth: 1, borderColor: theme.colors.border }}
          >
            {blocks.map((block, idx) => {
              const config = BLOCK_TYPE_CONFIG[block.blockType] ?? BLOCK_TYPE_CONFIG.focus_activity;
              const isExpanded = expandedBlockId === block.id;
              const isActive = block.status === 'in_progress';

              return (
                <Pressable
                  key={block.id}
                  onPress={() => setExpandedBlockId(isExpanded ? null : block.id)}
                  style={[
                    styles.blockRow,
                    { borderBottomColor: theme.colors.border, borderBottomWidth: idx < blocks.length - 1 ? 1 : 0 },
                    isActive && { backgroundColor: theme.colors.accent + '18' },
                  ]}
                >
                  <Box flexDirection="row" alignItems="center" padding="m" gap="sm">
                    <Box
                      width={12}
                      height={12}
                      borderRadius="full"
                      style={{ backgroundColor: block.colorHex }}
                    />
                    <Text variant="body" flex={1}>{block.label}</Text>
                    <Text variant="bodySmall" color="textMuted">{block.durationMinutes}m</Text>
                    <TouchableOpacity onPress={() => cycleBlockStatus(block.id)}>
                      <Ionicons
                        name={getStatusIcon(block.status) as any}
                        size={22}
                        color={getStatusColor(block.status)}
                      />
                    </TouchableOpacity>
                  </Box>

                  {isExpanded && (
                    <Box
                      paddingHorizontal="m"
                      paddingBottom="m"
                      style={{ borderTopWidth: 1, borderTopColor: theme.colors.border }}
                    >
                      <Text variant="bodySmall" color="textSecondary" marginBottom="s">
                        {config.description}
                      </Text>
                      <Box flexDirection="row" gap="s">
                        <TouchableOpacity
                          style={[styles.logButton, { backgroundColor: theme.colors.primary }]}
                          onPress={() => {}}
                        >
                          <Ionicons name="camera-outline" size={16} color="#fff" />
                          <Text variant="caption" color="textOnPrimary"> Photo</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                          style={[styles.logButton, { backgroundColor: theme.colors.primaryLight }]}
                          onPress={() => {}}
                        >
                          <Ionicons name="mic-outline" size={16} color="#fff" />
                          <Text variant="caption" color="textOnPrimary"> Voice</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                          style={[styles.logButton, { backgroundColor: theme.colors.success }]}
                          onPress={() => cycleBlockStatus(block.id)}
                        >
                          <Ionicons name="checkmark-outline" size={16} color="#fff" />
                          <Text variant="caption" color="textOnPrimary"> Done</Text>
                        </TouchableOpacity>
                      </Box>
                    </Box>
                  )}
                </Pressable>
              );
            })}
          </Box>
        </Box>

        {/* Week at a Glance */}
        <Box marginHorizontal="l" marginBottom="l">
          <Text variant="label" color="textMuted" marginBottom="s">WEEK AT A GLANCE</Text>
          <Box
            backgroundColor="cardBackground"
            borderRadius="l"
            padding="m"
            style={{ borderWidth: 1, borderColor: theme.colors.border }}
          >
            <Box flexDirection="row" justifyContent="space-between" marginBottom="m">
              {DAYS.map((day, idx) => (
                <TouchableOpacity key={day} onPress={() => router.push('/journal')}>
                  <Box alignItems="center" gap="xs">
                    <Text variant="caption" color="textMuted">{day}</Text>
                    <Box
                      width={36}
                      height={36}
                      borderRadius="full"
                      alignItems="center"
                      justifyContent="center"
                      style={{
                        backgroundColor:
                          idx < todayIdx
                            ? theme.colors.success + '30'
                            : idx === todayIdx
                            ? theme.colors.primary
                            : theme.colors.surface,
                      }}
                    >
                      <Ionicons
                        name={idx < todayIdx ? 'checkmark' : idx === todayIdx ? 'ellipse' : 'ellipse-outline'}
                        size={16}
                        color={
                          idx <= todayIdx ? (idx === todayIdx ? '#fff' : theme.colors.success) : theme.colors.border
                        }
                      />
                    </Box>
                  </Box>
                </TouchableOpacity>
              ))}
            </Box>
            <Box flexDirection="row" gap="l">
              <Box flexDirection="row" alignItems="center" gap="xs">
                <Ionicons name="leaf-outline" size={14} color={theme.colors.primary} />
                <Text variant="caption" color="textSecondary">3h outdoors</Text>
              </Box>
              <Box flexDirection="row" alignItems="center" gap="xs">
                <Ionicons name="flash-outline" size={14} color={theme.colors.accent} />
                <Text variant="caption" color="textSecondary">4 activities</Text>
              </Box>
            </Box>
          </Box>
        </Box>

        {/* Switch to Child Mode */}
        <Box marginHorizontal="l">
          <TouchableOpacity
            style={[styles.childButton, { backgroundColor: theme.colors.primary }]}
            onPress={() => {
              enterChildMode('child-001');
              router.push('/child');
            }}
          >
            <Ionicons name="person-outline" size={20} color="#fff" />
            <Text variant="button" marginLeft="s">Switch to Ezra's View</Text>
          </TouchableOpacity>
        </Box>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  iconButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  blockRow: {
    width: '100%',
  },
  logButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
    gap: 4,
  },
  childButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    borderRadius: 16,
  },
});

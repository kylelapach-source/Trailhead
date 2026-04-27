import React, { useState } from 'react';
import { ScrollView, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme } from '@shopify/restyle';
import { Ionicons } from '@expo/vector-icons';
import { Box, Text } from '@/theme/components';
import type { Theme } from '@/theme';
import { BLOCK_TYPE_CONFIG, DOMAIN_COLORS, DOMAIN_LABELS, MockBlock } from '@/lib/constants';
import type { BlockType, Domain } from '@/types/database';

const PALETTE_BLOCKS: Array<{ blockType: BlockType; colorHex: string }> = [
  { blockType: 'morning_circle', colorHex: '#2D6A4F' },
  { blockType: 'focus_activity', colorHex: '#48CAE4' },
  { blockType: 'brain_break', colorHex: '#E9C46A' },
  { blockType: 'outdoor_play', colorHex: '#52B788' },
  { blockType: 'storytime', colorHex: '#A8DADC' },
  { blockType: 'free_play', colorHex: '#FF6B6B' },
  { blockType: 'rest', colorHex: '#ADB5BD' },
  { blockType: 'reflection', colorHex: '#9B72CF' },
];

const INITIAL_BLOCKS: MockBlock[] = [
  { id: 'r1', blockType: 'morning_circle', label: 'Morning Circle', durationMinutes: 15, colorHex: '#2D6A4F', status: 'pending' },
  { id: 'r2', blockType: 'focus_activity', label: 'Letter Sound Hunt', durationMinutes: 20, colorHex: '#48CAE4', status: 'pending' },
  { id: 'r3', blockType: 'brain_break', label: 'Brain Break', durationMinutes: 10, colorHex: '#E9C46A', status: 'pending' },
  { id: 'r4', blockType: 'outdoor_play', label: 'Backyard Build', durationMinutes: 30, colorHex: '#52B788', status: 'pending' },
  { id: 'r5', blockType: 'storytime', label: 'Storytime', durationMinutes: 15, colorHex: '#A8DADC', status: 'pending' },
  { id: 'r6', blockType: 'free_play', label: 'Free Outdoor Play', durationMinutes: 45, colorHex: '#FF6B6B', status: 'pending' },
];

function getDomainBreakdown(blocks: MockBlock[]) {
  const totals: Record<string, number> = {};
  let grand = 0;
  for (const b of blocks) {
    const domain = 'literacy'; // simplified — real impl maps block → activity → domain
    totals[domain] = (totals[domain] ?? 0) + b.durationMinutes;
    grand += b.durationMinutes;
  }
  return { totals, grand };
}

export default function RhythmBuilderScreen() {
  const theme = useTheme<Theme>();
  const [blocks, setBlocks] = useState<MockBlock[]>(INITIAL_BLOCKS);
  const [saved, setSaved] = useState(false);

  const totalMinutes = blocks.reduce((s, b) => s + b.durationMinutes, 0);
  const outdoorMinutes = blocks
    .filter((b) => b.blockType === 'outdoor_play' || b.blockType === 'free_play')
    .reduce((s, b) => s + b.durationMinutes, 0);

  function addBlock(blockType: BlockType, colorHex: string) {
    const config = BLOCK_TYPE_CONFIG[blockType];
    const newBlock: MockBlock = {
      id: `r${Date.now()}`,
      blockType,
      label: config.label,
      durationMinutes: 20,
      colorHex,
      status: 'pending',
    };
    setBlocks((prev) => [...prev, newBlock]);
  }

  function removeBlock(id: string) {
    setBlocks((prev) => prev.filter((b) => b.id !== id));
  }

  function moveBlock(id: string, direction: 'up' | 'down') {
    setBlocks((prev) => {
      const idx = prev.findIndex((b) => b.id === id);
      if (idx === -1) return prev;
      const next = [...prev];
      const swap = direction === 'up' ? idx - 1 : idx + 1;
      if (swap < 0 || swap >= next.length) return prev;
      [next[idx], next[swap]] = [next[swap], next[idx]];
      return next;
    });
  }

  function handleSave() {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
    Alert.alert('Synced ✓', 'Your rhythm has been saved.');
  }

  function formatTime(minutes: number) {
    const h = Math.floor(minutes / 60);
    const m = minutes % 60;
    return h > 0 ? `${h}h ${m}min` : `${m}min`;
  }

  const DOMAIN_LIST: Domain[] = ['literacy', 'math_readiness', 'science_nature', 'physical'];

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
        <Text variant="heading2">Tuesday Rhythm</Text>
        <TouchableOpacity
          onPress={handleSave}
          style={[styles.saveBtn, { backgroundColor: theme.colors.primary }]}
        >
          <Text variant="button">{saved ? 'Saved ✓' : 'Save'}</Text>
        </TouchableOpacity>
      </Box>

      <ScrollView contentContainerStyle={{ padding: 16, paddingBottom: 40 }}>
        {/* Block Palette */}
        <Text variant="label" color="textMuted" marginBottom="s">BLOCK PALETTE (tap to add)</Text>
        <Box flexDirection="row" flexWrap="wrap" gap="s" marginBottom="l">
          {PALETTE_BLOCKS.map(({ blockType, colorHex }) => {
            const config = BLOCK_TYPE_CONFIG[blockType];
            return (
              <TouchableOpacity
                key={blockType}
                onPress={() => addBlock(blockType, colorHex)}
                style={[styles.paletteChip, { backgroundColor: colorHex + '22', borderColor: colorHex }]}
              >
                <Text style={{ fontSize: 16 }}>{config.icon}</Text>
                <Text variant="caption" style={{ color: colorHex, fontWeight: '600' }}>
                  {config.label.split(' ')[0]}
                </Text>
              </TouchableOpacity>
            );
          })}
        </Box>

        {/* Rhythm List */}
        <Text variant="label" color="textMuted" marginBottom="s">YOUR RHYTHM</Text>
        <Box
          backgroundColor="cardBackground"
          borderRadius="l"
          overflow="hidden"
          marginBottom="m"
          style={{ borderWidth: 1, borderColor: theme.colors.border }}
        >
          {blocks.map((block, idx) => (
            <Box
              key={block.id}
              flexDirection="row"
              alignItems="center"
              padding="m"
              gap="sm"
              style={{
                borderBottomWidth: idx < blocks.length - 1 ? 1 : 0,
                borderBottomColor: theme.colors.border,
              }}
            >
              <Box
                width={10}
                height={10}
                borderRadius="full"
                style={{ backgroundColor: block.colorHex }}
              />
              <Text variant="body" flex={1}>{block.label}</Text>
              <Text variant="bodySmall" color="textMuted">~{block.durationMinutes}m</Text>

              {/* Reorder controls */}
              <Box flexDirection="row" gap="xs">
                <TouchableOpacity onPress={() => moveBlock(block.id, 'up')} style={styles.controlBtn}>
                  <Ionicons name="chevron-up" size={16} color={theme.colors.textSecondary} />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => moveBlock(block.id, 'down')} style={styles.controlBtn}>
                  <Ionicons name="chevron-down" size={16} color={theme.colors.textSecondary} />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => removeBlock(block.id)} style={styles.controlBtn}>
                  <Ionicons name="close" size={16} color={theme.colors.error} />
                </TouchableOpacity>
              </Box>
            </Box>
          ))}
        </Box>

        {/* Summary */}
        <Box
          backgroundColor="cardBackground"
          borderRadius="l"
          padding="m"
          marginBottom="m"
          style={{ borderWidth: 1, borderColor: theme.colors.border }}
        >
          <Box flexDirection="row" justifyContent="space-between" marginBottom="s">
            <Text variant="bodySmall" color="textSecondary">Total time</Text>
            <Text variant="body">{formatTime(totalMinutes)}</Text>
          </Box>
          <Box flexDirection="row" justifyContent="space-between">
            <Text variant="bodySmall" color="textSecondary">Outdoors</Text>
            <Text variant="body" color="primary">{formatTime(outdoorMinutes)}</Text>
          </Box>
        </Box>

        {/* Domain Balance (simplified visual) */}
        <Text variant="label" color="textMuted" marginBottom="s">DOMAIN BALANCE</Text>
        <Box
          backgroundColor="cardBackground"
          borderRadius="l"
          padding="m"
          style={{ borderWidth: 1, borderColor: theme.colors.border }}
        >
          {DOMAIN_LIST.map((domain) => (
            <Box key={domain} marginBottom="s">
              <Box flexDirection="row" justifyContent="space-between" marginBottom="xs">
                <Text variant="caption" color="textSecondary">{DOMAIN_LABELS[domain]}</Text>
                <Text variant="caption" color="textMuted">—</Text>
              </Box>
              <Box
                height={6}
                borderRadius="full"
                style={{ backgroundColor: theme.colors.border }}
              >
                <Box
                  height={6}
                  borderRadius="full"
                  style={{
                    backgroundColor: DOMAIN_COLORS[domain],
                    width: domain === 'literacy' ? '60%' : domain === 'math_readiness' ? '40%' : domain === 'physical' ? '80%' : '50%',
                  }}
                />
              </Box>
            </Box>
          ))}
        </Box>

        {/* Templates */}
        <Text variant="label" color="textMuted" marginTop="l" marginBottom="s">TEMPLATES</Text>
        {['Balanced Weekday', 'High Energy Day', 'Rainy Day Indoor'].map((t) => (
          <TouchableOpacity
            key={t}
            style={[styles.templateBtn, { borderColor: theme.colors.border, backgroundColor: theme.colors.cardBackground }]}
          >
            <Ionicons name="document-outline" size={16} color={theme.colors.primary} />
            <Text variant="body" color="primary" marginLeft="s">Load: {t}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  saveBtn: {
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 20,
  },
  paletteChip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
  },
  controlBtn: {
    width: 28,
    height: 28,
    alignItems: 'center',
    justifyContent: 'center',
  },
  templateBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 14,
    borderRadius: 12,
    borderWidth: 1,
    marginBottom: 8,
  },
});

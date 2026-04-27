import React, { useEffect, useRef, useState } from 'react';
import { StyleSheet, TouchableOpacity, Animated, Vibration } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme } from '@shopify/restyle';
import { router } from 'expo-router';
import * as Speech from 'expo-speech';
import * as Haptics from 'expo-haptics';
import { Ionicons } from '@expo/vector-icons';
import { Box, Text } from '@/theme/components';
import type { Theme } from '@/theme';
import { useUIStore } from '@/store';
import { MOCK_TODAY_BLOCKS } from '@/lib/constants';

// 4-tap corner sequence to exit child mode
const EXIT_TAP_COUNT = 4;

const BLOCK_BG_COLORS: Record<string, string> = {
  morning_circle: '#2D6A4F22',
  focus_activity: '#48CAE422',
  brain_break: '#E9C46A22',
  outdoor_play: '#52B78822',
  storytime: '#A8DADC22',
  free_play: '#FF6B6B22',
  rest: '#ADB5BD22',
  reflection: '#9B72CF22',
  snack: '#F4A26122',
};

const BLOCK_ICONS: Record<string, string> = {
  morning_circle: '🌅',
  focus_activity: '🔵',
  brain_break: '⚡',
  outdoor_play: '🌿',
  storytime: '📖',
  free_play: '🎲',
  rest: '😴',
  reflection: '💭',
  snack: '🍎',
};

export default function ChildViewScreen() {
  const theme = useTheme<Theme>();
  const exitChildMode = useUIStore((s) => s.exitChildMode);
  const activeChildId = useUIStore((s) => s.activeChildId);

  const [currentBlockIdx, setCurrentBlockIdx] = useState(0);
  const [completedIds, setCompletedIds] = useState<Set<string>>(new Set());
  const [cornerTaps, setCornerTaps] = useState(0);
  const [showConfetti, setShowConfetti] = useState(false);
  const bounceAnim = useRef(new Animated.Value(1)).current;

  const pendingBlocks = MOCK_TODAY_BLOCKS.filter((b) => !completedIds.has(b.id));
  const currentBlock = pendingBlocks[0] ?? MOCK_TODAY_BLOCKS[MOCK_TODAY_BLOCKS.length - 1];
  const bgColor = BLOCK_BG_COLORS[currentBlock.blockType] ?? '#FEFAE022';

  useEffect(() => {
    speakCurrentBlock();
    return () => Speech.stop();
  }, [currentBlock.id]);

  function speakCurrentBlock() {
    const text = `Time for the ${currentBlock.label}! Are you ready?`;
    Speech.speak(text, { rate: 0.85, pitch: 1.1 });
  }

  function handleDidIt() {
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    setShowConfetti(true);

    Animated.sequence([
      Animated.spring(bounceAnim, { toValue: 1.15, useNativeDriver: true }),
      Animated.spring(bounceAnim, { toValue: 1, useNativeDriver: true }),
    ]).start();

    setTimeout(() => {
      setCompletedIds((prev) => new Set([...prev, currentBlock.id]));
      setShowConfetti(false);
    }, 1200);
  }

  function handleCornerTap() {
    const next = cornerTaps + 1;
    setCornerTaps(next);
    if (next >= EXIT_TAP_COUNT) {
      setCornerTaps(0);
      exitChildMode();
      router.replace('/(parent)');
    } else {
      setTimeout(() => setCornerTaps(0), 3000);
    }
  }

  const doneFrac = completedIds.size / MOCK_TODAY_BLOCKS.length;

  if (pendingBlocks.length === 0) {
    return (
      <SafeAreaView style={[styles.root, { backgroundColor: theme.colors.success + '22' }]}>
        <Box flex={1} alignItems="center" justifyContent="center" padding="xl">
          <Text style={{ fontSize: 80 }}>🎉</Text>
          <Text variant="childDisplay" style={{ textAlign: 'center' }} marginTop="l">
            All done today!
          </Text>
          <Text variant="childBody" style={{ textAlign: 'center', color: theme.colors.textSecondary }} marginTop="m">
            You did an amazing job!
          </Text>
          <TouchableOpacity
            style={{ position: 'absolute', top: 16, right: 16, width: 44, height: 44 }}
            onPress={handleCornerTap}
          />
        </Box>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={[styles.root, { backgroundColor: bgColor }]}>
      {/* Hidden exit tap zone — top-right corner */}
      <TouchableOpacity
        style={styles.cornerTap}
        onPress={handleCornerTap}
        activeOpacity={1}
      />

      {/* Progress dots */}
      <Box flexDirection="row" justifyContent="center" gap="s" paddingTop="m" paddingBottom="s">
        {MOCK_TODAY_BLOCKS.map((b) => (
          <Box
            key={b.id}
            width={completedIds.has(b.id) ? 24 : 10}
            height={10}
            borderRadius="full"
            style={{
              backgroundColor: completedIds.has(b.id)
                ? theme.colors.success
                : b.id === currentBlock.id
                ? theme.colors.primary
                : theme.colors.border,
              transition: 'width 0.3s',
            }}
          />
        ))}
      </Box>

      {/* Child name */}
      <Box alignItems="center" paddingVertical="m">
        <Text variant="heading2" color="textSecondary">EZRA'S DAY 🦕</Text>
      </Box>

      {/* Activity Card */}
      <Box flex={1} marginHorizontal="l" marginBottom="l">
        <Box
          flex={1}
          backgroundColor="cardBackground"
          borderRadius="xxl"
          alignItems="center"
          justifyContent="center"
          padding="xl"
          style={{ borderWidth: 2, borderColor: currentBlock.colorHex }}
        >
          <Text style={{ fontSize: 72 }}>{BLOCK_ICONS[currentBlock.blockType] ?? '⭐'}</Text>
          <Text
            variant="childDisplay"
            style={{ textAlign: 'center' }}
            marginTop="l"
            marginBottom="m"
          >
            {currentBlock.label}
          </Text>
          <Text
            variant="childBody"
            style={{ textAlign: 'center', color: theme.colors.textSecondary }}
          >
            ~{currentBlock.durationMinutes} minutes
          </Text>
        </Box>
      </Box>

      {/* I DID IT button */}
      <Box marginHorizontal="l" marginBottom="m">
        <Animated.View style={{ transform: [{ scale: bounceAnim }] }}>
          <TouchableOpacity
            style={[styles.didItButton, { backgroundColor: theme.colors.success }]}
            onPress={handleDidIt}
            activeOpacity={0.85}
          >
            <Text style={styles.didItText}>✅ I DID IT!</Text>
          </TouchableOpacity>
        </Animated.View>
      </Box>

      {/* Secondary actions */}
      <Box flexDirection="row" gap="m" marginHorizontal="l" marginBottom="xl">
        <TouchableOpacity
          style={[styles.secondaryBtn, { borderColor: theme.colors.primary, flex: 1 }]}
          onPress={() => router.push('/media')}
        >
          <Ionicons name="play-circle-outline" size={22} color={theme.colors.primary} />
          <Text variant="body" color="primary" marginLeft="s">Watch a Video</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.secondaryBtn, { borderColor: theme.colors.highlight, flex: 1 }]}
          onPress={speakCurrentBlock}
        >
          <Ionicons name="volume-high-outline" size={22} color={theme.colors.highlight} />
          <Text variant="body" style={{ color: theme.colors.highlight }} marginLeft="s">Read to Me</Text>
        </TouchableOpacity>
      </Box>

      {/* Audio prompt strip */}
      <Box
        marginHorizontal="l"
        marginBottom="l"
        padding="m"
        borderRadius="l"
        style={{ backgroundColor: theme.colors.cardBackground + 'CC' }}
      >
        <Text variant="bodySmall" color="textSecondary" style={{ fontStyle: 'italic' }}>
          🔊 "Time for the {currentBlock.label}! Are you ready?"
        </Text>
      </Box>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  cornerTap: {
    position: 'absolute',
    top: 0,
    right: 0,
    width: 60,
    height: 60,
    zIndex: 100,
  },
  didItButton: {
    paddingVertical: 22,
    borderRadius: 24,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 6,
  },
  didItText: {
    fontSize: 28,
    fontWeight: '800',
    color: '#fff',
    letterSpacing: 1,
  },
  secondaryBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 14,
    borderRadius: 16,
    borderWidth: 2,
  },
});

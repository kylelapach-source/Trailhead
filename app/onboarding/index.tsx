import React, { useRef, useState } from 'react';
import { FlatList, TouchableOpacity, StyleSheet, Dimensions, ViewToken } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme } from '@shopify/restyle';
import { router } from 'expo-router';
import { Box, Text } from '@/theme/components';
import type { Theme } from '@/theme';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

const SLIDES = [
  {
    key: '1',
    emoji: '🌲',
    title: 'Welcome to Trailhead',
    body: 'A calm, joyful home learning life — built on rhythms, not rigid schedules.',
  },
  {
    key: '2',
    emoji: '🗓️',
    title: 'Build your rhythm',
    body: 'Drag and drop blocks to design a daily flow that works for your family.',
  },
  {
    key: '3',
    emoji: '📖',
    title: 'Log every adventure',
    body: 'Capture photos, voice memos, and quick notes to build a beautiful portfolio.',
  },
  {
    key: '4',
    emoji: '🧒',
    title: "Ezra's own view",
    body: 'A giant, picture-first mode your child can use semi-independently.',
  },
];

export default function OnboardingScreen() {
  const theme = useTheme<Theme>();
  const [activeIdx, setActiveIdx] = useState(0);
  const listRef = useRef<FlatList>(null);

  function handleNext() {
    if (activeIdx < SLIDES.length - 1) {
      listRef.current?.scrollToIndex({ index: activeIdx + 1, animated: true });
    } else {
      router.replace('/(parent)');
    }
  }

  const onViewableItemsChanged = useRef(({ viewableItems }: { viewableItems: ViewToken[] }) => {
    if (viewableItems[0]) {
      setActiveIdx(viewableItems[0].index ?? 0);
    }
  });

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: theme.colors.background }}>
      <FlatList
        ref={listRef}
        data={SLIDES}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item) => item.key}
        onViewableItemsChanged={onViewableItemsChanged.current}
        viewabilityConfig={{ itemVisiblePercentThreshold: 50 }}
        renderItem={({ item }) => (
          <Box
            width={SCREEN_WIDTH}
            flex={1}
            alignItems="center"
            justifyContent="center"
            padding="xl"
          >
            <Text style={{ fontSize: 80 }}>{item.emoji}</Text>
            <Text variant="displayMedium" style={{ textAlign: 'center' }} marginTop="l" marginBottom="m">
              {item.title}
            </Text>
            <Text variant="body" color="textSecondary" style={{ textAlign: 'center' }}>
              {item.body}
            </Text>
          </Box>
        )}
      />

      {/* Dot indicators */}
      <Box flexDirection="row" justifyContent="center" gap="s" marginBottom="l">
        {SLIDES.map((_, idx) => (
          <Box
            key={idx}
            width={idx === activeIdx ? 24 : 8}
            height={8}
            borderRadius="full"
            style={{
              backgroundColor: idx === activeIdx ? theme.colors.primary : theme.colors.border,
            }}
          />
        ))}
      </Box>

      <Box marginHorizontal="l" marginBottom="l">
        <TouchableOpacity
          onPress={handleNext}
          style={[styles.nextBtn, { backgroundColor: theme.colors.primary }]}
        >
          <Text variant="button">
            {activeIdx < SLIDES.length - 1 ? 'Next' : 'Start exploring!'}
          </Text>
        </TouchableOpacity>
        {activeIdx < SLIDES.length - 1 && (
          <TouchableOpacity
            onPress={() => router.replace('/(parent)')}
            style={styles.skipBtn}
          >
            <Text variant="body" color="textMuted">Skip</Text>
          </TouchableOpacity>
        )}
      </Box>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  nextBtn: {
    paddingVertical: 16,
    borderRadius: 16,
    alignItems: 'center',
  },
  skipBtn: {
    alignItems: 'center',
    paddingVertical: 12,
  },
});

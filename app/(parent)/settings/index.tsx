import React from 'react';
import { ScrollView, TouchableOpacity, StyleSheet, Switch } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme } from '@shopify/restyle';
import { Ionicons } from '@expo/vector-icons';
import { Box, Text } from '@/theme/components';
import type { Theme } from '@/theme';
import { useAuth } from '@/lib/AuthContext';
import { useUIStore } from '@/store';

type SchemeOption = { label: string; value: 'light' | 'dark' | 'system' };
const SCHEME_OPTIONS: SchemeOption[] = [
  { label: 'Light', value: 'light' },
  { label: 'Dark', value: 'dark' },
  { label: 'System', value: 'system' },
];

const SCREEN_TIME_OPTIONS = [10, 15, 20, 30, 45, 60];

export default function SettingsScreen() {
  const theme = useTheme<Theme>();
  const { user, familyProfile, signOut } = useAuth();
  const colorScheme = useUIStore((s) => s.colorScheme);
  const setColorScheme = useUIStore((s) => s.setColorScheme);
  const screenTimeLimit = useUIStore((s) => s.screenTimeLimitSeconds);
  const setScreenTimeLimit = useUIStore((s) => s.setScreenTimeLimit);

  const screenTimeLimitMinutes = Math.floor(screenTimeLimit / 60);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: theme.colors.background }}>
      <Box
        paddingHorizontal="l"
        paddingVertical="m"
        style={{ borderBottomWidth: 1, borderBottomColor: theme.colors.border }}
      >
        <Text variant="heading2">Settings</Text>
      </Box>

      <ScrollView contentContainerStyle={{ padding: 16, paddingBottom: 40 }}>
        {/* Family Section */}
        <Text variant="label" color="textMuted" marginBottom="s">FAMILY</Text>
        <Box
          backgroundColor="cardBackground"
          borderRadius="l"
          marginBottom="l"
          overflow="hidden"
          style={{ borderWidth: 1, borderColor: theme.colors.border }}
        >
          <Box padding="m" style={{ borderBottomWidth: 1, borderBottomColor: theme.colors.border }}>
            <Text variant="bodySmall" color="textMuted">Family name</Text>
            <Text variant="body">{familyProfile?.name ?? '—'}</Text>
          </Box>
          <Box padding="m">
            <Text variant="bodySmall" color="textMuted">Signed in as</Text>
            <Text variant="body">{user?.email ?? '—'}</Text>
          </Box>
        </Box>

        {/* Appearance */}
        <Text variant="label" color="textMuted" marginBottom="s">APPEARANCE</Text>
        <Box
          backgroundColor="cardBackground"
          borderRadius="l"
          marginBottom="l"
          padding="m"
          style={{ borderWidth: 1, borderColor: theme.colors.border }}
        >
          <Text variant="bodySmall" color="textMuted" marginBottom="s">Theme</Text>
          <Box flexDirection="row" gap="s">
            {SCHEME_OPTIONS.map((opt) => (
              <TouchableOpacity
                key={opt.value}
                onPress={() => setColorScheme(opt.value)}
                style={[
                  styles.themeBtn,
                  {
                    backgroundColor: colorScheme === opt.value ? theme.colors.primary : theme.colors.surface,
                    borderColor: colorScheme === opt.value ? theme.colors.primary : theme.colors.border,
                  },
                ]}
              >
                <Text
                  variant="caption"
                  style={{ color: colorScheme === opt.value ? '#fff' : theme.colors.textSecondary, fontWeight: '600' }}
                >
                  {opt.label}
                </Text>
              </TouchableOpacity>
            ))}
          </Box>
        </Box>

        {/* Screen Time */}
        <Text variant="label" color="textMuted" marginBottom="s">SCREEN TIME</Text>
        <Box
          backgroundColor="cardBackground"
          borderRadius="l"
          marginBottom="l"
          padding="m"
          style={{ borderWidth: 1, borderColor: theme.colors.border }}
        >
          <Text variant="bodySmall" color="textMuted" marginBottom="s">
            Daily limit: {screenTimeLimitMinutes} minutes
          </Text>
          <Box flexDirection="row" flexWrap="wrap" gap="s">
            {SCREEN_TIME_OPTIONS.map((min) => (
              <TouchableOpacity
                key={min}
                onPress={() => setScreenTimeLimit(min)}
                style={[
                  styles.themeBtn,
                  {
                    backgroundColor: screenTimeLimitMinutes === min ? theme.colors.primary : theme.colors.surface,
                    borderColor: screenTimeLimitMinutes === min ? theme.colors.primary : theme.colors.border,
                  },
                ]}
              >
                <Text
                  variant="caption"
                  style={{
                    color: screenTimeLimitMinutes === min ? '#fff' : theme.colors.textSecondary,
                    fontWeight: '600',
                  }}
                >
                  {min}m
                </Text>
              </TouchableOpacity>
            ))}
          </Box>
        </Box>

        {/* Notifications */}
        <Text variant="label" color="textMuted" marginBottom="s">NOTIFICATIONS</Text>
        <Box
          backgroundColor="cardBackground"
          borderRadius="l"
          marginBottom="l"
          style={{ borderWidth: 1, borderColor: theme.colors.border }}
        >
          {[
            { label: 'Morning rhythm reminder', sublabel: '8:00 AM daily' },
            { label: 'Weekly journal summary', sublabel: 'Sunday evenings' },
            { label: 'Sync alerts', sublabel: 'When offline changes sync' },
          ].map((item, idx, arr) => (
            <Box
              key={item.label}
              flexDirection="row"
              alignItems="center"
              padding="m"
              style={{ borderBottomWidth: idx < arr.length - 1 ? 1 : 0, borderBottomColor: theme.colors.border }}
            >
              <Box flex={1}>
                <Text variant="body">{item.label}</Text>
                <Text variant="caption" color="textMuted">{item.sublabel}</Text>
              </Box>
              <Switch
                value={true}
                onValueChange={() => {}}
                trackColor={{ false: theme.colors.border, true: theme.colors.primary }}
                thumbColor="#fff"
              />
            </Box>
          ))}
        </Box>

        {/* Sign Out */}
        <TouchableOpacity
          onPress={signOut}
          style={[styles.signOutBtn, { borderColor: theme.colors.error }]}
        >
          <Ionicons name="log-out-outline" size={18} color={theme.colors.error} />
          <Text variant="body" style={{ color: theme.colors.error }} marginLeft="s">Sign out</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  themeBtn: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
  },
  signOutBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 14,
    borderRadius: 12,
    borderWidth: 1,
  },
});

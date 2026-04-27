import React, { useState } from 'react';
import { ScrollView, TouchableOpacity, TextInput, StyleSheet, Alert, KeyboardAvoidingView, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme } from '@shopify/restyle';
import { router } from 'expo-router';
import { Box, Text } from '@/theme/components';
import type { Theme } from '@/theme';
import { useAuth } from '@/lib/AuthContext';

export default function LoginScreen() {
  const theme = useTheme<Theme>();
  const { signIn } = useAuth();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleLogin() {
    if (!email || !password) {
      Alert.alert('Missing fields', 'Please enter your email and password.');
      return;
    }
    setLoading(true);
    try {
      await signIn(email.trim().toLowerCase(), password);
    } catch (err: any) {
      Alert.alert('Login failed', err?.message ?? 'Please check your credentials and try again.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: theme.colors.background }}>
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={{ flex: 1 }}>
        <ScrollView contentContainerStyle={styles.container}>
          {/* Logo / Hero */}
          <Box alignItems="center" marginBottom="xxl">
            <Text style={{ fontSize: 64 }}>🌲</Text>
            <Text variant="displayMedium" style={{ textAlign: 'center' }}>Trailhead</Text>
            <Text variant="body" color="textSecondary" style={{ textAlign: 'center' }} marginTop="s">
              Every day starts at the trailhead.
            </Text>
          </Box>

          {/* Form */}
          <Box gap="m">
            <Box>
              <Text variant="label" color="textMuted" marginBottom="xs">EMAIL</Text>
              <TextInput
                value={email}
                onChangeText={setEmail}
                autoCapitalize="none"
                keyboardType="email-address"
                returnKeyType="next"
                placeholder="you@family.com"
                placeholderTextColor={theme.colors.textMuted}
                style={[
                  styles.input,
                  {
                    backgroundColor: theme.colors.cardBackground,
                    borderColor: theme.colors.border,
                    color: theme.colors.textPrimary,
                  },
                ]}
              />
            </Box>

            <Box>
              <Text variant="label" color="textMuted" marginBottom="xs">PASSWORD</Text>
              <TextInput
                value={password}
                onChangeText={setPassword}
                secureTextEntry
                returnKeyType="done"
                onSubmitEditing={handleLogin}
                placeholder="••••••••"
                placeholderTextColor={theme.colors.textMuted}
                style={[
                  styles.input,
                  {
                    backgroundColor: theme.colors.cardBackground,
                    borderColor: theme.colors.border,
                    color: theme.colors.textPrimary,
                  },
                ]}
              />
            </Box>

            <TouchableOpacity
              onPress={handleLogin}
              disabled={loading}
              style={[styles.primaryBtn, { backgroundColor: theme.colors.primary, opacity: loading ? 0.7 : 1 }]}
            >
              <Text variant="button">{loading ? 'Signing in...' : 'Sign In'}</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => router.push('/auth/signup')} style={styles.linkBtn}>
              <Text variant="body" color="textSecondary">
                New family?{' '}
                <Text variant="body" color="primary">Create account</Text>
              </Text>
            </TouchableOpacity>
          </Box>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    padding: 24,
  },
  input: {
    borderWidth: 1,
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 14,
    fontSize: 16,
    fontFamily: 'Nunito-Regular',
  },
  primaryBtn: {
    paddingVertical: 16,
    borderRadius: 16,
    alignItems: 'center',
    marginTop: 8,
  },
  linkBtn: {
    alignItems: 'center',
    paddingVertical: 8,
  },
});

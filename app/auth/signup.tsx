import React, { useState } from 'react';
import { ScrollView, TouchableOpacity, TextInput, StyleSheet, Alert, KeyboardAvoidingView, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme } from '@shopify/restyle';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { Box, Text } from '@/theme/components';
import type { Theme } from '@/theme';
import { useAuth } from '@/lib/AuthContext';
import { supabase } from '@/lib/supabase';

export default function SignupScreen() {
  const theme = useTheme<Theme>();
  const { signUp } = useAuth();

  const [displayName, setDisplayName] = useState('');
  const [familyName, setFamilyName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleSignup() {
    if (!displayName || !familyName || !email || !password) {
      Alert.alert('Missing fields', 'Please fill in all fields.');
      return;
    }
    if (password.length < 8) {
      Alert.alert('Weak password', 'Password must be at least 8 characters.');
      return;
    }
    setLoading(true);
    try {
      await signUp(email.trim().toLowerCase(), password, displayName.trim());
      // Create the family record after signup
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        const { data: family } = await supabase
          .from('families')
          .insert({ name: familyName.trim(), timezone: 'America/Chicago', locale: 'en-US', settings: {} })
          .select()
          .single();

        if (family) {
          await supabase
            .from('users')
            .insert({
              id: user.id,
              family_id: family.id,
              email: user.email!,
              display_name: displayName.trim(),
              role: 'parent',
            });
        }
      }
      router.replace('/onboarding');
    } catch (err: any) {
      Alert.alert('Sign up failed', err?.message ?? 'Please try again.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: theme.colors.background }}>
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={{ flex: 1 }}>
        <ScrollView contentContainerStyle={styles.container}>
          <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
            <Ionicons name="arrow-back" size={24} color={theme.colors.textSecondary} />
          </TouchableOpacity>

          <Text variant="displayMedium" marginBottom="s">Create your{'\n'}family account</Text>
          <Text variant="body" color="textSecondary" marginBottom="xl">
            Start your home learning adventure today.
          </Text>

          <Box gap="m">
            {[
              { label: 'YOUR NAME', value: displayName, set: setDisplayName, placeholder: 'e.g. Kyle', autoCapitalize: 'words' as const },
              { label: 'FAMILY NAME', value: familyName, set: setFamilyName, placeholder: 'e.g. The LaPach Family', autoCapitalize: 'words' as const },
              { label: 'EMAIL', value: email, set: setEmail, placeholder: 'you@family.com', autoCapitalize: 'none' as const, keyboard: 'email-address' as const },
              { label: 'PASSWORD', value: password, set: setPassword, placeholder: '8+ characters', secure: true },
            ].map((field) => (
              <Box key={field.label}>
                <Text variant="label" color="textMuted" marginBottom="xs">{field.label}</Text>
                <TextInput
                  value={field.value}
                  onChangeText={field.set}
                  autoCapitalize={field.autoCapitalize ?? 'none'}
                  keyboardType={field.keyboard ?? 'default'}
                  secureTextEntry={field.secure}
                  placeholder={field.placeholder}
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
            ))}

            <TouchableOpacity
              onPress={handleSignup}
              disabled={loading}
              style={[styles.primaryBtn, { backgroundColor: theme.colors.primary, opacity: loading ? 0.7 : 1 }]}
            >
              <Text variant="button">{loading ? 'Creating account...' : 'Create Family Account'}</Text>
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
    padding: 24,
    paddingTop: 12,
  },
  backBtn: {
    marginBottom: 16,
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
});

import { useEffect } from 'react';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { ThemeProvider } from '@shopify/restyle';
import { useColorScheme } from 'react-native';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import theme, { darkTheme } from '@/theme';
import { AuthProvider, useAuth } from '@/lib/AuthContext';
import { hydrateUIStore, useUIStore } from '@/store';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 minutes
      retry: 2,
    },
  },
});

function RootNavigator() {
  const { session, isLoading } = useAuth();
  const systemScheme = useColorScheme();
  const colorScheme = useUIStore((s) => s.colorScheme);

  const resolvedScheme = colorScheme === 'system' ? systemScheme : colorScheme;
  const activeTheme = resolvedScheme === 'dark' ? darkTheme : theme;

  if (isLoading) return null;

  return (
    <ThemeProvider theme={activeTheme}>
      <StatusBar style={resolvedScheme === 'dark' ? 'light' : 'dark'} />
      <Stack screenOptions={{ headerShown: false }}>
        {!session ? (
          <>
            <Stack.Screen name="auth/index" />
            <Stack.Screen name="auth/signup" />
            <Stack.Screen name="onboarding/index" />
          </>
        ) : (
          <>
            <Stack.Screen name="(parent)" />
            <Stack.Screen name="child/index" options={{ gestureEnabled: false }} />
          </>
        )}
      </Stack>
    </ThemeProvider>
  );
}

export default function RootLayout() {
  useEffect(() => {
    hydrateUIStore();
  }, []);

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <RootNavigator />
        </AuthProvider>
      </QueryClientProvider>
    </GestureHandlerRootView>
  );
}

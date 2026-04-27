import { create } from 'zustand';
import * as SecureStore from 'expo-secure-store';
import { Platform } from 'react-native';

type ColorScheme = 'light' | 'dark' | 'system';

interface UIState {
  colorScheme: ColorScheme;
  isChildMode: boolean;
  activeChildId: string | null;
  screenTimeUsedSeconds: number;
  screenTimeLimitSeconds: number;
  isSyncing: boolean;
  lastSyncedAt: Date | null;

  setColorScheme: (scheme: ColorScheme) => void;
  enterChildMode: (childId: string) => void;
  exitChildMode: () => void;
  addScreenTimeSeconds: (seconds: number) => void;
  resetScreenTimeToday: () => void;
  setScreenTimeLimit: (minutes: number) => void;
  setSyncing: (syncing: boolean) => void;
  setSyncedAt: (date: Date) => void;
}

const STORAGE_KEYS = {
  colorScheme: 'trailhead_color_scheme',
  screenTimeLimit: 'trailhead_screen_time_limit',
  screenTimeUsed: 'trailhead_screen_time_used',
  screenTimeDate: 'trailhead_screen_time_date',
};

async function getStored(key: string): Promise<string | null> {
  if (Platform.OS === 'web') return localStorage.getItem(key);
  return SecureStore.getItemAsync(key);
}

async function setStored(key: string, value: string): Promise<void> {
  if (Platform.OS === 'web') {
    localStorage.setItem(key, value);
    return;
  }
  return SecureStore.setItemAsync(key, value);
}

export const useUIStore = create<UIState>((set, get) => ({
  colorScheme: 'system',
  isChildMode: false,
  activeChildId: null,
  screenTimeUsedSeconds: 0,
  screenTimeLimitSeconds: 20 * 60, // 20 min default
  isSyncing: false,
  lastSyncedAt: null,

  setColorScheme: (scheme) => {
    set({ colorScheme: scheme });
    setStored(STORAGE_KEYS.colorScheme, scheme);
  },

  enterChildMode: (childId) => set({ isChildMode: true, activeChildId: childId }),

  exitChildMode: () => set({ isChildMode: false, activeChildId: null }),

  addScreenTimeSeconds: (seconds) => {
    const next = get().screenTimeUsedSeconds + seconds;
    set({ screenTimeUsedSeconds: next });
    setStored(STORAGE_KEYS.screenTimeUsed, String(next));
    setStored(STORAGE_KEYS.screenTimeDate, new Date().toISOString().split('T')[0]);
  },

  resetScreenTimeToday: () => {
    set({ screenTimeUsedSeconds: 0 });
    setStored(STORAGE_KEYS.screenTimeUsed, '0');
    setStored(STORAGE_KEYS.screenTimeDate, new Date().toISOString().split('T')[0]);
  },

  setScreenTimeLimit: (minutes) => {
    const seconds = minutes * 60;
    set({ screenTimeLimitSeconds: seconds });
    setStored(STORAGE_KEYS.screenTimeLimit, String(seconds));
  },

  setSyncing: (syncing) => set({ isSyncing: syncing }),

  setSyncedAt: (date) => set({ lastSyncedAt: date }),
}));

export async function hydrateUIStore() {
  const [scheme, limitStr, usedStr, dateStr] = await Promise.all([
    getStored(STORAGE_KEYS.colorScheme),
    getStored(STORAGE_KEYS.screenTimeLimit),
    getStored(STORAGE_KEYS.screenTimeUsed),
    getStored(STORAGE_KEYS.screenTimeDate),
  ]);

  const today = new Date().toISOString().split('T')[0];
  const isToday = dateStr === today;

  useUIStore.setState({
    colorScheme: (scheme as ColorScheme) ?? 'system',
    screenTimeLimitSeconds: limitStr ? parseInt(limitStr, 10) : 20 * 60,
    screenTimeUsedSeconds: isToday && usedStr ? parseInt(usedStr, 10) : 0,
  });
}

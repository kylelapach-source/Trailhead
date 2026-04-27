import React, { createContext, useContext, useEffect, useState } from 'react';
import type { Session, User } from '@supabase/supabase-js';
import { supabase } from './supabase';

interface FamilyProfile {
  id: string;
  name: string;
  timezone: string;
  locale: string;
}

interface AuthContextValue {
  session: Session | null;
  user: User | null;
  familyProfile: FamilyProfile | null;
  isLoading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string, displayName: string) => Promise<void>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [session, setSession] = useState<Session | null>(null);
  const [familyProfile, setFamilyProfile] = useState<FamilyProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      if (session) loadFamilyProfile(session.user.id);
      setIsLoading(false);
    });

    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      if (session) {
        loadFamilyProfile(session.user.id);
      } else {
        setFamilyProfile(null);
      }
    });

    return () => listener.subscription.unsubscribe();
  }, []);

  async function loadFamilyProfile(userId: string) {
    const { data: userRow } = await supabase
      .from('users')
      .select('family_id')
      .eq('id', userId)
      .single();

    if (!userRow?.family_id) return;

    const { data: fam } = await supabase
      .from('families')
      .select('id, name, timezone, locale')
      .eq('id', userRow.family_id)
      .single();

    if (fam) setFamilyProfile(fam);
  }

  async function signIn(email: string, password: string) {
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) throw error;
  }

  async function signUp(email: string, password: string, displayName: string) {
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: { data: { display_name: displayName } },
    });
    if (error) throw error;
  }

  async function signOut() {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
  }

  return (
    <AuthContext.Provider
      value={{
        session,
        user: session?.user ?? null,
        familyProfile,
        isLoading,
        signIn,
        signUp,
        signOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}

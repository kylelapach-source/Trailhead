// Auto-generated types mirroring the Supabase PostgreSQL schema.
// Regenerate with: npx supabase gen types typescript --project-id <id> > src/types/database.ts

export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[];

export type Domain =
  | 'literacy'
  | 'math_readiness'
  | 'science_nature'
  | 'physical'
  | 'social_emotional'
  | 'creative_arts';

export type BlockType =
  | 'morning_circle'
  | 'focus_activity'
  | 'brain_break'
  | 'outdoor_play'
  | 'storytime'
  | 'snack'
  | 'rest'
  | 'reflection'
  | 'free_play';

export type Zone =
  | 'indoor_quiet'
  | 'indoor_active'
  | 'backyard'
  | 'front_yard'
  | 'kitchen'
  | 'garage_workshop'
  | 'community'
  | 'vehicle';

export type LogStatus = 'completed' | 'skipped' | 'in_progress' | 'partial';

export interface Database {
  public: {
    Tables: {
      families: {
        Row: {
          id: string;
          name: string;
          timezone: string;
          locale: string;
          settings: Json;
          created_at: string;
        };
        Insert: Omit<Database['public']['Tables']['families']['Row'], 'id' | 'created_at'> & {
          id?: string;
          created_at?: string;
        };
        Update: Partial<Database['public']['Tables']['families']['Insert']>;
      };
      users: {
        Row: {
          id: string;
          family_id: string;
          email: string;
          display_name: string;
          role: 'parent' | 'guardian';
          avatar_url: string | null;
          created_at: string;
        };
        Insert: Omit<Database['public']['Tables']['users']['Row'], 'created_at'> & {
          created_at?: string;
        };
        Update: Partial<Database['public']['Tables']['users']['Insert']>;
      };
      children: {
        Row: {
          id: string;
          family_id: string;
          name: string;
          birthdate: string;
          avatar_url: string | null;
          interests: string[];
          created_at: string;
        };
        Insert: Omit<Database['public']['Tables']['children']['Row'], 'id' | 'created_at'> & {
          id?: string;
          created_at?: string;
        };
        Update: Partial<Database['public']['Tables']['children']['Insert']>;
      };
      rhythms: {
        Row: {
          id: string;
          family_id: string | null;
          name: string;
          description: string | null;
          day_type: string;
          is_active: boolean;
          is_template: boolean;
          sort_order: number;
          created_at: string;
          updated_at: string;
        };
        Insert: Omit<Database['public']['Tables']['rhythms']['Row'], 'id' | 'created_at' | 'updated_at'> & {
          id?: string;
          created_at?: string;
          updated_at?: string;
        };
        Update: Partial<Database['public']['Tables']['rhythms']['Insert']>;
      };
      rhythm_blocks: {
        Row: {
          id: string;
          rhythm_id: string;
          activity_id: string | null;
          block_type: BlockType;
          label: string;
          duration_minutes: number;
          position: number;
          color_hex: string;
          domain: Domain;
          zone: Zone;
          is_optional: boolean;
          created_at: string;
        };
        Insert: Omit<Database['public']['Tables']['rhythm_blocks']['Row'], 'id' | 'created_at'> & {
          id?: string;
          created_at?: string;
        };
        Update: Partial<Database['public']['Tables']['rhythm_blocks']['Insert']>;
      };
      activities: {
        Row: {
          id: string;
          family_id: string | null;
          title: string;
          description: string;
          domain: Domain;
          age_tags: string[];
          supply_list: string[];
          zone_suggestion: Zone;
          is_seed_data: boolean;
          difficulty: 'easy' | 'medium' | 'hard';
          tulsa_location: Json | null;
          created_at: string;
          updated_at: string;
        };
        Insert: Omit<Database['public']['Tables']['activities']['Row'], 'id' | 'created_at' | 'updated_at'> & {
          id?: string;
          created_at?: string;
          updated_at?: string;
        };
        Update: Partial<Database['public']['Tables']['activities']['Insert']>;
      };
      logs: {
        Row: {
          id: string;
          family_id: string;
          child_id: string;
          rhythm_block_id: string | null;
          activity_id: string | null;
          logged_by: string;
          log_date: string;
          status: LogStatus;
          note_text: string | null;
          photo_urls: string[];
          audio_url: string | null;
          duration_actual_minutes: number | null;
          mood_tags: Json;
          created_at: string;
        };
        Insert: Omit<Database['public']['Tables']['logs']['Row'], 'id' | 'created_at'> & {
          id?: string;
          created_at?: string;
        };
        Update: Partial<Database['public']['Tables']['logs']['Insert']>;
      };
      media_items: {
        Row: {
          id: string;
          title: string;
          youtube_id: string;
          category: string;
          duration_seconds: number;
          age_tags: string[];
          is_curated: boolean;
          play_count: number;
          created_at: string;
        };
        Insert: Omit<Database['public']['Tables']['media_items']['Row'], 'id' | 'created_at' | 'play_count'> & {
          id?: string;
          created_at?: string;
          play_count?: number;
        };
        Update: Partial<Database['public']['Tables']['media_items']['Insert']>;
      };
      reflections: {
        Row: {
          id: string;
          family_id: string;
          child_id: string;
          logged_by: string;
          reflection_date: string;
          prompt_text: string;
          parent_note: string | null;
          child_audio_url: string | null;
          child_transcript: string | null;
          created_at: string;
        };
        Insert: Omit<Database['public']['Tables']['reflections']['Row'], 'id' | 'created_at'> & {
          id?: string;
          created_at?: string;
        };
        Update: Partial<Database['public']['Tables']['reflections']['Insert']>;
      };
      sync_conflicts: {
        Row: {
          id: string;
          family_id: string;
          table_name: string;
          record_id: string;
          local_version: Json;
          server_version: Json;
          resolved: boolean;
          occurred_at: string;
        };
        Insert: Omit<Database['public']['Tables']['sync_conflicts']['Row'], 'id'> & { id?: string };
        Update: Partial<Database['public']['Tables']['sync_conflicts']['Insert']>;
      };
    };
    Views: Record<string, never>;
    Functions: Record<string, never>;
    Enums: {
      domain: Domain;
      block_type: BlockType;
      zone: Zone;
      log_status: LogStatus;
    };
  };
}

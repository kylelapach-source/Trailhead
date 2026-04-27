import { appSchema, tableSchema } from '@nozbe/watermelondb';

export default appSchema({
  version: 1,
  tables: [
    tableSchema({
      name: 'families',
      columns: [
        { name: 'name', type: 'string' },
        { name: 'timezone', type: 'string' },
        { name: 'locale', type: 'string' },
        { name: 'settings', type: 'string' }, // JSON string
        { name: 'created_at', type: 'number' },
      ],
    }),
    tableSchema({
      name: 'children',
      columns: [
        { name: 'family_id', type: 'string', isIndexed: true },
        { name: 'name', type: 'string' },
        { name: 'birthdate', type: 'string' },
        { name: 'avatar_url', type: 'string', isOptional: true },
        { name: 'interests', type: 'string' }, // JSON array
        { name: 'created_at', type: 'number' },
      ],
    }),
    tableSchema({
      name: 'rhythms',
      columns: [
        { name: 'family_id', type: 'string', isOptional: true, isIndexed: true },
        { name: 'name', type: 'string' },
        { name: 'description', type: 'string', isOptional: true },
        { name: 'day_type', type: 'string' },
        { name: 'is_active', type: 'boolean' },
        { name: 'is_template', type: 'boolean' },
        { name: 'sort_order', type: 'number' },
        { name: 'created_at', type: 'number' },
        { name: 'updated_at', type: 'number' },
      ],
    }),
    tableSchema({
      name: 'rhythm_blocks',
      columns: [
        { name: 'rhythm_id', type: 'string', isIndexed: true },
        { name: 'activity_id', type: 'string', isOptional: true },
        { name: 'block_type', type: 'string' },
        { name: 'label', type: 'string' },
        { name: 'duration_minutes', type: 'number' },
        { name: 'position', type: 'number' },
        { name: 'color_hex', type: 'string' },
        { name: 'domain', type: 'string' },
        { name: 'zone', type: 'string' },
        { name: 'is_optional', type: 'boolean' },
        { name: 'created_at', type: 'number' },
      ],
    }),
    tableSchema({
      name: 'activities',
      columns: [
        { name: 'family_id', type: 'string', isOptional: true, isIndexed: true },
        { name: 'title', type: 'string' },
        { name: 'description', type: 'string' },
        { name: 'domain', type: 'string' },
        { name: 'age_tags', type: 'string' }, // JSON array
        { name: 'supply_list', type: 'string' }, // JSON array
        { name: 'zone_suggestion', type: 'string' },
        { name: 'is_seed_data', type: 'boolean' },
        { name: 'difficulty', type: 'string' },
        { name: 'tulsa_location', type: 'string', isOptional: true }, // JSON
        { name: 'created_at', type: 'number' },
        { name: 'updated_at', type: 'number' },
      ],
    }),
    tableSchema({
      name: 'logs',
      columns: [
        { name: 'family_id', type: 'string', isIndexed: true },
        { name: 'child_id', type: 'string', isIndexed: true },
        { name: 'rhythm_block_id', type: 'string', isOptional: true },
        { name: 'activity_id', type: 'string', isOptional: true },
        { name: 'logged_by', type: 'string' },
        { name: 'log_date', type: 'string', isIndexed: true },
        { name: 'status', type: 'string' },
        { name: 'note_text', type: 'string', isOptional: true },
        { name: 'photo_urls', type: 'string' }, // JSON array
        { name: 'audio_url', type: 'string', isOptional: true },
        { name: 'duration_actual_minutes', type: 'number', isOptional: true },
        { name: 'mood_tags', type: 'string' }, // JSON
        { name: 'created_at', type: 'number' },
      ],
    }),
    tableSchema({
      name: 'media_items',
      columns: [
        { name: 'title', type: 'string' },
        { name: 'youtube_id', type: 'string' },
        { name: 'category', type: 'string', isIndexed: true },
        { name: 'duration_seconds', type: 'number' },
        { name: 'age_tags', type: 'string' }, // JSON array
        { name: 'is_curated', type: 'boolean' },
        { name: 'play_count', type: 'number' },
        { name: 'created_at', type: 'number' },
      ],
    }),
    tableSchema({
      name: 'reflections',
      columns: [
        { name: 'family_id', type: 'string', isIndexed: true },
        { name: 'child_id', type: 'string', isIndexed: true },
        { name: 'logged_by', type: 'string' },
        { name: 'reflection_date', type: 'string', isIndexed: true },
        { name: 'prompt_text', type: 'string' },
        { name: 'parent_note', type: 'string', isOptional: true },
        { name: 'child_audio_url', type: 'string', isOptional: true },
        { name: 'child_transcript', type: 'string', isOptional: true },
        { name: 'created_at', type: 'number' },
      ],
    }),
  ],
});

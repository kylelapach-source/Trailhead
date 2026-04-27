-- ============================================================
-- Seed: 3 global rhythm templates (no family_id, is_template = true)
-- These are copied per family during onboarding.
-- ============================================================

do $$
declare
  balanced_id   uuid;
  highenergy_id uuid;
  rainy_id      uuid;
begin

  -- Balanced Weekday
  insert into rhythms (name, description, day_type, is_active, is_template, sort_order)
  values ('Balanced Weekday', 'A well-rounded day with literacy, outdoor time, and creative play.', 'weekday', true, true, 0)
  returning id into balanced_id;

  insert into rhythm_blocks (rhythm_id, block_type, label, duration_minutes, position, color_hex, domain, zone) values
  (balanced_id, 'morning_circle', 'Morning Circle',       15, 0, '#2D6A4F', 'social_emotional', 'indoor_quiet'),
  (balanced_id, 'focus_activity', 'Letter Sound Hunt',    20, 1, '#48CAE4', 'literacy',         'indoor_active'),
  (balanced_id, 'brain_break',    'Freeze Dance',         10, 2, '#E9C46A', 'physical',         'indoor_active'),
  (balanced_id, 'outdoor_play',   'Backyard Exploration', 45, 3, '#52B788', 'science_nature',   'backyard'),
  (balanced_id, 'storytime',      'Storytime',            15, 4, '#A8DADC', 'literacy',         'indoor_quiet'),
  (balanced_id, 'free_play',      'Free Outdoor Play',    30, 5, '#FF6B6B', 'physical',         'backyard');

  -- High Energy Day
  insert into rhythms (name, description, day_type, is_active, is_template, sort_order)
  values ('High Energy Day', 'Maximum movement and outdoor time for high-energy days.', 'weekday', true, true, 1)
  returning id into highenergy_id;

  insert into rhythm_blocks (rhythm_id, block_type, label, duration_minutes, position, color_hex, domain, zone) values
  (highenergy_id, 'morning_circle', 'Morning Circle',        10, 0, '#2D6A4F', 'social_emotional', 'indoor_quiet'),
  (highenergy_id, 'outdoor_play',   'Trail Walk Scavenger',  60, 1, '#52B788', 'physical',         'community'),
  (highenergy_id, 'brain_break',    'Obstacle Course',       20, 2, '#E9C46A', 'physical',         'backyard'),
  (highenergy_id, 'snack',          'Snack + Reset',         15, 3, '#F4A261', 'social_emotional', 'kitchen'),
  (highenergy_id, 'free_play',      'Backyard Build Time',   45, 4, '#FF6B6B', 'math_readiness',   'backyard'),
  (highenergy_id, 'reflection',     'End of Day Reflection', 15, 5, '#9B72CF', 'social_emotional', 'indoor_quiet');

  -- Rainy Day Indoor
  insert into rhythms (name, description, day_type, is_active, is_template, sort_order)
  values ('Rainy Day Indoor', 'A cozy indoor day with creative arts and quiet focus.', 'rainy', true, true, 2)
  returning id into rainy_id;

  insert into rhythm_blocks (rhythm_id, block_type, label, duration_minutes, position, color_hex, domain, zone) values
  (rainy_id, 'morning_circle', 'Morning Circle',      15, 0, '#2D6A4F', 'social_emotional', 'indoor_quiet'),
  (rainy_id, 'focus_activity', 'Nature Collage Art',  30, 1, '#9B72CF', 'creative_arts',    'indoor_active'),
  (rainy_id, 'brain_break',    'Yoga Bear Walk',      15, 2, '#E9C46A', 'physical',         'indoor_active'),
  (rainy_id, 'focus_activity', 'Story Stone Telling', 25, 3, '#48CAE4', 'literacy',         'indoor_quiet'),
  (rainy_id, 'snack',          'Snack + Read Aloud',  20, 4, '#F4A261', 'literacy',         'kitchen'),
  (rainy_id, 'storytime',      'Storytime',           20, 5, '#A8DADC', 'literacy',         'indoor_quiet'),
  (rainy_id, 'rest',           'Quiet Rest',          30, 6, '#ADB5BD', 'social_emotional', 'indoor_quiet');

end $$;

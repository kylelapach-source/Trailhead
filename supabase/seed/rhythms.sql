-- ============================================================
-- Seed: 3 default rhythm templates (no family_id — global)
-- Note: In production these are copied per family during onboarding.
-- ============================================================

-- Balanced Weekday
insert into rhythms (id, name, description, day_type, is_active, sort_order)
values ('r001', 'Balanced Weekday', 'A well-rounded day with literacy, outdoor time, and creative play.', 'weekday', true, 0);

insert into rhythm_blocks (rhythm_id, block_type, label, duration_minutes, position, color_hex, domain, zone) values
('r001', 'morning_circle', 'Morning Circle',      15, 0, '#2D6A4F', 'social_emotional', 'indoor_quiet'),
('r001', 'focus_activity', 'Letter Sound Hunt',   20, 1, '#48CAE4', 'literacy',         'indoor_active'),
('r001', 'brain_break',    'Freeze Dance',        10, 2, '#E9C46A', 'physical',         'indoor_active'),
('r001', 'outdoor_play',   'Backyard Exploration', 45, 3, '#52B788', 'science_nature',   'backyard'),
('r001', 'storytime',      'Storytime',           15, 4, '#A8DADC', 'literacy',         'indoor_quiet'),
('r001', 'free_play',      'Free Outdoor Play',   30, 5, '#FF6B6B', 'physical',         'backyard');

-- High Energy Day
insert into rhythms (id, name, description, day_type, is_active, sort_order)
values ('r002', 'High Energy Day', 'Maximum movement and outdoor time for high-energy days.', 'weekday', true, 1);

insert into rhythm_blocks (rhythm_id, block_type, label, duration_minutes, position, color_hex, domain, zone) values
('r002', 'morning_circle', 'Morning Circle',         10, 0, '#2D6A4F', 'social_emotional', 'indoor_quiet'),
('r002', 'outdoor_play',   'Trail Walk Scavenger',   60, 1, '#52B788', 'physical',          'community'),
('r002', 'brain_break',    'Obstacle Course',        20, 2, '#E9C46A', 'physical',          'backyard'),
('r002', 'snack',          'Snack + Reset',          15, 3, '#F4A261', 'social_emotional',  'kitchen'),
('r002', 'free_play',      'Backyard Build Time',    45, 4, '#FF6B6B', 'math_readiness',    'backyard'),
('r002', 'reflection',     'End of Day Reflection',  15, 5, '#9B72CF', 'social_emotional',  'indoor_quiet');

-- Rainy Day Indoor
insert into rhythms (id, name, description, day_type, is_active, sort_order)
values ('r003', 'Rainy Day Indoor', 'A cozy indoor day with creative arts and quiet focus.', 'rainy', true, 2);

insert into rhythm_blocks (rhythm_id, block_type, label, duration_minutes, position, color_hex, domain, zone) values
('r003', 'morning_circle', 'Morning Circle',     15, 0, '#2D6A4F', 'social_emotional', 'indoor_quiet'),
('r003', 'focus_activity', 'Nature Collage Art', 30, 1, '#9B72CF', 'creative_arts',    'indoor_active'),
('r003', 'brain_break',    'Yoga Bear Walk',     15, 2, '#E9C46A', 'physical',         'indoor_active'),
('r003', 'focus_activity', 'Story Stone Telling', 25, 3, '#48CAE4', 'literacy',        'indoor_quiet'),
('r003', 'snack',          'Snack + Read Aloud', 20, 4, '#F4A261', 'literacy',         'kitchen'),
('r003', 'storytime',      'Storytime',          20, 5, '#A8DADC', 'literacy',         'indoor_quiet'),
('r003', 'rest',           'Quiet Rest',         30, 6, '#ADB5BD', 'social_emotional', 'indoor_quiet');

-- ============================================================
-- Seed: Curated Media Library (20 videos across 5 categories)
-- ============================================================

insert into media_items (title, youtube_id, category, duration_seconds, age_tags, is_curated) values

-- Phonics (4)
('Letter A Song – ABC Phonics',        'sFYhDaEBv5I', 'Phonics',      150, array['3-4','4-5'],       true),
('Letter B Song – Bounce and Wiggle',  'nJCFrFX-1Rc', 'Phonics',      135, array['3-4','4-5'],       true),
('Blending Sounds – Short Vowels',     'VTG0-Z_Y_GY', 'Phonics',      480, array['4-5','5-6'],       true),
('Alphabet Chant with Animals',        'hq3yfQnllfQ', 'Phonics',      200, array['3-4','4-5'],       true),

-- Counting (4)
('Count to 10 with Dinosaurs',         'DR-cfDsHefs', 'Counting',     210, array['3-4','4-5'],       true),
('Counting by 2s Song',                '64e9HiRVEuE', 'Counting',     180, array['4-5','5-6'],       true),
('Number Recognition 1-20',            'nBKO4jtM_3I', 'Counting',     300, array['3-4','4-5'],       true),
('Shapes and Counting at the Farm',    'y2e0-QCQ9HE', 'Counting',     360, array['3-4','4-5'],       true),

-- Brain Breaks (4)
('Freeze Dance for Kids',              'IgjaTXoT4W8', 'Brain Breaks', 240, array['3-4','4-5','5-6'], true),
('GoNoodle: Shake Your Sillies Out',   'niCwHfWvqPg', 'Brain Breaks', 180, array['3-4','4-5'],       true),
('Kids Yoga: Animal Poses',            'o-lMQaHqOXs', 'Brain Breaks', 420, array['4-5','5-6'],       true),
('Cosmic Kids Yoga: Frozen',           'PPHSjBmgRQc', 'Brain Breaks', 600, array['4-5','5-6'],       true),

-- Read-Alouds (4)
('The Very Hungry Caterpillar',        'oe6W-5c5Kn8', 'Read-Alouds',  540, array['3-4','4-5'],       true),
('Where the Wild Things Are',          'v7JUMfVrGvc', 'Read-Alouds',  600, array['3-4','4-5','5-6'], true),
('Dragons Love Tacos',                 '1kYdcDGDni0', 'Read-Alouds',  480, array['4-5','5-6'],       true),
('If You Give a Mouse a Cookie',       'dqzMtO6r4vE', 'Read-Alouds',  420, array['3-4','4-5'],       true),

-- Nature (4)
('Amazing Dinosaur Facts for Kids',    'RHeQjQ0Bnhk', 'Nature',       480, array['4-5','5-6'],       true),
('How Butterflies Are Made',           'HdtFNKO4mRk', 'Nature',       360, array['4-5','5-6'],       true),
('Backyard Birds Identification',      'SJbxP0Qmzzo', 'Nature',       420, array['4-5','5-6'],       true),
('What Lives in the Soil?',            'sT7oQLNtIaE', 'Nature',       300, array['3-4','4-5','5-6'], true);

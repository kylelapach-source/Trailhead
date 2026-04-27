-- ============================================================
-- Seed: Curated Media Library (20 videos across 5 categories)
-- ============================================================

insert into media_items (id, title, youtube_id, category, duration_seconds, age_tags, is_curated) values

-- Phonics (4)
('m001', 'Letter A Song – ABC Phonics', 'sFYhDaEBv5I', 'Phonics', 150, array['3-4','4-5'], true),
('m002', 'Letter B Song – Bounce and Wiggle', 'nJCFrFX-1Rc', 'Phonics', 135, array['3-4','4-5'], true),
('m003', 'Blending Sounds – Short Vowels', 'VTG0-Z_Y_GY', 'Phonics', 480, array['4-5','5-6'], true),
('m004', 'Alphabet Chant with Animals', 'hq3yfQnllfQ', 'Phonics', 200, array['3-4','4-5'], true),

-- Counting (4)
('m005', 'Count to 10 with Dinosaurs', 'DR-cfDsHefs', 'Counting', 210, array['3-4','4-5'], true),
('m006', 'Counting by 2s Song', '64e9HiRVEuE', 'Counting', 180, array['4-5','5-6'], true),
('m007', 'Number Recognition 1-20', 'nBKO4jtM_3I', 'Counting', 300, array['3-4','4-5'], true),
('m008', 'Shapes and Counting at the Farm', 'y2e0-QCQ9HE', 'Counting', 360, array['3-4','4-5'], true),

-- Brain Breaks (4)
('m009', 'Freeze Dance for Kids', 'IgjaTXoT4W8', 'Brain Breaks', 240, array['3-4','4-5','5-6'], true),
('m010', 'GoNoodle: Shake Your Sillies Out', 'niCwHfWvqPg', 'Brain Breaks', 180, array['3-4','4-5'], true),
('m011', 'Kids Yoga: Animal Poses', 'o-lMQaHqOXs', 'Brain Breaks', 420, array['4-5','5-6'], true),
('m012', 'Cosmic Kids Yoga: Frozen', 'PPHSjBmgRQc', 'Brain Breaks', 600, array['4-5','5-6'], true),

-- Read-Alouds (4)
('m013', 'The Very Hungry Caterpillar – Read Aloud', 'oe6W-5c5Kn8', 'Read-Alouds', 540, array['3-4','4-5'], true),
('m014', 'Where the Wild Things Are – Read Aloud', 'v7JUMfVrGvc', 'Read-Alouds', 600, array['3-4','4-5','5-6'], true),
('m015', 'Dragons Love Tacos – Read Aloud', '1kYdcDGDni0', 'Read-Alouds', 480, array['4-5','5-6'], true),
('m016', 'If You Give a Mouse a Cookie – Read Aloud', 'dqzMtO6r4vE', 'Read-Alouds', 420, array['3-4','4-5'], true),

-- Nature (4)
('m017', 'Amazing Dinosaur Facts for Kids', 'RHeQjQ0Bnhk', 'Nature', 480, array['4-5','5-6'], true),
('m018', 'How Butterflies Are Made – Life Cycle', 'HdtFNKO4mRk', 'Nature', 360, array['4-5','5-6'], true),
('m019', 'Backyard Birds Identification for Kids', 'SJbxP0Qmzzo', 'Nature', 420, array['4-5','5-6'], true),
('m020', 'What Lives in the Soil? Bugs and Worms', 'sT7oQLNtIaE', 'Nature', 300, array['3-4','4-5','5-6'], true);

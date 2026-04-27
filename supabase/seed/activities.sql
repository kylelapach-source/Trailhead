-- ============================================================
-- Seed: Activity Library (30 activities across 6 domains)
-- ============================================================

insert into activities (title, description, domain, age_tags, supply_list, zone_suggestion, is_seed_data, difficulty) values

-- SCIENCE / NATURE (6)
('Dinosaur Excavation Dig',
 'Bury small plastic dinosaurs in a sandbox or dirt patch. Give the child a brush and spoon to excavate them like a paleontologist. Name each dinosaur together.',
 'science_nature', array['3-4','4-5'], array['6-8 plastic dinosaurs','Sandbox or bin with dirt','Small paintbrushes','Plastic spoons','Magnifying glass'], 'backyard', true, 'easy'),

('Bug Safari Journal',
 'Arm the child with a magnifying glass and a simple sketchbook. Hunt for bugs in the yard. Draw each one, name it, and guess what it eats.',
 'science_nature', array['4-5','5-6'], array['Magnifying glass','Sketchbook','Crayons','Bug guide or field guide app'], 'backyard', true, 'easy'),

('Cloud Shape Watching',
 'Lay on a blanket and take turns finding shapes in clouds. Draw the shapes in a sketchbook. Discuss weather and what makes clouds.',
 'science_nature', array['3-4','4-5','5-6'], array['Blanket','Sketchbook','Crayons'], 'front_yard', true, 'easy'),

('Garden Planting Box',
 'Plant seeds (sunflower, radish, or bean) in a small pot or garden bed. Water daily, observe growth over days and weeks. Draw a growth chart.',
 'science_nature', array['4-5','5-6'], array['Seeds (sunflower or bean)','Small pots or bed space','Soil','Watering can','Growth chart paper'], 'backyard', true, 'easy'),

('Mud Kitchen Chemistry',
 'Set up a mud kitchen station with water, dirt, leaves, and rocks. Make "recipes" and discuss what dissolves vs. what doesn''t.',
 'science_nature', array['3-4','4-5'], array['Water source','Dirt patch','Old pots and spoons','Leaves, rocks, pinecones'], 'backyard', true, 'easy'),

('Raindrop Race',
 'On a rainy day, press faces to the window. Pick a raindrop each. Watch which one reaches the bottom first. Discuss gravity.',
 'science_nature', array['3-4','4-5'], array['Rainy window'], 'indoor_quiet', true, 'easy'),

-- MATH READINESS (6)
('Cinderblock & Plank Road Builder',
 'Set out 4-6 cinderblocks and scrap 2x4 planks. Build roads, bridges, and ramps for toy trucks. Count blocks, measure planks by hand-spans.',
 'math_readiness', array['3-4','4-5','5-6'], array['4-6 cinderblocks','3-4 scrap 2x4 lumber (24-36 inch)','Toy trucks or cars','Spray bottle (optional)'], 'backyard', true, 'easy'),

('Bead Pattern Necklace',
 'String beads in repeating patterns (AB, AAB, ABC). Call out the pattern, have child guess the next bead. Discuss patterns in nature.',
 'math_readiness', array['3-4','4-5'], array['Large beads (2+ colors)','Sturdy string or pipe cleaner'], 'indoor_quiet', true, 'easy'),

('Nature Number Hunt',
 'Go outside and collect exactly 10 of one thing (rocks, sticks, leaves). Sort by size. Count backwards from 10. Make groups of 2s and 5s.',
 'math_readiness', array['3-4','4-5'], array['Bag or bucket for collecting'], 'backyard', true, 'easy'),

('Measuring With Hands',
 'Measure things around the house using hand-spans. Record each measurement. Which is longer — the couch or the table? Introduce the concept of units.',
 'math_readiness', array['4-5','5-6'], array['Paper to record','Crayon'], 'indoor_active', true, 'easy'),

('Sorting Kitchen',
 'Lay out assorted kitchen objects (spoons, cups, containers). Sort by size, color, material, function. Add a challenge: sort in under 60 seconds.',
 'math_readiness', array['3-4','4-5'], array['Assorted kitchen objects (safe)'], 'kitchen', true, 'easy'),

('Shadow Length Tracking',
 'Trace your shadow on the driveway with chalk in the morning. Return at noon and again at 3pm. Measure the difference. Discuss the sun''s movement.',
 'math_readiness', array['4-5','5-6'], array['Chalk','Sunny driveway or sidewalk'], 'front_yard', true, 'medium'),

-- LITERACY (6)
('Letter Sound Hunt: B',
 'Hunt the house and yard for things that start with the letter B. Write or draw each one. Count total finds. Extend: which were inside vs. outside?',
 'literacy', array['3-4','4-5'], array['Basket or bag','Paper and pencil'], 'indoor_active', true, 'easy'),

('Stomp and Spell',
 'Call out a word. Child stomps once per syllable. Extend: spell simple 3-letter words by pointing to letter cards while stomping.',
 'literacy', array['4-5','5-6'], array['Letter cards (optional)','Open floor space'], 'indoor_active', true, 'easy'),

('Sight Word Hopscotch',
 'Write sight words in a hopscotch grid with chalk. Call out a word. Child jumps to it. Harder: call out two words — hop them in order.',
 'literacy', array['4-5','5-6'], array['Chalk','Driveway or sidewalk','Sight word list'], 'front_yard', true, 'easy'),

('Story Stone Telling',
 'Collect 5-8 smooth stones. Draw or paint a character/setting/object on each. Child picks 3 stones and makes up a story using them.',
 'literacy', array['3-4','4-5','5-6'], array['Smooth stones','Acrylic paint or permanent markers','Clear sealant (optional)'], 'indoor_quiet', true, 'medium'),

('Mud Alphabet Tray',
 'Fill a shallow tray with damp sand or cornmeal. Practice writing letters with a finger. Say the sound for each letter.',
 'literacy', array['3-4','4-5'], array['Shallow tray','Damp sand or cornmeal'], 'kitchen', true, 'easy'),

('Book Walk Prediction',
 'Before reading a book, flip through only the pictures. Ask: what do you think will happen? Read it. Were you right? Discuss.',
 'literacy', array['3-4','4-5','5-6'], array['Picture book'], 'indoor_quiet', true, 'easy'),

-- PHYSICAL (5)
('Obstacle Course Builder',
 'Build a course using couch cushions, hula hoops, tape lines, and chairs. Time each run. Modify the course to make it harder.',
 'physical', array['3-4','4-5','5-6'], array['Couch cushions','Hula hoops','Painter''s tape','Chairs'], 'indoor_active', true, 'easy'),

('Balance Beam Walk',
 'Place a 2x4 plank on the ground. Walk forward, backward, sideways. Add challenges: carry an egg in a spoon, or balance a beanbag on your head.',
 'physical', array['3-4','4-5'], array['2x4 plank','Beanbag or egg and spoon (optional)'], 'backyard', true, 'easy'),

('Freeze Dance Learning',
 'Play music. When it stops, everyone freezes in a specific pose (animal, letter shape, number). Hold for 3 seconds.',
 'physical', array['3-4','4-5','5-6'], array['Music source','Open space'], 'indoor_active', true, 'easy'),

('Wheelbarrow Walk Race',
 'One partner holds the child''s legs, child walks on hands. Add to: crawling through a tunnel, bear walks, crab walks.',
 'physical', array['3-4','4-5'], array['Open grass area'], 'backyard', true, 'easy'),

('Trail Walk Scavenger Hunt',
 'Head to a local trail. Give child a list (or pictures) of 8 things to find: feather, smooth rock, yellow flower, mushroom, bug, bird, spiderweb, pinecone.',
 'physical', array['4-5','5-6'], array['Printed scavenger list','Water bottles','Comfortable shoes'], 'community', true, 'easy'),

-- SOCIAL EMOTIONAL (4)
('Feelings Weather Report',
 'Each person gives a "feelings weather report" — "I feel sunny today because..." or "I have some storm clouds because..." Draw your weather.',
 'social_emotional', array['3-4','4-5','5-6'], array['Paper','Crayons'], 'indoor_quiet', true, 'easy'),

('Kindness Rock Painting',
 'Paint smooth rocks with kind words or bright designs. Leave them around the neighborhood for strangers to find.',
 'social_emotional', array['4-5','5-6'], array['Smooth rocks','Acrylic paint','Brushes','Clear sealant'], 'indoor_quiet', true, 'easy'),

('Calm Down Bottle',
 'Fill a bottle with water, glitter glue, and glitter. Shake it. Watch the glitter settle and practice slow breathing. Make one for the house.',
 'social_emotional', array['3-4','4-5'], array['Clear plastic bottle','Glitter glue','Fine glitter','Water','Super glue for cap'], 'kitchen', true, 'easy'),

('Turn-Taking Tower',
 'Build a tower alternating turns — one block per person per turn. No talking allowed. Practice patience and non-verbal communication.',
 'social_emotional', array['3-4','4-5'], array['Block set (Duplo, wood, or cardboard)'], 'indoor_quiet', true, 'easy'),

-- CREATIVE ARTS (3)
('Nature Collage Frame',
 'Collect leaves, petals, sticks, and seeds. Arrange and glue to cardboard to make a framed art piece. Display it somewhere special.',
 'creative_arts', array['3-4','4-5','5-6'], array['Cardboard','PVA glue','Natural materials'], 'backyard', true, 'easy'),

('Body Percussion Jam',
 'Create a rhythmic sequence using clapping, stomping, knee-patting, and snapping. Record a short video. Add vocals (beatboxing welcome).',
 'creative_arts', array['3-4','4-5','5-6'], array['Optional: phone to record'], 'indoor_active', true, 'easy'),

('Sidewalk Mural',
 'Give the child a big sidewalk chalk space and an open prompt: "Draw your favorite place." No rules, no correction — just create.',
 'creative_arts', array['3-4','4-5','5-6'], array['Sidewalk chalk (multicolor)','Driveway or sidewalk space'], 'front_yard', true, 'easy');

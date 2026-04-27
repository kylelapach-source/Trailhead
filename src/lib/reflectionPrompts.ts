export interface ReflectionPrompt {
  id: string;
  text: string;
  category: 'creation' | 'nature' | 'resilience' | 'connection' | 'curiosity' | 'play';
  followUpParent: string;
  domainTags: string[];
}

export const REFLECTION_PROMPTS: ReflectionPrompt[] = [
  {
    id: 'p001',
    text: 'What was the most fun thing you built or made today?',
    category: 'creation',
    followUpParent: 'Ask them to describe it in detail. Sketch it together if they\'re excited.',
    domainTags: ['creative_arts', 'math_readiness'],
  },
  {
    id: 'p002',
    text: 'Did you find any bugs, plants, or cool things outside today? Tell me about one!',
    category: 'nature',
    followUpParent: 'If they saw something, look it up together on a field guide app. Start a nature journal sketch.',
    domainTags: ['science_nature'],
  },
  {
    id: 'p003',
    text: 'What\'s something that was tricky today? What did you do when it got hard?',
    category: 'resilience',
    followUpParent: 'Celebrate the attempt, not the result. Say "Your brain was really working on that!"',
    domainTags: ['social_emotional'],
  },
  {
    id: 'p004',
    text: 'What\'s something you learned today that surprised you?',
    category: 'curiosity',
    followUpParent: 'Follow the thread — look it up, extend it. Surprise is the seed of wonder.',
    domainTags: ['science_nature', 'literacy'],
  },
  {
    id: 'p005',
    text: 'Did you help someone today? How did it make you feel?',
    category: 'connection',
    followUpParent: 'Name the feeling specifically. "That sounds like pride — a good kind of proud."',
    domainTags: ['social_emotional'],
  },
  {
    id: 'p006',
    text: 'If you could do today over, what would you add more of?',
    category: 'play',
    followUpParent: 'Write it on a sticky note and actually plan that for tomorrow.',
    domainTags: ['social_emotional'],
  },
  {
    id: 'p007',
    text: 'What sound did you hear outside today? Can you make it?',
    category: 'nature',
    followUpParent: 'Turn it into a game — guess the animal or thing that makes each sound.',
    domainTags: ['science_nature', 'creative_arts'],
  },
  {
    id: 'p008',
    text: 'What book or story are you thinking about? Why?',
    category: 'curiosity',
    followUpParent: 'Read a few pages together tonight. Let them lead which part to revisit.',
    domainTags: ['literacy'],
  },
  {
    id: 'p009',
    text: 'What made you laugh today?',
    category: 'play',
    followUpParent: 'Laugh with them. Joy is data — it tells you what to do more of.',
    domainTags: ['social_emotional'],
  },
  {
    id: 'p010',
    text: 'If a dinosaur came to visit today, what would you show them?',
    category: 'creation',
    followUpParent: 'Draw the dinosaur\'s visit. Include speech bubbles of what the dinosaur would say.',
    domainTags: ['creative_arts', 'literacy'],
  },
  {
    id: 'p011',
    text: 'What\'s one thing you want to get really, really good at?',
    category: 'resilience',
    followUpParent: 'Talk about what practice looks like. Sketch out a simple "practice plan."',
    domainTags: ['social_emotional'],
  },
  {
    id: 'p012',
    text: 'What do you think the clouds were doing today?',
    category: 'curiosity',
    followUpParent: 'Make up a cloud story together. Draw the characters.',
    domainTags: ['science_nature', 'creative_arts'],
  },
  {
    id: 'p013',
    text: 'Who did you think about kindly today?',
    category: 'connection',
    followUpParent: 'Suggest writing or drawing a "thinking of you" card to that person.',
    domainTags: ['social_emotional'],
  },
  {
    id: 'p014',
    text: 'What would you invent to make the backyard even more amazing?',
    category: 'creation',
    followUpParent: 'Sketch the invention. Can any part of it actually be built this week?',
    domainTags: ['math_readiness', 'creative_arts'],
  },
  {
    id: 'p015',
    text: 'What do you think a worm thinks about all day?',
    category: 'nature',
    followUpParent: 'Write a short "Worm Diary" together. One entry per day for a week.',
    domainTags: ['science_nature', 'literacy'],
  },
  {
    id: 'p016',
    text: 'What was the biggest thing you did with your body today?',
    category: 'play',
    followUpParent: 'Celebrate physical effort. Map out a "body map" of what each part did today.',
    domainTags: ['physical'],
  },
  {
    id: 'p017',
    text: 'Tell me one number you saw today and where you saw it.',
    category: 'curiosity',
    followUpParent: 'Go on a number hunt tomorrow. How many numbers can you spot in 10 minutes?',
    domainTags: ['math_readiness'],
  },
  {
    id: 'p018',
    text: 'If today was a color, what color would it be?',
    category: 'creation',
    followUpParent: 'Paint or color a "today page" — just that one color in different patterns.',
    domainTags: ['creative_arts', 'social_emotional'],
  },
  {
    id: 'p019',
    text: 'Did anything outside change from yesterday? What was different?',
    category: 'nature',
    followUpParent: 'Start a "Change Journal" — sketch one outdoor thing each day for a week.',
    domainTags: ['science_nature'],
  },
  {
    id: 'p020',
    text: 'What\'s a question you thought of today that nobody answered yet?',
    category: 'curiosity',
    followUpParent: 'Write it on your "Question Wall." Make a plan to find out together.',
    domainTags: ['science_nature', 'literacy'],
  },
  {
    id: 'p021',
    text: 'What sound would your mood make if it was music?',
    category: 'connection',
    followUpParent: 'Have them hum or tap out their "mood music." Record it.',
    domainTags: ['social_emotional', 'creative_arts'],
  },
  {
    id: 'p022',
    text: 'What are you looking forward to tomorrow?',
    category: 'play',
    followUpParent: 'Write it down and put it somewhere they\'ll see in the morning.',
    domainTags: ['social_emotional'],
  },
  {
    id: 'p023',
    text: 'What did you count today? How many was it?',
    category: 'curiosity',
    followUpParent: 'Count something together right now — stairs, cracks, buttons on a shirt.',
    domainTags: ['math_readiness'],
  },
  {
    id: 'p024',
    text: 'If you drew today as a picture, what would be in it?',
    category: 'creation',
    followUpParent: 'Actually draw it — right now or at bedtime. Keep in the journal.',
    domainTags: ['creative_arts'],
  },
  {
    id: 'p025',
    text: 'What did you pretend today? Who or what were you?',
    category: 'play',
    followUpParent: 'Extend the story — what happened next in the pretend world?',
    domainTags: ['creative_arts', 'social_emotional'],
  },
  {
    id: 'p026',
    text: 'What would a superhero do with your skills?',
    category: 'resilience',
    followUpParent: 'Name their superpower together. Draw the superhero costume.',
    domainTags: ['creative_arts', 'social_emotional'],
  },
  {
    id: 'p027',
    text: 'What letter did you think about today?',
    category: 'curiosity',
    followUpParent: 'Do a quick "letter tour" of the house — find that letter on books, labels, packaging.',
    domainTags: ['literacy'],
  },
  {
    id: 'p028',
    text: 'What\'s something in nature you want to learn more about?',
    category: 'nature',
    followUpParent: 'Find one book or video about it. Schedule it for tomorrow\'s rhythm.',
    domainTags: ['science_nature'],
  },
  {
    id: 'p029',
    text: 'Who do you love learning with? Why?',
    category: 'connection',
    followUpParent: 'Share what you love learning with them too. Make it mutual.',
    domainTags: ['social_emotional'],
  },
  {
    id: 'p030',
    text: 'What was the best moment of today?',
    category: 'play',
    followUpParent: 'Write it in the journal. Read it back on a hard day.',
    domainTags: ['social_emotional'],
  },
];

export function getTodayPrompt(): ReflectionPrompt {
  const dayOfYear = Math.floor(
    (Date.now() - new Date(new Date().getFullYear(), 0, 0).getTime()) / 86400000,
  );
  return REFLECTION_PROMPTS[dayOfYear % REFLECTION_PROMPTS.length];
}

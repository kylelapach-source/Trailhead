import type { BlockType } from '@/types/database';

export interface BlockConfig {
  label: string;
  colorHex: string;
  description: string;
  icon: string;
}

export const BLOCK_TYPE_CONFIG: Record<BlockType, BlockConfig> = {
  morning_circle: {
    label: 'Morning Circle',
    colorHex: '#2D6A4F',
    description: 'Gather together to greet the day. Calendar, weather, sharing a joy.',
    icon: '🌅',
  },
  focus_activity: {
    label: 'Focus Activity',
    colorHex: '#48CAE4',
    description: 'A structured learning activity tailored to today\'s goal.',
    icon: '🔵',
  },
  brain_break: {
    label: 'Brain Break',
    colorHex: '#E9C46A',
    description: 'Quick movement or sensory reset to refresh energy.',
    icon: '⚡',
  },
  outdoor_play: {
    label: 'Outdoor Play',
    colorHex: '#52B788',
    description: 'Unstructured outdoor time — mud kitchen, bug hunting, running.',
    icon: '🌿',
  },
  storytime: {
    label: 'Storytime',
    colorHex: '#A8DADC',
    description: 'Read-aloud picture books or chapter books together.',
    icon: '📖',
  },
  snack: {
    label: 'Snack',
    colorHex: '#F4A261',
    description: 'Refuel with a healthy snack and relaxed conversation.',
    icon: '🍎',
  },
  rest: {
    label: 'Rest',
    colorHex: '#ADB5BD',
    description: 'Quiet time — books, puzzles, or nap.',
    icon: '😴',
  },
  reflection: {
    label: 'Reflection',
    colorHex: '#9B72CF',
    description: 'End-of-day check-in with a guided prompt.',
    icon: '💭',
  },
  free_play: {
    label: 'Free Play',
    colorHex: '#FF6B6B',
    description: 'Child-led open-ended play with no adult agenda.',
    icon: '🎲',
  },
};

export interface MockBlock {
  id: string;
  blockType: BlockType;
  label: string;
  durationMinutes: number;
  colorHex: string;
  status: string;
}

export const MOCK_TODAY_BLOCKS: MockBlock[] = [
  {
    id: 'b1',
    blockType: 'morning_circle',
    label: 'Morning Circle',
    durationMinutes: 15,
    colorHex: '#2D6A4F',
    status: 'completed',
  },
  {
    id: 'b2',
    blockType: 'focus_activity',
    label: 'Letter Sound Hunt',
    durationMinutes: 20,
    colorHex: '#48CAE4',
    status: 'in_progress',
  },
  {
    id: 'b3',
    blockType: 'brain_break',
    label: 'Brain Break',
    durationMinutes: 10,
    colorHex: '#E9C46A',
    status: 'pending',
  },
  {
    id: 'b4',
    blockType: 'outdoor_play',
    label: 'Backyard Build Time',
    durationMinutes: 30,
    colorHex: '#52B788',
    status: 'pending',
  },
  {
    id: 'b5',
    blockType: 'storytime',
    label: 'Storytime',
    durationMinutes: 15,
    colorHex: '#A8DADC',
    status: 'pending',
  },
];

export const DOMAIN_COLORS: Record<string, string> = {
  literacy: '#5E60CE',
  math_readiness: '#F77F00',
  science_nature: '#2D6A4F',
  physical: '#E63946',
  social_emotional: '#FF6B6B',
  creative_arts: '#A8DADC',
};

export const DOMAIN_LABELS: Record<string, string> = {
  literacy: 'Literacy',
  math_readiness: 'Math',
  science_nature: 'Science',
  physical: 'Physical',
  social_emotional: 'Social',
  creative_arts: 'Creative Arts',
};

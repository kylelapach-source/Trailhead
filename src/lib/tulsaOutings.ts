export interface TulsaOuting {
  id: string;
  name: string;
  address: string;
  category: string;
  domain: string;
  notes: string;
  isFree: boolean;
  ageMin: number;
  mapQuery: string;
}

export const TULSA_OUTINGS: TulsaOuting[] = [
  {
    id: 'to001',
    name: 'Gathering Place',
    address: '2650 S John Williams Way, Tulsa, OK',
    category: 'Nature + Play',
    domain: 'physical',
    notes: 'Best on weekday mornings. Free. Massive nature play area with water features, log climbing, and open meadows.',
    isFree: true,
    ageMin: 2,
    mapQuery: 'Gathering+Place+Tulsa+OK',
  },
  {
    id: 'to002',
    name: 'Tulsa Zoo',
    address: '6421 E 36th St N, Tulsa, OK',
    category: 'Science / Nature',
    domain: 'science_nature',
    notes: 'Member discount available. Reptile house is a hit for dino-lovers. Budget 3-4 hours.',
    isFree: false,
    ageMin: 2,
    mapQuery: 'Tulsa+Zoo+Tulsa+OK',
  },
  {
    id: 'to003',
    name: 'Oxley Nature Center',
    address: '6700 Mohawk Blvd, Tulsa, OK',
    category: 'Science / Nature',
    domain: 'science_nature',
    notes: 'Free trails. Great for bug and bird journals. Quiet on weekdays. Excellent boardwalk trail.',
    isFree: true,
    ageMin: 3,
    mapQuery: 'Oxley+Nature+Center+Tulsa+OK',
  },
  {
    id: 'to004',
    name: 'Discovery Lab',
    address: '1414 E Reconciliation Way, Tulsa, OK',
    category: 'STEM',
    domain: 'math_readiness',
    notes: 'Best for rainy days. Hands-on exhibits for ages 3+. Budget 2-3 hours. Ticketed.',
    isFree: false,
    ageMin: 3,
    mapQuery: 'Discovery+Lab+Tulsa+OK',
  },
  {
    id: 'to005',
    name: 'Turkey Mountain Urban Wilderness',
    address: 'W 61st St, Tulsa, OK',
    category: 'Physical / Nature',
    domain: 'physical',
    notes: 'Free. 300 acres of trails. Perfect for high-energy mornings. Dogs welcome.',
    isFree: true,
    ageMin: 3,
    mapQuery: 'Turkey+Mountain+Urban+Wilderness+Tulsa+OK',
  },
  {
    id: 'to006',
    name: 'Philbrook Museum Gardens',
    address: '2727 S Rockford Rd, Tulsa, OK',
    category: 'Creative Arts',
    domain: 'creative_arts',
    notes: 'Beautiful gardens for nature sketching. Free first Sundays. Bring sketchbooks.',
    isFree: false,
    ageMin: 3,
    mapQuery: 'Philbrook+Museum+Tulsa+OK',
  },
  {
    id: 'to007',
    name: 'Creek Turnpike Trail (River Parks)',
    address: 'Riverside Dr, Tulsa, OK',
    category: 'Physical',
    domain: 'physical',
    notes: 'Paved trail, good for balance bikes and scooters. Flat and safe. Free.',
    isFree: true,
    ageMin: 2,
    mapQuery: 'River+Parks+Tulsa+OK',
  },
  {
    id: 'to008',
    name: 'Tulsa Botanic Garden',
    address: '3900 Tulsa Botanic Dr, Tulsa, OK',
    category: 'Science / Nature',
    domain: 'science_nature',
    notes: 'Seasonal programming for kids. Excellent sensory gardens and children\'s garden area.',
    isFree: false,
    ageMin: 2,
    mapQuery: 'Tulsa+Botanic+Garden+Tulsa+OK',
  },
];

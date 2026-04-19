export type EventTag = 'fitness' | 'functional' | 'high-intensity' | 'ultra' | 'running' | 'iconic' | 'scenic' | 'half-marathon' | 'beginner-friendly' | 'marathon' | 'trail';

export type FitnessEvent = {
  id: string;
  name: string;
  type: string;
  icon: string;
  date: string;
  location: string;
  region: string;
  distance: string;
  difficulty: number;
  bossLevel: string;
  color: string;
  description: string;
  prepWeeks: number;
  minPrepWeeks: number;
  requirements: {
    cardio: string;
    strength: string;
    experience: string;
  };
  targets: Record<string, string>;
  links: {
    website: string;
    youtube: string;
  };
  tags: EventTag[];
  rewards: { xp: number; title: string };
};

export const EVENTS: FitnessEvent[] = [
  {
    id: 'hyrox-jhb-26',
    name: 'HYROX Johannesburg',
    type: 'Fitness Race',
    icon: '🏟️',
    date: '2026-05-30',
    location: 'Johannesburg Expo Centre, Nasrec',
    region: 'Gauteng',
    distance: '8km running + 8 stations',
    difficulty: 7,
    bossLevel: 'B-RANK BOSS',
    color: '#8b5cf6',
    description:
      "The world's fastest-growing fitness race. 8 x 1km runs alternated with 8 functional stations: SkiErg, Sled Push, Sled Pull, Burpee Broad Jumps, Rowing, Farmers Carry, Sandbag Lunges, Wall Balls. Held at altitude (1750m) — runs bite harder than sea-level races.",
    prepWeeks: 16,
    minPrepWeeks: 12,
    requirements: {
      cardio: 'Run 10km in <60min',
      strength: 'Squat 1.2x bodyweight',
      experience: 'Some functional fitness background',
    },
    targets: {
      runPace: '5:30/km sustained',
      sled: 'Push 152kg for 25m',
      wallBalls: '100 wall balls (9kg) unbroken',
    },
    links: {
      website: 'https://hyrox.com/event/virgin-active-hyrox-johannesburg-25-26/',
      youtube: 'https://youtube.com/results?search_query=hyrox+johannesburg',
    },
    tags: ['fitness', 'functional', 'high-intensity'],
    rewards: { xp: 1500, title: 'HYROX Finisher' },
  },
  {
    id: 'hyrox-cpt-26',
    name: 'HYROX Cape Town',
    type: 'Fitness Race',
    icon: '🌊',
    date: '2026-04-03',
    location: 'Cape Town International Convention Centre',
    region: 'Western Cape',
    distance: '8km running + 8 stations',
    difficulty: 7,
    bossLevel: 'B-RANK BOSS',
    color: '#06b6d4',
    description:
      "South Africa's first three-day HYROX spectacle. Same brutal format as Johannesburg but at sea level. The Mother City debut weekend brings the international HYROX energy to Cape Town.",
    prepWeeks: 16,
    minPrepWeeks: 12,
    requirements: {
      cardio: 'Run 10km in <60min',
      strength: 'Squat 1.2x bodyweight',
      experience: 'Some functional fitness background',
    },
    targets: {
      runPace: '5:30/km sustained',
      sled: 'Push 152kg for 25m',
      wallBalls: '100 wall balls (9kg) unbroken',
    },
    links: {
      website: 'https://hyroxsa.com/',
      youtube: 'https://youtube.com/results?search_query=hyrox+cape+town',
    },
    tags: ['fitness', 'functional', 'high-intensity'],
    rewards: { xp: 1500, title: 'HYROX Finisher' },
  },
  {
    id: 'comrades-26',
    name: 'Comrades Marathon',
    type: 'Ultra Marathon',
    icon: '👑',
    date: '2026-06-14',
    location: 'Pietermaritzburg ↔ Durban, KZN',
    region: 'KwaZulu-Natal',
    distance: '~89km',
    difficulty: 10,
    bossLevel: 'S-RANK BOSS',
    color: '#ef4444',
    description:
      "The Ultimate Human Race. 89km between Pietermaritzburg and Durban — the world's largest and oldest ultra marathon. Up Run vs Down Run alternates yearly. Brutal hills, 12-hour cutoff, and a finisher's medal that means more than any other in South African running.",
    prepWeeks: 32,
    minPrepWeeks: 24,
    requirements: {
      cardio: 'Marathon (42.2km) qualifier sub 5:00',
      strength: 'Strong posterior chain, injury-free',
      experience: 'Multiple marathons completed',
    },
    targets: {
      longRun: '60km long run completed',
      weeklyMileage: '80-100km/week peak',
      qualifier: 'Marathon under 5:00 between Aug-Apr',
    },
    links: {
      website: 'https://www.comrades.com',
      youtube: 'https://youtube.com/results?search_query=comrades+marathon',
    },
    tags: ['ultra', 'running', 'iconic'],
    rewards: { xp: 5000, title: 'Comrades Conqueror' },
  },
  {
    id: 'two-oceans-ultra-26',
    name: 'Two Oceans Ultra Marathon',
    type: 'Ultra Marathon',
    icon: '🌊',
    date: '2026-04-11',
    location: 'Cape Town, Western Cape',
    region: 'Western Cape',
    distance: '56km',
    difficulty: 9,
    bossLevel: 'A-RANK BOSS',
    color: '#f59e0b',
    description:
      "The world's most beautiful marathon. 56km around the Cape Peninsula via Chapman's Peak. A globally iconic ultra marathon that's been running for 56+ years. Originally a Comrades training race, now a destination event.",
    prepWeeks: 24,
    minPrepWeeks: 16,
    requirements: {
      cardio: 'Marathon under 5:00',
      strength: 'Hill running capacity',
      experience: 'At least one marathon completed',
    },
    targets: {
      longRun: '40km long run',
      qualifier: 'Sub-5:00 marathon',
      hills: 'Comfortable on long climbs',
    },
    links: {
      website: 'https://www.twooceansmarathon.org.za/',
      youtube: 'https://youtube.com/results?search_query=two+oceans+marathon',
    },
    tags: ['ultra', 'running', 'scenic'],
    rewards: { xp: 3500, title: 'Two Oceans Ultra Finisher' },
  },
  {
    id: 'two-oceans-half-26',
    name: 'Two Oceans Half Marathon',
    type: 'Half Marathon',
    icon: '🏃',
    date: '2026-04-12',
    location: 'Cape Town, Western Cape',
    region: 'Western Cape',
    distance: '21.1km',
    difficulty: 5,
    bossLevel: 'C-RANK BOSS',
    color: '#10b981',
    description:
      "The 21km that runs alongside its bigger sibling. Africa's biggest half marathon with thousands of runners. Perfect entry point into endurance running events in South Africa.",
    prepWeeks: 12,
    minPrepWeeks: 8,
    requirements: {
      cardio: 'Run 10km comfortably',
      strength: 'Basic running fitness',
      experience: 'Beginner-friendly',
    },
    targets: {
      longRun: '16km long run',
      pace: 'Consistent 7:00/km or better',
    },
    links: {
      website: 'https://www.twooceansmarathon.org.za/events/half-marathon/',
      youtube: 'https://youtube.com/results?search_query=two+oceans+half+marathon',
    },
    tags: ['half-marathon', 'running', 'beginner-friendly'],
    rewards: { xp: 1500, title: 'Two Oceans Half Finisher' },
  },
  {
    id: 'ctm-26',
    name: 'Sanlam Cape Town Marathon',
    type: 'Marathon',
    icon: '🏔️',
    date: '2026-05-23',
    location: 'Cape Town, Western Cape',
    region: 'Western Cape',
    distance: '42.2km',
    difficulty: 8,
    bossLevel: 'A-RANK BOSS',
    color: '#3b82f6',
    description:
      "South Africa's premier marathon, evolving toward World Marathon Major status. Fast, scenic course through Cape Town. Perfect for a marathon PB with Table Mountain as your backdrop.",
    prepWeeks: 20,
    minPrepWeeks: 16,
    requirements: {
      cardio: 'Run 25km long run',
      strength: 'Injury-free running base',
      experience: 'Half marathon completed',
    },
    targets: {
      longRun: '32km long run',
      weeklyMileage: '60-80km/week',
      pace: 'Sub-5:00 for qualifier status',
    },
    links: {
      website: 'https://capetownmarathon.com/',
      youtube: 'https://youtube.com/results?search_query=cape+town+marathon',
    },
    tags: ['marathon', 'running', 'scenic'],
    rewards: { xp: 3000, title: 'Cape Town Marathon Finisher' },
  },
  {
    id: 'knysna-26',
    name: 'Knysna Forest Marathon',
    type: 'Marathon',
    icon: '🌳',
    date: '2026-07-11',
    location: 'Knysna, Garden Route',
    region: 'Western Cape',
    distance: '42.2km',
    difficulty: 7,
    bossLevel: 'B-RANK BOSS',
    color: '#16a34a',
    description:
      "Run through ancient indigenous forests on the Garden Route. Part of the Knysna Oyster Festival. A rolling, scenic marathon that's brutal in places but unforgettable.",
    prepWeeks: 20,
    minPrepWeeks: 14,
    requirements: {
      cardio: '20km comfortable long run',
      strength: 'Hill running ability',
      experience: 'Half marathon background',
    },
    targets: {
      longRun: '30km long run',
      hills: 'Trail/hill comfort',
    },
    links: {
      website: 'https://oysterfestival.co.za/',
      youtube: 'https://youtube.com/results?search_query=knysna+forest+marathon',
    },
    tags: ['marathon', 'trail', 'scenic'],
    rewards: { xp: 2500, title: 'Knysna Forest Finisher' },
  },
];

export const getEventById = (id: string | null | undefined): FitnessEvent | null => {
  if (!id) return null;
  return EVENTS.find((e) => e.id === id) ?? null;
};

import { Task, WaterLog, FitnessLog, UserSettings, UserProfile, ReminderAlarm, Goal, DayDietPlan } from '../types';

export const initialTasks: Task[] = [
  {
    id: 'task-1',
    title: 'Morning Meditation (15 min)',
    completed: true,
    category: 'Wellness',
    createdAt: new Date().toISOString(),
  },
  {
    id: 'task-2',
    title: 'Review weekly project goals',
    subtitle: 'Check Notion board for updates',
    completed: false,
    category: 'Work',
    createdAt: new Date().toISOString(),
  },
  {
    id: 'task-3',
    title: 'Prepare presentation slides',
    completed: false,
    priority: 'High',
    category: 'Work',
    createdAt: new Date().toISOString(),
  },
  {
    id: 'task-4',
    title: '30-minute cardio exercise',
    completed: false,
    priority: 'Medium',
    category: 'Fitness',
    createdAt: new Date().toISOString(),
  },
  {
    id: 'task-5',
    title: 'Read 20 pages of leadership book',
    completed: false,
    priority: 'Low',
    category: 'Personal',
    createdAt: new Date().toISOString(),
  }
];

export const initialWaterLogs: WaterLog[] = [
  { id: 'w-1', amountMl: 250, timestamp: new Date(Date.now() - 3 * 3600000).toISOString(), timeString: '08:00 AM' },
  { id: 'w-2', amountMl: 450, timestamp: new Date(Date.now() - 2 * 3600000).toISOString(), timeString: '10:15 AM' },
  { id: 'w-3', amountMl: 500, timestamp: new Date(Date.now() - 1 * 3600000).toISOString(), timeString: '12:30 PM' },
];

export const initialFitnessLogs: FitnessLog[] = [
  {
    id: 'f-1',
    type: 'Walking',
    durationMinutes: 25,
    stepsAdded: 3800,
    caloriesBurned: 120,
    timestamp: new Date(Date.now() - 4 * 3600000).toISOString(),
    timeString: '07:30 AM'
  },
  {
    id: 'f-2',
    type: 'Running',
    durationMinutes: 20,
    stepsAdded: 2620,
    caloriesBurned: 185,
    timestamp: new Date(Date.now() - 2 * 3600000).toISOString(),
    timeString: '11:00 AM'
  }
];

export const initialReminders: ReminderAlarm[] = [
  {
    id: 'rem-1',
    title: 'Hydration Intake Alert',
    time: '10:00',
    days: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    type: 'hydration',
    enabled: true,
    soundEnabled: true,
    repeatIntervalMinutes: 120,
  },
  {
    id: 'rem-2',
    title: 'Morning Focus & Goal Review',
    time: '09:00',
    days: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'],
    type: 'task',
    enabled: true,
    soundEnabled: true,
  },
  {
    id: 'rem-3',
    title: 'Evening Fitness Workout',
    time: '18:30',
    days: ['Mon', 'Wed', 'Fri'],
    type: 'workout',
    enabled: true,
    soundEnabled: true,
  }
];

export const initialGoals: Goal[] = [
  {
    id: 'goal-daily-1',
    title: 'Daily Water Intake Target',
    description: 'Reach 3,000 ml of pure water intake daily',
    timeframe: 'Daily',
    category: 'Hydration',
    targetValue: 3000,
    currentValue: 1200,
    unit: 'ml',
    startDate: new Date().toISOString(),
    completed: false,
    streakDays: 5,
    autoSyncType: 'water',
  },
  {
    id: 'goal-daily-2',
    title: 'Daily Step Target',
    description: 'Walk at least 10,000 steps everyday',
    timeframe: 'Daily',
    category: 'Fitness',
    targetValue: 10000,
    currentValue: 6420,
    unit: 'steps',
    startDate: new Date().toISOString(),
    completed: false,
    streakDays: 4,
    autoSyncType: 'steps',
  },
  {
    id: 'goal-daily-3',
    title: 'Daily Active Workout Minutes',
    description: 'Stay active for at least 60 minutes',
    timeframe: 'Daily',
    category: 'Fitness',
    targetValue: 60,
    currentValue: 45,
    unit: 'mins',
    startDate: new Date().toISOString(),
    completed: false,
    streakDays: 3,
    autoSyncType: 'activeMins',
  },
  {
    id: 'goal-daily-4',
    title: 'Daily Task Execution',
    description: 'Complete 5 high-priority daily tasks',
    timeframe: 'Daily',
    category: 'Tasks',
    targetValue: 5,
    currentValue: 1,
    unit: 'tasks',
    startDate: new Date().toISOString(),
    completed: false,
    streakDays: 6,
    autoSyncType: 'tasks',
  },
  {
    id: 'goal-weekly-1',
    title: 'Weekly Workout Sessions',
    description: 'Complete 5 dedicated training workouts per week',
    timeframe: 'Weekly',
    category: 'Fitness',
    targetValue: 5,
    currentValue: 3,
    unit: 'workouts',
    startDate: new Date().toISOString(),
    completed: false,
    streakDays: 2,
  },
  {
    id: 'goal-weekly-2',
    title: 'Weekly Step Marathon',
    description: 'Accumulate 70,000 steps this week',
    timeframe: 'Weekly',
    category: 'Fitness',
    targetValue: 70000,
    currentValue: 44940,
    unit: 'steps',
    startDate: new Date().toISOString(),
    completed: false,
  },
  {
    id: 'goal-weekly-3',
    title: 'Weekly Knowledge & Learning',
    description: 'Read 3 chapters or listen to 3 hrs audiobooks',
    timeframe: 'Weekly',
    category: 'Learning',
    targetValue: 3,
    currentValue: 2,
    unit: 'hours',
    startDate: new Date().toISOString(),
    completed: false,
  },
  {
    id: 'goal-monthly-1',
    title: 'Monthly Active Fitness Goal',
    description: 'Log 1,200 active fitness minutes this month',
    timeframe: 'Monthly',
    category: 'Fitness',
    targetValue: 1200,
    currentValue: 840,
    unit: 'mins',
    startDate: new Date().toISOString(),
    completed: false,
  },
  {
    id: 'goal-monthly-2',
    title: 'Monthly Book Masterclass',
    description: 'Finish reading 2 complete books',
    timeframe: 'Monthly',
    category: 'Learning',
    targetValue: 2,
    currentValue: 1,
    unit: 'books',
    startDate: new Date().toISOString(),
    completed: false,
  },
  {
    id: 'goal-monthly-3',
    title: 'Monthly Hydration Discipline',
    description: 'Hit daily water intake goal 25 days out of the month',
    timeframe: 'Monthly',
    category: 'Hydration',
    targetValue: 25,
    currentValue: 18,
    unit: 'days',
    startDate: new Date().toISOString(),
    completed: false,
  },
  {
    id: 'goal-yearly-1',
    title: 'Yearly Running Milestone',
    description: 'Cover 500 total kilometers in outdoor runs',
    timeframe: 'Yearly',
    category: 'Fitness',
    targetValue: 500,
    currentValue: 320,
    unit: 'km',
    startDate: new Date().toISOString(),
    completed: false,
  },
  {
    id: 'goal-yearly-2',
    title: 'Personal Skills & Certification',
    description: 'Complete 3 major professional certifications',
    timeframe: 'Yearly',
    category: 'Learning',
    targetValue: 3,
    currentValue: 2,
    unit: 'certs',
    startDate: new Date().toISOString(),
    completed: false,
  }
];

export const initialDietPlan: DayDietPlan[] = [
  {
    day: 'Monday',
    breakfast: [
      { id: 'm-mon-b1', name: 'Oatmeal with Almonds & Honey', calories: 350, proteinGrams: 12, carbsGrams: 55, fatsGrams: 8, notes: 'Warm oats topped with sliced almonds & berries', completed: true },
      { id: 'm-mon-b2', name: 'Boiled Eggs / Tofu Scramble', calories: 150, proteinGrams: 14, carbsGrams: 2, fatsGrams: 10, notes: '2 eggs sprinkled with black pepper', completed: true },
      { id: 'm-mon-b3', name: 'Green Tea or Warm Lemon Water', calories: 5, proteinGrams: 0, carbsGrams: 1, fatsGrams: 0, notes: 'Hydrating morning detox drink', completed: true }
    ],
    lunch: [
      { id: 'm-mon-l1', name: 'Brown Rice / Multigrain Chapati (2)', calories: 240, proteinGrams: 6, carbsGrams: 48, fatsGrams: 3, notes: 'Rich complex carbs', completed: false },
      { id: 'm-mon-l2', name: 'Grilled Chicken Breast / Paneer Tikka', calories: 320, proteinGrams: 35, carbsGrams: 6, fatsGrams: 14, notes: 'High-protein main course', completed: false },
      { id: 'm-mon-l3', name: 'Dal & Mixed Green Salad', calories: 180, proteinGrams: 10, carbsGrams: 25, fatsGrams: 4, notes: 'Cucumber, tomato, lemon dressing', completed: false }
    ],
    snack: [
      { id: 'm-mon-s1', name: 'Handful of Roasted Makhana / Almonds', calories: 140, proteinGrams: 5, carbsGrams: 18, fatsGrams: 6, notes: 'Crunchy low-calorie snack', completed: false },
      { id: 'm-mon-s2', name: 'Black Coffee or Herbal Tea', calories: 10, proteinGrams: 0, carbsGrams: 2, fatsGrams: 0, notes: 'Pre-workout booster', completed: false }
    ],
    dinner: [
      { id: 'm-mon-d1', name: 'Moong Dal Khichdi or Quinoa Bowl', calories: 320, proteinGrams: 14, carbsGrams: 52, fatsGrams: 6, notes: 'Light and easy to digest', completed: false },
      { id: 'm-mon-d2', name: 'Steamed Vegetables & Cucumber Soup', calories: 110, proteinGrams: 4, carbsGrams: 18, fatsGrams: 2, notes: 'Broccoli, carrots, and zucchini', completed: false }
    ]
  },
  {
    day: 'Tuesday',
    breakfast: [
      { id: 'm-tue-b1', name: 'Sprouted Moong Salad with Lemon', calories: 220, proteinGrams: 15, carbsGrams: 32, fatsGrams: 2, notes: 'Fresh sprouted lentils with coriander', completed: false },
      { id: 'm-tue-b2', name: 'Greek Yogurt with Chia Seeds', calories: 180, proteinGrams: 16, carbsGrams: 12, fatsGrams: 6, notes: 'Probiotic rich breakfast', completed: false }
    ],
    lunch: [
      { id: 'm-tue-l1', name: 'Whole Wheat Roti (2) + Palak Paneer', calories: 420, proteinGrams: 22, carbsGrams: 45, fatsGrams: 18, notes: 'Iron and calcium rich', completed: false },
      { id: 'm-tue-l2', name: 'Bowl of Curd / Greek Yogurt', calories: 120, proteinGrams: 8, carbsGrams: 8, fatsGrams: 5, notes: 'Aids digestion', completed: false }
    ],
    snack: [
      { id: 'm-tue-s1', name: 'Apple Slices with Peanut Butter', calories: 210, proteinGrams: 7, carbsGrams: 25, fatsGrams: 10, notes: 'Natural energy booster', completed: false }
    ],
    dinner: [
      { id: 'm-tue-d1', name: 'Grilled Fish / Tofu Stir-Fry', calories: 310, proteinGrams: 32, carbsGrams: 10, fatsGrams: 14, notes: 'Lean protein dinner', completed: false },
      { id: 'm-tue-d2', name: 'Sautéed Bell Peppers & Spinach', calories: 90, proteinGrams: 3, carbsGrams: 12, fatsGrams: 3, notes: 'Antioxidant packed', completed: false }
    ]
  },
  {
    day: 'Wednesday',
    breakfast: [
      { id: 'm-wed-b1', name: 'Vegetable Upma / Oats Poha', calories: 280, proteinGrams: 8, carbsGrams: 46, fatsGrams: 7, notes: 'Loaded with peas, carrots & peanuts', completed: false },
      { id: 'm-wed-b2', name: 'Fresh Orange / Pomegranate Juice', calories: 110, proteinGrams: 2, carbsGrams: 26, fatsGrams: 0, notes: 'No added sugar', completed: false }
    ],
    lunch: [
      { id: 'm-wed-l1', name: 'Brown Rice + Rajma / Chole Curry', calories: 450, proteinGrams: 18, carbsGrams: 68, fatsGrams: 9, notes: 'Classic high-fiber meal', completed: false },
      { id: 'm-wed-l2', name: 'Fresh Onion & Cucumber Salad', calories: 45, proteinGrams: 1, carbsGrams: 9, fatsGrams: 0, notes: 'Hydrating salad side', completed: false }
    ],
    snack: [
      { id: 'm-wed-s1', name: 'Roasted Chana (Chickpeas) & Green Tea', calories: 160, proteinGrams: 9, carbsGrams: 24, fatsGrams: 3, notes: 'High fiber crunchy bite', completed: false }
    ],
    dinner: [
      { id: 'm-wed-d1', name: 'Vegetable Soup with Garlic Toast', calories: 260, proteinGrams: 7, carbsGrams: 38, fatsGrams: 8, notes: 'Cozy and soothing dinner', completed: false },
      { id: 'm-wed-d2', name: 'Egg White Omelette / Boiled Soybeans', calories: 140, proteinGrams: 20, carbsGrams: 4, fatsGrams: 4, notes: 'Pure lean protein', completed: false }
    ]
  },
  {
    day: 'Thursday',
    breakfast: [
      { id: 'm-thu-b1', name: 'Multigrain Toast with Avocados / Cheese', calories: 310, proteinGrams: 11, carbsGrams: 32, fatsGrams: 16, notes: 'Healthy monounsaturated fats', completed: false },
      { id: 'm-thu-b2', name: 'Boiled Eggs (2)', calories: 140, proteinGrams: 12, carbsGrams: 1, fatsGrams: 9, notes: 'Salt and black pepper', completed: false }
    ],
    lunch: [
      { id: 'm-thu-l1', name: 'Jowar / Bajra Roti (2) + Bhindi Fry', calories: 380, proteinGrams: 12, carbsGrams: 54, fatsGrams: 12, notes: 'Gluten-free millet roti', completed: false },
      { id: 'm-thu-l2', name: 'Yellow Dal Tadka & Buttermilk', calories: 170, proteinGrams: 9, carbsGrams: 22, fatsGrams: 5, notes: 'Digestive probiotic drink', completed: false }
    ],
    snack: [
      { id: 'm-thu-s1', name: 'Mixed Fruit Bowl (Papaya & Watermelon)', calories: 120, proteinGrams: 2, carbsGrams: 28, fatsGrams: 0, notes: 'Enzyme rich afternoon snack', completed: false }
    ],
    dinner: [
      { id: 'm-thu-d1', name: 'Baked Salmon / Paneer Tikka Salad', calories: 340, proteinGrams: 30, carbsGrams: 8, fatsGrams: 20, notes: 'Omega-3 fatty acids', completed: false },
      { id: 'm-thu-d2', name: 'Steamed Broccoli & Corn', calories: 95, proteinGrams: 4, carbsGrams: 16, fatsGrams: 1, notes: 'Vitamins & minerals boost', completed: false }
    ]
  },
  {
    day: 'Friday',
    breakfast: [
      { id: 'm-fri-b1', name: 'Besan Chilla / Oats Pancakes (2)', calories: 260, proteinGrams: 14, carbsGrams: 34, fatsGrams: 7, notes: 'Gram flour savory pancake with mint chutney', completed: false },
      { id: 'm-fri-b2', name: 'Filter Coffee / Chai with Stevia', calories: 50, proteinGrams: 2, carbsGrams: 6, fatsGrams: 2, notes: 'Morning warm refresher', completed: false }
    ],
    lunch: [
      { id: 'm-fri-l1', name: 'Grilled Chicken / Tofu Wrap or Sandwich', calories: 420, proteinGrams: 30, carbsGrams: 42, fatsGrams: 14, notes: 'Whole wheat wrap with lettuce & hummus', completed: false },
      { id: 'm-fri-l2', name: 'Spiced Sprouts & Tomato Salad', calories: 80, proteinGrams: 5, carbsGrams: 12, fatsGrams: 1, notes: 'Crunchy side dish', completed: false }
    ],
    snack: [
      { id: 'm-fri-s1', name: 'Protein Shake / Whey with Almond Milk', calories: 180, proteinGrams: 24, carbsGrams: 5, fatsGrams: 3, notes: 'Post-workout recovery drink', completed: false }
    ],
    dinner: [
      { id: 'm-fri-d1', name: 'Brown Rice Biryani / Veg Pulao with Raita', calories: 380, proteinGrams: 14, carbsGrams: 58, fatsGrams: 10, notes: 'Aromatic Friday evening dinner', completed: false }
    ]
  },
  {
    day: 'Saturday',
    breakfast: [
      { id: 'm-sat-b1', name: 'Idli (3) or Dosa with Sambhar & Coconut Chutney', calories: 340, proteinGrams: 10, carbsGrams: 62, fatsGrams: 6, notes: 'Fermented South Indian breakfast', completed: false },
      { id: 'm-sat-b2', name: 'Tender Coconut Water', calories: 45, proteinGrams: 1, carbsGrams: 9, fatsGrams: 0, notes: 'Natural electrolyte recharge', completed: false }
    ],
    lunch: [
      { id: 'm-sat-l1', name: 'Grilled Fish / Paneer Makhani + Whole Wheat Paratha', calories: 480, proteinGrams: 28, carbsGrams: 46, fatsGrams: 20, notes: 'Weekend reward meal', completed: false },
      { id: 'm-sat-l2', name: 'Fresh Salad & Mint Raita', calories: 90, proteinGrams: 3, carbsGrams: 10, fatsGrams: 4, notes: 'Cooling condiment', completed: false }
    ],
    snack: [
      { id: 'm-sat-s1', name: 'Walnuts & Dark Chocolate (2 squares)', calories: 170, proteinGrams: 4, carbsGrams: 14, fatsGrams: 12, notes: 'Brain food & antioxidants', completed: false }
    ],
    dinner: [
      { id: 'm-sat-d1', name: 'Lentil Soup with Roasted Sweet Potato', calories: 290, proteinGrams: 11, carbsGrams: 48, fatsGrams: 5, notes: 'Fiber rich light meal', completed: false }
    ]
  },
  {
    day: 'Sunday',
    breakfast: [
      { id: 'm-sun-b1', name: 'Stuffed Aloo-Paneer Paratha (1) with Curd', calories: 380, proteinGrams: 14, carbsGrams: 48, fatsGrams: 15, notes: 'Sunday comfort breakfast', completed: false },
      { id: 'm-sun-b2', name: 'Masala Chai', calories: 60, proteinGrams: 2, carbsGrams: 8, fatsGrams: 2, notes: 'Relaxing Sunday morning tea', completed: false }
    ],
    lunch: [
      { id: 'm-sun-l1', name: 'Special Sunday Thali (Dal, Sabzi, Rice, Chapati)', calories: 520, proteinGrams: 22, carbsGrams: 75, fatsGrams: 16, notes: 'Complete balanced family thali', completed: false }
    ],
    snack: [
      { id: 'm-sun-s1', name: 'Bhel Puri with Extra Sprouts & Lemon', calories: 190, proteinGrams: 6, carbsGrams: 32, fatsGrams: 4, notes: 'Light evening snack', completed: false }
    ],
    dinner: [
      { id: 'm-sun-d1', name: 'Clear Vegetable Soup & Light Toast', calories: 210, proteinGrams: 6, carbsGrams: 32, fatsGrams: 4, notes: 'Light detox dinner before Monday', completed: false }
    ]
  }
];

export const defaultUserSettings: UserSettings = {
  userName: 'Rohit',
  password: 'rohit123',
  avatarUrl: '',
  timeZone: 'Asia/Kolkata',
  theme: 'soft',
  waterGoalMl: 3000,
  stepsGoal: 10000,
  activeMinutesGoal: 60,
};

export const initialProfiles: UserProfile[] = [
  {
    id: 'profile-rohit',
    userName: 'Rohit',
    password: 'rohit123',
    roleTag: 'Personal',
    avatarUrl: '',
    timeZone: 'Asia/Kolkata',
    theme: 'soft',
    waterGoalMl: 3000,
    stepsGoal: 10000,
    activeMinutesGoal: 60,
    tasks: initialTasks,
    waterLogs: initialWaterLogs,
    fitnessLogs: initialFitnessLogs,
    todaySteps: 6420,
    todayActiveMins: 45,
    reminders: initialReminders,
    goals: initialGoals,
    dietPlan: initialDietPlan,
  }
];



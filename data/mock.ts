import type { Exercise, Meal, MealGroup, Post, Profile } from '../types';

export const initialProfile: Profile = {
  name: 'Alex Morgan',
  goal: 'Build strength',
  level: 'Intermediate',
  height: 172,
  weight: 68.5,
  duration: 30,
};
export const recommendation = {
  title: 'Full body, fresh energy',
  subtitle: 'A balanced strength session to make today count.',
  difficulty: 'Intermediate',
  minutes: 30,
  calories: 240,
};
export const exercises: Exercise[] = [
  {
    id: 'squat',
    name: 'Goblet squat',
    focus: 'Legs · core',
    sets: 3,
    reps: '12 reps',
    alternative: 'Bodyweight squat',
  },
  {
    id: 'push',
    name: 'Incline push-up',
    focus: 'Chest · shoulders',
    sets: 3,
    reps: '10 reps',
    alternative: 'Wall push-up',
  },
  {
    id: 'row',
    name: 'Dumbbell row',
    focus: 'Back · arms',
    sets: 3,
    reps: '12 reps / side',
    alternative: 'Resistance band row',
  },
  {
    id: 'lunge',
    name: 'Reverse lunge',
    focus: 'Legs · balance',
    sets: 3,
    reps: '10 reps / side',
    alternative: 'Step-up',
  },
  {
    id: 'plank',
    name: 'Forearm plank',
    focus: 'Core · stability',
    sets: 3,
    reps: '30 seconds',
    alternative: 'Dead bug',
  },
];
export const initialPosts: Post[] = [
  {
    id: 'p1',
    photo: 'running',
    name: 'Maya Perera',
    initials: 'MP',
    color: '#F1F5F9',
    time: '24 min ago',
    activity: 'Morning run · 5.2 km',
    caption:
      'A little sunrise, a little movement. Best way to start the day. Who else got outside this morning?',
    likes: 28,
    liked: false,
    comments: ['That sunrise sounds amazing!'],
  },
  {
    id: 'p2',
    photo: 'strength',
    name: 'Daniel Silva',
    initials: 'DS',
    color: '#EFF6FF',
    time: '1 hour ago',
    activity: 'Strength training · 45 min',
    caption:
      'Three weeks of showing up. Today I finally hit my squat goal! Small steps really do add up.',
    likes: 42,
    liked: false,
    comments: ['Keep it going!', 'Nice work, Daniel.'],
  },
  {
    id: 'p3',
    photo: 'welcome',
    name: 'Aisha Fernando',
    initials: 'AF',
    color: '#F1F5F9',
    time: '2 hours ago',
    activity: 'Mindful movement · 20 min',
    caption:
      'Rest days can still be good days. A gentle stretch and a big glass of water were all I needed.',
    likes: 19,
    liked: false,
    comments: [],
  },
];
export const mealGroups: MealGroup[] = ['Breakfast', 'Lunch', 'Dinner', 'Snacks'];
export const initialMeals: Meal[] = [
  {
    id: 'm1',
    group: 'Breakfast',
    name: 'Berry overnight oats',
    portion: '1 bowl · 08:00',
    calories: 380,
    protein: 18,
    carbs: 52,
    fat: 11,
  },
  {
    id: 'm2',
    group: 'Lunch',
    name: 'Grilled chicken & rice',
    portion: '1 plate · 12:30',
    calories: 540,
    protein: 42,
    carbs: 61,
    fat: 14,
  },
  {
    id: 'm3',
    group: 'Snacks',
    name: 'Greek yogurt & almonds',
    portion: '1 serving · 15:00',
    calories: 220,
    protein: 16,
    carbs: 15,
    fat: 11,
  },
];
export const foodOptions: Omit<Meal, 'id' | 'group'>[] = [
  {
    name: 'Salmon & roasted vegetables',
    portion: '1 plate',
    calories: 460,
    protein: 35,
    carbs: 28,
    fat: 22,
  },
  {
    name: 'Banana & peanut butter',
    portion: '1 serving',
    calories: 210,
    protein: 6,
    carbs: 30,
    fat: 8,
  },
  { name: 'Chickpea salad', portion: '1 bowl', calories: 320, protein: 14, carbs: 40, fat: 12 },
];
export const progress = {
  streak: 7,
  weeklyGoal: 5,
  completed: 4,
  calories: 1240,
  minutes: 165,
  previousWeight: 70.2,
};
export const weeklyActivity = [
  { day: 'M', full: 'Monday', minutes: 35 },
  { day: 'T', full: 'Tuesday', minutes: 40 },
  { day: 'W', full: 'Wednesday', minutes: 0 },
  { day: 'T', full: 'Thursday', minutes: 45 },
  { day: 'F', full: 'Friday', minutes: 45 },
  { day: 'S', full: 'Saturday', minutes: 0 },
  { day: 'S', full: 'Sunday', minutes: 0 },
];
export const achievements = [
  { icon: 'flame' as const, name: 'On a roll', detail: '7-day streak', earned: true },
  { icon: 'barbell' as const, name: 'Getting stronger', detail: '10 workouts', earned: true },
  { icon: 'trophy' as const, name: 'Next milestone', detail: '20 workouts', earned: false },
];

export type Exercise = {
  id: string;
  name: string;
  focus: string;
  sets: number;
  reps: string;
  alternative: string;
};
export type MealGroup = 'Breakfast' | 'Lunch' | 'Dinner' | 'Snacks';
export type Meal = {
  id: string;
  name: string;
  group: MealGroup;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  portion: string;
};
export type Post = {
  id: string;
  name: string;
  initials: string;
  color: string;
  time: string;
  activity: string;
  caption: string;
  likes: number;
  liked: boolean;
  comments: string[];
};
export type Profile = {
  name: string;
  goal: string;
  level: string;
  height: number;
  weight: number;
  duration: number;
};
export type WorkoutLog = { minutes: number; calories: number };

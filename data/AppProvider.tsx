import { createContext, useContext, useState, type ReactNode } from 'react';
import { exercises, initialMeals, initialPosts, initialProfile } from './mock';
import type { Exercise, Meal, Post, Profile, WorkoutLog } from '../types';

function useAppState() {
  const [profile, setProfile] = useState<Profile>(initialProfile);
  const [meals, setMeals] = useState<Meal[]>(initialMeals);
  const [posts, setPosts] = useState<Post[]>(initialPosts);
  const [water, setWater] = useState(4);
  const [notifications, setNotifications] = useState(true);
  const [plan, setPlan] = useState<Exercise[]>(exercises);
  const [shortened, setShortened] = useState(false);
  const [schedule, setSchedule] = useState('Today');
  const [workouts, setWorkouts] = useState<WorkoutLog[]>([]);
  const reset = () => {
    setProfile(initialProfile);
    setMeals(initialMeals);
    setPosts(initialPosts);
    setWater(4);
    setNotifications(true);
    setPlan(exercises);
    setShortened(false);
    setSchedule('Today');
    setWorkouts([]);
  };
  const toggleLike = (id: string) =>
    setPosts((current) =>
      current.map((post) =>
        post.id === id
          ? { ...post, liked: !post.liked, likes: post.likes + (post.liked ? -1 : 1) }
          : post,
      ),
    );
  const addComment = (id: string, comment: string) =>
    setPosts((current) =>
      current.map((post) =>
        post.id === id ? { ...post, comments: [...post.comments, comment.trim()] } : post,
      ),
    );
  const addPost = (caption: string) =>
    setPosts((current) => [
      {
        id: `post-${Date.now()}`,
        name: profile.name,
        initials: profile.name
          .split(' ')
          .map((part) => part[0])
          .slice(0, 2)
          .join(''),
        color: '#EFF6FF',
        time: 'Just now',
        activity: 'Making moves',
        caption: caption.trim(),
        likes: 0,
        liked: false,
        comments: [],
      },
      ...current,
    ]);
  const replaceExercise = (id: string) =>
    setPlan((current) =>
      current.map((exercise) =>
        exercise.id === id
          ? { ...exercise, name: exercise.alternative, alternative: exercise.name }
          : exercise,
      ),
    );
  const skipExercise = (id: string) =>
    setPlan((current) => current.filter((exercise) => exercise.id !== id));
  const restorePlan = () => {
    setPlan(exercises);
    setShortened(false);
  };
  const duration = Math.round(((shortened ? 20 : 30) * plan.length) / exercises.length);
  const workoutCalories = duration * 8;
  const completeWorkout = (minutes: number) =>
    setWorkouts((current) => [...current, { minutes, calories: minutes * 8 }]);
  return {
    profile,
    setProfile,
    meals,
    setMeals,
    posts,
    water,
    setWater,
    notifications,
    setNotifications,
    plan,
    shortened,
    setShortened,
    schedule,
    setSchedule,
    workouts,
    reset,
    toggleLike,
    addComment,
    addPost,
    replaceExercise,
    skipExercise,
    restorePlan,
    duration,
    workoutCalories,
    completeWorkout,
  };
}
type AppState = ReturnType<typeof useAppState>;
const AppContext = createContext<AppState | null>(null);
export function AppProvider({ children }: { children: ReactNode }) {
  const state = useAppState();
  return <AppContext.Provider value={state}>{children}</AppContext.Provider>;
}
export function useApp() {
  const context = useContext(AppContext);
  if (!context) throw new Error('FitFlow screens require AppProvider');
  return context;
}

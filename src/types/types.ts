export interface User {
  id: string;
  name: string;
  email: string;
  role: 'user' | 'admin';
  avatar?: string;
  createdAt: string;
}

export interface AuthResponse {
  token: string;
  user: User;
}
export interface Challenge {
  id: string;
  title: string;
  description: string;
  durationDays: number;
  createdAt: string;
  updatedAt: string;
}

export interface UserChallenge {
  id: string;
  userId: string;
  challengeId: string;
  startDate: string;
  endDate?: string;
  status: 'active' | 'completed' | 'failed';
  progress: {
    completedDays: number;
    currentStreak: number;
  };
  livesRemaining: number;
  missedDays: number;
  habitCount: number;
  createdAt: string;
  challenge: Challenge;
}

export interface ChallengeStats {
  totalParticipants: number;
  activeParticipants: number;
  completionRate: number;
}

export interface ChallengeProgress {
  userChallenge: {
    id: string;
    startDate: string;
    status: 'active' | 'completed' | 'failed';
    progress: {
      completedDays: number;
      currentStreak: number;
      lastCompletedDate?: string;
    };
    livesRemaining: number;
    missedDays: number;
  };
  challenge: {
    id: string;
    title: string;
    description: string;
    durationDays: number;
  };
  habits: Habit[];
  todayCompleted: boolean;
}
export interface Habit {
  id: string;
  userId: string;
  challengeId: string;
  title: string;
  completedToday?: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface HabitLog {
  id: string;
  habitId: string;
  date: string;
  completed: boolean;
  createdAt: string;
}

export interface HabitWithLogs extends Habit {
  logs: HabitLog[];
  streak?: number;
  completionRate?: number;
}

export interface UserHabit {
  id: string;
  userId?: string;
  title: string;
  description?: string | null;
  color: string;
  isArchived: boolean;
  logs?: { date: string }[];
  streak?: number;
  completionRate?: number;
  createdAt: string;
  updatedAt?: string;
}

export interface UserHabitAnalyticsItem {
  habit: UserHabit;
  currentStreak: number;
  longestStreak: number;
  totalCompletions: number;
  completedToday: boolean;
  lastCompletedDate: string;
}

export interface UserHabitAnalyticsSummary {
  totalHabits: number;
  completedTodayCount: number;
  habits: UserHabitAnalyticsItem[];
}

export interface UserHabitWeeklyBreakdown {
  weekStart: string;
  weekEnd: string;
  completed: number;
  total: number;
}

export interface UserHabitMonthlyBreakdown {
  month: string;
  completed: number;
  total: number;
  completionRate: number;
}

export interface UserHabitAnalytics {
  currentStreak: number;
  longestStreak: number;
  totalCompletions: number;
  lastCompletedDate: string;
  completedToday: boolean;
  completionRateLast7: number;
  completionRateLast30: number;
  weeklyBreakdown: UserHabitWeeklyBreakdown[];
  monthlyBreakdown: UserHabitMonthlyBreakdown[];
}

export interface UserHabitAnalyticsResponse {
  habit: UserHabit;
  analytics: UserHabitAnalytics;
}

export interface UserHabitLog {
  id: string;
  dateCompleted: string;
}
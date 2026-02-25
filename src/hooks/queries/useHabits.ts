import { useQuery } from '@tanstack/react-query';
import { getHabitsInChallenge, getUserHabits, getUserHabitsSummary, getUserHabitAnalytics } from '@/apis/habits';

export const useHabitsInChallenge = (challengeId: string) => {
  return useQuery({
    queryKey: ['habits', 'challenge', challengeId],
    queryFn: () => getHabitsInChallenge(challengeId),
    enabled: !!challengeId,
  });
};

export const useUserHabits = () => {
  return useQuery({
    queryKey: ['user-habits'],
    queryFn: getUserHabits,
  });
};

export const useUserHabitsSummary = () => {
  return useQuery({
    queryKey: ['user-habits', 'analytics', 'summary'],
    queryFn: getUserHabitsSummary,
  });
};

export const useUserHabitAnalytics = (habitId: string) => {
  return useQuery({
    queryKey: ['user-habits', habitId, 'analytics'],
    queryFn: () => getUserHabitAnalytics(habitId),
    enabled: !!habitId,
  });
};
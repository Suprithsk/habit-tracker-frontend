import { useQuery } from '@tanstack/react-query';
import { getHabitsInChallenge } from '@/apis/habits';

export const useHabitsInChallenge = (challengeId: string) => {
  return useQuery({
    queryKey: ['habits', 'challenge', challengeId],
    queryFn: () => getHabitsInChallenge(challengeId),
    enabled: !!challengeId,
  });
};
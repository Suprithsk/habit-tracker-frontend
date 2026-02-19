import { useQuery } from '@tanstack/react-query';
import { getAllChallenges, getChallengeById, getMyChallenges, getMyChallengeProgress } from '@/apis/challenges';

export const useAllChallenges = (params?: { search?: string; sortBy?: string }) => {
  return useQuery({
    queryKey: ['challenges', params],
    queryFn: () => getAllChallenges(params),
  });
};

export const useChallengeById = (id: string) => {
  return useQuery({
    queryKey: ['challenges', id],
    queryFn: () => getChallengeById(id),
    enabled: !!id,
  });
};

export const useMyChallenges = () => {
  return useQuery({
    queryKey: ['my-challenges'],
    queryFn: getMyChallenges,
  });
};

export const useMyChallengeProgress = (challengeId: string) => {
  return useQuery({
    queryKey: ['my-challenges', challengeId, 'progress'],
    queryFn: () => getMyChallengeProgress(challengeId),
    enabled: !!challengeId,
  });
};
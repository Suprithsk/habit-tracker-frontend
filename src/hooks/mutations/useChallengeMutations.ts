import { useMutation, useQueryClient } from '@tanstack/react-query';
import { joinChallenge, leaveChallenge, createChallenge, updateChallenge, deleteChallenge } from '@/apis/challenges';
import { CreateChallengeInput, UpdateChallengeInput, JoinChallengeInput } from '@/schemas/challengeSchema';

export const useJoinChallenge = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ challengeId, data }: { challengeId: string; data?: JoinChallengeInput }) =>
      joinChallenge(challengeId, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['my-challenges'] });
      queryClient.invalidateQueries({ queryKey: ['challenges'] });
    },
  });
};

export const useLeaveChallenge = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: leaveChallenge,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['my-challenges'] });
    },
  });
};

export const useCreateChallenge = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateChallengeInput) => createChallenge(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['challenges'] });
    },
  });
};

export const useUpdateChallenge = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdateChallengeInput }) => 
      updateChallenge(id, data),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['challenges'] });
      queryClient.invalidateQueries({ queryKey: ['challenges', variables.id] });
    },
  });
};

export const useDeleteChallenge = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteChallenge,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['challenges'] });
    },
  });
};
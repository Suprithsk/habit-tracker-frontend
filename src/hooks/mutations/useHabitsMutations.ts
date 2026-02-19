import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createHabit, updateHabit, deleteHabit } from "@/apis/habits";
import { logHabit, unlogHabit } from "@/apis/habits";
import {
  CreateHabitInput,
  UpdateHabitInput,
  LogHabitInput,
} from "@/schemas/habitSchema";

export const useCreateHabit = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      challengeId,
      data,
    }: {
      challengeId: string;
      data: CreateHabitInput;
    }) => createHabit(challengeId, data),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["habits", "challenge", variables.challengeId],
      });
      queryClient.invalidateQueries({ queryKey: ["my-challenges"] });
    },
  });
};

export const useUpdateHabit = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      habitId,
      data,
    }: {
      habitId: string;
      data: UpdateHabitInput;
    }) => updateHabit(habitId, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["habits"] });
    },
  });
};

export const useDeleteHabit = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteHabit,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["habits"] });
      queryClient.invalidateQueries({ queryKey: ["my-challenges"] });
    },
  });
};

export const useLogHabit = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      habitId,
      data,
    }: {
      habitId: string;
      data?: LogHabitInput;
    }) => logHabit(habitId, data),
    onSuccess: () => {
      // Invalidate all related queries when a habit is logged
      queryClient.invalidateQueries({ queryKey: ["habits"] });
      queryClient.invalidateQueries({ queryKey: ["my-challenges"] });
    },
  });
};

export const useUnlogHabit = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ habitId, date }: { habitId: string; date: string }) =>
      unlogHabit(habitId, date),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["habits"] });
      queryClient.invalidateQueries({ queryKey: ["my-challenges"] });
    },
  });
};

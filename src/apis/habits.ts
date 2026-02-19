import apiClient from './apiClient';
import { Habit, HabitLog, HabitWithLogs } from '@/types/types';
import { CreateHabitInput, LogHabitInput, UpdateHabitInput } from '@/schemas/habitSchema';

export const getHabitsInChallenge = async (userChallengeId: string): Promise<HabitWithLogs[]> => {
  const response = await apiClient.get(`/my-challenges/${userChallengeId}/habits`);
  return response.data.habits;
};

export const createHabit = async (userChallengeId: string, data: CreateHabitInput): Promise<Habit> => {
  const response = await apiClient.post(`/my-challenges/${userChallengeId}/habits`, data);
  return response.data.habit;
};

export const updateHabit = async (habitId: string, data: UpdateHabitInput): Promise<Habit> => {
  const response = await apiClient.put(`/habits/${habitId}`, data);
  return response.data.habit;
};

export const deleteHabit = async (habitId: string) => {
  const response = await apiClient.delete(`/habits/${habitId}`);
  return response.data;
};
export const logHabit = async (habitId: string, data?: LogHabitInput): Promise<HabitLog> => {
  const response = await apiClient.post(`/habits/${habitId}/log`, data || {});
  return response.data.log;
};

export const unlogHabit = async (habitId: string, date: string) => {
  const response = await apiClient.delete(`/habits/${habitId}/log/${date}`);
  return response.data;
};

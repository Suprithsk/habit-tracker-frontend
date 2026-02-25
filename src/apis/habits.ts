import apiClient from './apiClient';
import { Habit, HabitLog, HabitWithLogs, UserHabit, UserHabitAnalyticsSummary, UserHabitAnalyticsResponse, UserHabitLog } from '@/types/types';
import { CreateHabitInput, LogHabitInput, UpdateHabitInput, CreateUserHabitInput, UpdateUserHabitInput } from '@/schemas/habitSchema';

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

export const createUserHabit = async (data: CreateUserHabitInput): Promise<UserHabit> => {
  const response = await apiClient.post('/user-habits', data);
  return response.data.habit;
};

export const getUserHabits = async (): Promise<UserHabit[]> => {
  const response = await apiClient.get('/user-habits');
  return response.data.habits;
};

export const getUserHabitsSummary = async (): Promise<UserHabitAnalyticsSummary> => {
  const response = await apiClient.get('/user-habits/analytics/summary');
  return response.data;
};

export const getUserHabitAnalytics = async (habitId: string): Promise<UserHabitAnalyticsResponse> => {
  const response = await apiClient.get(`/user-habits/${habitId}/analytics`);
  return response.data;
};

export const logUserHabit = async (habitId: string): Promise<UserHabitLog> => {
  const response = await apiClient.post(`/user-habits/${habitId}/log`, {});
  return response.data.log;
};

export const updateUserHabit = async (habitId: string, data: UpdateUserHabitInput): Promise<UserHabit> => {
  const response = await apiClient.put(`/user-habits/${habitId}`, data);
  return response.data.habit;
};

export const deleteUserHabit = async (habitId: string): Promise<void> => {
  await apiClient.delete(`/user-habits/${habitId}`);
};

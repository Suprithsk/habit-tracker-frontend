import apiClient from './apiClient';
import { Challenge, UserChallenge, ChallengeStats, ChallengeProgress } from '@/types/types';
import { CreateChallengeInput, UpdateChallengeInput, JoinChallengeInput } from '@/schemas/challengeSchema';

// Public endpoints
export const getAllChallenges = async (params?: { search?: string; sortBy?: string }): Promise<Challenge[]> => {
  const response = await apiClient.get('/challenges', { params });
  return response.data.challenges;
};

export const getChallengeById = async (id: string): Promise<Challenge> => {
  const response = await apiClient.get(`/challenges/${id}`);
  return response.data.challenge;
};

// User endpoints
export const getMyChallenges = async (): Promise<UserChallenge[]> => {
  const response = await apiClient.get('/my-challenges');
  return response.data.challenges;
};

export const getMyChallengeProgress = async (challengeId: string): Promise<ChallengeProgress> => {
  const response = await apiClient.get(`/my-challenges/${challengeId}`);
  return response.data;
};

export const joinChallenge = async (challengeId: string, data?: JoinChallengeInput) => {
  const response = await apiClient.post(`/challenges/${challengeId}/join`, data || {});
  return response.data;
};

export const leaveChallenge = async (challengeId: string) => {
  const response = await apiClient.delete(`/challenges/${challengeId}/leave`);
  return response.data;
};

// Admin endpoints
export const createChallenge = async (data: CreateChallengeInput): Promise<Challenge> => {
  const response = await apiClient.post('/challenges', data);
  return response.data.challenge;
};

export const updateChallenge = async (id: string, data: UpdateChallengeInput): Promise<Challenge> => {
  const response = await apiClient.put(`/challenges/${id}`, data);
  return response.data.challenge;
};

export const deleteChallenge = async (id: string) => {
  const response = await apiClient.delete(`/challenges/${id}`);
  return response.data;
};

export const getChallengeStats = async (id: string): Promise<ChallengeStats> => {
  const response = await apiClient.get(`/challenges/${id}/stats`);
  return response.data.stats;
};
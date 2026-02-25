import { useQuery } from '@tanstack/react-query';
import { getMe, getAllUsers, getUserPublicProfile } from '@/apis/auth';

export const useMe = () => {
  return useQuery({
    queryKey: ['auth', 'me'],
    queryFn: getMe,
    retry: false,
    staleTime: 1000 * 60 * 10, // 10 minutes
  });
};

export const useAllUsers = () => {
  return useQuery({
    queryKey: ['users'],
    queryFn: getAllUsers,
  });
};

export const useUserPublicProfile = (userId: string) => {
  return useQuery({
    queryKey: ['public-profile', userId],
    queryFn: () => getUserPublicProfile(userId),
    enabled: !!userId,
    staleTime: 1000 * 60 * 5,
  });
};
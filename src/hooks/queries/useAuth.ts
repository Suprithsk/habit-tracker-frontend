import { useQuery } from '@tanstack/react-query';
import { getMe, getAllUsers } from '@/apis/auth';

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
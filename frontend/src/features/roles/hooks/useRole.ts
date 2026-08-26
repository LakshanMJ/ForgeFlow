import { useQuery } from '@tanstack/react-query';
import { getRole } from '../api/roles.api';

export const useRole = (id: string) => {
  return useQuery({
    queryKey: ['roles', id],
    queryFn: () => getRole(id),
    enabled: !!id,
  });
};
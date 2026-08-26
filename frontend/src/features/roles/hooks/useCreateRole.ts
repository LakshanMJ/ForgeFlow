import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createRole } from '../api/roles.api';

export const useCreateRole = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createRole,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['roles'],
      });
    },
  });
};
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateRole } from '../api/roles.api';

export const useUpdateRole = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      id,
      data,
    }: {
      id: string;
      data: any;
    }) => updateRole(id, data),

    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: ['roles'],
      });

      queryClient.invalidateQueries({
        queryKey: ['roles', variables.id],
      });
    },
  });
};
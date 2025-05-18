import { useMutation, useQueryClient } from '@tanstack/react-query'
import { api } from '../core/axios'
import { queries } from '../core/query'

const deleteUser = (id: string) => api.delete(`users/${id}`)

export const useDeleteUser = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: deleteUser,
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: queries.users.findMany._def
      })
    }
  })
}

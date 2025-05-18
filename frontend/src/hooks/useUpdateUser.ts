import { useMutation, useQueryClient } from '@tanstack/react-query'
import { api } from '../core/axios'
import type { User } from '../types'
import { queries } from '../core/query'

const updateUser = ({ id, user }: { id: string; user: User }) =>
  api.put(`users/${id}`, user).then(({ data }) => data)

export const useUpdateUser = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: updateUser,
    onSuccess: async (_, { id }) => {
      await Promise.all([
        queryClient.invalidateQueries({
          queryKey: queries.users.findMany._def
        }),
        queryClient.invalidateQueries({
          queryKey: queries.users.find(id).queryKey
        })
      ])
    }
  })
}

import { useMutation, useQueryClient } from '@tanstack/react-query'
import { api } from '../core/axios'
import type { User } from '../types'
import { queries } from '../core/query'

const createUser = (user: User) => api.post('users', user).then(({ data }) => data)

export const useCreateUser = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: createUser,
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: queries.users.findMany._def
      })
    }
  })
}

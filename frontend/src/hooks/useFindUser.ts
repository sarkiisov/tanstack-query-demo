import { useQuery } from '@tanstack/react-query'
import type { User } from '../types'
import { queries } from '../core/query'

export const useFindUser = (id: string) => {
  return useQuery<User>(queries.users.find(id))
}

import { useQuery } from '@tanstack/react-query'
import type { User } from '../types'
import { queries } from '../core/query'

export const useFindManyUsers = () => {
  return useQuery<User[]>(queries.users.findMany())
}

import { QueryClient, type QueryFunction } from '@tanstack/react-query'
import type { AxiosRequestConfig } from 'axios'
import path from 'path-browserify'
import { api } from './axios'
import { createQueryKeys, mergeQueryKeys } from '@lukemorales/query-key-factory'

export type DefaultQueryKey = [string, string, AxiosRequestConfig & { path?: string }]

const usersQueryKeys = createQueryKeys('users', {
  findMany: () => [{}], // -> ["users", "findMany", {}]
  find: (id: string) => [{ path: id }], // -> ["users", "find", { path: id }]
  findManyAttributes: () => [{ url: 'usersAttributes' }] // -> ["users", "findManyAttributes", { url: "usersAttributes" }]
})

// const othersQueryKeys = createQueryKeys("others", ...)

export const queries = mergeQueryKeys(
  usersQueryKeys
  // othersQueryKeys
)

const defaultQueryFn: QueryFunction = async ({ queryKey }) => {
  const [basePath, , axiosRequestParams] = queryKey as DefaultQueryKey

  return await api({
    url: path.join(basePath, axiosRequestParams.path || ''),
    ...axiosRequestParams
  }).then(({ data }) => data)
}

export const queryClient = new QueryClient({
  defaultOptions: { queries: { queryFn: defaultQueryFn, retry: 1 } }
})

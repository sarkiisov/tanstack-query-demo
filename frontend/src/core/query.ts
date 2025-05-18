import { QueryClient, type QueryFunction } from '@tanstack/react-query'
import type { AxiosRequestConfig } from 'axios'
import path from 'path-browserify'
import { api } from './axios'
import { createQueryKeys, mergeQueryKeys } from '@lukemorales/query-key-factory'

const defaultQueryFn: QueryFunction = async ({ queryKey }) => {
  const [basePath, , axiosRequestParams] = queryKey as [
    string,
    string,
    AxiosRequestConfig & { path?: string }
  ]

  try {
    const data = await api({
      ...axiosRequestParams,
      url: path.join(basePath, axiosRequestParams.path || '')
    })
    return await Promise.resolve(data.data)
  } catch (error) {
    return Promise.reject(error)
  }
}

export const queryClient = new QueryClient({
  defaultOptions: { queries: { queryFn: defaultQueryFn, retry: 1 } }
})

const usersQueryKeys = createQueryKeys('users', {
  findMany: () => [{}],
  find: (id: string) => [{ path: id }]
})

// const othersQueryKeys = createQueryKeys("others", ...)

export const queries = mergeQueryKeys(
  usersQueryKeys
  // othersQueryKeys
)

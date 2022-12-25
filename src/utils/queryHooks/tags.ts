import apiInstance from '@api/instance'
import { AxiosError } from 'axios'
import {
  QueryFunctionContext,
  useInfiniteQuery,
  UseInfiniteQueryOptions,
  useMutation,
  UseMutationOptions,
  useQuery,
  UseQueryOptions
} from '@tanstack/react-query'
import { infinitePageParams } from './utils'
import { PagedResponse } from '@api/helpers'
import { useSelector } from 'react-redux'
import { checkInstanceFeature } from '@utils/slices/instancesSlice'

export type QueryKeyFollowedTags = ['FollowedTags']
const useFollowedTagsQuery = (
  params: {
    options?: Omit<
      UseInfiniteQueryOptions<PagedResponse<Mastodon.Tag[]>, AxiosError>,
      'getPreviousPageParam' | 'getNextPageParam'
    >
  } | void
) => {
  const canFollowTags = useSelector(checkInstanceFeature('follow_tags'))

  const queryKey: QueryKeyFollowedTags = ['FollowedTags']
  return useInfiniteQuery(
    queryKey,
    async ({ pageParam }: QueryFunctionContext<QueryKeyFollowedTags>) => {
      const params: { [key: string]: string } = { ...pageParam }
      return await apiInstance<Mastodon.Tag[]>({
        method: 'get',
        url: `followed_tags`,
        params: { limit: 200, ...params }
      })
    },
    {
      enabled: canFollowTags,
      staleTime: Infinity,
      cacheTime: Infinity,
      ...params?.options,
      ...infinitePageParams
    }
  )
}

export type QueryKeyTags = ['Tags', { tag: string }]
const queryFunction = async ({ queryKey }: QueryFunctionContext<QueryKeyTags>) => {
  const { tag } = queryKey[1]

  const res = await apiInstance<Mastodon.Tag>({ method: 'get', url: `tags/${tag}` })
  return res.body
}
const useTagsQuery = ({
  options,
  ...queryKeyParams
}: QueryKeyTags[1] & {
  options?: UseQueryOptions<Mastodon.Tag, AxiosError>
}) => {
  const queryKey: QueryKeyTags = ['Tags', { ...queryKeyParams }]
  return useQuery(queryKey, queryFunction, options)
}

type MutationVarsAnnouncement = { tag: string; to: boolean }
const mutationFunction = async ({ tag, to }: MutationVarsAnnouncement) => {
  return apiInstance<{}>({
    method: 'post',
    url: `tags/${tag}/${to ? 'follow' : 'unfollow'}`
  })
}
const useTagsMutation = (options: UseMutationOptions<{}, AxiosError, MutationVarsAnnouncement>) => {
  return useMutation(mutationFunction, options)
}

export { useFollowedTagsQuery, useTagsQuery, useTagsMutation }

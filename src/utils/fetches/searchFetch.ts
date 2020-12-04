import client from 'src/api/client'

export const searchFetch = async (
  {} = {},
  {
    type,
    term,
    limit = 20
  }: {
    type: 'accounts' | 'hashtags' | 'statuses'
    term: string
    limit?: number
  }
) => {
  const res = await client({
    version: 'v2',
    method: 'get',
    instance: 'local',
    endpoint: 'search',
    query: { type, q: term, limit }
  })
  console.log('search query')
  console.log({ type, q: term, limit })
  console.log('search result')
  console.log(res.body)
  return Promise.resolve(res.body)
}

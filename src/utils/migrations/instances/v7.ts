import { ComposeStateDraft } from '@screens/Compose/utils/types'
import { QueryKeyTimeline } from '@utils/queryHooks/timeline'

type Instance = {
  active: boolean
  appData: {
    clientId: string
    clientSecret: string
  }
  url: string
  token: string
  uri: Mastodon.Instance['uri']
  urls: Mastodon.Instance['urls']
  account: {
    id: Mastodon.Account['id']
    acct: Mastodon.Account['acct']
    avatarStatic: Mastodon.Account['avatar_static']
    preferences: Mastodon.Preferences
  }
  max_toot_chars?: number // To be deprecated in v4
  configuration?: Mastodon.Instance['configuration']
  filters: Mastodon.Filter[]
  notifications_filter: {
    follow: boolean
    favourite: boolean
    reblog: boolean
    mention: boolean
    poll: boolean
    follow_request: boolean
  }
  push: {
    global: { loading: boolean; value: boolean }
    decode: { loading: boolean; value: boolean }
    alerts: {
      follow: {
        loading: boolean
        value: Mastodon.PushSubscription['alerts']['follow']
      }
      favourite: {
        loading: boolean
        value: Mastodon.PushSubscription['alerts']['favourite']
      }
      reblog: {
        loading: boolean
        value: Mastodon.PushSubscription['alerts']['reblog']
      }
      mention: {
        loading: boolean
        value: Mastodon.PushSubscription['alerts']['mention']
      }
      poll: {
        loading: boolean
        value: Mastodon.PushSubscription['alerts']['poll']
      }
    }
    keys: {
      auth?: string
      public?: string // legacy
      private?: string // legacy
    }
  }
  timelinesLookback?: {
    [key: string]: {
      queryKey: QueryKeyTimeline
      ids: Mastodon.Status['id'][]
    }
  }
  mePage: {
    lists: { shown: boolean }
    announcements: { shown: boolean; unread: number }
  }
  drafts: ComposeStateDraft[]
}

export type InstanceV7 = {
  instances: Instance[]
}

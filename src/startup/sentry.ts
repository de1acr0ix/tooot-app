import Constants from 'expo-constants'
import * as Sentry from 'sentry-expo'
import log from './log'

const sentry = () => {
  log('log', 'Sentry', 'initializing')
  Sentry.init({
    dsn: Constants.manifest.extra.sentryDSN,
    enableInExpoDevelopment: true,
    debug: __DEV__
  })
}

export default sentry
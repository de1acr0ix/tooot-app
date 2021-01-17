import AsyncStorage from '@react-native-async-storage/async-storage'
import {
  combineReducers,
  configureStore,
  getDefaultMiddleware
} from '@reduxjs/toolkit'
import contextsSlice from '@utils/slices/contextsSlice'
import instancesSlice from '@utils/slices/instancesSlice'
import settingsSlice from '@utils/slices/settingsSlice'
import { persistReducer, persistStore } from 'redux-persist'
import createSecureStore from 'redux-persist-expo-securestore'

const secureStorage = createSecureStore()

const prefix = 'mastodon_app'

const contextsPersistConfig = {
  key: 'contexts',
  prefix,
  storage: AsyncStorage
}

const instancesPersistConfig = {
  key: 'instances',
  prefix,
  version: 1,
  storage: secureStorage,
  debug: true
}

const settingsPersistConfig = {
  key: 'settings',
  prefix,
  storage: secureStorage
}

const rootPersistConfig = {
  key: 'root',
  prefix,
  version: 0,
  storage: AsyncStorage
}

const rootReducer = combineReducers({
  contexts: persistReducer(contextsPersistConfig, contextsSlice),
  instances: persistReducer(instancesPersistConfig, instancesSlice),
  settings: persistReducer(settingsPersistConfig, settingsSlice)
})

const store = configureStore({
  reducer: persistReducer(rootPersistConfig, rootReducer),
  middleware: getDefaultMiddleware({
    serializableCheck: {
      ignoredActions: ['persist/PERSIST']
    }
  })
})

let persistor = persistStore(store)

export { store, persistor }
export type RootState = ReturnType<typeof store.getState>

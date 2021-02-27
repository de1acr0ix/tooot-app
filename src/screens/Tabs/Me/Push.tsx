import { MenuContainer, MenuRow } from '@components/Menu'
import { updateInstancePush } from '@utils/slices/instances/updatePush'
import { updateInstancePushAlert } from '@utils/slices/instances/updatePushAlert'
import { updateInstancePushDecode } from '@utils/slices/instances/updatePushDecode'
import { getInstancePush } from '@utils/slices/instancesSlice'
import * as WebBrowser from 'expo-web-browser'
import React, { useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { ScrollView } from 'react-native-gesture-handler'
import { useDispatch, useSelector } from 'react-redux'

const ScreenMeSettingsPush: React.FC = () => {
  const { t } = useTranslation('meSettingsPush')
  const dispatch = useDispatch()
  const instancePush = useSelector(getInstancePush)

  const isLoading = instancePush?.global.loading || instancePush?.decode.loading

  const alerts = useMemo(() => {
    return instancePush?.alerts
      ? (['follow', 'favourite', 'reblog', 'mention', 'poll'] as [
          'follow',
          'favourite',
          'reblog',
          'mention',
          'poll'
        ]).map(alert => (
          <MenuRow
            key={alert}
            title={t(`content.${alert}.heading`)}
            switchDisabled={!instancePush.global.value || isLoading}
            switchValue={instancePush?.alerts[alert].value}
            switchOnValueChange={() =>
              dispatch(
                updateInstancePushAlert({
                  changed: alert,
                  alerts: {
                    ...instancePush.alerts,
                    [alert]: {
                      ...instancePush?.alerts[alert],
                      value: !instancePush?.alerts[alert].value
                    }
                  }
                })
              )
            }
          />
        ))
      : null
  }, [instancePush?.global, instancePush?.alerts, isLoading])

  return (
    <ScrollView>
      <MenuContainer>
        <MenuRow
          title={t('content.global.heading')}
          description={t('content.global.description')}
          loading={instancePush?.global.loading}
          switchDisabled={isLoading}
          switchValue={instancePush?.global.value}
          switchOnValueChange={() =>
            dispatch(updateInstancePush(!instancePush?.global.value))
          }
        />
      </MenuContainer>
      <MenuContainer>
        <MenuRow
          title={t('content.decode.heading')}
          description={t('content.decode.description')}
          loading={instancePush?.decode.loading}
          switchDisabled={!instancePush?.global.value || isLoading}
          switchValue={instancePush?.decode.value}
          switchOnValueChange={() =>
            dispatch(updateInstancePushDecode(!instancePush?.decode.value))
          }
        />
        <MenuRow
          title={t('content.howitworks')}
          iconBack='ExternalLink'
          onPress={() =>
            WebBrowser.openBrowserAsync('https://tooot.app/how-push-works')
          }
        />
      </MenuContainer>
      <MenuContainer>{alerts}</MenuContainer>
    </ScrollView>
  )
}

export default ScreenMeSettingsPush

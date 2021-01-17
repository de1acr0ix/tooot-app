import Button from '@components/Button'
import { StyleConstants } from '@utils/styles/constants'
import { Video } from 'expo-av'
import { Surface } from 'gl-react-expo'
import { Blurhash } from 'gl-react-blurhash'
import React, { useCallback, useRef, useState } from 'react'
import { Pressable, StyleSheet, View } from 'react-native'
import attachmentAspectRatio from './aspectRatio'

export interface Props {
  total: number
  index: number
  sensitiveShown: boolean
  video: Mastodon.AttachmentVideo | Mastodon.AttachmentGifv
}

const AttachmentVideo: React.FC<Props> = ({
  total,
  index,
  sensitiveShown,
  video
}) => {
  const videoPlayer = useRef<Video>(null)
  const [videoLoading, setVideoLoading] = useState(false)
  const [videoLoaded, setVideoLoaded] = useState(false)
  const [videoPosition, setVideoPosition] = useState<number>(0)
  const playOnPress = useCallback(async () => {
    setVideoLoading(true)
    if (!videoLoaded) {
      await videoPlayer.current?.loadAsync({ uri: video.url })
    }
    await videoPlayer.current?.setPositionAsync(videoPosition)
    await videoPlayer.current?.presentFullscreenPlayer()
    videoPlayer.current?.playAsync()
    setVideoLoading(false)
    videoPlayer.current?.setOnPlaybackStatusUpdate(props => {
      if (props.isLoaded) {
        setVideoLoaded(true)
      }
      // @ts-ignore
      if (props.positionMillis) {
        // @ts-ignore
        setVideoPosition(props.positionMillis)
      }
    })
  }, [videoLoaded, videoPosition])

  return (
    <View
      style={[
        styles.base,
        { aspectRatio: attachmentAspectRatio({ total, index }) }
      ]}
    >
      <Video
        ref={videoPlayer}
        style={{
          width: '100%',
          height: '100%',
          opacity: sensitiveShown ? 0 : 1
        }}
        resizeMode='cover'
        usePoster
        posterSource={{ uri: video.preview_url }}
        posterStyle={{ resizeMode: 'cover' }}
        useNativeControls={false}
        onFullscreenUpdate={event => {
          if (event.fullscreenUpdate === 3) {
            videoPlayer.current?.pauseAsync()
          }
        }}
      />
      <Pressable style={styles.overlay}>
        {sensitiveShown ? (
          video.blurhash ? (
            <Surface
              style={{
                width: '100%',
                height: '100%'
              }}
            >
              <Blurhash hash={video.blurhash} />
            </Surface>
          ) : null
        ) : (
          <Button
            round
            overlay
            size='L'
            type='icon'
            content='PlayCircle'
            onPress={playOnPress}
            loading={videoLoading}
          />
        )}
      </Pressable>
    </View>
  )
}

const styles = StyleSheet.create({
  base: {
    flex: 1,
    flexBasis: '50%',
    padding: StyleConstants.Spacing.XS / 2
  },
  overlay: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
})

export default AttachmentVideo

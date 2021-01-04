import client from '@root/api/client'
import { Props } from '@screens/Shared/Compose'
import { ComposeState } from '@screens/Shared/Compose/utils/types'
import * as Crypto from 'expo-crypto'

const composePost = async (
  params: Props['route']['params'],
  composeState: ComposeState
) => {
  const formData = new FormData()

  if (params?.type === 'conversation' || params?.type === 'reply') {
    formData.append('in_reply_to_id', composeState.replyToStatus!.id)
  }

  if (composeState.spoiler.active) {
    formData.append('spoiler_text', composeState.spoiler.raw)
  }

  formData.append('status', composeState.text.raw)

  if (composeState.poll.active) {
    Object.values(composeState.poll.options)
      .filter(e => e?.length)
      .forEach(e => formData.append('poll[options][]', e!))
    formData.append('poll[expires_in]', composeState.poll.expire)
    formData.append('poll[multiple]', composeState.poll.multiple.toString())
  }

  if (
    composeState.attachments.uploads.filter(
      upload => upload.remote && upload.remote.id
    ).length
  ) {
    formData.append('sensitive', composeState.attachments.sensitive.toString())
    composeState.attachments.uploads.forEach(e =>
      formData.append('media_ids[]', e.remote!.id!)
    )
  }

  formData.append('visibility', composeState.visibility)

  return client({
    method: 'post',
    instance: 'local',
    url: 'statuses',
    headers: {
      'Idempotency-Key': await Crypto.digestStringAsync(
        Crypto.CryptoDigestAlgorithm.SHA256,
        composeState.spoiler.raw +
          composeState.text.raw +
          composeState.poll.options['0'] +
          composeState.poll.options['1'] +
          composeState.poll.options['2'] +
          composeState.poll.options['3'] +
          composeState.poll.multiple +
          composeState.poll.expire +
          composeState.attachments.sensitive +
          composeState.attachments.uploads.map(upload => upload.remote?.id) +
          composeState.visibility +
          (params?.type === 'edit' ? Math.random() : '')
      )
    },
    body: formData
  })
}

export default composePost

import React, { useMemo } from 'react'
import { Pressable, StyleSheet, Text } from 'react-native'
import { Feather } from '@expo/vector-icons'
import { StyleConstants } from '@utils/styles/constants'
import { useTheme } from '@utils/styles/ThemeManager'

export interface Props {
  type?: 'icon' | 'text'
  content?: string

  onPress: () => void
}

const HeaderLeft: React.FC<Props> = ({ type = 'icon', content, onPress }) => {
  const { theme } = useTheme()

  const children = useMemo(() => {
    switch (type) {
      case 'icon':
        return (
          <Feather
            name={content || ('chevron-left' as any)}
            color={theme.primary}
            size={StyleConstants.Spacing.M * 1.25}
          />
        )
      case 'text':
        return (
          <Text
            style={[styles.text, { color: theme.primary }]}
            children={content}
          />
        )
    }
  }, [theme])

  return (
    <Pressable
      onPress={onPress}
      children={children}
      style={[
        styles.base,
        {
          backgroundColor: theme.backgroundGradientStart,
          ...(type === 'icon' && { height: 44, width: 44, marginLeft: -9 })
        }
      ]}
    />
  )
}

const styles = StyleSheet.create({
  base: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 100
  },
  text: {
    fontSize: StyleConstants.Font.Size.M
  }
})

export default HeaderLeft

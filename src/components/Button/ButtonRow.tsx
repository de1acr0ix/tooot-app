import { Feather } from '@expo/vector-icons'
import React from 'react'
import { Pressable, StyleSheet, Text } from 'react-native'
import { StyleConstants } from '@utils/styles/constants'
import { useTheme } from '@utils/styles/ThemeManager'

type PropsBase = {
  onPress: () => void
  disabled?: boolean
  buttonSize?: 'S' | 'M'
  size?: 'S' | 'M' | 'L'
}

export interface PropsText extends PropsBase {
  text: string
  icon?: any
}

export interface PropsIcon extends PropsBase {
  text?: string
  icon: any
}

const ButtonRow: React.FC<PropsText | PropsIcon> = ({
  onPress,
  disabled = false,
  buttonSize = 'M',
  text,
  icon,
  size = 'M'
}) => {
  const { theme } = useTheme()

  return (
    <Pressable
      {...(!disabled && { onPress })}
      style={[
        styles.button,
        {
          borderColor: disabled ? theme.secondary : theme.primary,
          paddingTop: StyleConstants.Spacing[buttonSize === 'M' ? 'S' : 'XS'],
          paddingBottom: StyleConstants.Spacing[buttonSize === 'M' ? 'S' : 'XS']
        }
      ]}
    >
      {icon ? (
        <Feather
          name={icon}
          size={StyleConstants.Font.Size[size]}
          color={disabled ? theme.secondary : theme.primary}
        />
      ) : (
        <Text
          style={[
            styles.text,
            {
              color: disabled ? theme.secondary : theme.primary,
              fontSize: StyleConstants.Font.Size[size]
            }
          ]}
        >
          {text}
        </Text>
      )}
    </Pressable>
  )
}

const styles = StyleSheet.create({
  button: {
    paddingLeft: StyleConstants.Spacing.M,
    paddingRight: StyleConstants.Spacing.M,
    borderWidth: 1.25,
    borderRadius: 100,
    alignItems: 'center'
  },
  text: {
    textAlign: 'center'
  }
})

export default ButtonRow

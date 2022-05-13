import { COLOR, TextStyleProps, useTextStyle } from 'native-x-theme'
import React, { ReactElement, ReactText, useMemo } from 'react'
import { StyleProp, Text as RNText, TextProps as RNTextProps, TextStyle } from 'react-native'
import { styles as s } from 'tachyons-react-native'

type TextType = ReactText | ReactElement<Text> | boolean | null | undefined

const FONT_SIZE = {
  'xxx-small': {
    fontSize: 12,
    lineHeight: 15,
  },
  'xx-small': {
    fontSize: 13,
    lineHeight: 17,
  },
  'x-small': {
    fontSize: 14,
    lineHeight: 18,
  },
  small: {
    fontSize: 15,
    lineHeight: 20,
  },
  normal: {
    fontSize: 16,
    lineHeight: 22,
    letterSpacing: 0.35,
  },
  large: {
    fontSize: 18,
    lineHeight: 24,
    letterSpacing: 0.35,
  },
  'x-large': {
    fontSize: 20,
    lineHeight: 26,
    letterSpacing: 0.35,
  },
  'xx-large': {
    fontSize: 24,
    lineHeight: 32,
  },
  'xxx-large': {
    fontSize: 36,
    lineHeight: 47,
  },
}

export const LINE_HEIGHT = {
  solid: { lineHeight: 26 },
  title: { lineHeight: 29 },
  relax: { lineHeight: 32 },
}

export interface TextProps extends Pick<RNTextProps, 'onLayout'>, TextStyleProps {
  fill?: boolean
  bold?: boolean
  semiBold?: boolean
  italic?: boolean
  thin?: boolean
  alignLeft?: boolean
  alignCenter?: boolean
  alignRight?: boolean
  children?: TextType | Array<TextType>
  upperCase?: boolean
  style?: StyleProp<TextStyle>
  numberOfLines?: number
  onPress?: () => void
}

const TextAncestorStyleContext = React.createContext<TextStyle[]>([])

export function Text(props: TextProps) {
  const {
    style,
    alignCenter,
    alignRight,
    fill,
    bold,
    semiBold,
    thin,
    italic,
    upperCase,
    children,
    onPress,
    numberOfLines,
    onLayout,
    fontSize,
    textColor,
    lineHeight,
  } = props

  const defaultStyle = useTextStyle({ fontSize: 'normal', textColor: COLOR.SECONDARY })
  const textAncestorStyle = React.useContext(TextAncestorStyleContext)
  const textStyle = useTextStyle({ ...props, fontSize, textColor })

  const composedStyle = useMemo(
    () => [
      defaultStyle,
      textAncestorStyle,
      alignCenter ? s.tc : alignRight ? s.tr : s.tl,
      fill && s.w100,
      upperCase && { textTransform: 'uppercase' },
      bold && s.b,
      semiBold && s.fw5,
      thin && s.fw2,
      italic && s.i,
      textStyle,
      { fontFamily: 'Nunito' },
      fontSize ? FONT_SIZE[fontSize] : {},
      lineHeight ? LINE_HEIGHT[lineHeight] : {},
      style,
    ],
    [
      defaultStyle,
      textAncestorStyle,
      alignCenter,
      alignRight,
      fill,
      upperCase,
      bold,
      semiBold,
      thin,
      italic,
      textStyle,
      fontSize,
      lineHeight,
      style,
    ],
  ) as TextStyle[]

  if (props.children == null) {
    return null
  }
  return (
    <TextAncestorStyleContext.Provider value={composedStyle}>
      <RNText
        style={composedStyle as never}
        onPress={onPress}
        numberOfLines={numberOfLines}
        onLayout={onLayout}
        allowFontScaling={false}
      >
        {children}
      </RNText>
    </TextAncestorStyleContext.Provider>
  )
}

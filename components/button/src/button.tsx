import { Text } from '@hmu-component/text'
import { Tappable } from 'native-x-tappable'
import {
  COLOR,
  ContainerStyleProps,
  TextStyleProps,
  useContainerStyle,
  useTextStyle,
  useTheme,
} from 'native-x-theme'
import React, { ReactNode, useMemo } from 'react'
import { ActivityIndicator, View } from 'react-native'
import { styles as s } from 'tachyons-react-native'

const styles = {
  container: [s.flexRow, s.flexAuto, s.justifyCenter, s.itemsCenter, s.ba],
}

const sizes = {
  'x-small': [s.ph1, s.pv1],
  small: [s.ph3, s.pv2],
  normal: [s.ph4, s.pv3],
  large: [s.ph5, s.pv3],
  'x-large': [s.ph6, s.pv3],
}

export type ButtonSize = keyof typeof sizes

interface BaseType extends ContainerStyleProps, TextStyleProps {
  children?: string | ReactNode
  fill?: boolean
  fillHorizontal?: boolean
  width?: number
  height?: number
  minWidth?: number
  minHeight?: number
  maxWidth?: number
  maxHeight?: number
  disabled?: boolean
  loading?: boolean
  rounded?: boolean
  outline?: boolean
  size?: ButtonSize
  clear?: boolean
  icon?: ReactNode
}

type PropsWithData<TData> = {
  data: TData
  onTap?: (data: TData) => void
} & BaseType

type PropsWithoutData = {
  onTap?: () => void
} & BaseType

export type ButtonProps<T> = PropsWithData<T> | PropsWithoutData

export function Button<T>(props: ButtonProps<T>) {
  const {
    children,
    disabled = false,
    loading = false,
    fill = false,
    fillHorizontal = false,
    rounded = true,
    outline = false,
    clear = false,
    size = 'normal',
    width,
    height,
    minWidth,
    minHeight,
    maxWidth,
    maxHeight,
    icon,
    data,
    onTap,
  } = props as PropsWithData<T> & PropsWithoutData
  const backgroundColor =
    outline || clear ? undefined : disabled ? COLOR.DISABLED : props.backgroundColor || COLOR.ACCENT
  const textColor = disabled
    ? COLOR.TERTIARY
    : props.textColor
    ? props.textColor
    : outline || clear
    ? COLOR.ACCENT
    : COLOR.PRIMARY
  const borderColor = props.borderColor
    ? props.borderColor
    : outline
    ? textColor
      ? textColor
      : COLOR.ACCENT
    : COLOR.TRANSPARENT
  const containerStyle = useContainerStyle({ ...props, backgroundColor, borderColor })
  const textStyle = useTextStyle({ ...props, textColor })
  const { getColor } = useTheme()
  const color = getColor?.(textColor)
  const style = useMemo(() => {
    return [
      styles.container,
      containerStyle,
      rounded ? s.brPill : s.br2,
      sizes[size],
      fill ? [s.flex, s.w100, s.h100] : undefined,
      fillHorizontal ? [s.w100] : undefined,
      width ? { width } : undefined,
      height ? { height } : undefined,
      minWidth ? { minWidth } : undefined,
      minHeight ? { minHeight } : undefined,
      maxWidth ? { maxWidth } : undefined,
      maxHeight ? { maxHeight } : undefined,
    ]
  }, [
    containerStyle,
    fill,
    fillHorizontal,
    height,
    maxHeight,
    maxWidth,
    minHeight,
    minWidth,
    rounded,
    size,
    width,
  ])
  const contentStyle = useMemo(() => {
    return [textStyle]
  }, [textStyle])
  return (
    <Tappable data={data} disabled={disabled} onTap={onTap}>
      <View
        backgroundColor={loading || disabled ? COLOR.DISABLED : backgroundColor}
        style={style as any}
        {...props}
      >
        {loading ? (
          <>
            <ActivityIndicator size='small' color={color as any} />
            <View style={[s.pa1]} />
          </>
        ) : icon ? (
          <>
            {icon}
            <View style={[s.pa1]} />
          </>
        ) : null}
        <Text
          bold
          fontSize={size === 'x-small' ? 'x-small' : 'large'}
          style={contentStyle as any}
        >{` ${children} `}</Text>
      </View>
    </Tappable>
  )
}

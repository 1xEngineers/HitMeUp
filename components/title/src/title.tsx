import { Text, TextProps } from '@hmu-component/text'
import React from 'react'

interface Props extends TextProps {
  children: string
}

export function Title({ children, ...props }: Props) {
  return (
    <Text bold fontSize='xx-large' {...props}>
      {children}
    </Text>
  )
}

import { TextInput } from '@hmu-component/text-input'
import { SearchIcon } from 'native-x-icon'
import { COLOR } from 'native-x-theme'
import React from 'react'

export type SearchBoxPropsType = {
  onQuery?: (query: string) => void
}

const styles = {
  input: [{ fontWeight: '600', fontSize: 18 }],
}

export function SearchBox({ onQuery }: SearchBoxPropsType) {
  return (
    <TextInput
      fill
      rounded
      returnKeyType='search'
      placeholder='search'
      style={styles.input}
      placeholderColor={COLOR.TERTIARY}
      icon={<SearchIcon color={COLOR.TERTIARY} />}
      onChangeText={onQuery}
    />
  )
}

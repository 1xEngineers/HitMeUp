import { List as NativeList } from 'native-x-list'
import React,{forwardRef} from 'react'
import { FlatList } from 'react-native'
import { ListProps } from './list-type'

function ListComponent<T>(props: ListProps<T>, ref: React.Ref<FlatList<any>>) {
  return <NativeList {...props} ref={ref} />
}

export const List = forwardRef(ListComponent)

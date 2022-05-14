import { ReactElement } from 'react'

export type ListRendererFn<S> = (item: S, index?: number) => ReactElement | null
interface NativeScrollEvent {
  nativeEvent: {
    contentOffset: {
      y: number
      x: number
    }
    contentSize: {
      height: number
      width: number
    }
    layoutMeasurement: {
      height: number
      width: number
    }
    targetContentOffset?: {
      y: number
      x: number
    }
    velocity?: {
      y: number
      x: number
    }
    zoomScale?: number
  }
}

export type ListProps<T> = {
  children: ListRendererFn<T> | Array<ReactElement | ListRendererFn<T> | null>
  emptyMessage?: { title: string; message: string } | (() => ReactElement | null)
  fill?: boolean
  items: Array<T>
  keyExtractor?: ((item: T) => string) | string
  loading?: boolean
  onFetchNext?: () => void
  onScroll?: (e?: NativeScrollEvent) => void
  inverted?: boolean
  onRefresh?: () => void
  isRefreshing?: boolean
  maintainVisibleContent?: boolean
  showScrollIndicator?: boolean
}

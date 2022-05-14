import { ReactNode } from 'react'
import { ListRendererFn } from './list-type'

// Adapter for NativeScrollEvent
// https://github.com/necolas/react-native-web/blob/master/packages/react-native-web/src/exports/ScrollView/ScrollViewBase.js#L32
export function normalizeScrollEvent(e: Event) {
  const target = e.target as HTMLDivElement
  return {
    nativeEvent: {
      contentOffset: {
        x: target.scrollLeft,
        y: target.scrollTop,
      },
      contentSize: {
        height: target.scrollHeight,
        width: target.scrollWidth,
      },
      layoutMeasurement: {
        height: target.offsetHeight,
        width: target.offsetWidth,
      },
    },
    timeStamp: Date.now(),
  }
}

export function useChildrenWithHeaderAndFooter<S>(
  children: ReactNode | ReactNode[],
): [ReactNode[] | null, ListRendererFn<S>, ReactNode[] | null] {
  const before: ReactNode[] = []
  const after: ReactNode[] = []
  let renderer!: ListRendererFn<S>
  const ids = Object.keys(children as any)
  if (ids.length === 0) {
    return [null, children as any as ListRendererFn<S>, null]
  }
  ids.forEach(id => {
    const child = (children as any)[id]
    if (typeof child === 'function') {
      renderer = child
    } else if (renderer == undefined) {
      before.push(child)
    } else {
      after.push(child)
    }
  })
  return [before, renderer, after]
}

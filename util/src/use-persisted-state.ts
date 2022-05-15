import React, { useCallback } from 'react'
import { Storage } from './async-storage'

type ReturnType<T> = [T, (value?: T | ((v: T) => T)) => void, () => void]

export function usePersistedState<T>(key: string, initialValue?: T): ReturnType<T> {
  const [state, setStateValue] = React.useState<T>(initialValue as T)
  const refreshState = React.useCallback(async () => {
    const value = await Storage.getItem(key)
    setStateValue(lastValue => (value ? JSON.parse(value) : lastValue))
  }, [key])

  const setState = useCallback(
    (value?: T | ((v: T) => T)) => {
      if (value === undefined || value === null) {
        Storage.removeItem(key)
        setStateValue(undefined as any)
      } else {
        setStateValue(state => {
          const derivedValue = value instanceof Function ? value(state) : value
          Storage.setItem(key, JSON.stringify(derivedValue))
          return derivedValue
        })
      }
    },
    [setStateValue, key],
  )

  React.useEffect(() => {
    refreshState()
  }, [refreshState])

  return [state, setState, refreshState]
}

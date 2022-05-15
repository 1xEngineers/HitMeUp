import { Platform } from 'react-native'

type Callback = () => void

let initialized = false
const listener = new Set<Callback>()

function beforeUnload() {
  listener.forEach(listener => listener())
}

export function onBeforeUnload(callback: Callback) {
  if (Platform.OS !== 'web' || typeof window === 'undefined' || !callback) {
    return
  }
  if (!initialized) {
    window.addEventListener?.('beforeunload', beforeUnload)
    initialized = true
  }
  listener.add(callback)
  return () => listener.delete(callback)
}

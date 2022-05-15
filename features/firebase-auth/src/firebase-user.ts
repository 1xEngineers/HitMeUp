export interface FirebaseUser {
  uid: string
  displayName: string | null
  email: string | null
  phoneNumber: string | null
  photoURL: string | null
  providerId: string
  getIdToken: () => Promise<string>
}

type OnAuthChangeCallback = (user: FirebaseUser | null | undefined) => void
type Unsubscribe = () => void

export type OnAuthChange = (callback: OnAuthChangeCallback) => Unsubscribe

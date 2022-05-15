import auth, { FirebaseAuthTypes } from '@react-native-firebase/auth'
import { OnAuthChange } from './firebase-user'

export const signOut = async () => {
  await auth().signOut()
}

export const signInWithCustomToken = (token: string) => auth().signInWithCustomToken(token)

export const sendPhoneVerificationCode = async (phoneNumber: string) => {
  try {
    const { verificationId } = await auth().signInWithPhoneNumber(phoneNumber, true)
    return verificationId
  } catch (e) {
    const error = e as FirebaseAuthTypes.NativeFirebaseAuthError
    if (error.code === 'auth/invalid-phone-number') {
      throw new Error('Phone number format is invalid, please check again.')
    }
    throw new Error(error.nativeErrorMessage)
  }
}

export const linkPhoneCredentialToCurrentUser = async (
  verificationId: string,
  verificationCode: string,
) => {
  const phoneCredential = await auth.PhoneAuthProvider.credential(verificationId, verificationCode)

  try {
    await auth().currentUser?.linkWithCredential(phoneCredential)
  } catch (e: any) {
    if (e.code === 'auth/invalid-verification-code') throw new Error('Invalid verification code.')
    if (e.code === 'auth/credential-already-in-use')
      throw new Error('This phone number is already being used by another person.')
    throw new Error((e as FirebaseAuthTypes.NativeFirebaseAuthError).nativeErrorMessage)
  }
}

export const signInWithPhoneNumber = async (verificationId: string, verificationCode: string) => {
  const phoneCredential = await auth.PhoneAuthProvider.credential(verificationId, verificationCode)

  try {
    await auth().signInWithCredential(phoneCredential)
  } catch (e: any) {
    if (e.code === 'auth/invalid-verification-code') throw new Error('Invalid verification code.')
    if (e.code === 'auth/credential-already-in-use')
      throw new Error('This phone number is already being used by another person.')
    throw new Error((e as FirebaseAuthTypes.NativeFirebaseAuthError).nativeErrorMessage)
  }
}

export const onAuthChange: OnAuthChange = callback => auth().onUserChanged(callback)

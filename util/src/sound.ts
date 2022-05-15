import Sound from 'react-native-sound'

export function getSound(fileName: string) {
  return new Sound(fileName, Sound.MAIN_BUNDLE, error => {
    if (error) console.log('failed to load the sound', error)
  })
}

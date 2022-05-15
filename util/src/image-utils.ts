import { PixelRatio } from 'react-native'

export enum ImageDensity {
  x1 = 'x1',
  x2 = 'x2',
  x3 = 'x3',
}

export function getImageDensity() {
  const density = Math.round(PixelRatio.get())
  switch (density) {
    case 1:
      return ImageDensity.x1
    case 2:
      return ImageDensity.x2
    default:
      return ImageDensity.x3
  }
}

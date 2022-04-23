import { Dimensions, Platform } from 'react-native';

export function checkImage(value = "") {
  let imageStatus
  value = value.toLowerCase()

  switch (value) {
    case "jpeg":
      imageStatus = true;
      break;
    case "png":
      imageStatus = true;
      break;
    case "jpg":
      imageStatus = true;
      break;
    case "WebP":
      imageStatus = true;
      break;
    default:
      imageStatus = false;
      break;
  }
  return imageStatus

}

export function checkVideo(value = "") {
  let videoStatus
  value = value.toLowerCase()

  switch (value) {
    case "mp4":
      videoStatus = true;
      break;
    case "avi":
      videoStatus = true;
      break;
    case "mov":
      videoStatus = true;
      break;
    case "wmv":
      videoStatus = true;
      break;
    case "mkv":
      videoStatus = true;
      break;
    case "flv":
      videoStatus = true;
      break;
    case "mpeg-2":
      videoStatus = true;
      break;
    default:
      videoStatus = false;
      break;
  }
  return videoStatus

}

const dim = Dimensions.get('window');

export const isIphoneX = () => {
  return (
    Platform.OS === 'ios' &&
    (isIPhoneXSize(dim) || isIPhoneXrSize(dim)) || isIPhone12proMax(dim) || isIPhone12(dim)
  );
}

export const isIPhoneXSize = () => {
  return dim.height == 812 || dim.width == 812;
}
export const isIPhoneXrSize = () => {
  return dim.height == 896 || dim.width == 896;
}
export const isIPhone12proMax = () => {
  return dim.height == 926 || dim.width == 428;
}
export const isIPhone12 = () => {
  return dim.height == 844 || dim.width == 390;
}

export const isIOS = () => {
  return Platform.OS === 'ios'
}
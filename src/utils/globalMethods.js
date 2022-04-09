import { Appearance, Linking, NativeModules, AppState } from "react-native";

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
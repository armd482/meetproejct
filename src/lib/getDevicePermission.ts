const checkPermission = async (audio: boolean, video: boolean) => {
  try {
    await navigator.mediaDevices.getUserMedia({ audio, video });
    return true;
  } catch {
    return false;
  }
};

export const getDevicePermission = async () => {
  if (await checkPermission(true, true)) {
    return { audio: true, video: true };
  }
  if (await checkPermission(true, false)) {
    return { audio: true, video: false };
  }

  if (await checkPermission(false, true)) {
    return { audio: false, video: true };
  }

  return { audio: false, video: false };
};

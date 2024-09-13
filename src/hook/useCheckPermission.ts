import { useDeviceStore } from '@/store/DeviceStore';
import { StreamStatusType } from '@/type/streamType';
import { useCallback, useState } from 'react';
import { useShallow } from 'zustand/react/shallow';

const useCheckPermission = (updateStreamStatus: (value: StreamStatusType) => void) => {
  const [isSupportedPermission, setIsSupportedPermission] = useState<null | boolean>(null);
  const { setPermission, setDeviceEnable } = useDeviceStore(
    useShallow((state) => ({
      setPermission: state.setPermission,
      setDeviceEnable: state.setDeviceEnable,
    })),
  );

  const checkPermissionQuery = useCallback(async () => {
    if (!navigator.permissions) {
      setIsSupportedPermission(false);
      return false;
    }

    try {
      const videoPermission = await navigator.permissions.query({
        name: 'camera' as PermissionName,
      });
      const audioPermission = await navigator.permissions.query({
        name: 'microphone' as PermissionName,
      });

      if (videoPermission.state === 'denied' || audioPermission.state === 'denied') {
        throw new Error('Permission.query 미지원 브라우저');
      }

      const newPermission = {
        audio: Boolean(audioPermission.state === 'granted'),
        video: Boolean(videoPermission.state === 'granted'),
      };
      setPermission(newPermission);
      return newPermission;
    } catch {
      setIsSupportedPermission(false);
      return false;
    }
  }, [setPermission]);

  const addPermissionListener = useCallback(async (callback: () => void) => {
    try {
      const videoPermission = await navigator.permissions.query({
        name: 'camera' as PermissionName,
      });
      const audioPermission = await navigator.permissions.query({
        name: 'microphone' as PermissionName,
      });

      videoPermission.onchange = () => {
        callback();
      };
      audioPermission.onchange = () => {
        callback();
      };
    } catch {
      setIsSupportedPermission(false);
    }
  }, []);

  const checkPermission = useCallback(
    async (audio: boolean, video: boolean) => {
      try {
        await navigator.mediaDevices.getUserMedia({ audio, video });
        setPermission({ audio, video });
        setDeviceEnable((prev) => ({ audio: audio && prev.audio, video: video && prev.video }));
        return true;
      } catch (error) {
        const e = error as DOMException;
        if (e.name === 'NotAllowedError') {
          return false;
        }
        updateStreamStatus('failed');
        return false;
      }
    },
    [updateStreamStatus, setDeviceEnable, setPermission],
  );

  const updatePermission = useCallback(async () => {
    if (isSupportedPermission !== false) {
      const newPermission = await checkPermissionQuery();
      if (newPermission) {
        setIsSupportedPermission(true);
      }
      if (typeof newPermission !== 'boolean') {
        return newPermission;
      }
    }

    if (await checkPermission(true, true)) {
      return { audio: true, video: true };
    }

    if (await checkPermission(true, false)) {
      return { audio: true, video: false };
    }

    if (await checkPermission(false, true)) {
      return { audio: false, video: true };
    }

    setPermission({ audio: false, video: false });
    setDeviceEnable({ audio: false, video: false });

    return { audio: false, video: false };
  }, [isSupportedPermission, checkPermissionQuery, checkPermission, setPermission, setDeviceEnable]);

  return {
    isSupportedPermission,
    updatePermission,
    addPermissionListener,
  };
};

export default useCheckPermission;

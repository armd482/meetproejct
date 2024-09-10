import { useEffect, useState } from 'react';

const useCheckChrome = () => {
  const [isChrome, setIsChrome] = useState(false);

  useEffect(() => {
    const { userAgent } = navigator;
    setIsChrome(/Chrome/.test(userAgent) && !/Edge/.test(userAgent) && !/OPR/.test(userAgent));
  }, []);
  return { isChrome };
};

export default useCheckChrome;

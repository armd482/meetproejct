export const checkBrowser = () => {
  const { userAgent } = navigator;
  const allowedBrowsers = ['Chrome', 'Firefox', 'Safari', 'Edge', 'Opera'];
  return allowedBrowsers.some((browser) => userAgent.includes(browser));
};

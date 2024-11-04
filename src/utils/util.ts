// checkServer
export const checkServer = () => typeof window === 'undefined';

export const waitTime = (time: number = 100) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(true);
    }, time);
  });
};

export const calculateTimeDifference = (inTime, currTime) => {
  const difference = Math.floor((currTime - inTime) / 1000);
  const minutes = Math.floor((difference % 3600) / 60);
  const seconds = difference % 60;
  return {diff: difference, text: `${minutes}m ${seconds}s`};
};

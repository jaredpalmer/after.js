const getRandomInt = (min, max) =>
  Math.floor(Math.random() * (max - min)) + min;

export const fetchCounter = () => {
  return new Promise(resolve => setTimeout(resolve(getRandomInt(1, 100)), 500));
};

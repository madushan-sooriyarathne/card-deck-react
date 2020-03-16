export const getRotationAmount = () => {
  return `${Math.floor(Math.random() * 360)}deg`;
};

export const getTranslateAmount = () => {
  const side = Math.random() < 0.5;
  const amount = Math.floor(Math.random() * 5);
  if (side) {
    return `${amount}rem`;
  } else {
    return `-${amount}rem`;
  }
};

const getRandomColor = (): string => {
  const letters = "0123456789ABCDEF";
  let color = "#";
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
};

// Function to generate a random width
const getRandomWidth = (): number => {
  return Math.floor(Math.random() * (140 - 80 + 1)) + 80; // Random width between 50 and 180
};

export { getRandomColor, getRandomWidth };

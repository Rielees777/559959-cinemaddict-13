// Функция генерирует случайное число в указанном диапазоне


export const getRandomInteger = (a = 0, b = 1) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));

  return Math.floor(lower + Math.random() * (upper - lower + 1));
};

export const getRandomElement = (items) => {

  const randomIndex = getRandomInteger(0, items.length - 1);

  return items[randomIndex];
};



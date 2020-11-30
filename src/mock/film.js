import dayjs from "dayjs";
// Функция генерирует случайное число в указанном диапазоне
const getRandomInteger = (a = 0, b = 1) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));

  return Math.floor(lower + Math.random() * (upper - lower + 1));
};

const generateTitle = () => {
  const titles = [
    `The Dance of Life`,
    `Sagebrush Trail`,
    `The Man with the Golden Arm`,
    `Santa Claus Conquers the Martians`,
    `Popeye the Sailor Meets Sindbad the Sailor`
  ];

  const randomIndex = getRandomInteger(0, titles.length - 1);

  return titles[randomIndex];
}

const generatePoster = () => {
  const posters = [
    `./images/posters/the-dance-of-life.jpg`,
    `./images/posters/sagebrush-trail.jpg`,
    `./images/posters/the-man-with-the-golden-arm.jpg`,
    `./images/posters/santa-claus-conquers-the-martians.jpg`,
    `./images/posters/popeye-meets-sinbad.png`
  ];
  const randomIndex = getRandomInteger(0, posters.length - 1);

  return posters[randomIndex];
};

const generateDescription = () => {
  const descriptions = [
    `Lorem ipsum dolor sit amet, consectetur adipiscing elit.`,
    `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras aliquet varius magna, non porta ligula feugiat eget.`,
    `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras aliquet varius magna, non porta ligula feugiat eget. Fusce tristique felis at fermentum pharetra. Aliquam id orci ut lectus varius viverra.`,
    `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras aliquet varius magna, non porta ligula feugiat eget. Fusce tristique felis at fermentum pharetra. Aliquam id orci ut lectus varius viverra. Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante. Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum.`,
    `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras aliquet varius magna, non porta ligula feugiat eget. Fusce tristique felis at fermentum pharetra. Aliquam id orci ut lectus varius viverra. Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante. Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum. Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui. Sed sed nisi sed augue convallis suscipit in sed felis. Aliquam erat volutpat. Nunc fermentum tortor ac porta dapibus. In rutrum ac purus sit amet tempus.`
  ];
  const randomIndex = getRandomInteger(0, descriptions.length - 1);

  return descriptions[randomIndex];
};

const generateCommentsCount = () => {
  const commentsCount = getRandomInteger(0, 100);
  return commentsCount;
};
const generateDate = () => {
  const randNum = getRandomInteger(0, 100);
  const date = dayjs().format('YYYY') - randNum;
  return date;
};

const generateRating = () => {
  const ratingNum = getRandomInteger(0, 9) + Math.round(Math.random() * 10) / 10
  return ratingNum;
}
const generateDuration = () => {
  const durationTime = [
    `1h 55m`,
    `54m`,
    `1h 59m`,
    `1h 21m`,
    `16m`
  ]
  const randomIndex = getRandomInteger(0, durationTime.length - 1);
  return durationTime[randomIndex];
};

const generateGenre = () => {
  const genre = [
    `Musical`,
    `Western`,
    `Drama`,
    `Comedy`,
    `Cartoon`
  ]
  const randomIndex = getRandomInteger(0, genre.length - 1);
  return genre[randomIndex];
};

export const generateFilmCard = () => {
  return {
    title: generateTitle(),
    poster: generatePoster(),
    description: generateDescription(),
    comments: generateCommentsCount(),
    realizeDate: generateDate(),
    rating: generateRating(),
    duration: generateDuration(),
    genre: generateGenre(),
    isWatchList: false,
    isHistoryList: false,
    isFavoriteList: false
  };
};


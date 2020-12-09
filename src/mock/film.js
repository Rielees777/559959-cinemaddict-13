import dayjs from "dayjs";
// Функция генерирует случайное число в указанном диапазоне
const getRandomInteger = (a = 0, b = 1) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));

  return Math.floor(lower + Math.random() * (upper - lower + 1));
};

const mockData = {
  titles: [
    `The Dance of Life`,
    `Sagebrush Trail`,
    `The Man with the Golden Arm`,
    `Santa Claus Conquers the Martians`,
    `Popeye the Sailor Meets Sindbad the Sailor`
  ],
  posters: [
    `./images/posters/the-dance-of-life.jpg`,
    `./images/posters/sagebrush-trail.jpg`,
    `./images/posters/the-man-with-the-golden-arm.jpg`,
    `./images/posters/santa-claus-conquers-the-martians.jpg`,
    `./images/posters/popeye-meets-sinbad.png`
  ],
  directors: [
    `Anthony Mann`,
    `George Lukas`,
    `Stiven Spielberg`,
    `Peter Jackson`,
    `Luc Besson`
  ],
  writers: [
    `Anne Wigton`,
    `Heinz Herald`,
    `Richard Weil`,
    `Rian Johnson`,
    `Todd Phillips`
  ],
  actors: [
    `Erich von Stroheim`,
    `Mary Beth Hughes`,
    `Dan Duryea`,
    `Harrison Ford`,
    `Tommy Lee Jones`
  ],
  descriptions: [
    `Lorem ipsum dolor sit amet, consectetur adipiscing elit.`,
    `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras aliquet varius magna, non porta ligula feugiat eget.`,
    `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras aliquet varius magna, non porta ligula feugiat eget. Fusce tristique felis at fermentum pharetra. Aliquam id orci ut lectus varius viverra.`,
    `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras aliquet varius magna, non porta ligula feugiat eget. Fusce tristique felis at fermentum pharetra. Aliquam id orci ut lectus varius viverra. Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante. Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum.`,
    `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras aliquet varius magna, non porta ligula feugiat eget. Fusce tristique felis at fermentum pharetra. Aliquam id orci ut lectus varius viverra. Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante. Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum. Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui. Sed sed nisi sed augue convallis suscipit in sed felis. Aliquam erat volutpat. Nunc fermentum tortor ac porta dapibus. In rutrum ac purus sit amet tempus.`
  ],
  durationTime: [
    `1h 55m`,
    `54m`,
    `1h 59m`,
    `1h 21m`,
    `16m`
  ],
  genre: [
    `Musical`,
    `Western`,
    `Drama`,
    `Comedy`,
    `Cartoon`,
    `Mystery`,
    `Romance`
  ],
  comments: {
    commentsEmoji: [
      `./images/emoji/smile.png`,
      `./images/emoji/sleeping.png`,
      `./images/emoji/puke.png`,
      `./images/emoji/angry.png`
    ],
    commentsText: [
      `Interesting setting and a good cast`,
      `Booooooooooring`,
      `Very very old. Meh`,
      `Almost two hours? Seriously?`
    ],
    commentsAuthor: [
      `Tim Macoveev`,
      `John Doe`,
      `Liz Bakner`,
      `John Smith`
    ],
    commentsDay: [
      `2019/12/31 23:59`,
      `2 days ago`,
      `week ago`,
      `Today`
    ]
  }
}

const generateElement = (items) => {

  const randomIndex = getRandomInteger(0, items.length - 1);

  return items[randomIndex];
}

export const generateComments = () => {
  return {
    commentsEmoji: generateElement(mockData.comments.commentsEmoji),
    commentsText: generateElement(mockData.comments.commentsText),
    commentsAuthor: generateElement(mockData.comments.commentsAuthor),
    commentsDay: generateElement(mockData.comments.commentsDay),
  };
};
export const generateCommentsCount = () => {
  const randNum = getRandomInteger(0, 5);
  return randNum;
}
const generateDate = () => {
  const randNum = getRandomInteger(0, 100);
  const date = dayjs().format('YYYY') - randNum;
  return date;
};

const generateRating = () => {
  const ratingNum = getRandomInteger(0, 9) + Math.round(Math.random() * 10) / 10
  return ratingNum;
}


export const generateFilmCard = () => {
  return {
    title: generateElement(mockData.titles),
    originalTitle: generateElement(mockData.titles),
    poster: generateElement(mockData.posters),
    directors: generateElement(mockData.directors),
    writers: generateElement(mockData.writers),
    actors: generateElement(mockData.actors),
    description: generateElement(mockData.descriptions),
    commentsCount: generateCommentsCount(),
    realizeDate: generateDate(),
    rating: generateRating(),
    duration: generateElement(mockData.durationTime),
    genre: generateElement(mockData.genre),
    isWatchList: Boolean(getRandomInteger(0, 1)),
    isHistoryList: Boolean(getRandomInteger(0, 1)),
    isFavoriteList: Boolean(getRandomInteger(0, 1))
  };
};


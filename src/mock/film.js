
import {getRandomInteger, getRandomElement} from "../utils/common.js";
import {filmsMock} from "./filmsMock.js";
import {commentsMock} from "./commentsMock.js";

const generateId = () => Date.now() + parseInt(Math.random() * 10000, 10);

export const generateComment = () => ({
  commentsEmoji: getRandomElement(commentsMock.emojis),
  commentsText: getRandomElement(commentsMock.texts),
  commentsAuthor: getRandomElement(commentsMock.authors),
  commentsDay: getRandomElement(commentsMock.days),
});

const getComments = () => {
  const commentsCount = getRandomInteger(0, 5);
  const comments = [];
  for (let i = 0; i < commentsCount; i++) {
    comments.push(generateComment());
  }
  return comments;
};

const generateDate = () => {
  const day = getRandomInteger(1, 28);
  const month = getRandomInteger(1, 12);
  const year = getRandomInteger(1920, 2000);
  const date = `${month}-${day}-${year}`;
  return date;
};


export const generateFilm = () => {
  return {
    id: generateId(),
    title: getRandomElement(filmsMock.titles),
    originalTitle: getRandomElement(filmsMock.titles),
    poster: getRandomElement(filmsMock.posters),
    directors: getRandomElement(filmsMock.directors),
    writers: getRandomElement(filmsMock.writers),
    actors: getRandomElement(filmsMock.actors),
    country: getRandomElement(filmsMock.countries),
    description: getRandomElement(filmsMock.descriptions),
    comments: getComments(),
    realizeDate: generateDate(),
    rating: getRandomInteger(0, 9) + Math.round(Math.random() * 10) / 10,
    duration: getRandomElement(filmsMock.durationTimes),
    genre: getRandomElement(filmsMock.genres),
    ageLimit: getRandomInteger(14, 18),
    isWatchList: Boolean(getRandomInteger(0, 1)),
    isHistoryList: Boolean(getRandomInteger(0, 1)),
    isFavoriteList: Boolean(getRandomInteger(0, 1))
  };
};


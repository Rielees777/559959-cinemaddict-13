
import {getRandomInteger, getRandomElement} from "../utils.js"
import {filmsMock} from "./filmsMock.js"
import {commentsMock} from "./commentsMock.js"


export const generateComment = () => ({
  commentsEmoji: getRandomElement(commentsMock.emojiComments),
  commentsText: getRandomElement(commentsMock.textComments),
  commentsAuthor: getRandomElement(commentsMock.authorComments),
  commentsDay: getRandomElement(commentsMock.dayComments),
});

const getComments = () => {
  const commentsCount = getRandomInteger(0, 5);
  const comments = [];
  for (let i = 0; i < commentsCount; i++) {
    comments.push(generateComment());
  };
  return comments;
}

const generateDate = () => {
  const day = getRandomInteger(1, 28);
  const month = getRandomInteger(1, 12);
  const year = getRandomInteger(1920, 2000);
  const date = `${month}-${day}-${year}`
  return date;
};


export const generateFilm = () => {
  return {
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


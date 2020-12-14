
import { getRandomInteger, getRandomElement } from "../utils.js"
import { mockDataFilms } from "../mock/mockDataFilms.js"
import { mockDataComments } from "../mock/mockDataComments.js"


export const generateComment = () => {
  return {
    commentsEmoji: getRandomElement(mockDataComments.commentsEmoji),
    commentsText: getRandomElement(mockDataComments.commentsText),
    commentsAuthor: getRandomElement(mockDataComments.commentsAuthor),
    commentsDay: getRandomElement(mockDataComments.commentsDay),
  };
};

const getCommentsList = () => {
  const commentsCount = generateCommentsCount();
  const commentsList = [];
  for (let i = 0; i < commentsCount; i++) {
    commentsList.push(generateComment());
  };
  return commentsList;
}

export const generateCommentsCount = () => getRandomInteger(0, 5)

const generateDate = () => {
  const day = getRandomInteger(1, 28);
  const month = getRandomInteger(1, 12);
  const year = getRandomInteger(1920, 2000);
  const date = `${month}-${day}-${year}`
  return date;
};


export const generateFilmCard = () => {
  return {
    title: getRandomElement(mockDataFilms.titles),
    originalTitle: getRandomElement(mockDataFilms.titles),
    poster: getRandomElement(mockDataFilms.posters),
    directors: getRandomElement(mockDataFilms.directors),
    writers: getRandomElement(mockDataFilms.writers),
    actors: getRandomElement(mockDataFilms.actors),
    country: getRandomElement(mockDataFilms.country),
    description: getRandomElement(mockDataFilms.descriptions),
    comments: getCommentsList(),
    realizeDate: generateDate(),
    rating: getRandomInteger(0, 9) + Math.round(Math.random() * 10) / 10,
    duration: getRandomElement(mockDataFilms.durationTime),
    genre: getRandomElement(mockDataFilms.genre),
    ageLimit: getRandomInteger(14, 18),
    isWatchList: Boolean(getRandomInteger(0, 1)),
    isHistoryList: Boolean(getRandomInteger(0, 1)),
    isFavoriteList: Boolean(getRandomInteger(0, 1))
  };
};


import dayjs from "dayjs";
import {createElement} from "../utils.js"

const MAX_LENGTH_DESCR = 140;
const getFilterClassName = (filter) => {
  const filterClassName = filter
    ? `film-card__controls-item--active`
    : ``;
  return filterClassName
}
const getShortDescription = (text) => {
  const shortDescription = text.length > MAX_LENGTH_DESCR
    ? text.slice(0, MAX_LENGTH_DESCR) + '...'
    : text;
  return shortDescription
}
const createFilmCard = (film) => {
  const {title, poster, description, comments, realizeDate, rating, duration, genre, isWatchList, isHistoryList, isFavoriteList} = film;

  const date = dayjs(realizeDate).format('YYYY')

  return (`<article class="film-card">
          <h3 class="film-card__title">${title}</h3>
          <p class="film-card__rating">${rating}</p>
          <p class="film-card__info"><span class="film-card__year">${date}</span>
          <span class="film-card__duration">${duration}</span>
          <span class="film-card__genre">${genre}</span></p>
          <img src=${poster} alt="" class="film-card__poster">
          <p class="film-card__description">${getShortDescription(description)}</p>
          <a class="film-card__comments">${comments.length} comments</a><div class="film-card__controls">
          <button class="film-card__controls-item button film-card__controls-item--add-to-watchlist ${getFilterClassName(isWatchList)}" type="button">Add to watchlist</button>
          <button class="film-card__controls-item button film-card__controls-item--mark-as-watched ${getFilterClassName(isHistoryList)}" type="button">Mark as watched</button>
          <button class="film-card__controls-item button film-card__controls-item--favorite ${getFilterClassName(isFavoriteList)}" type="button">Mark as favorite</button></div></article>`
  );
};

export default class FilmCard {
  constructor(film) {
    this._film = film;
    this._element = null;
  };

  getTemplate() {
    return createFilmCard(this._film);
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }
    return this._element;
  }
  removeElement() {
    this_element = null;
  }
}

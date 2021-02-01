import dayjs from "dayjs";
import Abstract from "./abstract.js";

const MAX_LENGTH_DESCR = 140;
const handleElements = [`film-card__title`, `film-card__poster`, `film-card__comments`];
const getFilterClassName = (filter) => {
  const filterClassName = filter
    ? `film-card__controls-item--active`
    : ``;
  return filterClassName;
};
const getShortDescription = (text) => {
  const shortDescription = text.length > MAX_LENGTH_DESCR
    ? text.slice(0, MAX_LENGTH_DESCR) + `...`
    : text;
  return shortDescription;
};
const createFilmCard = (film) => {
  const {title, poster, description, comments, realizeDate, rating, duration, genre, isWatchList, isHistoryList, isFavoriteList} = film;

  const date = dayjs(realizeDate).format(`YYYY`);

  return (`<article class="film-card">
          <h3 class="film-card__title">${title}</h3>
          <p class="film-card__rating">${rating}</p>
          <p class="film-card__info"><span class="film-card__year">${date}</span>
          <span class="film-card__duration">${duration}</span>
          <span class="film-card__genre">${genre[0]}</span></p>
          <img src=${poster} alt="" class="film-card__poster">
          <p class="film-card__description">${getShortDescription(description)}</p>
          <a class="film-card__comments">${comments.length} comments</a>
          <div class="film-card__controls">
          <button class="film-card__controls-item button film-card__controls-item--add-to-watchlist ${getFilterClassName(isWatchList)}" type="button">Add to watchlist</button>
          <button class="film-card__controls-item button film-card__controls-item--mark-as-watched ${getFilterClassName(isHistoryList)}" type="button">Mark as watched</button>
          <button class="film-card__controls-item button film-card__controls-item--favorite ${getFilterClassName(isFavoriteList)}" type="button">Mark as favorite</button></div>
          </article>`
  );
};

export default class FilmCard extends Abstract {
  constructor(film) {
    super();
    this._film = film;

    this._openPopapHandler = this._openPopapHandler.bind(this);
    this._watchListClickHandler = this._watchListClickHandler.bind(this);
    this._historyClickHandler = this._historyClickHandler.bind(this);
    this._favoriteClickHandler = this._favoriteClickHandler.bind(this);
  }

  getTemplate() {
    return createFilmCard(this._film);
  }

  _openPopapHandler(evt) {
    evt.preventDefault();
    if (handleElements.includes(evt.target.className)) {
      this._callback.openPopap();
    } else {
      return;
    }
  }

  _watchListClickHandler(evt) {
    evt.preventDefault();
    this._callback.watchlistClick();
  }

  _historyClickHandler(evt) {
    evt.preventDefault();
    this._callback.historyClick();
  }

  _favoriteClickHandler(evt) {
    evt.preventDefault();
    this._callback.favoriteClick();
  }

  setOpenPopapHandler(callback) {
    this._callback.openPopap = callback;
    this.getElement().addEventListener(`click`, this._openPopapHandler);
  }

  setWatchlistHandler(callback) {
    this._callback.watchlistClick = callback;
    this.getElement().querySelector(`.film-card__controls-item--add-to-watchlist`).addEventListener(`click`, this._watchListClickHandler);
  }
  setHistoryHandler(callback) {
    this._callback.historyClick = callback;
    this.getElement().querySelector(`.film-card__controls-item--mark-as-watched`).addEventListener(`click`, this._historyClickHandler);
  }
  setFavoriteHandler(callback) {
    this._callback.favoriteClick = callback;
    this.getElement().querySelector(`.film-card__controls-item--favorite`).addEventListener(`click`, this._favoriteClickHandler);
  }
}

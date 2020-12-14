
import dayjs from "dayjs";
export const createFilmCard = (film) => {
  const { title, poster, description, comments, realizeDate, rating, duration, genre, isWatchList, isHistoryList, isFavoriteList } = film;

  const date = dayjs(realizeDate).format('YYYY')
  const MAX_LENGTH_DESCR = 140;
  const shortDescription = description.length > MAX_LENGTH_DESCR
    ? description.slice(0, MAX_LENGTH_DESCR) + '...'
    : description;

  const watchListClassName = isWatchList
    ? `film-card__controls-item--active`
    : ``;
  const historyListClassName = isHistoryList
    ? `film-card__controls-item--active`
    : ``;
  const FavoriteClassName = isFavoriteList
    ? `film-card__controls-item--active`
    : ``;
  return `<article class="film-card">
  <h3 class="film-card__title">${title}</h3>
  <p class="film-card__rating">${rating}</p>
  <p class="film-card__info"><span class="film-card__year">${date}</span>
  <span class="film-card__duration">${duration}</span>
  <span class="film-card__genre">${genre}</span></p>
  <img src=${poster} alt="" class="film-card__poster">
  <p class="film-card__description">${shortDescription}</p>
  <a class="film-card__comments">${comments.length} comments</a><div class="film-card__controls">
  <button class="film-card__controls-item button film-card__controls-item--add-to-watchlist ${watchListClassName}" type="button">Add to watchlist</button>
  <button class="film-card__controls-item button film-card__controls-item--mark-as-watched ${historyListClassName}" type="button">Mark as watched</button>
  <button class="film-card__controls-item button film-card__controls-item--favorite ${FavoriteClassName}" type="button">Mark as favorite</button></div></article>`;
};

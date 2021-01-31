import FilmCard from "../view/film-card.js";
import FullFilmDescription from "../view/film-description.js";
import {render, RenderPosition, replace, remove} from "../utils/render.js";
import {UserAction, UpdateType} from "../const.js";

const Mode = {
  DEFAULT: `DEFAULT`,
  POPUP_OPEN: `POPUP_OPEN`
};

export default class Film {
  constructor(filmListContainer, changeData, changeMode, api) {
    this._filmListContainer = filmListContainer;
    this._changeData = changeData;
    this._changeMode = changeMode;
    this._api = api;
    this._siteBodyContaner = document.querySelector(`body`);

    this._filmComponent = null;
    this._fullFilmComponent = null;
    this._mode = Mode.DEFAULT;

    this._handleOpenPopup = this._handleOpenPopup.bind(this);
    this._handleCommentLoad = this._handleCommentLoad.bind(this);
    this._handleWatchlistClick = this._handleWatchlistClick.bind(this);
    this._handleHistoryClick = this._handleHistoryClick.bind(this);
    this._handleFavoriteClick = this._handleFavoriteClick.bind(this);
    this._handleClosePopup = this._handleClosePopup.bind(this);
    this._escKeyDownHandler = this._escKeyDownHandler.bind(this);
  }

  init(film) {
    this._film = film;

    const prevFilmComponent = this._filmComponent;
    const prevFullFilmComponent = this._fullFilmComponent;

    this._filmComponent = new FilmCard(film);
    this._fullFilmComponent = new FullFilmDescription(film);

    this._filmComponent.setOpenPopapHandler(this._handleOpenPopup);
    this._filmComponent.setWatchlistHandler(this._handleWatchlistClick);
    this._filmComponent.setHistoryHandler(this._handleHistoryClick);
    this._filmComponent.setFavoriteHandler(this._handleFavoriteClick);
    this._fullFilmComponent.setClosePopupHandler(this._handleClosePopup);

    if (prevFilmComponent === null || prevFullFilmComponent === null) {
      render(this._filmListContainer, this._filmComponent, RenderPosition.BEFOREEND);
      return;
    }

    if (this._mode === Mode.DEFAULT) {
      replace(this._filmComponent, prevFilmComponent);
    }

    if (this._mode === Mode.POPUP_OPEN) {
      replace(this._fullFilmComponent, prevFullFilmComponent);
    }

    remove(prevFullFilmComponent);

  }

  destroy() {
    remove(this._filmComponent);
    remove(this._fullFilmComponent);
  }

  resetView() {
    if (this._mode !== Mode.DEFAULT) {
      this._handleClosePopup();
    }
  }

  _handleOpenPopup() {
    this._siteBodyContaner.appendChild(this._fullFilmComponent.getElement());
    this._siteBodyContaner.className = `hide-overflow`;
    document.addEventListener(`keydown`, this._escKeyDownHandler);

    this._changeMode();
    this._mode = Mode.POPUP_OPEN;
    this._loadComment();
  }

  _handleWatchlistClick() {
    this._changeData(
      UserAction.CHANGE_FILTER,
      UpdateType.PATCH,
      Object.assign({}, this._film, {isWatchList: !this._film.isWatchList}));
  }
  _handleHistoryClick() {
    this._changeData(
      UserAction.CHANGE_FILTER,
      UpdateType.PATCH,
      Object.assign({}, this._film, {isHistoryList: !this._film.isHistoryList}));
  }
  _handleFavoriteClick() {
    this._changeData(
      UserAction.CHANGE_FILTER,
      UpdateType.PATCH,
      Object.assign({}, this._film, {isFavoriteList: !this._film.isFavoriteList}));
  }

  _handleCommentLoad(comments) {
    this._changeData(
      UserAction.LOAD_COMMENTS,
      UpdateType.PATCH,
      Object.assign({}, this._film, {"id": this._film.id, "comments": comments}));
  }

  _loadComment() {
    this._api.getComments(this._film)
      .then((comments) => {
        this._handleCommentLoad(comments);
      });
  }

  _handleClosePopup() {
    this._siteBodyContaner.removeChild(this._fullFilmComponent.getElement());
    this._siteBodyContaner.classList.remove(`hide-overflow`);
    document.removeEventListener(`keydown`, this._escKeyDownHandler);
    this._mode = Mode.DEFAULT;
  }

  _escKeyDownHandler(evt) {
    if (evt.key === `Escape` || evt.key === `Esc`) {
      evt.preventDefault();
      this._handleClosePopup();
    }
  }
}

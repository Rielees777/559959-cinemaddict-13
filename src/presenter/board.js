import FilmListView from "../view/film-list.js";
import FilmBoardView from "../view/film-board.js";
import FilmWrapView from "../view/film-wrap.js";
import FilmPresenter from "./film.js";
import SortFilter from "../view/sort-filter.js";
import {updateItem} from "../utils/common.js";
import {sortFilmByDate, sortFilmByRating} from "../utils/film.js";
import ShowMoreButton from "../view/load-more-button.js";
import {remove, render, RenderPosition} from "../utils/render.js";
import {SortType} from "../const.js";

const FILMS_COUNT_PER_STEP = 5;


export default class Board {
  constructor(boardContainer, filmModel) {
    this._filmModel = filmModel;
    this._boardContainer = boardContainer;
    this._renderedFilmsCount = FILMS_COUNT_PER_STEP;
    this._filmPresenter = {};
    this._currenSortType = SortType.DEFAULT;

    this._filmListComponent = new FilmListView();
    this._filmBoardComponent = new FilmBoardView();
    this._filmWrapComponent = new FilmWrapView();
    this._sortComponent = new SortFilter();
    this._showMoreButtonComponent = new ShowMoreButton();

    this._handleFilmChange = this._handleFilmChange.bind(this);
    this._handleModeChange = this._handleModeChange.bind(this);
    this._handleShowMoreButtonClick = this._handleShowMoreButtonClick.bind(this);
    this._handleSortTypeChange = this._handleSortTypeChange.bind(this);

    this._filmModel.addObserver(this._handleModelEvent);
  }

  init() {
    render(this._boardContainer, this._filmBoardComponent, RenderPosition.BEFOREEND);
    render(this._filmBoardComponent, this._filmListComponent, RenderPosition.BEFOREEND);
    render(this._filmListComponent, this._filmWrapComponent, RenderPosition.BEFOREEND);

    this._renderBoard();
  }

  _getFilms() {
    switch (this._currenSortType) {
      case SortType.BY_DATE:
        return this._filmModel.getFilms().slice().sort(sortFilmByDate);
      case SortType.BY_RATING:
        return this._filmModel.getFilms().slice().sort(sortFilmByRating);  

    }
    return this._filmModel.getFilms();
  }

  _handleModeChange() {
    Object
      .values(this._filmPresenter)
      .forEach((presenter) => presenter.resetView())
  }

  _handleSortTypeChange(sortType) {
    if (this._currenSortType === sortType) {
      return;
    }

   this._currenSortType = sortType;

    this._clearFilmList();
    this._renderFilmList();
  }


  _renderSort() {
    render(this._boardContainer, this._sortComponent, RenderPosition.AFTERBEGIN);
    this._sortComponent.serSortTypeChangeHandler(this._handleSortTypeChange);
  }

  _renderFilm(film) {
    const filmPresenter = new FilmPresenter(this._filmWrapComponent, this._handleFilmChange, this._handleModeChange);
    filmPresenter.init(film);
    this._filmPresenter[film.id] = filmPresenter;
  }

  _handleFilmChange(updatedFilm) {
    this._boardFilms = updateItem(this._boardFilms, updatedFilm);
    this._filmPresenter[updatedFilm.id].init(updatedFilm);
  }

  _renderFilms(films) {
    films.forEach((film) => this._renderFilm(film));
  }

  _handleShowMoreButtonClick() {
    const filmCount = this._getFilms().length;
    const newRenderedFilmCount = Math.min(filmCount, this._renderedFilmsCount + FILMS_COUNT_PER_STEP);
    const films = this._getFilms().slice(this._renderedFilmsCount, newRenderedFilmCount);

    this._renderFilms(films);
    this._renderedFilmsCount = newRenderedFilmCount;

    if (this._renderedFilmsCount >= filmCount) {
      remove(this._showMoreButtonComponent);
    }
  }
  _renderShowMoreButton() {
    render(this._filmBoardComponent, this._showMoreButtonComponent, RenderPosition.BEFOREEND);

    this._showMoreButtonComponent.setClickHandler(this._handleShowMoreButtonClick);
  }

  _clearFilmList() {
    Object
      .values(this._filmPresenter)
      .forEach((presenter) => presenter.destroy());
    this._filmPresenter = {};
    this._renderedFilmsCount = FILMS_COUNT_PER_STEP;
    remove(this._showMoreButtonComponent);
  }

  _renderFilmList() {
    const filmCount = this._getFilms().length;
    const films = this._getFilms().slice(0, Math.min(filmCount, FILMS_COUNT_PER_STEP));

    this._renderFilms(films);

    if (filmCount > FILMS_COUNT_PER_STEP) {
      this._renderShowMoreButton();
    }
  }

  _renderBoard() {
    this._renderSort();
    this._renderFilmList();
  }
}

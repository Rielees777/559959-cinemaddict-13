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
  constructor(boardContainer) {
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
    this._handleShowMoreButtonClick = this._handleShowMoreButtonClick.bind(this);
    this._handleSortTypeChange = this._handleSortTypeChange.bind(this);
  }

  init(boardFilms) {
    this._boardFilms = boardFilms.slice();

    this._sourcedBoardFilms = boardFilms.slice();

    render(this._boardContainer, this._filmBoardComponent, RenderPosition.BEFOREEND);
    render(this._filmBoardComponent, this._filmListComponent, RenderPosition.BEFOREEND);
    render(this._filmListComponent, this._filmWrapComponent, RenderPosition.BEFOREEND);

    this._renderBoard();
  }

  _sortFilms(sortType) {
    switch (sortType) {
      case SortType.BY_DATE:
        this._boardFilms.sort(sortFilmByDate);
        break;
      case SortType.BY_RATING:
        this._boardFilms.sort(sortFilmByRating);
        break;
      default:
        this._boardFilms = this._sourcedBoardFilms.slice();
    }

    this._currenSortType = sortType;
  }

  _handleSortTypeChange(sortType) {
    if (this._currenSortType === sortType) {
      return;
    }

    this._sortFilms(sortType);

    this._clearFilmList();
    this._renderFilmList();
  }


  _renderSort() {
    render(this._boardContainer, this._sortComponent, RenderPosition.AFTERBEGIN);
    this._sortComponent.serSortTypeChangeHandler(this._handleSortTypeChange);
  }

  _renderFilm(film) {
    const filmPresenter = new FilmPresenter(this._filmWrapComponent, this._handleFilmChange);
    filmPresenter.init(film);
    this._filmPresenter[film.id] = filmPresenter;
  }

  _handleFilmChange(updatedFilm) {
    this._boardFilms = updateItem(this._boardFilms, updatedFilm);
    this._filmPresenter[updatedFilm.id].init(updatedFilm);
  }

  _renderFilms(from, to) {
    this._boardFilms
      .slice(from, to)
      .forEach((boardFilm) => this._renderFilm(boardFilm));
  }

  _handleShowMoreButtonClick() {
    this._renderFilms(this._renderedFilmsCount, this._renderedFilmsCount + FILMS_COUNT_PER_STEP);
    this._renderedFilmsCount += FILMS_COUNT_PER_STEP;

    if (this._renderedFilmsCount >= this._boardFilms.length) {
      this._showMoreButtonComponent.getElement().remove();
      this._showMoreButtonComponent.removeElement();
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
    this._renderFilms(0, Math.min(this._boardFilms.length, FILMS_COUNT_PER_STEP));

    if (this._boardFilms.length > FILMS_COUNT_PER_STEP) {
      this._renderShowMoreButton();
    }
  }

  _renderBoard() {
    this._renderSort();
    this._renderFilmList();
  }
}

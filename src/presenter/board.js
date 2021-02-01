import FilmListView from "../view/film-list.js";
import FilmBoardView from "../view/film-board.js";
import FilmWrapView from "../view/film-wrap.js";
import FilmPresenter from "./film.js";
import SortFilter from "../view/sort-filter.js";
import {sortFilmByDate, sortFilmByRating} from "../utils/film.js";
import ShowMoreButton from "../view/load-more-button.js";
import {remove, render, RenderPosition} from "../utils/render.js";
import {filter} from "../utils/filter.js";
import {SortType, UpdateType, UserAction} from "../const.js";

const FILMS_COUNT_PER_STEP = 5;


export default class Board {
  constructor(boardContainer, filmModel, filterModel, api) {
    this._filmModel = filmModel;
    this._filterModel = filterModel;
    this._boardContainer = boardContainer;
    this._renderedFilmsCount = FILMS_COUNT_PER_STEP;
    this._filmPresenter = {};
    this._currenSortType = SortType.DEFAULT;
    this._api = api;

    this._sortComponent = null;
    this._showMoreButtonComponent = null;

    this._filmListComponent = new FilmListView();
    this._filmBoardComponent = new FilmBoardView();
    this._filmWrapComponent = new FilmWrapView();

    this._handleViewAction = this._handleViewAction.bind(this);
    this._handleModelEvent = this._handleModelEvent.bind(this);
    this._handleModeChange = this._handleModeChange.bind(this);
    this._handleShowMoreButtonClick = this._handleShowMoreButtonClick.bind(this);
    this._handleSortTypeChange = this._handleSortTypeChange.bind(this);

    this._filmModel.addObserver(this._handleModelEvent);
    this._filterModel.addObserver(this._handleModelEvent);
  }

  init() {
    render(this._boardContainer, this._filmBoardComponent, RenderPosition.BEFOREEND);
    render(this._filmBoardComponent, this._filmListComponent, RenderPosition.BEFOREEND);
    render(this._filmListComponent, this._filmWrapComponent, RenderPosition.BEFOREEND);

  }

  _getFilms() {
    const filterType = this._filterModel.getFilter();
    const films = this._filmModel.getFilms();
    const filtredFilms = filter[filterType](films);

    switch (this._currenSortType) {
      case SortType.BY_DATE:
        return filtredFilms.sort(sortFilmByDate);
      case SortType.BY_RATING:
        return filtredFilms.sort(sortFilmByRating);
    }

    return filtredFilms;
  }

  _handleModeChange() {
    Object
      .values(this._filmPresenter)
      .forEach((presenter) => presenter.resetView());
  }

  _handleViewAction(actionType, updateType, update) {
    switch (actionType) {
      case UserAction.CHANGE_FILTER:
        this._api.updateFilm(update)
          .then((response) => {
            this._filmModel.updateFilm(updateType, response);
          });
        break;
      case UserAction.LOAD_COMMENTS:
        this._filmModel.setComments(updateType, update);
        break;
      case UserAction.ADD_COMMENT:
        break;
      case UserAction.DELETE_COMMENT:
        break;
    }
  }

  _handleModelEvent(updateType, film) {
    switch (updateType) {
      case UpdateType.PATCH:
        this._filmPresenter[film.id].init(film);
        break;
      case UpdateType.MINOR:

        this._clearBoard();
        this._renderBoard();
        break;
      case UpdateType.MAJOR:
        this._clearBoard({resetRenderedFilmCount: true, resetSortType: true});
        this._renderBoard();
        break;
      case UpdateType.INIT:

        this._renderBoard();
        break;
    }
  }

  _handleSortTypeChange(sortType) {
    if (this._currenSortType === sortType) {
      return;
    }

    this._currenSortType = sortType;

    this._clearBoard({resetRenderedFilmCount: true});
    this._renderBoard();
  }


  _renderSort() {
    if (this._sortComponent !== null) {
      this._sortComponent = null;
    }

    this._sortComponent = new SortFilter(this._currenSortType);
    this._sortComponent.setSortTypeChangeHandler(this._handleSortTypeChange);
    render(this._boardContainer, this._sortComponent, RenderPosition.AFTERBEGIN);
  }

  _renderFilm(film) {
    const filmPresenter = new FilmPresenter(this._filmWrapComponent, this._handleViewAction, this._handleModeChange, this._api);
    filmPresenter.init(film);
    this._filmPresenter[film.id] = filmPresenter;
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
    if (this._showMoreButtonComponent !== null) {
      this._showMoreButtonComponent = null;
    }

    this._showMoreButtonComponent = new ShowMoreButton();
    this._showMoreButtonComponent.setClickHandler(this._handleShowMoreButtonClick);
    render(this._filmBoardComponent, this._showMoreButtonComponent, RenderPosition.BEFOREEND);
  }


  _clearBoard({resetRenderedFilmCount = false, resetSortType = false} = {}) {
    const filmCount = this._getFilms().length;

    Object
      .values(this._filmPresenter)
      .forEach((presenter) => presenter.destroy());

    this._filmPresenter = {};

    remove(this._sortComponent);
    remove(this._showMoreButtonComponent);

    if (resetRenderedFilmCount) {
      this._renderedFilmsCount = FILMS_COUNT_PER_STEP;
    } else {
      this._renderedFilmsCount = Math.min(filmCount, this._renderedFilmsCount);
    }

    if (resetSortType) {
      this._currenSortType = SortType.DEFAULT;
    }
  }


  _renderBoard() {
    const films = this._getFilms();
    const filmCount = films.length;


    this._renderSort();
    this._renderFilms(films.slice(0, Math.min(filmCount, this._renderedFilmsCount)));


    if (filmCount > this._renderedFilmsCount) {
      this._renderShowMoreButton();
    }
  }
}

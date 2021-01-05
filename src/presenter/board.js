import FilmListView from "../view/film-list.js";
import FilmBoardView from "../view/film-board.js";
import FilmWrapView from "../view/film-wrap.js";
import FilmCard from "../view/film-card.js";
import SortFilter from "../view/sort-filter.js";
import FullFilmDescription from "../view/film-description.js";
import ShowMoreButton from "../view/load-more-button.js";
import {render, RenderPosition} from "../utils.js";

const FILMS_COUNT_PER_STEP = 5;
const siteBodyContaner = document.querySelector(`body`);

export default class Board {
  constructor(boardContainer) {
    this._boardContainer = boardContainer;

    this._filmListComponent = new FilmListView();
    this._filmBoardComponent = new FilmBoardView();
    this._filmWrapComponent = new FilmWrapView();
    this._sortFilterComponent = new SortFilter();

  }

  init(boardFilms) {
    this._boardFilms = boardFilms.slice();

    render(this._boardContainer, this._filmBoardComponent, RenderPosition.BEFOREEND);
    render(this._filmBoardComponent, this._filmListComponent, RenderPosition.BEFOREEND);

    this._renderBoard();
  }

  _renderSort() {
    render(this._boardContainer, this._sortFilterComponent, RenderPosition.BEFOREEND);
  }


  _renderFilm(film) {
    const filmCardComponent = new FilmCard(film);
    const fullFilmDescriptionComponent = new FullFilmDescription(film);

    const popapOpen = () => {
      filmsWrapComponent.getElement().appendChild(fullFilmDescriptionComponent.getElement());
      siteBodyContaner.className = `hide-overflow`;
    };

    const popapClose = () => {
      filmsWrapComponent.removeChild(fullFilmDescriptionComponent.getElement());
      siteBodyContaner.classList.remove(`hide-overflow`);
    };

    const onEscapeKeyDown = (evt) => {
      if (evt.key === `Escape` || evt.key === `Esc`) {
        evt.preventDefault();
        popapClose();
        document.removeEventListener(`keydown`, onEscapeKeyDown);
      }
    };

    filmCardComponent.setOpenPopapHandler(() => {
      popapOpen();
      document.addEventListener(`keydown`, onEscapeKeyDown);
    });
    fullFilmDescriptionComponent.setClosePopapHandler(() => {
      popapClose();
      document.removeEventListener(`keydown`, onEscapeKeyDown);
    });
    render(this._filmsWrapComponent, filmCardComponent.getElement(), RenderPosition.BEFOREEND);
  }

  _renderFilms(from, to) {
    this._boardFilms
      .slice(from, to)
      .forEach((boardFilm) => this._renderFilm(boardFilm));
  }

  _renderShowMoreButton() {

    let renderedFilmsCount = FILMS_COUNT_PER_STEP;
    const showMoreButtonComponent = new ShowMoreButton();
    render(this._filmBoardComponent, showMoreButtonComponent, RenderPosition.BEFOREEND);

    showMoreButtonComponent.setClickHandler(() => {
      this._boardFilms
        .slice(renderedFilmsCount, renderedFilmsCount + FILMS_COUNT_PER_STEP)
        .forEach((film) => renderFilm(filmsWrapView.getElement(), film));

      renderedFilmsCount += FILMS_COUNT_PER_STEP;
      if (renderedFilmsCount >= films.length) {
        showMoreButtonComponent.getElement().remove();
        showMoreButtonComponent.removeElement();
      }
    });
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

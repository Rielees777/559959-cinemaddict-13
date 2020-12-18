import FilmListView from "./view/film-list.js";
import FilmBoardView from "./view/film-board.js";
import FilmCard from "./view/film-card.js";
import SiteMenuView from "./view/menu.js";
import SortFilter from "./view/sort-filter.js";
import ShowMoreButton from "./view/load-more-button.js";
import UserRank from "./view/user-rank.js";
import FilmCounter from "./view/filmCounter.js";
import FullFilmDescription from "./view/film-description.js";
import {generateFilm} from "./mock/film.js";
import {generateFilter} from "./mock/filter.js";
import {render, RenderPosition, handleElements} from "./utils.js";

const FILMS_COUNT = 15;
const FILMS_COUNT_PER_STEP = 5;
const FILMS_EXTRA_COUNT = 2;

const films = new Array(FILMS_COUNT).fill().map(generateFilm);
const filter = generateFilter(films);

const siteBodyContaner = document.querySelector(`body`);
const siteHeaderElement = document.querySelector(`.header`);
const siteMainElement = document.querySelector(`.main`);
const siteFooter = document.querySelector(`.footer`);
const siteFilmCounter = siteFooter.querySelector(`.footer__statistics`);

render(siteHeaderElement, new UserRank().getElement(), RenderPosition.BEFOREEND);
render(siteMainElement, new SiteMenuView(filter).getElement(), RenderPosition.AFTERBEGIN);
render(siteMainElement, new SortFilter().getElement(), RenderPosition.BEFOREEND);

const filmBoardComponent = new FilmBoardView();
render(siteMainElement, filmBoardComponent.getElement(), RenderPosition.BEFOREEND);

const siteFilms = filmBoardComponent.getElement().querySelector(`.films-list`);
const filmsListComponent = new FilmListView();
render(siteFilms, filmsListComponent.getElement(), RenderPosition.BEFOREEND);

const renderFilm = (filmElement, film) => {
  const filmCardComponent = new FilmCard(film);
  const fullFilmDescriptionComponent = new FullFilmDescription(film);

  const popapOpen = () => {
    filmElement.appendChild(fullFilmDescriptionComponent.getElement());
    siteBodyContaner.className = `hide-overflow`;
  };

  const popapClose = () => {
    filmElement.removeChild(fullFilmDescriptionComponent.getElement());
    siteBodyContaner.classList.remove(`hide-overflow`)
  };

  const onEscapeKeyDown = (evt) => {
    if (evt.key === `Escape` || evt.key === `Esc`) {
      evt.preventDefault();
      popapClose();
      document.removeEventListener('keydown', onEscapeKeyDown);
    }
  };

  render(filmElement, filmCardComponent.getElement(), RenderPosition.BEFOREEND);
  filmCardComponent.getElement().addEventListener(`click`, (evt) => {
    if (handleElements.includes(evt.target.className)) {
      popapOpen();
      document.addEventListener(`keydown`, onEscapeKeyDown);
    };
  });

  fullFilmDescriptionComponent.getElement().querySelector(`.film-details__close-btn`).addEventListener(`click`, () => {
    popapClose();
    document.removeEventListener('keydown', onEscapeKeyDown);
  });
};

for (let i = 0; i < Math.min(films.length, FILMS_COUNT_PER_STEP); i++) {
  renderFilm(filmsListComponent.getElement(), films[i]);
}


if (films.length > FILMS_COUNT_PER_STEP) {
  let renderedFilmsCount = FILMS_COUNT_PER_STEP;
  const showMoreButtonComponent = new ShowMoreButton();
  render(siteFilms, showMoreButtonComponent.getElement(), RenderPosition.BEFOREEND);

  showMoreButtonComponent.getElement().addEventListener(`click`, (evt) => {
    evt.preventDefault();
    films
      .slice(renderedFilmsCount, renderedFilmsCount + FILMS_COUNT_PER_STEP)
      .forEach((film) => renderFilm(filmsListComponent.getElement(), film));

    renderedFilmsCount += FILMS_COUNT_PER_STEP;
    if (renderedFilmsCount >= films.length) {
      showMoreButtonComponent.getElement().remove();
      showMoreButtonComponent.removeElement();
    }
  });
}

const siteFilmsListExtra = filmBoardComponent.getElement().querySelectorAll(`.films-list--extra`);

siteFilmsListExtra.forEach((section) => {
  const siteFilmExtraCard = section.querySelector(`.films-list__container`);
  for (let i = 0; i < FILMS_EXTRA_COUNT; i++) {
    render(siteFilmExtraCard, new FilmCard(films[i]).getElement(), `beforeend`);
  }
});

render(siteFilmCounter, new FilmCounter().getElement(), RenderPosition.BEFOREEND);


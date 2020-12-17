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
import {renderTemplate, renderElement, RenderPosition} from "./utils.js";

const FILMS_COUNT = 15;
const FILMS_COUNT_PER_STEP = 5;
const FILMS_EXTRA_COUNT = 2;

const films = new Array(FILMS_COUNT).fill().map(generateFilm);
const filter = generateFilter(films);

/**
   * Функция render выполняет отрисовку компонента в указанном месте HTML документа
   * @param {HTMLElement} container блок HTML в который будет добавлен компонент
   * @param {HTMLElement} template сам компонент для добавления в документ
   * @param {string} place строка определяющая позицию добавляемого компонента по отношению к блоку HTML
   */


const siteHeaderElement = document.querySelector(`.header`);
const siteMainElement = document.querySelector(`.main`);

renderElement(siteHeaderElement, new UserRank().getElement(), RenderPosition.BEFOREEND);
renderElement(siteMainElement, new SiteMenuView(filter).getElement(), RenderPosition.AFTERBEGIN);
renderElement(siteMainElement, new SortFilter().getElement(), RenderPosition.BEFOREEND);

const filmBoardComponent = new FilmBoardView();
renderElement(siteMainElement, filmBoardComponent.getElement(), RenderPosition.BEFOREEND);

const siteFilms = filmBoardComponent.getElement().querySelector(`.films-list`);
const filmsListComponent = new FilmListView();
renderElement(siteFilms, filmsListComponent.getElement(), RenderPosition.BEFOREEND);

const renderFilm = (filmElement, film) => {
  const filmCardComponent = new FilmCard(film);
  const fullFilmDescriptionComponent = new FullFilmDescription(film);
  const popapOpen = () => {
    filmElement.appendChild(fullFilmDescriptionComponent.getElement());
  };
  const popapClose = () => {
    filmElement.removeChild(fullFilmDescriptionComponent.getElement());
  };

  filmCardComponent.getElement().querySelector(`.film-card__title`).addEventListener(`click`, () => {
    popapOpen();
  });
  filmCardComponent.getElement().querySelector(`.film-card__poster`).addEventListener(`click`, () => {
    popapOpen();
  });
  filmCardComponent.getElement().querySelector(`.film-card__comments`).addEventListener(`click`, () => {
    popapOpen();
  });


  fullFilmDescriptionComponent.getElement().querySelector(`.film-details__close-btn`).addEventListener(`click`, () => {
    popapClose();
  });

  renderElement(filmElement, filmCardComponent.getElement(), RenderPosition.BEFOREEND);
};

for (let i = 0; i < Math.min(films.length, FILMS_COUNT_PER_STEP); i++) {
  renderFilm(filmsListComponent.getElement(), films[i]);
}


if (films.length > FILMS_COUNT_PER_STEP) {
  let renderedFilmsCount = FILMS_COUNT_PER_STEP;
  const showMoreButtonComponent = new ShowMoreButton();
  renderElement(siteFilms, showMoreButtonComponent.getElement(), RenderPosition.BEFOREEND);

  siteFilms.addEventListener(`click`, (evt) => {
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
    renderElement(siteFilmExtraCard, new FilmCard(films[i]).getElement(), `beforeend`);
  }
});


const siteFooter = document.querySelector(`.footer`);
const siteFilmCounter = siteFooter.querySelector(`.footer__statistics`);

renderTemplate(siteFilmCounter, new FilmCounter().getTemplate(), RenderPosition.BEFOREEND);


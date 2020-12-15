import FilmListView from "./view/film-list.js";
import FilmCard from "./view/film-card.js";
import SiteMenuView from "./view/menu.js";
import SortFilter from "./view/sort-filter.js"
import ShowMoreButton from "./view/load-more-button.js";
import UserRank from "./view/user-rank.js";
import FilmCounter from "./view/filmCounter.js";
import {createFullFilmDescription} from "./view/film-description.js";
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


const siteHeaderElement = document.querySelector('.header');

renderTemplate(siteHeaderElement, new UserRank().getTemplate(), RenderPosition.BEFOREEND);

const siteMainElement = document.querySelector('.main');

renderTemplate(siteMainElement, new SiteMenuView(filter).getTemplate(), RenderPosition.AFTERBEGIN);
renderTemplate(siteMainElement, new SortFilter().getTemplate(), RenderPosition.BEFOREEND);

const siteFilms = siteMainElement.querySelector('.films');
const siteFilmCard = siteFilms.querySelector('.films-list__container');

for (let i = 0; i < Math.min(films.length, FILMS_COUNT_PER_STEP); i++) {
  renderTemplate(siteFilmCard, new FilmCard(films[i]).getTemplate(), RenderPosition.BEFOREEND);
}


const siteFilmsBoard = siteFilms.querySelector('.films-list');
if (films.length > FILMS_COUNT_PER_STEP) {
  let renderedFilmsCount = FILMS_COUNT_PER_STEP;
  renderTemplate(siteFilmsBoard, new ShowMoreButton().getTemplate(), RenderPosition.BEFOREEND);
  const loadMoreButton = siteFilmsBoard.querySelector('.films-list__show-more');

  siteFilmsBoard.addEventListener('click', (evt) => {
    evt.preventDefault();
    films
      .slice(renderedFilmsCount, renderedFilmsCount + FILMS_COUNT_PER_STEP)
      .forEach((films) => renderTemplate(siteFilmCard, new FilmCard(films).getTemplate(), 'beforeend'));

    renderedFilmsCount += FILMS_COUNT_PER_STEP;
    if (renderedFilmsCount >= films.length) {
      loadMoreButton.remove()
    }
  });
}

const siteFilmsListExtra = siteFilms.querySelectorAll('.films-list--extra');

siteFilmsListExtra.forEach((section) => {
  const siteFilmExtraCard = section.querySelector('.films-list__container');
  for (let i = 0; i < FILMS_EXTRA_COUNT; i++) {
    renderTemplate(siteFilmExtraCard, new FilmCard(films[i]).getTemplate(), 'beforeend');
  }
})

const siteFooter = document.querySelector('.footer');
const siteFilmCounter = siteFooter.querySelector('.footer__statistics');
//renderTemplate(siteFooter, createFullFilmDescription(films[0]), 'afterend');
renderTemplate(siteFilmCounter, new FilmCounter().getTemplate(), RenderPosition.BEFOREEND);


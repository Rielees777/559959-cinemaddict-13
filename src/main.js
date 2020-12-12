import { createFilmCard } from "./view/film-card.js";
import { createMenuTemplate } from "./view/menu.js";
import { createSortFilterTemplate } from "./view/sort-filter.js"
import { createLoadMoreButton } from "./view/load-more-button.js";
import { createUserRank } from "./view/user-rank.js";
import { createFilmCounterTemplate } from "./view/filmCounter.js";
import { createFullFilmDescription } from "./view/film-description.js";
import { generateFilmCard } from "./mock/film.js";

const FILMS_COUNT = 15;
const FILMS_EXTRA_COUNT = 2;

const films = new Array(FILMS_COUNT).fill().map(generateFilmCard);

/**
   * Функция render выполняет отрисовку компонента в указанном месте HTML документа
   * @param {HTMLElement} container блок HTML в который будет добавлен компонент
   * @param {HTMLElement} template сам компонент для добавления в документ
   * @param {string} place строка определяющая позицию добавляемого компонента по отношению к блоку HTML
   */
const render = (container, template, place) => {
  container.insertAdjacentHTML(place, template);
}

const siteHeaderElement = document.querySelector('.header');

render(siteHeaderElement, createUserRank(), 'beforeend');

const siteMainElement = document.querySelector('.main');

render(siteMainElement, createMenuTemplate(), 'beforeend');
render(siteMainElement, createSortFilterTemplate(), 'beforeend');

const siteFilmsList = siteMainElement.querySelector('.films');
const siteFilmCard = siteFilmsList.querySelector('.films-list__container');
const siteFooter = document.querySelector('.footer');
for (let i = 0; i < FILMS_COUNT; i++) {
  render(siteFilmCard, createFilmCard(films[i]), 'beforeend');
}

render(siteFooter, createFullFilmDescription(films[0]), 'afterend');
const siteShowMoreButton = siteFilmsList.querySelector('.films-list');

render(siteShowMoreButton, createLoadMoreButton(), 'beforeend');

const siteFilmsListExtra = siteFilmsList.querySelectorAll('.films-list--extra');

siteFilmsListExtra.forEach((section) => {
  const siteFilmExtraCard = section.querySelector('.films-list__container');
  for (let i = 0; i < FILMS_EXTRA_COUNT; i++) {
    render(siteFilmExtraCard, createFilmCard(films[i]), 'beforeend');
  }
})


const siteFilmCounter = siteFooter.querySelector('.footer__statistics');

render(siteFilmCounter, createFilmCounterTemplate(), 'beforeend');


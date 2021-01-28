
import SiteMenuView from "./view/menu.js";
import UserRank from "./view/user-rank.js";
import FilmCounter from "./view/filmCounter.js";
import Board from "./presenter/board.js";
import FilmModel from "./model/films.js";
import {generateFilm} from "./mock/film.js";
import {generateFilter} from "./mock/filter.js";
import {render, RenderPosition} from "./utils/render.js";

const FILMS_COUNT = 15;

const films = new Array(FILMS_COUNT).fill().map(generateFilm);
const filter = generateFilter(films);

const filmModel = new FilmModel();
filmModel.setFilms(films);

const siteHeaderElement = document.querySelector(`.header`);
const siteMainElement = document.querySelector(`.main`);
const siteFooter = document.querySelector(`.footer`);

render(siteHeaderElement, new UserRank().getElement(), RenderPosition.BEFOREEND);

const boardPresenter = new Board(siteMainElement, filmModel);

boardPresenter.init();

render(siteMainElement, new SiteMenuView(filter).getElement(), RenderPosition.AFTERBEGIN);

// const siteFilmsListExtra = filmBoardComponent.getElement().querySelectorAll(`.films-list--extra`);

// siteFilmsListExtra.forEach((section) => {
//   const siteFilmExtraCard = section.querySelector(`.films-list__container`);
//   for (let i = 0; i < FILMS_EXTRA_COUNT; i++) {
//     render(siteFilmExtraCard, new FilmCard(films[i]).getElement(), `beforeend`);
//   }
// });

render(siteFooter, new FilmCounter().getElement(), RenderPosition.BEFOREEND);


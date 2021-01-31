
import UserRank from "./view/user-rank.js";
import FilmCounter from "./view/filmCounter.js";
import Board from "./presenter/board.js";
import Filter from "./presenter/filter.js";
import FilmModel from "./model/films.js";
import FilterModel from "./model/filter.js";
//import {generateFilm} from "./mock/film.js";
import Api from "./api.js";
import {render, RenderPosition} from "./utils/render.js";
import {UpdateType} from "./const.js";

//const FILMS_COUNT = 15;
const AUTHORIZATION = `Basic asghg124djkkl`;
const END_POINT = `https://13.ecmascript.pages.academy/cinemaddict`;

//const films = new Array(FILMS_COUNT).fill().map(generateFilm);


const siteHeaderElement = document.querySelector(`.header`);
const siteMainElement = document.querySelector(`.main`);
const siteFooter = document.querySelector(`.footer`);

const api = new Api(END_POINT, AUTHORIZATION);

const filmModel = new FilmModel();
const filterModel = new FilterModel();

render(siteHeaderElement, new UserRank().getElement(), RenderPosition.BEFOREEND);

const boardPresenter = new Board(siteMainElement, filmModel, filterModel, api);
const filterPresetner = new Filter(siteMainElement, filterModel, filmModel);



api.getFilms()
  .then((films) => {
    filmModel.setFilms(UpdateType.INIT, films);
  })
  .catch(() => {
    filmModel.setFilms(UpdateType.INIT, []);
  })
filterPresetner.init();
boardPresenter.init();
// const siteFilmsListExtra = filmBoardComponent.getElement().querySelectorAll(`.films-list--extra`);

// siteFilmsListExtra.forEach((section) => {
//   const siteFilmExtraCard = section.querySelector(`.films-list__container`);
//   for (let i = 0; i < FILMS_EXTRA_COUNT; i++) {
//     render(siteFilmExtraCard, new FilmCard(films[i]).getElement(), `beforeend`);
//   }
// });

render(siteFooter, new FilmCounter().getElement(), RenderPosition.BEFOREEND);


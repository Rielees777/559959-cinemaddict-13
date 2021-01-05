import Abstract from "./abstract.js";

const createFilmWrap = () => {
  return `<div class="films-list__container"></div>`;
};


export default class FilmWrapView extends Abstract {

  getTemplate() {
    return createFilmWrap();
  }
}

import Abstract from "./abstract.js";

const createFilmList = () => {
  return `<div class="films-list__container"></div>`;
};


export default class FilmListView extends Abstract {

  getTemplate() {
    return createFilmList();
  }
}

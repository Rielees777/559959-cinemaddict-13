import {createElement} from "../utils.js";

const createFilmList = () => {
  return `<div class="films-list__container"></div>`;
};


export default class FilmListView {
  constructor() {
    this._element = null;
  }

  getTemplate() {
    return createFilmList();
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }
    return this._element;
  }
  removeElement() {
    this._element = null;
  }
}

import {createElement} from "../utils.js"

const createFilmCounterTemplate = () => {
  return '<p>130 291 movies inside</p>';
};

export default class FilmCounter {
  constructor() {
    this._element = null;
  };

  getTemplate() {
    return createFilmCounterTemplate();
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

import Abstract from "./abstract.js";

const createFilmCounterTemplate = () => {
  return `<p>130 291 movies inside</p>`;
};

export default class FilmCounter extends Abstract {

  getTemplate() {
    return createFilmCounterTemplate();
  }
}

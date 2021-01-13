import Abstract from "./abstract.js";

const createFilmCounterTemplate = () => {
  return `<section class="footer__statistics">
            <p>130 291 movies inside</p>
          </section>`;
};

export default class FilmCounter extends Abstract {

  getTemplate() {
    return createFilmCounterTemplate();
  }
}

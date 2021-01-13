import Abstract from "./abstract.js";

const createFilmBoard = () => {
  return `<section class="films">
</section>`;
};


export default class FilmBoardView extends Abstract {

  getTemplate() {
    return createFilmBoard();
  }
}

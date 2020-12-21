import dayjs from "dayjs";
import Abstract from "./abstract.js";

const createCommentsTemplate = (comments) => {
  return comments.map((comment) => `<li class="film-details__comment">
  <span class="film-details__comment-emoji">
    <img src="${comment.commentsEmoji}" width="55" height="55" alt="emoji-smile">
  </span>
    <div>
      <p class="film-details__comment-text">${comment.commentsText}</p>
      <p class="film-details__comment-info">
        <span class="film-details__comment-author">${comment.commentsAuthor}</span>
        <span class="film-details__comment-day">${comment.commentsDay}</span>
        <button class="film-details__comment-delete">Delete</button>
      </p>
    </div>
    </li>`).join(``);
};
const createFullFilmDescription = (film) => {
  const {title, originalTitle, poster, directors, writers, actors, country, realizeDate, rating, duration, genre, ageLimit, description, comments} = film;
  const date = dayjs(realizeDate).format(`DD MMMM YYYY`);

  return `<section class="film-details">
    <form class="film-details__inner" action = "#" method = "get" >
      <div class="film-details__top-container">
        <div class="film-details__close">
          <button class="film-details__close-btn" type="button">close</button>
        </div>
        <div class="film-details__info-wrap">
          <div class="film-details__poster">
            <img class="film-details__poster-img" src="${poster}" alt="">
              <p class="film-details__age">${ageLimit}+</p>
        </div>
            <div class="film-details__info">
              <div class="film-details__info-head">
                <div class="film-details__title-wrap">
                  <h3 class="film-details__title">${title}</h3>
                  <p class="film-details__title-original">Original: ${originalTitle}</p>
                </div>
                <div class="film-details__rating">
                  <p class="film-details__total-rating">${rating}</p>
                </div>
              </div>
              <table class="film-details__table">
                <tr class="film-details__row">
                  <td class="film-details__term">Director</td>
                  <td class="film-details__cell">${directors}</td>
                </tr>
                <tr class="film-details__row">
                  <td class="film-details__term">Writers</td>
                  <td class="film-details__cell">${writers}</td>
                </tr>
                <tr class="film-details__row">
                  <td class="film-details__term">Actors</td>
                  <td class="film-details__cell">${actors}</td>
                </tr>
                <tr class="film-details__row">
                  <td class="film-details__term">Release Date</td>
                  <td class="film-details__cell">${date}</td>
                </tr>
                <tr class="film-details__row">
                  <td class="film-details__term">Runtime</td>
                  <td class="film-details__cell">${duration}</td>
                </tr>
                <tr class="film-details__row">
                  <td class="film-details__term">Country</td>
                  <td class="film-details__cell">${country}</td>
                </tr>
                <tr class="film-details__row">
                  <td class="film-details__term">Genres</td>
                  <td class="film-details__cell">
                    <span class="film-details__genre">${genre}</span>
                  </td>
                </tr>
              </table>
              <p class="film-details__film-description">${description}</p>
            </div>
          </div>
          <section class="film-details__controls">
            <input type="checkbox" class="film-details__control-input visually-hidden" id="watchlist" name="watchlist">
              <label for="watchlist" class="film-details__control-label film-details__control-label--watchlist">Add to watchlist</label>
              <input type="checkbox" class="film-details__control-input visually-hidden" id="watched" name="watched">
                <label for="watched" class="film-details__control-label film-details__control-label--watched">Already watched</label>
                <input type="checkbox" class="film-details__control-input visually-hidden" id="favorite" name="favorite">
                  <label for="favorite" class="film-details__control-label film-details__control-label--favorite">Add to favorites</label>
      </section>
    </div>
    <div class="film-details__bottom-container">
        <section class="film-details__comments-wrap">
                  <h3 class="film-details__comments-title">Comments <span class="film-details__comments-count">${comments.length}</span></h3>
                  <ul class="film-details__comments-list">${createCommentsTemplate(comments)}</ul>
                          <div class="film-details__new-comment">
                            <div class="film-details__add-emoji-label">0</div>
                            <label class="film-details__comment-label">
                              <textarea class="film-details__comment-input" placeholder="Select reaction below and write comment here" name="comment"></textarea>
                            </label>
                            <div class="film-details__emoji-list">
                              <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-smile" value="smile">
                                <label class="film-details__emoji-label" for="emoji-smile">
                                  <img src="./images/emoji/smile.png" width="30" height="30" alt="emoji"></label>
                                  <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-sleeping" value="sleeping">
                                    <label class="film-details__emoji-label" for="emoji-sleeping">
                                      <img src="./images/emoji/sleeping.png" width="30" height="30" alt="emoji"></label>
                                      <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-puke" value="puke">
                                        <label class="film-details__emoji-label" for="emoji-puke">
                                          <img src="./images/emoji/puke.png" width="30" height="30" alt="emoji"></label>
                                          <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-angry" value="angry">
                                            <label class="film-details__emoji-label" for="emoji-angry">
                                              <img src="./images/emoji/angry.png" width="30" height="30" alt="emoji">
            </label>
          </div>
        </div>
      </section>
    </div>
  </form>
</section>`;
};

export default class FullFilmDescription extends Abstract {
  constructor(film) {
    super();
    this._film = film;

    this._closePopapHandler = this._closePopapHandler.bind(this);
  }

  getTemplate() {
    return createFullFilmDescription(this._film);
  }

  _closePopapHandler(evt) {
    evt.preventDefault();
    this._closePopapHandler.closePopap();
  }

  setClosePopapHandler(callback) {
    this._closePopapHandler.closePopap = callback;
    this.getElement().querySelector(`.film-details__close-btn`).addEventListener(`click`, this._closePopapHandler);
  }
}

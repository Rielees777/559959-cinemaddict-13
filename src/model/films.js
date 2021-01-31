import Observer from "../utils/observer.js";
import dayjs from "dayjs";

export default class Films extends Observer {
  constructor() {
    super();

    this._films = [];
  }

  setFilms(updateType, films) {
    this._films = films.slice();

    this._notify(updateType);
  }

  getFilms() {
    return this._films;
  }

  updateFilm(updateType, update) {
    const index = this._films.findIndex((film) => film.id === update.id);

    if (index === -1) {
      throw new Error(`Can't update unexisted film`);
    }

    this._films = [
      ...this._films.slice(0, index),
      update,
      ...this._films.slice(index + 1)
    ];

    this._notify(updateType, update);
  }

  setComments(updateType, update) {
    const film = this._films.find((item) => item.id === update.id);
    console.log(film.comments);
    film.comments = update.comments;

    this._notify(updateType, update);
  }

  addComment(updateType, update) {
    this._films = [
      update,
      ...this._films
    ];

    this._notify(updateType, update);
  }

  deleteComment(updateType, update) {
    const index = this._films.findIndex((film) => film.id === update.id);

    if (index === -1) {
      throw new Error(`Can't delete unexisting comment`);
    }

    this._films = [
      ...this._films.slice(0, index),
      ...this.films.slice(index + 1)
    ];
    this._notify(updateType);
  }

  static adaptToClient(film) {
    const adaptedFilm = Object.assign(
      {},
      film,
      {
        title: film.film_info.title,
        originalTitle: film.film_info.alternative_title,
        poster: film.film_info.poster,
        rating: film.film_info.total_rating,
        ageLimit: film.film_info.age_rating,
        directors: film.film_info.director,
        writers: film.film_info.writers,
        actors: film.film_info.actors,
        country: film.film_info.release.release_country,
        description: film.film_info.description,
        realizeDate: film.film_info.release.date,
        duration: film.film_info.runtime,
        genre: film.film_info.genre,
        isWatchList: film.user_details.watchlist,
        isHistoryList: film.user_details.already_watched,
        isFavoriteList: film.user_details.favorite,
      }
    );

    return adaptedFilm;
  }

  static adaptToServer(film) {
    const adaptedFilm = Object.assign(
      {},
      film,
      {
        "id": film.id,
        "comments": film.comments,
        "user_details": {
          "already_watched": film.isWatchList,
          "watchlist": film.isHistoryList,
          "favorite": film.isFavoriteList
        }
      });
    return adaptedFilm;
  }

  static adaptCommentToClient(comment) {
    return Object.assign({}, {
      commentsText: comment.comment,
      commentsEmoji: comment.emotion,
      commentsAuthor: comment.commentsAuthor,
      commentsDay: dayjs(comment.date).format(`YYYY/M/D H:mm`),
      id: comment.id
    });
  }
}

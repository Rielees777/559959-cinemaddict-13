import { createFilmCard } from "./view/film-card.js";
import { createFilterTemplate } from "./view/filter.js";
import { createLoadMoreButton } from "./view/load-more-button.js";
import { createUserRank } from "./view/user-rank.js";
import { createFullFilmDescription } from "./view/film-description.js";

const render = (container, template, place) => {
  container.insertAdjacentHTML(place, template);
}

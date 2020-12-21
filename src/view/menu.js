import Abstract from "./abstract.js";

const getFilters = (filters) => {
  return filters.map((filter) => `<a href="#watchlist" class="main-navigation__item">${filter.name} <span class="main-navigation__item-count">${filter.count}</span></a>`).join(``);
};
const createMenuTemplate = (filters) => {
  return `<nav class="main-navigation">
  <div class="main-navigation__items">
  <a href="#all" class="main-navigation__item main-navigation__item--active">All movies</a>
    ${getFilters(filters)}
  </div>
  <a href="#stats" class="main-navigation__additional">Stats</a>
  </nav>`;
};
export default class SiteMenuView extends Abstract {
  constructor(filters) {
    super();
    this._filters = filters;
  }

  getTemplate() {
    return createMenuTemplate(this._filters);
  }
}

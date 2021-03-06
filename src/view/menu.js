import Abstract from "./abstract.js";

const getFilter = (filter, currentFilterType) => {
  const {type, name, count} = filter;
  return (
    `<a href="#${name}" data-type=${type} class="main-navigation__item 
  ${type === currentFilterType ? `main-navigation__item--active` : ``}">${name} 
  <span class="main-navigation__item-count">${count}</span></a>`
  );
};
const createMenuTemplate = (filters, currentFilterType) => {
  const filterItemsTemplate = filters
    .map((filter) => getFilter(filter, currentFilterType))
    .join(``);

  return `<nav class="main-navigation">
  <div class="main-navigation__items">
    ${filterItemsTemplate}
  </div>
  <a href="#stats" class="main-navigation__additional">Stats</a>
  </nav>`;
};
export default class SiteMenuView extends Abstract {
  constructor(filters, currentFilterType) {
    super();
    this._filters = filters;
    this._currentFilter = currentFilterType;

    this._filterTypeChangeHandler = this._filterTypeChangeHandler.bind(this);
  }

  getTemplate() {
    return createMenuTemplate(this._filters, this._currentFilter);
  }

  _filterTypeChangeHandler(evt) {
    evt.preventDefault();

    this._callback.filterTypeChange(evt.target.dataset.type);
  }

  setFilterTypeChangeHandler(callback) {
    this._callback.filterTypeChange = callback;
    this.getElement().addEventListener(`click`, this._filterTypeChangeHandler);
  }
}

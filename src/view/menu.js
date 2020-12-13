
export const createMenuTemplate = (filters) => {

  const getFilters = () => {
    return filters.map((filter) => `
    <a href="#watchlist" class="main-navigation__item">${filter.name} <span class="main-navigation__item-count">${filter.count}</span></a>`).join('');
  };

  return `<nav class="main-navigation">
  <div class="main-navigation__items">
  <a href="#all" class="main-navigation__item main-navigation__item--active">All movies</a>
    ${getFilters()}
  </div>
  <a href="#stats" class="main-navigation__additional">Stats</a>
  </nav>`;
};

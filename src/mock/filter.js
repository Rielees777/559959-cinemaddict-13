const filmToFilterMap = {
  watchlist: (films) => films
    .filter((film) => film.isWatchList),
  history: (films) => films
    .filter((film) => film.isHistoryList),
  favorite: (films) => films
    .filter((film) => film.isFavoriteList)
};

export const generateFilter = (films) => {
  return Object.entries(filmToFilterMap).map(([filterName, filterFilmsCount]) => {

    return {
      name: filterName[0].toUpperCase() + filterName.slice(1),
      count: filterFilmsCount(films).length
    };
  });
};

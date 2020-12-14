const filmToFilterMap = {
  Watchlist: (films) => films
    .filter((film) => film.isWatchList),
  History: (films) => films
    .filter((film) => film.isHistoryList),
  Favorite: (films) => films
    .filter((film) => film.isFavoriteList)
}

export const generateFilter = (films) => {
  return Object.entries(filmToFilterMap).map(([filterName, filmsCount]) => {
    return {
      name: filterName,
      count: filmsCount(films).length
    };
  });
};

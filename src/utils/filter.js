import {FilterType} from "../const.js";


export const filter = {
    [FilterType.ALL]: (films) => films.slice(),
    [FilterType.WATCHLIST]: (films) => films.filter((film) => film.isWatchList),
    [FilterType.HISTORY]: (films) => films.filter((film) => film.isHistoryList),
    [FilterType.FAVORITE]: (films) => films.filter((film) => film.isFavoriteList)
};
import dayjs from "dayjs";
const getWeightForNullDate = (dateA, dateB) => {
  if (dateA === null && dateB === null) {
    return 0;
  }

  if (dateA === null) {
    return 1;
  }

  if (dateB === null) {
    return -1;
  }

  return null;
};

export const sortFilmByDate = (filmA, filmB) => {
  const weight = getWeightForNullDate(filmA.realizeDate, filmB.realizeDate);
  if (weight) {
    return weight;
  }
  return dayjs(filmB.realizeDate).diff(dayjs(filmA.realizeDate));
};

export const sortFilmByRating = (filmA, filmB) => {
  return filmB.rating - filmA.rating;
};

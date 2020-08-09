import {COLORS, DESCRIPTIONS, MAX_DAYS_GAP} from "../const.js";
import {getRandomInteger} from "../view/util/utils.js";
import {getRandomBoolean} from "../view/util/utils";
import {getRandomIndexOfArray} from "../view/util/utils";

const generateDescription = () => {
  const randomIndex = getRandomIndexOfArray(DESCRIPTIONS);

  return DESCRIPTIONS[randomIndex];
};

const generateDate = () => {
  const isDate = getRandomBoolean();

  if (!isDate) {
    return null;
  }

  const daysGap = getRandomInteger(-MAX_DAYS_GAP, MAX_DAYS_GAP);
  const currentDate = new Date();

  currentDate.setHours(23, 59, 59, 999);
  currentDate.setDate(currentDate.getDate() + daysGap);

  return new Date(currentDate);
};

const generateRepeating = () => {
  return {
    mo: false,
    tu: false,
    we: getRandomBoolean(),
    th: false,
    fr: getRandomBoolean(),
    sa: false,
    su: false
  };
};

const getRandomColor = () => {
  const randomIndex = getRandomIndexOfArray(COLORS);

  return COLORS[randomIndex];
};

export const generateTask = () => {
  const dueDate = generateDate();
  const repeating = dueDate === null ?
    generateRepeating() :
    {
      mo: false,
      tu: false,
      we: false,
      th: false,
      fr: false,
      sa: false,
      su: false
    };

  return {
    description: generateDescription(),
    dueDate,
    repeating,
    color: getRandomColor(),
    isArchive: getRandomBoolean(),
    isFavorite: getRandomBoolean()
  };
};

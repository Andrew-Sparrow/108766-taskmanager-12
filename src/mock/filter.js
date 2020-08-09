import {isTaskExpired, isTaskRepeating, isTaskExpiredToday} from "../view/util/utils";
/*
const taskToFilterMap = {
  all: (tasks) => tasks.filter((task) => !task.isArchive).length,
  overdue: (tasks) => tasks
    .filter((task) => !task.isArchive)
    .filter((task) => isTaskExpired(task.dueDate)).length,
  today: (tasks) => tasks
    .filter((task) => !task.isArchive)
    .filter((task) => isTaskExpiredToday(task.dueDate)).length,
  favorites: (tasks) => tasks
    .filter((task) => !task.isArchive)
    .filter((task) => task.isFavorite).length,
  repeating: (tasks) => tasks
    .filter((task) => !task.isArchive)
    .filter((task) => isTaskRepeating(task.repeating)).length,
  archive: (tasks) => tasks
    .filter((task) => task.isArchive).length
};
*/
export const generateFilter = (tasks) => {
  return Object.entries(taskToFilterMap).map(([filterName, countTask]) => {
    return {
      name: filterName,
      count: countTask(tasks)
    };
  });
};

const taskToFilterMap = {
  all: (tasks) => tasks.reduce((accumulator, current) => {
    if (!current.isArchive) {
      accumulator.push(current);
    }
    return accumulator;
  }, []).length,
  overdue: (tasks) => tasks.reduce((accumulator, current) => {
    if (!current.isArchive && isTaskExpired(current.dueDate)) {
      accumulator.push(current);
    }
    return accumulator;
  }, []).length,
  today: (tasks) => tasks.reduce((accumulator, current) => {
    if (!current.isArchive && isTaskExpiredToday(current.dueDate)) {
      accumulator.push(current);
    }
    return accumulator;
  }, []).length,
  favorites: (tasks) => tasks.reduce((accumulator, current) => {
    if (!current.isArchive && current.isFavorite) {
      accumulator.push(current);
    }
    return accumulator;
  }, []).length,
  repeating: (tasks) => tasks.reduce((accumulator, current) => {
    if (!current.isArchive && isTaskRepeating(current.repeating)) {
      accumulator.push(current);
    }
    return accumulator;
  }, []).length,
  archive: (tasks) => tasks.reduce((accumulator, current) => {
    if (current.isArchive) {
      accumulator.push(current);
    }
    return accumulator;
  }, []).length
};

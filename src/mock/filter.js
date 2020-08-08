import {isTaskExpired, isTaskRepeating, isTaskExpiredToday} from "../view/util/utils";

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
    .filter((task) => isTaskRepeating(task.repeating())).length,
  archive: (tasks) => tasks
    .filter((task) => task.isArchive).length
};

export const generateFilter = (tasks) => {
  return Object.entries(taskToFilterMap).map(([filterName, countTask]) => {
    return {
      name: filterName,
      count: countTask(tasks)
    };
  });
};

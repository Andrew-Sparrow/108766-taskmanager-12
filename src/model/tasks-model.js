import Observer from "../utils/observer.js";

export default class TasksModel extends Observer {
  constructor() {
    super();
    this._tasks = [];
  }

  setTasks(tasks) {
    this._tasks = tasks.slice();
  }

  getTasks() {
    return this._tasks;
  }

  updateTask(updateTypeForRerender, updatedItem) {
    const index = this._tasks.findIndex((task) => task.id === updatedItem.id);

    if (index === -1) {
      throw new Error(`Can't update nonexistent task`);
    }

    this._tasks = [
      ...this._tasks.slice(0, index),
      updatedItem,
      ...this._tasks.slice(index + 1)
    ];

    this._notify(updateTypeForRerender, updatedItem);
  }

  addTask(updateTypeForRerender, updatedItem) {
    this._tasks = [
      updatedItem,
      ...this._tasks
    ];

    this._notify(updateTypeForRerender, updatedItem);
  }

  deleteTask(updateTypeForRerender, updatedItem) {
    const index = this._tasks.findIndex((task) => task.id === updatedItem.id);

    if (index === -1) {
      throw new Error(`Can't delete unexisting task`);
    }

    this._tasks = [
      ...this._tasks.slice(0, index),
      ...this._tasks.slice(index + 1)
    ];

    this._notify(updateTypeForRerender);
  }
}

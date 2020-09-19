import SiteMenuView from "./view/site-menu.js";
import FilterView from "./view/filter.js";
import BoardPresenter from "./presenter/board.js";
import {generateTask} from "./mock/task.js";
import {generateFilter} from "./mock/filter";
import TasksModel from "./model/tasks-model.js";

import {
  render,
  RenderPosition,
} from "./view/util/render.js";

const TASK_COUNT = 22;

const tasks = new Array(TASK_COUNT).fill().map(generateTask);
const filters = generateFilter(tasks);

const taskModel = new TasksModel();
taskModel.setTasks(tasks);

const siteMainElement = document.querySelector(`.main`);
const siteHeaderElement = siteMainElement.querySelector(`.main__control`);


const boardPresenter = new BoardPresenter(siteMainElement);

render(siteHeaderElement, new SiteMenuView(), RenderPosition.BEFOREEND);
render(siteMainElement, new FilterView(filters), RenderPosition.BEFOREEND);

boardPresenter.init();

import SiteMenuView from "./view/site-menu-view.js";
import BoardPresenter from "./presenter/board.js";
import FilterPresenter from "./presenter/filter.js";
import TasksModel from "./model/tasks-model.js";
import FilterModel from "./model/filter-model.js";
import StatisticsView from "./view/statistics.js";

import {generateTask} from "./mock/task.js";

import {
  MenuItem,
  UpdateTypeForRerender,
  FilterType
} from "./const.js";

import {
  render,
  RenderPosition,
  remove
} from "./utils/render.js";

const TASK_COUNT = 22;

const tasks = new Array(TASK_COUNT).fill().map(generateTask);

const tasksModel = new TasksModel();
tasksModel.setTasks(tasks);

const filterModel = new FilterModel();

const siteMainElement = document.querySelector(`.main`);
const siteHeaderElement = siteMainElement.querySelector(`.main__control`);

const siteMenuComponent = new SiteMenuView();

const filterPresenter = new FilterPresenter(siteMainElement, filterModel, tasksModel);
const boardPresenter = new BoardPresenter(siteMainElement, tasksModel, filterModel);

let statisticsComponent = null;

render(siteHeaderElement, siteMenuComponent, RenderPosition.BEFOREEND);

const handleSiteMenuClick = (menuItem) => {
  switch (menuItem) {
    case MenuItem.ADD_NEW_TASK:
      remove(statisticsComponent);
      boardPresenter.destroy();
      filterModel.setFilter(UpdateTypeForRerender.MAJOR, FilterType.ALL);
      boardPresenter.init();
      boardPresenter.createTask(siteMenuComponent.handleTaskNewFormClose);
      siteMenuComponent.disableMenuItems();
      break;
    case MenuItem.TASKS:
      boardPresenter.destroy();
      boardPresenter.init();
      remove(statisticsComponent);
      break;
    case MenuItem.STATISTICS:
      boardPresenter.destroy();
      statisticsComponent = new StatisticsView(tasksModel.getTasks());
      render(siteMainElement, statisticsComponent, RenderPosition.BEFOREEND);
      break;
  }
};

siteMenuComponent.setMenuClickHandler(handleSiteMenuClick);

filterPresenter.init();
boardPresenter.init();

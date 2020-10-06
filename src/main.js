import SiteMenuView from "./view/site-menu-view.js";
import BoardPresenter from "./presenter/board.js";
import FilterPresenter from "./presenter/filter.js";
import TasksModel from "./model/tasks-model.js";
import FilterModel from "./model/filter-model.js";
import StatisticsView from "./view/statistics.js";
import Api from "./api.js";

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

const AUTHORIZATION = `Basic hS2sds3df3sk4wa5shl1sa2j`;
const END_POINT = `https://12.ecmascript.pages.academy/task-manager`;

const api = new Api(END_POINT, AUTHORIZATION);

const tasksModel = new TasksModel();

const filterModel = new FilterModel();

const siteMainElement = document.querySelector(`.main`);
const siteHeaderElement = siteMainElement.querySelector(`.main__control`);

const siteMenuComponent = new SiteMenuView();

const filterPresenter = new FilterPresenter(siteMainElement, filterModel, tasksModel);
const boardPresenter = new BoardPresenter(siteMainElement, tasksModel, filterModel, api);

let statisticsComponent = null;

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

filterPresenter.init();
boardPresenter.init();

api.getTasks()
  .then((tasksFromServer) => {
    tasksModel.setTasks(UpdateTypeForRerender.INIT, tasksFromServer);
    siteMenuComponent.setMenuClickHandler(handleSiteMenuClick);
    render(siteHeaderElement, siteMenuComponent, RenderPosition.BEFOREEND);
  })
  .catch(() => {
    tasksModel.setTasks(UpdateTypeForRerender.INIT, []);
    siteMenuComponent.setMenuClickHandler(handleSiteMenuClick);
    render(siteHeaderElement, siteMenuComponent, RenderPosition.BEFOREEND);
  });

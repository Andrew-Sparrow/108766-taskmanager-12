import {TASK_COUNT, TASK_COUNT_PER_STEP} from "./const";
import SiteMenuView from "./view/site-menu.js";
import {createFilterTemplate} from "./view/filter.js";
import {createTaskTemplate} from "./view/task.js";
import {createBoardTemplate} from "./view/board.js";
import {createTaskEditTemplate} from "./view/task-edit.js";
import {createLoadMoreButtonTemplate} from "./view/load-more-button.js";
import {generateTask} from "./mock/task.js";
import {generateFilter} from "./mock/filter";
import {
  renderTemplate,
  renderElement,
  RenderPosition
} from "./view/util/utils.js";

const tasks = new Array(TASK_COUNT).fill().map(generateTask);
const filters = generateFilter(tasks);

const siteMainElement = document.querySelector(`.main`);
const siteHeaderElement = siteMainElement.querySelector(`.main__control`);

renderElement(siteHeaderElement, new SiteMenuView().getElement(), RenderPosition.BEFOREEND);
renderTemplate(siteMainElement, createFilterTemplate(filters), `beforeend`);

renderTemplate(siteMainElement, createBoardTemplate(), `beforeend`);

const boardElement = siteMainElement.querySelector(`.board`);
const taskListElement = boardElement.querySelector(`.board__tasks`);

renderTemplate(taskListElement, createTaskEditTemplate(tasks[0]), `afterbegin`);

for (let i = 1; i < Math.min(tasks.length, TASK_COUNT); i++) {
  renderTemplate(taskListElement, createTaskTemplate(tasks[i]), `beforeend`);
}

if (tasks.length > TASK_COUNT_PER_STEP) {
  let renderedTaskCount = TASK_COUNT_PER_STEP;

  renderTemplate(boardElement, createLoadMoreButtonTemplate(), `beforeend`);

  const loadMoreButton = boardElement.querySelector(`.load-more`);

  loadMoreButton.addEventListener(`click`, (evt) => {
    evt.preventDefault();
    tasks
      .slice(renderedTaskCount, renderedTaskCount + TASK_COUNT_PER_STEP)
      .forEach((task) => renderTemplate(taskListElement, createTaskTemplate(task), `beforeend`));

    renderedTaskCount += TASK_COUNT_PER_STEP;

    if (renderedTaskCount >= tasks.length) {
      loadMoreButton.remove();
    }
  });
}

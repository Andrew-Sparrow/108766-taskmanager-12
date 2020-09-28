import AbstractView from "./abstract.js";
import {MenuItem} from "../const.js";


const createSiteMenuTemplate = () => {
  return (`<section class="control__btn-wrap">
          <input
            type="radio"
            name="control"
            id="control__new-task"
            class="control__input visually-hidden"
            value="${MenuItem.ADD_NEW_TASK}"
          />
          <label for="control__new-task" class="control__label control__label--new-task"
            >+ ADD NEW TASK</label
          >
          <input
            type="radio"
            name="control"
            id="control__task"
            class="control__input visually-hidden"
            value="${MenuItem.TASKS}"
            checked
          />
          <label for="control__task" class="control__label">TASKS</label>
          <input
            type="radio"
            name="control"
            id="control__statistic"
            class="control__input visually-hidden"
            value="${MenuItem.STATISTICS}"
          />
          <label for="control__statistic" class="control__label"
            >STATISTICS</label
          >
        </section>`);
};

export default class SiteMenuView extends AbstractView {
  constructor() {
    super();

    this._menuClickHandler = this._menuClickHandler.bind(this);
    this.handleTaskNewFormClose = this.handleTaskNewFormClose.bind(this);
    this.disableMenuItems = this.disableMenuItems.bind(this);
    this.setMenuItem = this.setMenuItem.bind(this);
  }

  getTemplate() {
    return createSiteMenuTemplate();
  }

  _menuClickHandler(evt) {
    evt.preventDefault();
    this._callback.menuClick(evt.target.value);
  }

  setMenuClickHandler(callback) {
    this._callback.menuClick = callback;
    this.getElement().addEventListener(`change`, this._menuClickHandler);
  }

  setMenuItem(menuItem) {
    const item = this.getElement().querySelector(`[value=${menuItem}]`);

    if (item !== null) {
      item.checked = true;
    }
  }

  handleTaskNewFormClose() {
    this.getElement().querySelector(`[value=${MenuItem.TASKS}]`).disabled = false;
    this.getElement().querySelector(`[value=${MenuItem.STATISTICS}]`).disabled = false;
    this.setMenuItem(MenuItem.TASKS);
  }

  disableMenuItems() {
    this.getElement().querySelector(`[value=${MenuItem.TASKS}]`).checked = false;
    this.getElement().querySelector(`[value=${MenuItem.STATISTICS}]`).checked = false;
    this.getElement().querySelector(`[value=${MenuItem.TASKS}]`).disabled = true;
    this.getElement().querySelector(`[value=${MenuItem.STATISTICS}]`).disabled = true;
  }
}

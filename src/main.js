import MenuView from './view/menu.js';
import {generateTask} from './mock/task.js';

import BoardPresenter from './presenter/board.js';
import FilterPresenter from './presenter/filter.js';
import {render, RenderPosition} from './utils/render.js';
import TasksModel from './model/tasks.js';
import FilterModel from './model/filter.js';

const TASKS_COUNT = 15;

const mainElement = document.querySelector(`.main`);
const mainControlElement = mainElement.querySelector(`.main__control`);

const tasks = new Array(TASKS_COUNT).fill().map(generateTask);

const tasksModel = new TasksModel();
tasksModel.setTasks(tasks);

const filterModel = new FilterModel();

const boardPresenter = new BoardPresenter(mainElement, tasksModel, filterModel);
const filterPresenter = new FilterPresenter(mainElement, filterModel, tasksModel);

render(mainControlElement, new MenuView(), RenderPosition.BEFOREEND);

filterPresenter.init();
boardPresenter.init();

document.querySelector(`#control__new-task`).addEventListener(`click`, (evt) => {
  evt.preventDefault();
  boardPresenter.createTask();
});

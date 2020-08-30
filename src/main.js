import MenuView from './view/menu.js';
import FilterView from './view/filter.js';
import {generateTask} from './mock/task.js';
import {generateFilter} from './mock/filter.js';
import BoardPresenter from './presenter/board.js';
import {render, RenderPosition} from './utils/render.js';
import TasksModel from './model/tasks.js';

const TASKS_COUNT = 15;

const mainElement = document.querySelector(`.main`);
const mainControlElement = mainElement.querySelector(`.main__control`);

const tasks = new Array(TASKS_COUNT).fill().map(generateTask);
const filters = generateFilter(tasks);

const tasksModel = new TasksModel();
tasksModel.setTasks(tasks);

const boardPresenter = new BoardPresenter(mainElement, tasksModel);

// Отрисовка компонентов
render(mainControlElement, new MenuView(), RenderPosition.BEFOREEND);
render(mainElement, new FilterView(filters), RenderPosition.BEFOREEND);

boardPresenter.init();

import MenuView from './view/menu.js';
import FilterView from './view/filter.js';
import BoardView from './view/board.js';
import SortView from './view/filter-list.js';
import TaskListView from './view/task-list.js';
import TaskView from './view/card.js';
import TaskEditView from './view/card-edit.js';
import LoadMoreButtonView from './view/load-more-button.js';
import {generateTask} from './mock/task.js';
import {generateFilter} from './mock/filter.js';
import {render, RenderPosition} from './utils.js';

const TASKS_COUNT = 22;
const TASKS_COUNT_PER_STEP = 8;

const mainElement = document.querySelector(`.main`);
const mainControlElement = mainElement.querySelector(`.main__control`);

const tasks = new Array(TASKS_COUNT).fill().map(generateTask);
const filters = generateFilter(tasks);

const renderTask = (taskListElement, task) => {
  const taskElement = new TaskView(task);
  const taskEditElement = new TaskEditView(task);

  const replaceCardToForm = () => {
    taskListElement.replaceChild(taskEditElement.getElement(), taskElement.getElement());
  };

  const replaceFormToCard = () => {
    taskListElement.replaceChild(taskElement.getElement(), taskEditElement.getElement());
  };

  const onEscKeyDown = (evt) => {
    if (evt.key === `Escape` || evt.key === `Esc`) {
      evt.preventDefault();
      replaceFormToCard();
      document.removeEventListener(`keydown`, onEscKeyDown);
    }
  };

  taskElement.getElement().querySelector(`.card__btn--edit`).addEventListener(`click`, () => {
    replaceCardToForm();
    document.addEventListener(`keydown`, onEscKeyDown);
  });

  taskEditElement.getElement().querySelector(`form`).addEventListener(`submit`, (evt) => {
    evt.preventDefault();
    replaceFormToCard();
    document.removeEventListener(`keydown`, onEscKeyDown);
  });


  render(taskListElement, taskElement.getElement(), RenderPosition.BEFOREEND);
};

// Отрисовка компонентов
render(mainControlElement, new MenuView().getElement(), RenderPosition.BEFOREEND);
render(mainElement, new FilterView(filters).getElement(), RenderPosition.BEFOREEND);

const boardElement = new BoardView();

render(mainElement, boardElement.getElement(), RenderPosition.BEFOREEND);

render(boardElement.getElement(), new SortView().getElement(), RenderPosition.AFTERBEGIN);

const boardTasksElement = new TaskListView();

render(boardElement.getElement(), boardTasksElement.getElement(), RenderPosition.BEFOREEND);

for (let i = 1; i < Math.min(tasks.length, TASKS_COUNT_PER_STEP); i++) {
  renderTask(boardTasksElement.getElement(), tasks[i]);
}

if (tasks.length > TASKS_COUNT_PER_STEP) {
  let renderedTasksCount = TASKS_COUNT_PER_STEP;

  const loadMoreButton = new LoadMoreButtonView();

  render(boardElement.getElement(), loadMoreButton.getElement(), RenderPosition.BEFOREEND);


  loadMoreButton.getElement().addEventListener(`click`, (evt) => {
    evt.preventDefault();

    tasks
      .slice(renderedTasksCount, renderedTasksCount + TASKS_COUNT_PER_STEP)
      .forEach((task) => renderTask(boardTasksElement.getElement(), task));

    renderedTasksCount += TASKS_COUNT_PER_STEP;

    if (renderedTasksCount >= tasks.length) {
      loadMoreButton.getElement().remove();
      loadMoreButton.removeElement();
    }
  });
}

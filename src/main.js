import MenuView from './view/menu.js';
import FilterView from './view/filter.js';
import BoardView from './view/board.js';
import SortView from './view/filter-list.js';
import TaskListView from './view/task-list.js';
import TaskView from './view/card.js';
import TaskEditView from './view/card-edit.js';
import NoTaskView from './view/no-task.js';
import LoadMoreButtonView from './view/load-more-button.js';
import {generateTask} from './mock/task.js';
import {generateFilter} from './mock/filter.js';
import {render, RenderPosition, replace, remove} from './utils/render.js';

const TASKS_COUNT = 15;
const TASKS_COUNT_PER_STEP = 8;


const mainElement = document.querySelector(`.main`);
const mainControlElement = mainElement.querySelector(`.main__control`);

const tasks = new Array(TASKS_COUNT).fill().map(generateTask);
const filters = generateFilter(tasks);

const renderTask = (taskListElement, task) => {
  const taskElement = new TaskView(task);
  const taskEditElement = new TaskEditView(task);

  const replaceCardToForm = () => {
    replace(taskEditElement, taskElement);
  };

  const replaceFormToCard = () => {
    replace(taskElement, taskEditElement);
  };

  const onEscKeyDown = (evt) => {
    if (evt.key === `Escape` || evt.key === `Esc`) {
      evt.preventDefault();
      replaceFormToCard();
      document.removeEventListener(`keydown`, onEscKeyDown);
    }
  };

  taskElement.setEditClickHandler(() => {
    replaceCardToForm();
    document.addEventListener(`keydown`, onEscKeyDown);
  });

  taskEditElement.setFormSubmitHandler(() => {
    replaceFormToCard();
    document.removeEventListener(`keydown`, onEscKeyDown);
  });

  render(taskListElement, taskElement, RenderPosition.BEFOREEND);
};

const renderBoard = (boardContainer, boardTasks) => {
  const boardElement = new BoardView();
  const boardTasksElement = new TaskListView();

  render(boardContainer, boardElement, RenderPosition.BEFOREEND);
  render(boardElement, boardTasksElement, RenderPosition.BEFOREEND);

  if (boardTasks.every((task) => task.isArchive)) {
    render(boardElement, new NoTaskView(), RenderPosition.AFTERBEGIN);
    return;
  }

  render(boardElement, new SortView(), RenderPosition.AFTERBEGIN);

  boardTasks
    .slice(0, Math.min(tasks.length, TASKS_COUNT_PER_STEP))
    .forEach((boardTask) => renderTask(boardTasksElement.getElement(), boardTask));

  if (boardTasks.length > TASKS_COUNT_PER_STEP) {
    let renderedTasksCount = TASKS_COUNT_PER_STEP;

    const loadMoreButton = new LoadMoreButtonView();

    render(boardElement, loadMoreButton, RenderPosition.BEFOREEND);

    loadMoreButton.setClickHandler(() => {
      boardTasks
        .slice(renderedTasksCount, renderedTasksCount + TASKS_COUNT_PER_STEP)
        .forEach((boardTask) => renderTask(boardTasksElement.getElement(), boardTask));

      renderedTasksCount += TASKS_COUNT_PER_STEP;

      if (renderedTasksCount >= boardTasks.length) {
        remove(loadMoreButton);
      }
    });
  }
};

// Отрисовка компонентов
render(mainControlElement, new MenuView(), RenderPosition.BEFOREEND);
render(mainElement, new FilterView(filters), RenderPosition.BEFOREEND);

renderBoard(mainElement, tasks);

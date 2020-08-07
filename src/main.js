import {createMenuElement} from './view/menu.js';
import {createFilterElement} from './view/filter.js';
import {createBoardElement} from './view/board.js';
import {createFilterListElement} from './view/filter-list.js';
import {createCardElement} from './view/card.js';
import {createCardEditElement} from './view/card-edit.js';
import {createLoadMoreButtonElement} from './view/load-more-button.js';
import {generateTask} from './mock/task.js';
import {generateFilter} from './mock/filter.js';

const TASKS_COUNT = 22;
const TASKS_COUNT_PER_STEP = 8;

const mainElement = document.querySelector(`.main`);
const mainControlElement = mainElement.querySelector(`.main__control`);

const tasks = new Array(TASKS_COUNT).fill().map(generateTask);

const filters = generateFilter(tasks);

// Функция отрисовки
const render = (container, node, place) => {
  container.insertAdjacentHTML(place, node);
};

// Отрисовка компонентов
render(mainControlElement, createMenuElement(), `beforeend`);
render(mainElement, createFilterElement(filters), `beforeend`);
render(mainElement, createBoardElement(), `beforeend`);

const boardElement = mainElement.querySelector(`.board`);
const boardTasksElement = boardElement.querySelector(`.board__tasks`);

render(boardElement, createFilterListElement(), `afterbegin`);
render(boardTasksElement, createCardEditElement(tasks[0]), `beforeend`);

for (let i = 1; i < Math.min(tasks.length, TASKS_COUNT_PER_STEP); i++) {
  render(boardTasksElement, createCardElement(tasks[i]), `beforeend`);
}

if (tasks.length > TASKS_COUNT_PER_STEP) {
  let renderedTasksCount = TASKS_COUNT_PER_STEP;

  render(boardElement, createLoadMoreButtonElement(), `beforeend`);

  const loadMoreButton = boardElement.querySelector(`.load-more`);

  loadMoreButton.addEventListener(`click`, (evt) => {
    evt.preventDefault();

    tasks
      .slice(renderedTasksCount, renderedTasksCount + TASKS_COUNT_PER_STEP)
      .forEach((task) => render(boardTasksElement, createCardElement(task), `beforeend`));

    renderedTasksCount += TASKS_COUNT_PER_STEP;

    if (renderedTasksCount >= tasks.length) {
      loadMoreButton.remove();
    }
  });
}

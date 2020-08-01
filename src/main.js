const TASKS_COUNT = 3;

const mainElement = document.querySelector(`.main`);
const mainControlElement = mainElement.querySelector(`.main__control`);

import {createMenuElement} from './view/menu.js';
import {createFilterElement} from './view/filter.js';
import {createBoardElement} from './view/board.js';
import {createFilterListElement} from './view/filter-list.js';
import {createCardElement} from './view/card.js';
import {createCardEditElement} from './view/card-edit.js';
import {createLoadMoreButtonElement} from './view/load-more-button.js';

// Функция отрисовки
const render = (container, node, place) => {
  container.insertAdjacentHTML(place, node);
};

// Отрисовка компонентов
render(mainControlElement, createMenuElement(), `beforeend`);
render(mainElement, createFilterElement(), `beforeend`);
render(mainElement, createBoardElement(), `beforeend`);

const boardElement = mainElement.querySelector(`.board`);
const boardTasksElement = boardElement.querySelector(`.board__tasks`);

render(boardElement, createFilterListElement(), `afterbegin`);
render(boardTasksElement, createCardEditElement(), `beforeend`);

for (let i = 0; i < TASKS_COUNT; i++) {
  render(boardTasksElement, createCardElement(), `beforeend`);
}

render(boardElement, createLoadMoreButtonElement(), `beforeend`);

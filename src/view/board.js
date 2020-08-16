import AbstractView from './abstract.js';

// Возвращает разметку доски заданий
const createBoardElement = () => (
  `<section class="board container"></section>`
);

export default class Board extends AbstractView {
  getTemplate() {
    return createBoardElement();
  }
}

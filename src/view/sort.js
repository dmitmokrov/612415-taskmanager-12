import AbstractView from './abstract.js';

// Возвращает разметку сортировки
const createFilterListElement = () => (
  `<div class="board__filter-list">
    <a href="#" class="board__filter">SORT BY DEFAULT</a>
    <a href="#" class="board__filter">SORT BY DATE up</a>
    <a href="#" class="board__filter">SORT BY DATE down</a>
  </div>`
);

export default class Sort extends AbstractView {
  getTemplate() {
    return createFilterListElement();
  }
}

import AbstractView from './abstract.js';

// Возвращает разметку кнопки Load More
const createLoadMoreButtonElement = () => (
  `<button class="load-more" type="button">load more</button>`
);

export default class LoadMoreButton extends AbstractView {
  getTemplate() {
    return createLoadMoreButtonElement();
  }
}

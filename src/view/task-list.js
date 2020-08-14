import {createElement} from '../utils.js';

const createTaskListElement = () => {
  return `<div class="board__tasks"></div>`;
};

export default class TaskList {
  constructor() {
    this._element = null;
  }

  getTemplate() {
    return createTaskListElement();
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }

    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}

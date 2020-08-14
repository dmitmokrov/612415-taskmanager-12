import {createElement} from '../utils.js';

const createFilterItemElement = (filter, isChecked) => {
  const {name, count} = filter;

  return `<input
    type="radio"
    id="filter__${name}"
    class="filter__input visually-hidden"
    name="filter"
    ${isChecked ? `checked` : ``}
    ${count === 0 ? `disabled` : ``}
  />
  <label for="filter__${name}" class="filter__label">
    ${name} <span class="filter__${name}-count">${count}</span></label
  >`;
};

// Возвращает разметку фильтров
const createFilterElement = (filterItems) => {
  const filterItemsElement = filterItems
    .map((filter, index) => createFilterItemElement(filter, index === 0))
    .join(``);

  return `<section class="main__filter filter container">
    ${filterItemsElement}
  </section>`;
};

export default class Filter {
  constructor(filters) {
    this._filters = filters;
    this._element = null;
  }

  getTemplate() {
    return createFilterElement(this._filters);
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

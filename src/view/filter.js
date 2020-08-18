import AbstractView from './abstract.js';

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

export default class Filter extends AbstractView {
  constructor(filters) {
    super();
    this._filters = filters;
  }

  getTemplate() {
    return createFilterElement(this._filters);
  }
}

import AbstractView from './abstract.js';

const createFilterItemElement = (filter, currentFilterType) => {
  const {type, name, count} = filter;

  return `<input
    type="radio"
    id="filter__${name}"
    class="filter__input visually-hidden"
    name="filter"
    ${type === currentFilterType ? `checked` : ``}
    ${count === 0 ? `disabled` : ``}
    value = "${type}"
  />
  <label for="filter__${name}" class="filter__label">
    ${name} <span class="filter__${name}-count">${count}</span></label
  >`;
};

// Возвращает разметку фильтров
const createFilterElement = (filterItems, currentFilterType) => {
  const filterItemsElement = filterItems
    .map((filter) => createFilterItemElement(filter, currentFilterType))
    .join(``);

  return `<section class="main__filter filter container">
    ${filterItemsElement}
  </section>`;
};

export default class Filter extends AbstractView {
  constructor(filters, currentFilterType) {
    super();
    this._filters = filters;
    this._currentFilter = currentFilterType;

    this._filterTypeChangeHandler = this._filterTypeChangeHandler.bind(this);
  }

  getTemplate() {
    return createFilterElement(this._filters, this._currentFilter);
  }

  _filterTypeChangeHandler(evt) {
    evt.preventDefault();
    this._callback.filterTypeChange(evt.target.value);
  }

  setFilterTypeChangeHandler(callback) {
    this._callback.filterTypeChange = callback;
    this.getElement().addEventListener(`change`, this._filterTypeChangeHandler);
  }
}

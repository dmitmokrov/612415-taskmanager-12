import AbstractView from './abstract.js';
import {COLORS} from '../const';
import {isTaskExpired, isTaskRepeating, humanizeTaskDueDate} from '../utils/task.js';

const BLANK_TASK = {
  color: COLORS[0],
  description: ``,
  dueDate: null,
  repeating: {
    mo: false,
    tu: false,
    we: false,
    th: false,
    fr: false,
    sa: false,
    su: false
  },
  isFavorite: false,
  isArchive: false
};

const createCardEditDateElement = (dueDate, isDueDate) => {
  return `<button class="card__date-deadline-toggle" type="button">
      date: <span class="card__date-status">${isDueDate ? `yes` : `no`}</span>
    </button>

    ${dueDate === null ? `` : `<fieldset class="card__date-deadline">
      <label class="card__input-deadline-wrap">
        <input
          class="card__date"
          type="text"
          placeholder=""
          name="date"
          value="${humanizeTaskDueDate(dueDate)}"
        />
      </label>
    </fieldset>`}`;
};

const createCardEditRepeatingElement = (repeating, isRepeating) => {
  return `<button class="card__repeat-toggle" type="button">
    repeat: <span class="card__repeat-status">${isRepeating ? `yes` : `no`}</span>
  </button>

  ${isRepeating ? `<fieldset class="card__repeat-days">
    <div class="card__repeat-days-inner">
      ${Object.entries(repeating).map(([day, repeat]) => `<input
        class="visually-hidden card__repeat-day-input"
        type="checkbox"
        id="repeat-${day}"
        name="repeat"
        value="${day}"
        ${repeat ? `checked` : ``}
      />
      <label class="card__repeat-day" for="repeat-${day}"
        >${day}</label
      >`).join(``)}
    </div>
  </fieldset>` : ``}`;
};

const createCardEditColorsElement = (currentColor) => {
  return COLORS.map((color) => `<input
    type="radio"
    id="color-${color}"
    class="card__color-input card__color-input--${color} visually-hidden"
    name="color"
    value="${color}"
    ${currentColor === color ? `checked` : ``}
  />
  <label
    for="color-${color}"
    class="card__color card__color--${color}"
    >${color}</label
  >`).join(``);
};

// Возвращает разметку редактирования карточки
const createCardEditElement = (data) => {
  const {color, description, dueDate, repeating, isDueDate, isRepeating} = data;

  const deadlineClassName = isTaskExpired(dueDate) ? `card--deadline` : ``;
  const repeatingClassName = isRepeating ? `card--repeat` : ``;
  const dateElement = createCardEditDateElement(dueDate, isDueDate);
  const repeatingElement = createCardEditRepeatingElement(repeating, isRepeating);
  const colorsElement = createCardEditColorsElement(color);

  return `<article class="card card--edit card--${color} ${deadlineClassName} ${repeatingClassName}">
    <form class="card__form" method="get">
      <div class="card__inner">
        <div class="card__color-bar">
          <svg class="card__color-bar-wave" width="100%" height="10">
            <use xlink:href="#wave"></use>
          </svg>
        </div>

        <div class="card__textarea-wrap">
          <label>
            <textarea
              class="card__text"
              placeholder="Start typing your text here..."
              name="text"
            >${description}</textarea>
          </label>
        </div>

        <div class="card__settings">
          <div class="card__details">
            <div class="card__dates">
              ${dateElement}

              ${repeatingElement}
            </div>
          </div>

          <div class="card__colors-inner">
            <h3 class="card__colors-title">Color</h3>
            <div class="card__colors-wrap">
              ${colorsElement}
            </div>
          </div>
        </div>

        <div class="card__status-btns">
          <button class="card__save" type="submit">save</button>
          <button class="card__delete" type="button">delete</button>
        </div>
      </div>
    </form>
  </article>`;
};

export default class TaskEdit extends AbstractView {
  constructor(task = BLANK_TASK) {
    super();
    this._data = TaskEdit.parseTaskToData(task);
    this._formSubmitHandler = this._formSubmitHandler.bind(this);
    this._dueDateToggleHandler = this._dueDateToggleHandler.bind(this);
    this._repeatingToggleHandler = this._repeatingToggleHandler.bind(this);

    this._setInnerHandlers();
  }

  getTemplate() {
    return createCardEditElement(this._data);
  }

  updateData(update) {
    if (!update) {
      return;
    }

    this._data = Object.assign({}, this._data, update);
    this.updateElement();
  }

  updateElement() {
    let prevElement = this.getElement();
    const parent = prevElement.parentElement;
    this.removeElement();

    const newElement = this.getElement();

    parent.replaceChild(newElement, prevElement);
    prevElement = null;

    this.restoreHandlers();
  }

  restoreHandlers() {
    this._setInnerHandlers();
    this.setFormSubmitHandler(this._callback.formSubmit);
  }

  _setInnerHandlers() {
    this.getElement().querySelector(`.card__date-deadline-toggle`).addEventListener(`click`, this._dueDateToggleHandler);
    this.getElement().querySelector(`.card__repeat-toggle`).addEventListener(`click`, this._repeatingToggleHandler);
  }

  _formSubmitHandler(evt) {
    evt.preventDefault();
    this._callback.formSubmit(TaskEdit.parseDataToTask(this._data));
  }

  _dueDateToggleHandler(evt) {
    evt.preventDefault();
    this.updateData({isDueDate: !this._data.isDueDate});
  }

  _repeatingToggleHandler(evt) {
    evt.preventDefault();
    this.updateData({isRepeating: !this._data.isRepeating});
  }

  setFormSubmitHandler(callback) {
    this._callback.formSubmit = callback;
    this.getElement().querySelector(`form`).addEventListener(`submit`, this._formSubmitHandler);
  }

  static parseTaskToData(task) {
    return Object.assign({}, task, {isDueDate: task.dueDate !== null, isRepeating: isTaskRepeating(task.repeating)});
  }

  static parseDataToTask(data) {
    data = Object.assign({}, data);

    if (!data.isDueDate) {
      data.dueDate = null;
    }

    if (!data.isRepeating) {
      data.repeating = {
        mo: false,
        tu: false,
        we: false,
        th: false,
        fr: false,
        sa: false,
        su: false
      };
    }

    delete data.isDueDate;
    delete data.isRepeating;

    return data;
  }
}

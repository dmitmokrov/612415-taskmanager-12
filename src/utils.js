export const RenderPosition = {
  AFTERBEGIN: `afterbegin`,
  BEFOREEND: `beforeend`
};

export const render = (container, element, place) => {
  switch (place) {
    case RenderPosition.AFTERBEGIN:
      container.prepend(element);
      break;

    case RenderPosition.BEFOREEND:
      container.append(element);
      break;
  }
};

// Функция отрисовки
export const renderTemplate = (container, template, place) => {
  container.insertAdjacentHTML(place, template);
};

// Функция создание DOM-элемента
export const createElement = (template) => {
  const newElement = document.createElement(`div`);
  newElement.innerHTML = template;
  return newElement.firstChild;
};

export const getRandomInteger = (min = 0, max = 1) => Math.floor(min + Math.random() * (max - min + 1));

const getCurrentDate = () => {
  const currentDate = new Date();
  currentDate.setHours(23, 59, 59, 999);
  return new Date(currentDate);
};

export const isTaskExpired = (dueDate) => {
  if (dueDate === null) {
    return false;
  }
  const currentDate = getCurrentDate();
  return currentDate.getTime() > dueDate.getTime();
};

export const isTaskExpiringToday = (dueDate) => {
  if (dueDate === null) {
    return false;
  }
  const currentDate = getCurrentDate();
  return currentDate.getTime() === dueDate.getTime();
};

export const isTaskRepeating = (repeating) => {
  return Object.values(repeating).some(Boolean);
};

export const humanizeTaskDueDate = (dueDate) => {
  return dueDate.toLocaleString(`en-US`, {day: `numeric`, month: `long`});
};

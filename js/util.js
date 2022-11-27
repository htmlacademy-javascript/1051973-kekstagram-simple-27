const ALERT_SHOW_TIME = 3000;

const isEscDone = (evt) => evt.key === 'Escape' || evt.key === 'Esc';


// Блок с возможной ошибкой запроса данных с сервера
const showAlert = () => {
  const alertContainer = document.createElement('div');
  alertContainer.style.zIndex = 1000;
  alertContainer.style.position = 'absolute';
  alertContainer.style.width = '500px';
  alertContainer.style.left = 0;
  alertContainer.style.bottom = '200px';
  alertContainer.style.right = 0;
  alertContainer.style.padding = '100px 3px';
  alertContainer.style.margin = '0 auto';
  alertContainer.style.fontSize = '30px';
  alertContainer.style.color = 'white';
  alertContainer.style.textAlign = 'center';
  alertContainer.style.backgroundColor = 'red';
  alertContainer.textContent = 'Ошибка загрузки данных';

  document.body.append(alertContainer);

  setTimeout(() => {
    alertContainer.remove();
  }, ALERT_SHOW_TIME);
};


export {
  isEscDone,
  showAlert
};

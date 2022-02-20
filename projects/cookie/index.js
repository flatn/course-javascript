/*
 ДЗ 7 - Создать редактор cookie с возможностью фильтрации

 7.1: На странице должна быть таблица со списком имеющихся cookie. Таблица должна иметь следующие столбцы:
   - имя
   - значение
   - удалить (при нажатии на кнопку, выбранная cookie удаляется из браузера и таблицы)

 7.2: На странице должна быть форма для добавления новой cookie. Форма должна содержать следующие поля:
   - имя
   - значение
   - добавить (при нажатии на кнопку, в браузер и таблицу добавляется новая cookie с указанным именем и значением)

 Если добавляется cookie с именем уже существующей cookie, то ее значение в браузере и таблице должно быть обновлено

 7.3: На странице должно быть текстовое поле для фильтрации cookie
 В таблице должны быть только те cookie, в имени или значении которых, хотя бы частично, есть введенное значение
 Если в поле фильтра пусто, то должны выводиться все доступные cookie
 Если добавляемая cookie не соответствует фильтру, то она должна быть добавлена только в браузер, но не в таблицу
 Если добавляется cookie, с именем уже существующей cookie и ее новое значение не соответствует фильтру,
 то ее значение должно быть обновлено в браузере, а из таблицы cookie должна быть удалена

 Запрещено использовать сторонние библиотеки. Разрешено пользоваться только тем, что встроено в браузер
 */
import './cookie.html';
/*
 app - это контейнер для всех ваших домашних заданий
 Если вы создаете новые html-элементы и добавляете их на страницу, то добавляйте их только в этот контейнер

 Пример:
   const newDiv = document.createElement('div');
   homeworkContainer.appendChild(newDiv);
 */
const homeworkContainer = document.querySelector('#app');
// текстовое поле для фильтрации cookie
const filterNameInput = homeworkContainer.querySelector('#filter-name-input');
// текстовое поле с именем cookie
const addNameInput = homeworkContainer.querySelector('#add-name-input');
// текстовое поле со значением cookie
const addValueInput = homeworkContainer.querySelector('#add-value-input');
// кнопка "добавить cookie"
const addButton = homeworkContainer.querySelector('#add-button');
// таблица со списком cookie
const listTable = homeworkContainer.querySelector('#list-table tbody');

const cookies = document.cookie
  .split(';')
  .reduce((ac, cv, i) => Object.assign(ac, { [cv.split('=')[0]]: cv.split('=')[1] }), {});

function addNewList(name, value) {
  const cell = document.createElement('tr');
  const row = document.createElement('td');

  const row2 = document.createElement('td');

  const cellText = document.createTextNode(name);
  const rowText = document.createTextNode(value);

  const deleteBtn = document.createElement('button');

  deleteBtn.textContent = 'Удалить';
  deleteBtn.addEventListener('click', () => {
    listTable.removeChild(cell);
    document.cookie = name + '=; Max-Age=0';
  });

  row.appendChild(rowText);
  row2.appendChild(cellText);

  cell.appendChild(row2);
  cell.appendChild(row);
  cell.appendChild(deleteBtn);

  listTable.appendChild(cell);
}

for (const cookie in cookies) {
  addNewList(cookie, cookies[cookie]);
}

filterNameInput.addEventListener('input', function () {
  for (let i = 0; i < listTable.rows.length; i++) {
    const a = listTable.rows[i].getElementsByTagName('td')[0];
    console.log(filterNameInput.value);
    const txtValue = a.textContent || a.innerText;
    if (txtValue.indexOf(filterNameInput.value) > -1) {
      listTable.rows[i].style.display = '';
    } else {
      listTable.rows[i].style.display = 'none';
    }
  }
});

addButton.addEventListener('click', () => {
  document.cookie = `${addNameInput.value}=${addValueInput.value}`;

  addNewList(addNameInput.value, addValueInput.value);

  addNameInput.value = '';
  addValueInput.value = '';
});

listTable.addEventListener('click', (e) => {});

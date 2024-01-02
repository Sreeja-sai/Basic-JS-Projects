const myArray = JSON.parse(localStorage.getItem('storedmessage')) || [
  {
    name: "Sleep",
    dueDate: "20-03-2023"
  },
];
renderData();
function addButton() {
  const name = document.querySelector('.input-text').value;
  const dueDate = document.querySelector('.input-date').value;
  myArray.push({
    name: name,
    dueDate: dueDate,
  });
  document.querySelector('.input-text').value = '';
  document.querySelector('.input-date').value = '';
  storageItem();
  renderData();
}
function renderData() {
  let htmlcontent = '';
  myArray.forEach((arrayElement, index) => {
    const { name, dueDate } = arrayElement;
    let displayContent = `
    <input type="checkbox">
      <div>${name}</div>
      <div>${dueDate}</div>
      <button class='delete-button css-delete-button'>Delete</button>`;
    htmlcontent += displayContent;
    document.querySelector('.display-content').innerHTML = htmlcontent;
  });
  document.querySelectorAll('.delete-button').forEach((value, index) => {
    value.addEventListener('click', () => {
      myArray.splice(index, 1);
      storageItem();
      renderData();
    });
  })
}

function storageItem() {
  localStorage.setItem('storedmessage', JSON.stringify(myArray));
}
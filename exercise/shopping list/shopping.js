const shoppingForm = document.querySelector('.shopping');
const list = document.querySelector('.list');

let items = []; // * state

function handleSubmit(e) {
  e.preventDefault();
  const name = e.currentTarget.item.value;
  if (!name) return;
  console.log(name);
  const item = {
    name,
    id: Date.now(),
    complete: false,
  };
  // * push items to state
  items.push(item);
  console.log(`There are ${items.length} items in your state`);
  // * clear the form
  e.target.reset();
  list.dispatchEvent(new CustomEvent('itemsUpdated'));
}

function displayItems() {
  const html = items
    .map(
      (item) => `<li class="shopping-item">
    <input 
      value="${item.id}
      "type="checkbox"
      ${item.complete ? 'checked' : ''}
      >
      <span class="itemName">${item.name}</span>
      <button 
        aria-label="Remove ${item.name}"
        value="${item.id}"
      >&times;
    </button>
    </li>`
    )
    .join('');
  list.innerHTML = html;
}

function mirrorLocalStorage() {
  localStorage.setItem('items', JSON.stringify(items));
}

function restoreFromLocalStorage() {
  // * pull items from localStorage
  const lsItems = JSON.parse(localStorage.getItem('items'));
  if (lsItems.length) {
    // items = lsItems;
    // lsItems.forEach((item) => items.push(item));
    // items.push(lsItems[0]);
    items.push(...lsItems);
    list.dispatchEvent(new CustomEvent('itemsUpdated'));
  }
}
// * event delegation listing on an element that we know will be there. like listening on <ul></ul> and delegate to <li></li>

function deleteItem(id) {
  console.log('deleting item', id);
  // * update our items array without the deleted one.
  items = items.filter((item) => item.id !== id);
  console.log(items);
  list.dispatchEvent(new CustomEvent('itemsUpdated'));
}

function markAsComplete(id) {
  console.log('marking as complete', id);
  const itemRef = items.find((item) => item.id === id);
  itemRef.complete = !itemRef.complete;
  list.dispatchEvent(new CustomEvent('itemsUpdated'));
}

shoppingForm.addEventListener('submit', handleSubmit);
list.addEventListener('itemsUpdated', displayItems);
list.addEventListener('itemsUpdated', mirrorLocalStorage);
list.addEventListener('click', (e) => {
  const id = parseInt(e.target.value);
  if (e.target.matches('button')) {
    deleteItem(id);
  }
  if (e.target.matches('input[type="checkbox"]')) {
    markAsComplete(id);
  }
});

restoreFromLocalStorage();

'use strict';

const STORE = [
    { id: cuid(), name: "apples", checked: false },
    { id: cuid(), name: "oranges", checked: false },
    { id: cuid(), name: "milk", checked: true },
    { id: cuid(), name: "bread", checked: false }
];


function generateItemElement(item) {
    return `
    <li data-item-id="${item.id}">
      <span class="shopping-item js-shopping-item ${item.checked ? "shopping-item__checked" : ''}">${item.name}</span>
      <div class="shopping-item-controls">
        <button class="shopping-item-toggle js-item-toggle">
            <span class="button-label">check</span>
        </button>
        <button class="shopping-item-delete js-item-delete">
            <span class="button-label">delete</span>
        </button>
      </div>
    </li>`;
}


function generateShoppingItemsString(shoppingList) {
    console.log("Generating shopping list element");

    let items = shoppingList.map((item) => generateItemElement(item));
    return items.join("");
}


function renderShoppingList() {
    console.log('`renderShoppingList` ran');
    let shoppingListItemsString = generateShoppingItemsString(STORE);
    $('.js-shopping-list').html(shoppingListItemsString);
}

function addItemToShoppingList(itemName) {
    console.log(`Adding "${itemName}" to shopping list`);
    STORE.push({ id: cuid(), name: itemName, checked: false });
}

function handleNewItemSubmit() {
    $('#js-shopping-list-form').on('submit', event => {

        console.log('`handleNewItemSubmit` ran');

        let newItemName = $('.js-shopping-list-entry').val();

        $('.js-shopping-list-entry').val('');

        addItemToShoppingList(newItemName);
        renderShoppingList();

    });
}


function toggleCheckedForListItem(itemId) {
    console.log("Toggling checked property for item with id " + itemId);
    const item = STORE.find(item => item.id === itemId);
    item.checked = !item.checked;
}


function getItemIdFromElement(item) {
    return $(item)
        .closest('li')
        .data('item-id');
}

function handleItemCheckClicked() {
    $('.shopping-item-toggle').on('click', event => {
        console.log('`handleItemCheckClicked` ran');
        let id = getItemIdFromElement(event.currentTarget);
        toggleCheckedForListItem(id);
        renderShoppingList();
    });
}



function deleteListItem(itemId) {
    console.log(`Deleting item with id  ${itemId} from shopping list`)
    let itemIndex = STORE.findIndex(item => item.id === itemId);
    STORE.splice(itemIndex, 1);
}


function handleDeleteItemClicked() {
    $('.shopping-item-delete').on('click', event => {
        let itemIndex = getItemIdFromElement(event.currentTarget);
        deleteListItem(itemIndex);
        renderShoppingList();
    });
}


function handleShoppingList() {
    renderShoppingList();
    handleNewItemSubmit();
    handleItemCheckClicked();
    handleDeleteItemClicked();
}


$(handleShoppingList);
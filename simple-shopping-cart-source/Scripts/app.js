let currentList = {};

function createShoppingList() {
    currentList.name = $("#shoppingListName").val();
    currentList.items = new Array();

    //web service call

    $("#shoppingListTitle").html(currentList.name);
    $("#shoppingListItems").empty();

    $("#createListDiv").hide();
    $("#shoppingListDiv").show();
}

function addItem() {
    let newItem = {};
    newItem.name = $("#newItemName").val();

    currentList.items.push(newItem);

    console.info(currentList);
}

$(document).ready(function () {
    console.info("ready to go");
});




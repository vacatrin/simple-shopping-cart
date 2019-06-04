let currentList = {};

function createShoppingList() {
    currentList.name = $("#shoppingListName").val();

    //app service call

    $("#shoppingListTitle").html(currentList.name);
    $("#shoppingListItems").empty();

    $("#createListDiv").hide();
    $("#shoppingListDiv").show();
}


$(document).ready(function () {
    console.info("ready to go");
});




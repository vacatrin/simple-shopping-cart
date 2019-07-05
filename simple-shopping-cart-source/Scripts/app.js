let currentList = {};

function createShoppingList() {
    currentList.name = $("#shoppingListName").val();
    currentList.items = new Array();

    $.ajax({
        type: "POST",
        dataType: "json",
        url: "api/ShoppingList",
        data: currentList,
        success: function (result) {
            showShoppingList();
        }
    });
}

function showShoppingList() {

    $("#shoppingListTitle").html(currentList.name);
    $("#shoppingListItems").empty();

    $("#createListDiv").hide();
    $("#shoppingListDiv").show();

    $("#newItemName").focus();
    $("#newItemName").keyup(function (event) {
        if (event.keyCode === 13) {
            addItem();
        }
    });
}

function drawItems() {
    let $list = $("#shoppingListItems").empty();

    for (let i = 0; i < currentList.items.length; i++) {

        //Draw each item from the list, with a Check and Delete button next to them
        var currentItem = currentList.items[i];
        let $li = $("<li>").html(currentItem.name)
            .attr("id", `item_${i}`);
        let $deleteBtn =
            $(`<button onclick='deleteItem(${currentList.id}, ${currentItem.id})'>Del</button>`)
                .appendTo($li);
        let $checkBtn =
            $("<button onclick='checkItem(" + currentItem.id + ")'>Chk</button>")
                .appendTo($li);

        if (currentItem.checked) {
            $li.addClass("checked");
        }

        $li.appendTo($list);
    }
}

function deleteItem(id, index) {

    $.ajax({
        type: "DELETE",
        dataType: "json",
        url: `api/Item?listId=${id}&itemId=${index}`,
        success: function (result) {
            currentList = result;
            drawItems();
        }
    });

    drawItems();
}

function checkItem(itemId) {

    let changedItem = currentList.items.find(i => i.id === itemId);

    changedItem.checked = !changedItem.checked;

    $.ajax({
        type: "PUT",
        dataType: "json",
        url: "api/Item/" + itemId,
        data: changedItem,
        success: function (result) {
            currentList = result;
            drawItems();
        }
    });
}

function getShoppingListById(id) {
    $.ajax({
        type: "GET",
        dataType: "json",
        url: `api/ShoppingList/${id}`,
        success: function (result) {
            if (result !== null) {
                currentList = result;
                showShoppingList();
                drawItems();
            }
        },
        error: function () {
            console.error("Oops, something wrong!");
        }
    });
}

$(document).ready(function () {
    console.info("ready to go");
    $("#shoppingListName").focus();
    $("#shoppingListName").keyup(function (event) {
        if (event.keyCode === 13) {
            createShoppingList();
        }
    });

    // change following code as per course 13 Q&A section advice
    const pageUrl = window.location.href;
    const idIndex = pageUrl.indexOf("?id=");

    if (idIndex !== -1) {
        getShoppingListById(pageUrl.substring(idIndex + 4));
    }
});

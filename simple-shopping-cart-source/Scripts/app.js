let currentList = {};

function createShoppingList() {
    currentList.name = $("#shoppingListName").val();
    currentList.items = new Array();

    $.ajax({
        type: "POST",
        dataType: "json",
        url: "api/ShoppingList",
        data: currentList,
        success: function(result) {
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
    $("#newItemName").keyup(function(event) {
        if (event.keyCode === 13) {
            addItem();
        }
    });
}

function addItem() {
    const newItem = {};
    newItem.name = $("#newItemName").val();
    newItem.shoppingListId = currentList.id;

    $.ajax({
        type: "POST",
        dataType: "json",
        url: "api/Item/",
        data: newItem,
        success: function(result) {
            currentList = result;
            drawItems();
            $("#newItemName").val("").focus();
        }
    });
}

function drawItems() {
    let $list = $("#shoppingListItems").empty();

    for (let i = 0; i < currentList.items.length; i++) {

        //Draw each item from the list, with a Check and Delete button next to them
        let $li = $("<li>").html(currentList.items[i].name)
            .attr("id", `item_${i}`);
        let $deleteBtn =
            $(`<button onclick='deleteItem(${i})'>Del</button>`)
                .appendTo($li);
        let $checkBtn =
            $("<button onclick='checkItem(" + i + ")'>Chk</button>")
                .appendTo($li);

        if (currentList.items[i].checked) {
            $li.addClass("checked");
        }

        $li.appendTo($list);
    }
}

function deleteItem(index) {
    currentList.items.splice(index, 1);
    drawItems();
}

function checkItem(index) {
    let item = currentList.items[index];
    item.checked = !item.checked;

    $.ajax({
        type: "PUT",
        dataType: "json",
        url: "api/Item/" + index,
        data: item,
        success: function(result) {
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
        success: function(result) {
            if (result !== null) {
                currentList = result;
                showShoppingList();
                drawItems();
            }
        },
        error: function() {
            console.error("Oops, something wrong!");
        }
    });
}

$(document).ready(function () {
    console.info("ready to go");
    $("#shoppingListName").focus();
    $("#shoppingListName").keyup(function(event) {
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

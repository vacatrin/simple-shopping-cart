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

    drawItems();
}

function drawItems() {
    let $list = $("#shoppingListItems").empty();

    for (var i = 0; i < currentList.items.length; i++) {
        var $li = $("<li>").html(currentList.items[i].name)
            .attr("id", "item_" + i);
        var $deleteBtn = $("<button>Del</button>").appendTo($li);
        var $checkBtn = $("<button>Chk</button>").appendTo($li);

        $li.appendTo($list);
    }
}

$(document).ready(function () {
    console.info("ready to go");
});




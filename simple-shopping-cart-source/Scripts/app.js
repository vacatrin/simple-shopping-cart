let currentList = {};

function createShoppingList() {
    currentList.name = $("#shoppingListName").val();
    currentList.items = new Array();

    //web service call

    showShoppingList();
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
    let newItem = {};
    newItem.name = $("#newItemName").val();
    $("#newItemName").val("").focus();

    currentList.items.push(newItem);
    console.info(currentList);
    drawItems();
}

function drawItems() {
    let $list = $("#shoppingListItems").empty();

    for (let i = 0; i < currentList.items.length; i++) {

        let $li = $("<li>").html(currentList.items[i].name)
            .attr("id", `item_${i}`);

        let $deleteBtn =
            $(`<button onclick='deleteItem(${i})'>Del</button>`)
                .appendTo($li);

        let $checkBtn =
            $("<button onclick='checkItem(" + i + ")'>Chk</button>")
                .appendTo($li);

        $li.appendTo($list);
    }
}

function deleteItem(index) {
    currentList.items.splice(index, 1);
    drawItems();
}

function checkItem(index) {
    if ($(`#item_${index}`).hasClass("checked")) {
        $(`#item_${index}`).removeClass("checked");
    } else {
        $("#item_" + index).addClass("checked");
    }
}

function getShoppingListById(id) {
    $.ajax({
        type: "GET",
        dataType: "json",
        url: "api/ShoppingList/" + id,
        success: function(result) {
            if (result !== null) {
                currentList = result;
                showShoppingList();
                drawItems();
            }
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
    var pageUrl = window.location.href;
    var idIndex = pageUrl.indexOf("?id=");

    if (idIndex !== -1) {
        getShoppingListById(pageUrl.substring(idIndex + 4));
    }
});

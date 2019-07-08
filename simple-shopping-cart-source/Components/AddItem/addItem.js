function addItem() {
    const newItem = {};
    if ($("#newItemName").val() !== "") {
        newItem.name = $("#newItemName").val();

        if ($("#newItemName").hasClass("inputError")) {
            $("#newItemName").removeClass("inputError").focus();
        }

        newItem.shoppingListId = currentList.id;

        $.ajax({
            type: "POST",
            dataType: "json",
            url: "api/ItemsEF/",
            data: newItem,
            success: function (result) {
                currentList = result;
                drawItems();
                $("#newItemName").val("").focus();
            }
        });
        //$("#itemInputError").hide();
    } else {
        $("#newItemName").addClass("inputError").val().focus();
    }
}

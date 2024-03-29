﻿using System.Linq;
using System.Web.Http;
using System.Web.UI.WebControls;
using simple_shopping_cart_source.Models;

namespace simple_shopping_cart_source.Controllers
{
    public class ItemController : ApiController
    {
        // GET: api/Item?shoppingListId=0&itemId=1
        public IHttpActionResult Get(int shoppingListId, int itemId)
        {
            var shoppingList = ShoppingListController.shoppingLists.FirstOrDefault(s => s.Id == shoppingListId);

            if (shoppingList == null)
            {
                return NotFound();
            }

            var result = shoppingList.Items.FirstOrDefault(i => i.Id == itemId);

            if (result == null)
            {
                return NotFound();
            }

            return Ok(result);
        }

        // POST: api/Item
        public IHttpActionResult Post([FromBody]Item item)
        {
            var shoppingList = ShoppingListController.shoppingLists
                .FirstOrDefault(s => s.Id == item.ShoppingListId);

            if (shoppingList == null)
            {
                return NotFound();
            }

            item.Id = shoppingList.Items.Max(i => i.Id) + 1;
            shoppingList.Items.Add(item);

            return Ok(shoppingList);
        }

        // PUT: api/Item/5
        public IHttpActionResult Put(int id, [FromBody]Item item)
        {
            var shoppingList = ShoppingListController.shoppingLists
                .FirstOrDefault(s => s.Id == item.ShoppingListId);

            if (shoppingList == null) return NotFound();

            var changedItem = shoppingList.Items.FirstOrDefault(i => i.Id == id);

            if (changedItem == null) return NotFound();

            changedItem.Checked = item.Checked;

            return Ok(shoppingList);
        }

        // DELETE: api/Item/5
        public IHttpActionResult Delete(int listId, int itemId)
        {
            var shoppingList = ShoppingListController.shoppingLists.FirstOrDefault(i => i.Id == listId);

            if (shoppingList == null)
            {
                return NotFound();
            }

            var itemToDelete = shoppingList.Items.FirstOrDefault(i => i.Id == itemId);

            if (itemToDelete == null)
            {
                return NotFound();
            }

            shoppingList.Items.Remove(itemToDelete);

            return Ok(shoppingList);
        }
    }
}

using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Web.Http;
using simple_shopping_cart_source.Models;

namespace simple_shopping_cart_source.Controllers
{
    public class ItemController : ApiController
    {

        #region Region where Items are mocked

        private List<Item> itemsList = new List<Item>()
        {
            new Item
            {
                Checked = false, Id = 0, Name = "Milk", ShoppingListId = 0
            },
            new Item
            {
                Checked = false, Id = 1, Name = "Tomatoes", ShoppingListId = 0
            },
            new Item
            {
                Checked = true, Id = 2, Name = "Bread", ShoppingListId = 0
            }
        };

        #endregion

        // GET: api/Item/5
        public string Get(int id)
        {
            return null;
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
            //return Ok(changedItem);

            return Ok(shoppingList);
        }

        // DELETE: api/Item/5
        public void Delete(int id)
        {
        }
    }
}

using System.Collections.Generic;
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
            var shoppingLists = ShoppingListController.shoppingLists
                .FirstOrDefault(s => s.Id == item.ShoppingListId);

            if (shoppingLists == null)
            {
                return NotFound();
            }

            shoppingLists.Items.Add(item);

            return Ok(shoppingLists);
        }

        // PUT: api/Item/5
        public void Put(int id, [FromBody]string value)
        {
        }

        // DELETE: api/Item/5
        public void Delete(int id)
        {
        }
    }
}

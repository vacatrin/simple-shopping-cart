using System.Collections;
using System.Collections.Generic;
using System.Linq;
using System.Web.Http;
using Newtonsoft.Json;
using simple_shopping_cart_source.Models;

namespace simple_shopping_cart_source.Controllers
{
    public class ShoppingListController : ApiController
    {

        #region Region creating a mock shopping list, before implementing the database
        private List<ShoppingList> shoppingLists = new List<ShoppingList>
        {
            new ShoppingList()
            {
                Id = 0,
                Name = "Groceries",
                Items =
                {
                    new Item { Name = "Milk" },
                    new Item { Name = "Tomatoes" },
                    new Item { Name = "Bread" }
                }
            },
            new ShoppingList()
            {
                Id = 1,
                Name = "Tools",
                Items =
                {
                    new Item { Name = "Wrench" },
                    new Item { Name = "Bolts" },
                    new Item { Name = "Nuts" }
                }
            }
        };

        #endregion

        // GET: api/ShoppingList?id=5
        public IHttpActionResult Get(int id)
        {
            ShoppingList result = shoppingLists.FirstOrDefault(s => s.Id == id);

            if (result == null)
            {
                return NotFound();
            }

            return Ok(result);
        }

        // POST: api/ShoppingList
        public IEnumerable Post([FromBody]ShoppingList newList)
        {
            newList.Id = shoppingLists.Count;
            shoppingLists.Add(newList);

            return shoppingLists;
        }
    }
}

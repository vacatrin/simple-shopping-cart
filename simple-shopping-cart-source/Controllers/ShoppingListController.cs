using System.Collections.Generic;
using System.Linq;
using System.Web.Http;
using simple_shopping_cart_source.Models;

namespace simple_shopping_cart_source.Controllers
{
    public class ShoppingListController : ApiController
    {

        #region Region creating a mock shopping list, before implementing the database
        private List<ShoppingList> shoppingList = new List<ShoppingList>
        {
            new ShoppingList()
            {
                Id = 0,
                Name = "Groceries"
            },
            new ShoppingList()
            {
                Id = 1,
                Name = "Tools"
            }
        };

        #endregion

        // GET: api/ShoppingList/5
        public IHttpActionResult Get(int id)
        {
            ShoppingList result = shoppingList.FirstOrDefault(s => s.Id == id);

            if (result == null)
            {
                return NotFound();
            }

            return Ok(result);
        }

        // POST: api/ShoppingList
        public void Post([FromBody]string value)
        {


        }
    }
}

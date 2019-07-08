using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Web;

namespace simple_shopping_cart_source.Models
{
    public class simple_shopping_cart_sourceContext : DbContext
    {
        // You can add custom code to this file. Changes will not be overwritten.
        // 
        // If you want Entity Framework to drop and regenerate your database
        // automatically whenever you change your model schema, please use data migrations.
        // For more information refer to the documentation:
        // http://msdn.microsoft.com/en-us/data/jj591621.aspx
    
        public simple_shopping_cart_sourceContext() : base("name=simple_shopping_cart_sourceContext")
        {
        }

        public System.Data.Entity.DbSet<simple_shopping_cart_source.Models.Item> Items { get; set; }

        public System.Data.Entity.DbSet<simple_shopping_cart_source.Models.ShoppingList> ShoppingLists { get; set; }
    }
}

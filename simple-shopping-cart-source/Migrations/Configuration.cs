using simple_shopping_cart_source.Models;

namespace simple_shopping_cart_source.Migrations
{
    using System;
    using System.Data.Entity;
    using System.Data.Entity.Migrations;
    using System.Linq;

    internal sealed class Configuration : DbMigrationsConfiguration<simple_shopping_cart_source.Models.simple_shopping_cart_sourceContext>
    {
        public Configuration()
        {
            AutomaticMigrationsEnabled = false;
        }

        protected override void Seed(simple_shopping_cart_source.Models.simple_shopping_cart_sourceContext context)
        {
            context.ShoppingLists.AddOrUpdate(
                new ShoppingList
                {
                    Name = "Groceries",
                    Items =
                    {
                       new Item
                       {
                           Name = "Milk"
                       },
                       new Item {
                           Name = "Cornflakes"
                       },
                       new Item
                       {
                           Name = "Strawberries"
                       }
                    }
                },
                new ShoppingList
                {
                    Name = "Hardware"
                }
            );
        }
    }
}

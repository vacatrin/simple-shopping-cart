using System;
using System.Collections.Generic;

namespace simple_shopping_cart_source.Models
{
    public class ShoppingList
    {
        public int Id { get; set; }

        public string Name { get; set; }

        public List<Item>Items { get; set; }

        public ShoppingList()
        {
            Id = 0;
            Name = String.Empty;
            Items = new List<Item>();
        }
    }
}
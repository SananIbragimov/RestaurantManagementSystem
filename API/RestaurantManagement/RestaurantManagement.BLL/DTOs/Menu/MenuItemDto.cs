using RestaurantManagement.BLL.DTOs.Product;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace RestaurantManagement.BLL.DTOs.Menu
{
    public class MenuItemDto
    {
        public int Id { get; set; }
        public int MenuId { get; set; }
        public int ProductId { get; set; }
        public decimal? PromotionalPrice { get; set; } = Decimal.Zero;
        public decimal DisplayPrice {  get; set; }
        public MenuDto Menu { get; set; }
        public ProductDto Product { get; set; }
    }
}

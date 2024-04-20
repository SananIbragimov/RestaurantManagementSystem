using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace RestaurantManagement.DAL.Entities
{
    public class MenuItem
    {
        public int Id { get; set; }
        public int MenuId { get; set; }
        public int ProductId { get; set; }
        public decimal? PromotionalPrice { get; set; } = decimal.Zero;
        public Menu Menu { get; set; }
        public Product Product { get; set; }
    }
}

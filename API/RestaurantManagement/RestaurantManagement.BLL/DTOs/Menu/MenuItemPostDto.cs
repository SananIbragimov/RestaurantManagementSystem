using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace RestaurantManagement.BLL.DTOs.Menu
{
    public class MenuItemPostDto
    {
        public int MenuId { get; set; }
        public int ProductId { get; set; }
        public decimal? PromotionalPrice { get; set; }
    }
}

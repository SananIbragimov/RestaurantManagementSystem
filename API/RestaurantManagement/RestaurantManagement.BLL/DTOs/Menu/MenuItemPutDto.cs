using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace RestaurantManagement.BLL.DTOs.Menu
{
    public class MenuItemPutDto
    {
        public int MenuId { get; set; }
        public int ProductId { get; set; }
        public decimal? PromotionalPrice { get; set; }
    }
}

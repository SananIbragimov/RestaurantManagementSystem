using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace RestaurantManagement.BLL.DTOs.Order
{
    public class OrderPutDto
    {
        public int TableId { get; set; }
        public string AppUserId { get; set; }
    }
}

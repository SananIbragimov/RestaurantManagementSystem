using RestaurantManagement.DAL.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace RestaurantManagement.BLL.DTOs.Order
{
    public class OrderDto
    {
        public int Id { get; set; }
        public int TableId { get; set; }
        public DateTime OrderTime { get; set; }
        public string AppUserId { get; set; }
        public ICollection<OrderItemDto> OrderItems { get; set; }

        public decimal TotalPrice => OrderItems?.Sum(item => item.TotalPrice) ?? 0;
    }
}

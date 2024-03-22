using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace RestaurantManagement.DAL.Entities
{
    public class Order
    {
        public int Id { get; set; }
        public int TableId { get; set; }
        public DateTime OrderTime { get; set; }
        public string AppUserId { get; set; }
        public AppUser AppUser { get; set; }
        public Table Table { get; set; }
        public ICollection<OrderItem> OrderItems { get; set; }
    }
}

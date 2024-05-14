using RestaurantManagement.BLL.DTOs.Table;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace RestaurantManagement.BLL.DTOs.Reservation
{
    public class ReservationDto
    {
        public int Id { get; set; }
        public int TableId { get; set; }
        public DateTime ReservationTime { get; set; }
        public string CustomerName { get; set; }
        public string CustomerPhone { get; set; }

        public TableDto Table { get; set; }
    }
}

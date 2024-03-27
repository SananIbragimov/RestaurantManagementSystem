using RestaurantManagement.BLL.Enums;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace RestaurantManagement.DAL.Entities
{
    public class Table
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public bool IsReserved { get; set; }
        public DateTime? ReservationTime { get; set; }
        public TableStatusEnum TableStatus { get; set; }
        public int Capacity { get; set; }
        public string AppUserId { get; set; }
        public AppUser AppUser { get; set; }
        public ICollection<Order> Orders { get; set; }

        public Reservation Reservation {  get; set; }
        public ICollection<TableOpeningHistory> OpeningHistories { get; set; } = new List<TableOpeningHistory>();
    }
}

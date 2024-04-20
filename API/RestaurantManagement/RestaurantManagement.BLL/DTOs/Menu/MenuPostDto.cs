using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace RestaurantManagement.BLL.DTOs.Menu
{
    public class MenuPostDto
    {
        public string Name { get; set; }
        public DateTime ValidFrom { get; set; } = DateTime.Now;
        public DateTime? ValidTo { get; set; }
    }
}

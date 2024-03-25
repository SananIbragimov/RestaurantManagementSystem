using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace RestaurantManagement.BLL.DTOs.Product
{
    public class ProductPutDto
    {
        public string Name { get; set; }
        public decimal Price { get; set; }
        public IFormFile? Image { get; set; }
        public int CategoryId { get; set; }
    }
}

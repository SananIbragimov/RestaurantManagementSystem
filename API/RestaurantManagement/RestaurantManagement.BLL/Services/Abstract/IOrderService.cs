using RestaurantManagement.BLL.DTOs.Menu;
using RestaurantManagement.BLL.DTOs.Order;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace RestaurantManagement.BLL.Services.Abstract
{
    public interface IOrderService
    {
        Task<List<OrderDto>> GetAllAsync();
        Task<OrderDto> GetByIdAsync(int id);
        Task<OrderDto> CreateOrderAsync(OrderPostDto orderPostDto);
        Task UpdateOrderAsync(int id, OrderPutDto orderPutDto);
        Task DeleteOrderAsync(int id);
    }
}

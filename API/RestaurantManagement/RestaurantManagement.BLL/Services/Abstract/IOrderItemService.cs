using RestaurantManagement.BLL.DTOs.Menu;
using RestaurantManagement.BLL.DTOs.Order;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace RestaurantManagement.BLL.Services.Abstract
{
    public interface IOrderItemService
    {
        Task<List<OrderItemDto>> GetAllAsync();
        Task<OrderItemDto> GetByIdAsync(int id);
        Task<OrderItemDto> CreateOrderItemAsync(OrderItemPostDto orderItemPostDto);
        Task UpdateOrderItemAsync(int id, OrderItemPutDto orderItemPutDto);
        Task DeleteOrderItemAsync(int id);
    }
}

using RestaurantManagement.BLL.DTOs.Pagination;
using RestaurantManagement.BLL.DTOs.Report;
using RestaurantManagement.BLL.DTOs.Reservation;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace RestaurantManagement.BLL.Services.Abstract
{
    public interface IReservationService
    {
        Task<PageResultDto<ReservationDto>> GetAllAsync(int pageNumber, int pageSize);
        Task<ReservationDto> GetByIdAsync(int id);
        Task<ReservationDto> CreateReservationAsync(ReservationPostDto reservationPostDto);
        Task UpdateReservationAsync(int id, ReservationPutDto reservationPutDto);
        Task DeleteReservationAsync(int id);
    }
}

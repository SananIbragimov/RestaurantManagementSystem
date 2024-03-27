using RestaurantManagement.BLL.DTOs.Setting;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace RestaurantManagement.BLL.Services.Abstract
{
    public interface ISettingService
    {
        Task<List<SettingDto>> GetAllAsync();
        Task<SettingDto> GetByIdAsync(int id);
        Task<SettingDto> CreateSettingAsync(SettingPostDto settingPostDto);
        Task UpdateSettingAsync(int id, SettingPutDto settingPutDto);
        Task DeleteSettingAsync(int id);
    }
}

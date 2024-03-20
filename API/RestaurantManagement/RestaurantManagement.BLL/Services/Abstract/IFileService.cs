using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace RestaurantManagement.BLL.Services.Abstract
{
    public interface IFileService
    {
        string AddFile(IFormFile file, string targetDirectory);
        void DeleteFile(string fileName, string targetDirectory);
    }
}

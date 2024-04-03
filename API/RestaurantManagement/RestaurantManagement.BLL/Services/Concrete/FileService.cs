using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using RestaurantManagement.BLL.Services.Abstract;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace RestaurantManagement.BLL.Services.Concrete
{
    public class FileService : IFileService
    {
        private readonly IWebHostEnvironment _hostEnvironment;

        public FileService(IWebHostEnvironment hostEnvironment)
        {
            _hostEnvironment = hostEnvironment;
        }

        public async Task<string> AddFileAsync(IFormFile file, string targetDirectory)
        {
            var uploadsRootFolder = Path.Combine(_hostEnvironment.ContentRootPath, "wwwroot", targetDirectory);

            if (!Directory.Exists(uploadsRootFolder))
            {
                Directory.CreateDirectory(uploadsRootFolder);
            }

            var fileName = Guid.NewGuid().ToString() + Path.GetExtension(file.FileName);
            var filePath = Path.Combine(uploadsRootFolder, fileName);

            using (var fileStream = new FileStream(filePath, FileMode.Create))
            {
                await file.CopyToAsync(fileStream);
            }

            return $"/{targetDirectory}/{fileName}";
        }



        public void DeleteFile(string fileName, string targetDirectory)
        {
            if (string.IsNullOrEmpty(targetDirectory))
            {
                throw new ArgumentException("Target directory cannot be null or empty.", nameof(targetDirectory));
            }

            string fileToDeletePath = Path.Combine(_hostEnvironment.ContentRootPath, targetDirectory, fileName);
            if (File.Exists(fileToDeletePath))
            {
                File.Delete(fileToDeletePath);
            }
        }
    }
}

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

        public string AddFile(IFormFile file, string targetDirectory)
        {
            if (string.IsNullOrEmpty(_hostEnvironment.ContentRootPath))
            {
                throw new InvalidOperationException("Web root path is not set.");
            }

            string uploadsRootFolder = Path.Combine(_hostEnvironment.ContentRootPath, targetDirectory);
            if (!Directory.Exists(uploadsRootFolder))
            {
                Directory.CreateDirectory(uploadsRootFolder);
            }

            var fileName = Guid.NewGuid().ToString() + Path.GetExtension(file.FileName);
            var filePath = Path.Combine(uploadsRootFolder, fileName);

            using (var fileStream = new FileStream(filePath, FileMode.Create))
            {
                file.CopyTo(fileStream);
            }

            return filePath;
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

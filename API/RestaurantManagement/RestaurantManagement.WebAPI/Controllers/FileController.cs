using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using RestaurantManagement.BLL.Services.Abstract;

namespace RestaurantManagement.WebAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class FileController : ControllerBase
    {
        private readonly IFileService _fileService;
        private readonly IConfiguration _configuration;

        public FileController(IFileService fileService, IConfiguration configuration)
        {
            _fileService = fileService;
            _configuration = configuration;
        }

        [HttpPost("upload")]
        public IActionResult Upload(IFormFile file)
        {
            if (file == null || file.Length == 0)
            {
                return BadRequest("File is not selected");
            }

            var maxFileSize = _configuration.GetValue<long>("FileUploadSettings:MaxFileSize");
            var allowedExtensions = _configuration.GetSection("FileUploadSettings:AllowedExtensions").Get<List<string>>();

            if (file.Length > maxFileSize)
            {
                return BadRequest("File size exceeds the allowable limit.");
            }

            var extension = Path.GetExtension(file.FileName).ToLowerInvariant();
            if (!allowedExtensions.Contains(extension))
            {
                return BadRequest("Invalid file type.");
            }

            var targetDirectory = _configuration.GetValue<string>("FileUploadSettings:UploadPath");
            var filePath = _fileService.AddFile(file, targetDirectory);

            var url = $"{Request.Scheme}://{Request.Host}{Request.PathBase}{filePath}";

            return Ok(new { FilePath = url });
        }

        [HttpDelete("delete/{fileName}")]
        public IActionResult Delete(string fileName)
        {
            try
            {
                var targetDirectory = _configuration.GetValue<string>("FileUploadSettings:UploadPath");
                _fileService.DeleteFile(fileName, targetDirectory);
                return Ok($"File {fileName} deleted successfully");
            }
            catch (Exception ex)
            {
                return BadRequest($"An error occurred while deleting the file: {ex.Message}");
            }
        }
    }
}

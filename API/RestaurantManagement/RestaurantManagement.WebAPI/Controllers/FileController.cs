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
        public async Task<IActionResult> Upload(IFormFile file)
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
            var filePath = await _fileService.AddFileAsync(file, targetDirectory);

            var url = $"{Request.Scheme}://{Request.Host}{Request.PathBase}{filePath}";

            return Ok(new { FilePath = url });
        }

        [HttpDelete("delete/{folder}/{fileName}")]
        public IActionResult Delete(string folder, string fileName)
        {
            try
            {
                var basePath = _configuration.GetValue<string>("FileUploadSettings:UploadPath");
                var targetDirectory = Path.Combine(basePath, folder);

                _fileService.DeleteFile(fileName, targetDirectory);
                return Ok($"File {fileName} deleted successfully from {folder}");
            }
            catch (Exception ex)
            {
                return BadRequest($"An error occurred while deleting the file: {ex.Message}");
            }
        }

    }
}

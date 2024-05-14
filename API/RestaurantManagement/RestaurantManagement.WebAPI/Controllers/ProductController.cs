using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using RestaurantManagement.BLL.DTOs.Product;
using RestaurantManagement.BLL.Services.Abstract;
using RestaurantManagement.DAL.Entities;

namespace RestaurantManagement.WebAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProductController : ControllerBase
    {
        private readonly IProductService _productService;

        public ProductController(IProductService productService)
        {
            _productService = productService;
        }

        [HttpGet]
        public async Task<IActionResult> GetAll(int pageNumber = 1, int pageSize = 10)
        {
            var products = await _productService.GetAllAsync(pageNumber, pageSize);

            return Ok(products);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(int id)
        {
            var product = await _productService.GetByIdAsync(id);
            if (product == null) return NotFound("Product not found");

            return Ok(product);
        }

        [HttpGet("name/{name}")]
        public async Task<IActionResult> GetByName(string name)
        {
            var product = await _productService.GetByNameAsync(name);
            if (product == null) return NotFound("Product not found");

            return Ok(product);
        }

        [HttpGet("price")]
        public async Task<IActionResult> GetByPriceRange([FromQuery] int min, [FromQuery] int max, int pageNumber = 1, int pageSize = 10)
        {
            var products = await _productService.GetByPriceRangeAsync(min, max, pageNumber, pageSize);

            return Ok(products);
        }

        [HttpPost]
        public async Task<IActionResult> Create([FromForm] ProductPostDto productPostDto)
        {
            try
            {
                var product = await _productService.CreateProductAsync(productPostDto);
                return CreatedAtAction(nameof(Create), new { id = product.Id }, product);
            }
            catch (InvalidOperationException ex)
            {
                return BadRequest(new { error = ex.Message });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { error = "Server error: " + ex.Message });
            }
        }


        [HttpPut("{id}")]
        public async Task<IActionResult> Update(int id, [FromForm] ProductPutDto productPutDto)
        {
            try
            {
                var updatedProduct = await _productService.UpdateProductAsync(id, productPutDto);
                var response = new { Message = $"Product with Id {id} updated", updatedProduct };
                return Ok(response);
            }
            catch (KeyNotFoundException ex)
            {
                return NotFound(ex.Message);
            }
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            try
            {
                await _productService.DeleteProductAsync(id);
                return Ok("Deleted successfully");
            }
            catch (KeyNotFoundException ex)
            {
                return NotFound(ex.Message);
            }
        }
    }
}

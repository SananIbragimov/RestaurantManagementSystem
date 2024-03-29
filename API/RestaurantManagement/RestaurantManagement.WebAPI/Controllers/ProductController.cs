﻿using Microsoft.AspNetCore.Http;
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
        public async Task<IActionResult> GetAll()
        {
            var products = await _productService.GetAllAsync();

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
        public async Task<IActionResult> GetByPriceRange([FromQuery] int min,[FromQuery] int max)
        {
            var products = await _productService.GetByPriceRangeAsync(min, max);

            return Ok(products);
        }

        [HttpPost]
        public async Task<IActionResult> Create([FromForm] ProductPostDto productPostDto)
        {
            var product = await _productService.CreateProductAsync(productPostDto);

            return CreatedAtAction(nameof(Create),product);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Update(int id,[FromForm] ProductPutDto productPutDto)
        {
            try
            {
                await _productService.UpdateProductAsync(id, productPutDto);
                return Ok($"Product with Id {id} updated");
            }
            catch(KeyNotFoundException ex)
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
                return NoContent();
            }
            catch(KeyNotFoundException ex)
            {
                return NotFound(ex.Message);
            }
        }
    }
}

using FluentValidation;
using RestaurantManagement.BLL.DTOs.Product;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace RestaurantManagement.BLL.Validators.Product
{
    public class ProductPutDtoValidator : AbstractValidator<ProductPutDto>
    {
        public ProductPutDtoValidator()
        {
            RuleFor(p => p.Name)
                .NotEmpty().WithMessage("Product name is required.")
                .Length(2, 50).WithMessage("Product name must be between 2 and 50 characters.");

            RuleFor(p => p.Price)
                .GreaterThan(0).WithMessage("Price must be greater than 0.");

            RuleFor(p => p.CategoryId)
                .GreaterThan(0).WithMessage("A valid category ID is required.");
        }
    }
}

using FluentValidation;
using RestaurantManagement.BLL.DTOs.Product;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace RestaurantManagement.BLL.Validators.Product
{
    public class ProductPostDtoValidator : AbstractValidator<ProductPostDto>
    {
        public ProductPostDtoValidator()
        {
            RuleFor(p => p.Name)
            .NotEmpty().WithMessage("Product name is required.")
            .Length(2,100).WithMessage("Product name must be between 2 and 100 characters.");

            RuleFor(p => p.Price)
                .GreaterThan(0).WithMessage("Price must be greater than 0.");

            RuleFor(p => p.Image)
                .NotNull().WithMessage("An image file is required.");

            RuleFor(p => p.CategoryId)
                .GreaterThan(0).WithMessage("A valid category ID is required.");
        }
    }
}

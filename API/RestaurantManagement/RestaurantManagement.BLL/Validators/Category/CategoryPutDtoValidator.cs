using FluentValidation;
using RestaurantManagement.BLL.DTOs.Category;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace RestaurantManagement.BLL.Validators.Category
{
    public class CategoryPutDtoValidator : AbstractValidator<CategoryPutDto>
    {
        public CategoryPutDtoValidator()
        {
            RuleFor(category => category.Name)
           .NotEmpty().WithMessage("Category name is required.")
           .Length(2, 50).WithMessage("Category name must be between 2 and 50 characters.");
        }
    }
}

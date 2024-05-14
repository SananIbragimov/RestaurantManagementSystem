using FluentValidation;
using RestaurantManagement.BLL.DTOs.Table;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace RestaurantManagement.BLL.Validators.Table
{
    public class TablePutDtoValidator : AbstractValidator<TablePutDto>
    {
        public TablePutDtoValidator()
        {
            RuleFor(x => x.Name)
            .NotEmpty().WithMessage("Table name is required.")
            .Length(2, 30).WithMessage("Table name must be between 2 and 30 characters.");

            RuleFor(x => x.Capacity)
                .GreaterThan(0).WithMessage("Capacity must be greater than 0.");


            RuleFor(x => x.TableStatus)
                .IsInEnum().WithMessage("Invalid table status.");
        }
    }
}

using FluentValidation;
using RestaurantManagement.BLL.DTOs.Table;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace RestaurantManagement.BLL.Validators.Table
{
    public class TableOpeningHistoryPostDtoValidator : AbstractValidator<TableOpeningHistoryPostDto>
    {
        public TableOpeningHistoryPostDtoValidator()
        {
            RuleFor(x => x.TableId).GreaterThan(0).WithMessage("TableId must be greater than 0.");
        }
    }
}

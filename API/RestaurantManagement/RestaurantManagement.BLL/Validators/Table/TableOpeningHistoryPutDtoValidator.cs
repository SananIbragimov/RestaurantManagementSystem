using FluentValidation;
using RestaurantManagement.BLL.DTOs.Table;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace RestaurantManagement.BLL.Validators.Table
{
    public class TableOpeningHistoryPutDtoValidator : AbstractValidator<TableOpeningHistoryPutDto>
    {
        public TableOpeningHistoryPutDtoValidator()
        {
            RuleFor(x => x.ClosedAt)
            .Must(closedAt => !closedAt.HasValue || closedAt.Value < DateTime.UtcNow)
            .WithMessage("ClosedAt must be a valid date in the past.")
            .When(x => x.ClosedAt.HasValue);
        }
    }
}

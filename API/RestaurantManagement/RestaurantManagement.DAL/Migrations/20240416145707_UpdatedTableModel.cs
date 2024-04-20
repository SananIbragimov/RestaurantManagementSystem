using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace RestaurantManagement.DAL.Migrations
{
    /// <inheritdoc />
    public partial class UpdatedTableModel : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Tables_AspNetUsers_AppUserId",
                table: "Tables");

            migrationBuilder.DropIndex(
                name: "IX_Tables_AppUserId",
                table: "Tables");

            migrationBuilder.DropColumn(
                name: "AppUserId",
                table: "Tables");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "AppUserId",
                table: "Tables",
                type: "nvarchar(450)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.CreateIndex(
                name: "IX_Tables_AppUserId",
                table: "Tables",
                column: "AppUserId");

            migrationBuilder.AddForeignKey(
                name: "FK_Tables_AspNetUsers_AppUserId",
                table: "Tables",
                column: "AppUserId",
                principalTable: "AspNetUsers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}

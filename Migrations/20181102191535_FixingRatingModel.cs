using Microsoft.EntityFrameworkCore.Migrations;

namespace sclask.Migrations
{
    public partial class FixingRatingModel : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Rating",
                table: "Players");

            migrationBuilder.AddColumn<float>(
                name: "Score",
                table: "Ratings",
                nullable: false,
                defaultValue: 0f);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Score",
                table: "Ratings");

            migrationBuilder.AddColumn<float>(
                name: "Rating",
                table: "Players",
                nullable: false,
                defaultValue: 0f);
        }
    }
}

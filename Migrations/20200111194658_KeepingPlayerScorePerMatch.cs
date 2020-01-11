using Microsoft.EntityFrameworkCore.Migrations;

namespace sclask.Migrations
{
    public partial class KeepingPlayerScorePerMatch : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<float>(
                name: "PlayerRating",
                table: "MultiPlayerMatches",
                nullable: false,
                defaultValue: 0f);

            migrationBuilder.AddColumn<float>(
                name: "PointsImpact",
                table: "MultiPlayerMatches",
                nullable: false,
                defaultValue: 0f);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "PlayerRating",
                table: "MultiPlayerMatches");

            migrationBuilder.DropColumn(
                name: "PointsImpact",
                table: "MultiPlayerMatches");
        }
    }
}

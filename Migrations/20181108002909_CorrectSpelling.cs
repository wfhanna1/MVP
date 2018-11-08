using Microsoft.EntityFrameworkCore.Migrations;

namespace sclask.Migrations
{
    public partial class CorrectSpelling : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "PlayerBPrediciton",
                table: "Matches",
                newName: "PlayerBPredicition");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "PlayerBPredicition",
                table: "Matches",
                newName: "PlayerBPrediciton");
        }
    }
}

using Microsoft.EntityFrameworkCore.Migrations;

namespace sclask.Migrations
{
    public partial class addingConstraints : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateIndex(
                name: "IX_Players_EmailAddress",
                table: "Players",
                column: "EmailAddress",
                unique: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropIndex(
                name: "IX_Players_EmailAddress",
                table: "Players");
        }
    }
}

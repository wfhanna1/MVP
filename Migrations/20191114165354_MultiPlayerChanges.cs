using Microsoft.EntityFrameworkCore.Migrations;

namespace sclask.Migrations
{
    public partial class MultiPlayerChanges : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Matches_Players_PlayerAId",
                table: "Matches");

            migrationBuilder.DropForeignKey(
                name: "FK_Matches_Players_PlayerBId",
                table: "Matches");

            migrationBuilder.DropForeignKey(
                name: "FK_Matches_Players_WinnerId",
                table: "Matches");

            migrationBuilder.DropIndex(
                name: "IX_Matches_PlayerAId",
                table: "Matches");

            migrationBuilder.DropIndex(
                name: "IX_Matches_PlayerBId",
                table: "Matches");

            migrationBuilder.DropIndex(
                name: "IX_Matches_WinnerId",
                table: "Matches");

            migrationBuilder.DropColumn(
                name: "PlayerAId",
                table: "Matches");

            migrationBuilder.DropColumn(
                name: "PlayerAPrediction",
                table: "Matches");

            migrationBuilder.DropColumn(
                name: "PlayerBId",
                table: "Matches");

            migrationBuilder.DropColumn(
                name: "PlayerBPredicition",
                table: "Matches");

            migrationBuilder.DropColumn(
                name: "WinnerId",
                table: "Matches");

            migrationBuilder.CreateIndex(
                name: "IX_MultiPlayerMatches_PlayerId",
                table: "MultiPlayerMatches",
                column: "PlayerId");

            migrationBuilder.AddForeignKey(
                name: "FK_MultiPlayerMatches_Players_PlayerId",
                table: "MultiPlayerMatches",
                column: "PlayerId",
                principalTable: "Players",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_MultiPlayerMatches_Players_PlayerId",
                table: "MultiPlayerMatches");

            migrationBuilder.DropIndex(
                name: "IX_MultiPlayerMatches_PlayerId",
                table: "MultiPlayerMatches");

            migrationBuilder.AddColumn<int>(
                name: "PlayerAId",
                table: "Matches",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<float>(
                name: "PlayerAPrediction",
                table: "Matches",
                nullable: false,
                defaultValue: 0f);

            migrationBuilder.AddColumn<int>(
                name: "PlayerBId",
                table: "Matches",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<float>(
                name: "PlayerBPredicition",
                table: "Matches",
                nullable: false,
                defaultValue: 0f);

            migrationBuilder.AddColumn<int>(
                name: "WinnerId",
                table: "Matches",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateIndex(
                name: "IX_Matches_PlayerAId",
                table: "Matches",
                column: "PlayerAId");

            migrationBuilder.CreateIndex(
                name: "IX_Matches_PlayerBId",
                table: "Matches",
                column: "PlayerBId");

            migrationBuilder.CreateIndex(
                name: "IX_Matches_WinnerId",
                table: "Matches",
                column: "WinnerId");

            migrationBuilder.AddForeignKey(
                name: "FK_Matches_Players_PlayerAId",
                table: "Matches",
                column: "PlayerAId",
                principalTable: "Players",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Matches_Players_PlayerBId",
                table: "Matches",
                column: "PlayerBId",
                principalTable: "Players",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Matches_Players_WinnerId",
                table: "Matches",
                column: "WinnerId",
                principalTable: "Players",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}

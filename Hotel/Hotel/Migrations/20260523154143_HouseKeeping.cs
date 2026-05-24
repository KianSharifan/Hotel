using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Hotel.Migrations
{
    /// <inheritdoc />
    public partial class HouseKeeping : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<string>(
                name: "Notes",
                table: "HouseKeepings",
                type: "character varying(200)",
                maxLength: 200,
                nullable: true,
                oldClrType: typeof(string),
                oldType: "text",
                oldNullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_HouseKeepings_EmployeeId",
                table: "HouseKeepings",
                column: "EmployeeId");

            migrationBuilder.CreateIndex(
                name: "IX_HouseKeepings_RoomId",
                table: "HouseKeepings",
                column: "RoomId");

            migrationBuilder.AddForeignKey(
                name: "FK_HouseKeepings_Employees_EmployeeId",
                table: "HouseKeepings",
                column: "EmployeeId",
                principalTable: "Employees",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_HouseKeepings_Rooms_RoomId",
                table: "HouseKeepings",
                column: "RoomId",
                principalTable: "Rooms",
                principalColumn: "RoomId",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_HouseKeepings_Employees_EmployeeId",
                table: "HouseKeepings");

            migrationBuilder.DropForeignKey(
                name: "FK_HouseKeepings_Rooms_RoomId",
                table: "HouseKeepings");

            migrationBuilder.DropIndex(
                name: "IX_HouseKeepings_EmployeeId",
                table: "HouseKeepings");

            migrationBuilder.DropIndex(
                name: "IX_HouseKeepings_RoomId",
                table: "HouseKeepings");

            migrationBuilder.AlterColumn<string>(
                name: "Notes",
                table: "HouseKeepings",
                type: "text",
                nullable: true,
                oldClrType: typeof(string),
                oldType: "character varying(200)",
                oldMaxLength: 200,
                oldNullable: true);
        }
    }
}

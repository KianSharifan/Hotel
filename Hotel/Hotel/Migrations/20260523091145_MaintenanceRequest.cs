using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Hotel.Migrations
{
    /// <inheritdoc />
    public partial class MaintenanceRequest : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<string>(
                name: "Status",
                table: "MaintenanceRequests",
                type: "character varying(100)",
                maxLength: 100,
                nullable: true,
                oldClrType: typeof(string),
                oldType: "text",
                oldNullable: true);

            migrationBuilder.AlterColumn<string>(
                name: "Priority",
                table: "MaintenanceRequests",
                type: "character varying(100)",
                maxLength: 100,
                nullable: true,
                oldClrType: typeof(string),
                oldType: "text",
                oldNullable: true);

            migrationBuilder.AlterColumn<string>(
                name: "Description",
                table: "MaintenanceRequests",
                type: "character varying(500)",
                maxLength: 500,
                nullable: true,
                oldClrType: typeof(string),
                oldType: "text",
                oldNullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_MaintenanceRequests_ReportedEmployeeId",
                table: "MaintenanceRequests",
                column: "ReportedEmployeeId");

            migrationBuilder.CreateIndex(
                name: "IX_MaintenanceRequests_RoomId",
                table: "MaintenanceRequests",
                column: "RoomId");

            migrationBuilder.AddForeignKey(
                name: "FK_MaintenanceRequests_Employees_ReportedEmployeeId",
                table: "MaintenanceRequests",
                column: "ReportedEmployeeId",
                principalTable: "Employees",
                principalColumn: "Id",
                onDelete: ReferentialAction.SetNull);

            migrationBuilder.AddForeignKey(
                name: "FK_MaintenanceRequests_Rooms_RoomId",
                table: "MaintenanceRequests",
                column: "RoomId",
                principalTable: "Rooms",
                principalColumn: "RoomId",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_MaintenanceRequests_Employees_ReportedEmployeeId",
                table: "MaintenanceRequests");

            migrationBuilder.DropForeignKey(
                name: "FK_MaintenanceRequests_Rooms_RoomId",
                table: "MaintenanceRequests");

            migrationBuilder.DropIndex(
                name: "IX_MaintenanceRequests_ReportedEmployeeId",
                table: "MaintenanceRequests");

            migrationBuilder.DropIndex(
                name: "IX_MaintenanceRequests_RoomId",
                table: "MaintenanceRequests");

            migrationBuilder.AlterColumn<string>(
                name: "Status",
                table: "MaintenanceRequests",
                type: "text",
                nullable: true,
                oldClrType: typeof(string),
                oldType: "character varying(100)",
                oldMaxLength: 100,
                oldNullable: true);

            migrationBuilder.AlterColumn<string>(
                name: "Priority",
                table: "MaintenanceRequests",
                type: "text",
                nullable: true,
                oldClrType: typeof(string),
                oldType: "character varying(100)",
                oldMaxLength: 100,
                oldNullable: true);

            migrationBuilder.AlterColumn<string>(
                name: "Description",
                table: "MaintenanceRequests",
                type: "text",
                nullable: true,
                oldClrType: typeof(string),
                oldType: "character varying(500)",
                oldMaxLength: 500,
                oldNullable: true);
        }
    }
}

using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Hotel.Migrations
{
    /// <inheritdoc />
    public partial class Invoice : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<string>(
                name: "Status",
                table: "Invoices",
                type: "character varying(100)",
                maxLength: 100,
                nullable: true,
                oldClrType: typeof(string),
                oldType: "text",
                oldNullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Invoices_GuestId",
                table: "Invoices",
                column: "GuestId");

            migrationBuilder.CreateIndex(
                name: "IX_Invoices_ReservationId",
                table: "Invoices",
                column: "ReservationId");

            migrationBuilder.AddForeignKey(
                name: "FK_Invoices_Guests_GuestId",
                table: "Invoices",
                column: "GuestId",
                principalTable: "Guests",
                principalColumn: "GuestId",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Invoices_Reservations_ReservationId",
                table: "Invoices",
                column: "ReservationId",
                principalTable: "Reservations",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Invoices_Guests_GuestId",
                table: "Invoices");

            migrationBuilder.DropForeignKey(
                name: "FK_Invoices_Reservations_ReservationId",
                table: "Invoices");

            migrationBuilder.DropIndex(
                name: "IX_Invoices_GuestId",
                table: "Invoices");

            migrationBuilder.DropIndex(
                name: "IX_Invoices_ReservationId",
                table: "Invoices");

            migrationBuilder.AlterColumn<string>(
                name: "Status",
                table: "Invoices",
                type: "text",
                nullable: true,
                oldClrType: typeof(string),
                oldType: "character varying(100)",
                oldMaxLength: 100,
                oldNullable: true);
        }
    }
}

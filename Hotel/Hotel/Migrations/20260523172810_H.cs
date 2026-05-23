using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Hotel.Migrations
{
    /// <inheritdoc />
    public partial class H : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<string>(
                name: "Phone",
                table: "Hotels",
                type: "character varying(15)",
                maxLength: 15,
                nullable: false,
                defaultValue: "",
                oldClrType: typeof(string),
                oldType: "text",
                oldNullable: true);

            migrationBuilder.AlterColumn<string>(
                name: "Name",
                table: "Hotels",
                type: "character varying(100)",
                maxLength: 100,
                nullable: false,
                defaultValue: "",
                oldClrType: typeof(string),
                oldType: "text",
                oldNullable: true);

            migrationBuilder.AlterColumn<string>(
                name: "Email",
                table: "Hotels",
                type: "character varying(100)",
                maxLength: 100,
                nullable: false,
                defaultValue: "",
                oldClrType: typeof(string),
                oldType: "text",
                oldNullable: true);

            migrationBuilder.AlterColumn<string>(
                name: "Country",
                table: "Hotels",
                type: "character varying(100)",
                maxLength: 100,
                nullable: false,
                defaultValue: "",
                oldClrType: typeof(string),
                oldType: "text",
                oldNullable: true);

            migrationBuilder.AlterColumn<string>(
                name: "City",
                table: "Hotels",
                type: "character varying(100)",
                maxLength: 100,
                nullable: false,
                defaultValue: "",
                oldClrType: typeof(string),
                oldType: "text",
                oldNullable: true);

            migrationBuilder.AlterColumn<string>(
                name: "Address",
                table: "Hotels",
                type: "character varying(300)",
                maxLength: 300,
                nullable: false,
                defaultValue: "",
                oldClrType: typeof(string),
                oldType: "text",
                oldNullable: true);

            migrationBuilder.AlterColumn<long>(
                name: "Quantity",
                table: "GuestServiceUsages",
                type: "bigint",
                nullable: false,
                oldClrType: typeof(int),
                oldType: "integer");

            migrationBuilder.CreateIndex(
                name: "IX_Hotels_Email",
                table: "Hotels",
                column: "Email",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_Hotels_Phone",
                table: "Hotels",
                column: "Phone",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_GuestServiceUsages_GuestId",
                table: "GuestServiceUsages",
                column: "GuestId");

            migrationBuilder.CreateIndex(
                name: "IX_GuestServiceUsages_ReservationId",
                table: "GuestServiceUsages",
                column: "ReservationId");

            migrationBuilder.CreateIndex(
                name: "IX_GuestServiceUsages_ServiceId",
                table: "GuestServiceUsages",
                column: "ServiceId");

            migrationBuilder.AddForeignKey(
                name: "FK_GuestServiceUsages_Guests_GuestId",
                table: "GuestServiceUsages",
                column: "GuestId",
                principalTable: "Guests",
                principalColumn: "GuestId",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_GuestServiceUsages_Reservations_ReservationId",
                table: "GuestServiceUsages",
                column: "ReservationId",
                principalTable: "Reservations",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_GuestServiceUsages_Services_ServiceId",
                table: "GuestServiceUsages",
                column: "ServiceId",
                principalTable: "Services",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_GuestServiceUsages_Guests_GuestId",
                table: "GuestServiceUsages");

            migrationBuilder.DropForeignKey(
                name: "FK_GuestServiceUsages_Reservations_ReservationId",
                table: "GuestServiceUsages");

            migrationBuilder.DropForeignKey(
                name: "FK_GuestServiceUsages_Services_ServiceId",
                table: "GuestServiceUsages");

            migrationBuilder.DropIndex(
                name: "IX_Hotels_Email",
                table: "Hotels");

            migrationBuilder.DropIndex(
                name: "IX_Hotels_Phone",
                table: "Hotels");

            migrationBuilder.DropIndex(
                name: "IX_GuestServiceUsages_GuestId",
                table: "GuestServiceUsages");

            migrationBuilder.DropIndex(
                name: "IX_GuestServiceUsages_ReservationId",
                table: "GuestServiceUsages");

            migrationBuilder.DropIndex(
                name: "IX_GuestServiceUsages_ServiceId",
                table: "GuestServiceUsages");

            migrationBuilder.AlterColumn<string>(
                name: "Phone",
                table: "Hotels",
                type: "text",
                nullable: true,
                oldClrType: typeof(string),
                oldType: "character varying(15)",
                oldMaxLength: 15);

            migrationBuilder.AlterColumn<string>(
                name: "Name",
                table: "Hotels",
                type: "text",
                nullable: true,
                oldClrType: typeof(string),
                oldType: "character varying(100)",
                oldMaxLength: 100);

            migrationBuilder.AlterColumn<string>(
                name: "Email",
                table: "Hotels",
                type: "text",
                nullable: true,
                oldClrType: typeof(string),
                oldType: "character varying(100)",
                oldMaxLength: 100);

            migrationBuilder.AlterColumn<string>(
                name: "Country",
                table: "Hotels",
                type: "text",
                nullable: true,
                oldClrType: typeof(string),
                oldType: "character varying(100)",
                oldMaxLength: 100);

            migrationBuilder.AlterColumn<string>(
                name: "City",
                table: "Hotels",
                type: "text",
                nullable: true,
                oldClrType: typeof(string),
                oldType: "character varying(100)",
                oldMaxLength: 100);

            migrationBuilder.AlterColumn<string>(
                name: "Address",
                table: "Hotels",
                type: "text",
                nullable: true,
                oldClrType: typeof(string),
                oldType: "character varying(300)",
                oldMaxLength: 300);

            migrationBuilder.AlterColumn<int>(
                name: "Quantity",
                table: "GuestServiceUsages",
                type: "integer",
                nullable: false,
                oldClrType: typeof(long),
                oldType: "bigint");
        }
    }
}

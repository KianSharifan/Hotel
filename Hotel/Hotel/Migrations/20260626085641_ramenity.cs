using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Hotel.Migrations
{
    /// <inheritdoc />
    public partial class ramenity : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_RoomAmenities_Rooms_RoomId",
                table: "RoomAmenities");

            migrationBuilder.RenameColumn(
                name: "RoomId",
                table: "RoomAmenities",
                newName: "RoomTypeId");

            migrationBuilder.AddForeignKey(
                name: "FK_RoomAmenities_RoomTypes_RoomTypeId",
                table: "RoomAmenities",
                column: "RoomTypeId",
                principalTable: "RoomTypes",
                principalColumn: "RoomTypeId",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_RoomAmenities_RoomTypes_RoomTypeId",
                table: "RoomAmenities");

            migrationBuilder.RenameColumn(
                name: "RoomTypeId",
                table: "RoomAmenities",
                newName: "RoomId");

            migrationBuilder.AddForeignKey(
                name: "FK_RoomAmenities_Rooms_RoomId",
                table: "RoomAmenities",
                column: "RoomId",
                principalTable: "Rooms",
                principalColumn: "RoomId",
                onDelete: ReferentialAction.Cascade);
        }
    }
}

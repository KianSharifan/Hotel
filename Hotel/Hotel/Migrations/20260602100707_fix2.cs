using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Hotel.Migrations
{
    /// <inheritdoc />
    public partial class fix2 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Restaurants_Hotels_HotelId1",
                table: "Restaurants");

            migrationBuilder.DropIndex(
                name: "IX_Restaurants_HotelId1",
                table: "Restaurants");

            migrationBuilder.DropColumn(
                name: "HotelId1",
                table: "Restaurants");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "HotelId1",
                table: "Restaurants",
                type: "integer",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateIndex(
                name: "IX_Restaurants_HotelId1",
                table: "Restaurants",
                column: "HotelId1");

            migrationBuilder.AddForeignKey(
                name: "FK_Restaurants_Hotels_HotelId1",
                table: "Restaurants",
                column: "HotelId1",
                principalTable: "Hotels",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}

using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Hotel.Migrations
{
    /// <inheritdoc />
    public partial class fix3 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_RestaurantTables_Restaurants_RestaurantId1",
                table: "RestaurantTables");

            migrationBuilder.DropIndex(
                name: "IX_RestaurantTables_RestaurantId1",
                table: "RestaurantTables");

            migrationBuilder.DropColumn(
                name: "RestaurantId1",
                table: "RestaurantTables");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "RestaurantId1",
                table: "RestaurantTables",
                type: "integer",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateIndex(
                name: "IX_RestaurantTables_RestaurantId1",
                table: "RestaurantTables",
                column: "RestaurantId1");

            migrationBuilder.AddForeignKey(
                name: "FK_RestaurantTables_Restaurants_RestaurantId1",
                table: "RestaurantTables",
                column: "RestaurantId1",
                principalTable: "Restaurants",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}

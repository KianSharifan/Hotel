using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Hotel.Migrations
{
    /// <inheritdoc />
    public partial class modelChanges : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "ImageUrl",
                table: "Rooms");

            migrationBuilder.AddColumn<int>(
                name: "HotelId1",
                table: "Rooms",
                type: "integer",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "RoomTypeId1",
                table: "Rooms",
                type: "integer",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "RestaurantId1",
                table: "RestaurantTables",
                type: "integer",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "HotelId1",
                table: "Restaurants",
                type: "integer",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "GuestId1",
                table: "Reservations",
                type: "integer",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "RoomId1",
                table: "Reservations",
                type: "integer",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "InvoiceId1",
                table: "Payments",
                type: "integer",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "OrderId1",
                table: "Payments",
                type: "integer",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "GuestId1",
                table: "Orders",
                type: "integer",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "TableId1",
                table: "Orders",
                type: "integer",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "OrderId1",
                table: "OrderItems",
                type: "integer",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "MenuCategoryId1",
                table: "MenuItems",
                type: "integer",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "ReportedEmployeeId1",
                table: "MaintenanceRequests",
                type: "integer",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "RoomId1",
                table: "MaintenanceRequests",
                type: "integer",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "GuestId1",
                table: "Invoices",
                type: "integer",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "ReservationId1",
                table: "Invoices",
                type: "integer",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "EmployeeId1",
                table: "HouseKeepings",
                type: "integer",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "RoomId1",
                table: "HouseKeepings",
                type: "integer",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "GuestId1",
                table: "GuestServiceUsages",
                type: "integer",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "ReservationId1",
                table: "GuestServiceUsages",
                type: "integer",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "ServiceId1",
                table: "GuestServiceUsages",
                type: "integer",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "DepartmentId1",
                table: "Employees",
                type: "integer",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "PositionId1",
                table: "Employees",
                type: "integer",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateIndex(
                name: "IX_Rooms_HotelId1",
                table: "Rooms",
                column: "HotelId1");

            migrationBuilder.CreateIndex(
                name: "IX_Rooms_RoomTypeId1",
                table: "Rooms",
                column: "RoomTypeId1");

            migrationBuilder.CreateIndex(
                name: "IX_RestaurantTables_RestaurantId1",
                table: "RestaurantTables",
                column: "RestaurantId1");

            migrationBuilder.CreateIndex(
                name: "IX_Restaurants_HotelId1",
                table: "Restaurants",
                column: "HotelId1");

            migrationBuilder.CreateIndex(
                name: "IX_Reservations_GuestId1",
                table: "Reservations",
                column: "GuestId1");

            migrationBuilder.CreateIndex(
                name: "IX_Reservations_RoomId1",
                table: "Reservations",
                column: "RoomId1");

            migrationBuilder.CreateIndex(
                name: "IX_Payments_InvoiceId1",
                table: "Payments",
                column: "InvoiceId1");

            migrationBuilder.CreateIndex(
                name: "IX_Payments_OrderId1",
                table: "Payments",
                column: "OrderId1");

            migrationBuilder.CreateIndex(
                name: "IX_Orders_GuestId1",
                table: "Orders",
                column: "GuestId1");

            migrationBuilder.CreateIndex(
                name: "IX_Orders_TableId1",
                table: "Orders",
                column: "TableId1");

            migrationBuilder.CreateIndex(
                name: "IX_OrderItems_OrderId1",
                table: "OrderItems",
                column: "OrderId1");

            migrationBuilder.CreateIndex(
                name: "IX_MenuItems_MenuCategoryId1",
                table: "MenuItems",
                column: "MenuCategoryId1");

            migrationBuilder.CreateIndex(
                name: "IX_MaintenanceRequests_ReportedEmployeeId1",
                table: "MaintenanceRequests",
                column: "ReportedEmployeeId1");

            migrationBuilder.CreateIndex(
                name: "IX_MaintenanceRequests_RoomId1",
                table: "MaintenanceRequests",
                column: "RoomId1");

            migrationBuilder.CreateIndex(
                name: "IX_Invoices_GuestId1",
                table: "Invoices",
                column: "GuestId1");

            migrationBuilder.CreateIndex(
                name: "IX_Invoices_ReservationId1",
                table: "Invoices",
                column: "ReservationId1");

            migrationBuilder.CreateIndex(
                name: "IX_HouseKeepings_EmployeeId1",
                table: "HouseKeepings",
                column: "EmployeeId1");

            migrationBuilder.CreateIndex(
                name: "IX_HouseKeepings_RoomId1",
                table: "HouseKeepings",
                column: "RoomId1");

            migrationBuilder.CreateIndex(
                name: "IX_GuestServiceUsages_GuestId1",
                table: "GuestServiceUsages",
                column: "GuestId1");

            migrationBuilder.CreateIndex(
                name: "IX_GuestServiceUsages_ReservationId1",
                table: "GuestServiceUsages",
                column: "ReservationId1");

            migrationBuilder.CreateIndex(
                name: "IX_GuestServiceUsages_ServiceId1",
                table: "GuestServiceUsages",
                column: "ServiceId1");

            migrationBuilder.CreateIndex(
                name: "IX_Employees_DepartmentId1",
                table: "Employees",
                column: "DepartmentId1");

            migrationBuilder.CreateIndex(
                name: "IX_Employees_PositionId1",
                table: "Employees",
                column: "PositionId1");

            migrationBuilder.AddForeignKey(
                name: "FK_Employees_Departments_DepartmentId1",
                table: "Employees",
                column: "DepartmentId1",
                principalTable: "Departments",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Employees_Positions_PositionId1",
                table: "Employees",
                column: "PositionId1",
                principalTable: "Positions",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_GuestServiceUsages_Guests_GuestId1",
                table: "GuestServiceUsages",
                column: "GuestId1",
                principalTable: "Guests",
                principalColumn: "GuestId",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_GuestServiceUsages_Reservations_ReservationId1",
                table: "GuestServiceUsages",
                column: "ReservationId1",
                principalTable: "Reservations",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_GuestServiceUsages_Services_ServiceId1",
                table: "GuestServiceUsages",
                column: "ServiceId1",
                principalTable: "Services",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_HouseKeepings_Employees_EmployeeId1",
                table: "HouseKeepings",
                column: "EmployeeId1",
                principalTable: "Employees",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_HouseKeepings_Rooms_RoomId1",
                table: "HouseKeepings",
                column: "RoomId1",
                principalTable: "Rooms",
                principalColumn: "RoomId",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Invoices_Guests_GuestId1",
                table: "Invoices",
                column: "GuestId1",
                principalTable: "Guests",
                principalColumn: "GuestId",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Invoices_Reservations_ReservationId1",
                table: "Invoices",
                column: "ReservationId1",
                principalTable: "Reservations",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_MaintenanceRequests_Employees_ReportedEmployeeId1",
                table: "MaintenanceRequests",
                column: "ReportedEmployeeId1",
                principalTable: "Employees",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_MaintenanceRequests_Rooms_RoomId1",
                table: "MaintenanceRequests",
                column: "RoomId1",
                principalTable: "Rooms",
                principalColumn: "RoomId");

            migrationBuilder.AddForeignKey(
                name: "FK_MenuItems_MenuCategories_MenuCategoryId1",
                table: "MenuItems",
                column: "MenuCategoryId1",
                principalTable: "MenuCategories",
                principalColumn: "MenuCategoryId",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_OrderItems_Orders_OrderId1",
                table: "OrderItems",
                column: "OrderId1",
                principalTable: "Orders",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Orders_Guests_GuestId1",
                table: "Orders",
                column: "GuestId1",
                principalTable: "Guests",
                principalColumn: "GuestId");

            migrationBuilder.AddForeignKey(
                name: "FK_Orders_RestaurantTables_TableId1",
                table: "Orders",
                column: "TableId1",
                principalTable: "RestaurantTables",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Payments_Invoices_InvoiceId1",
                table: "Payments",
                column: "InvoiceId1",
                principalTable: "Invoices",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Payments_Orders_OrderId1",
                table: "Payments",
                column: "OrderId1",
                principalTable: "Orders",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Reservations_Guests_GuestId1",
                table: "Reservations",
                column: "GuestId1",
                principalTable: "Guests",
                principalColumn: "GuestId",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Reservations_Rooms_RoomId1",
                table: "Reservations",
                column: "RoomId1",
                principalTable: "Rooms",
                principalColumn: "RoomId",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Restaurants_Hotels_HotelId1",
                table: "Restaurants",
                column: "HotelId1",
                principalTable: "Hotels",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_RestaurantTables_Restaurants_RestaurantId1",
                table: "RestaurantTables",
                column: "RestaurantId1",
                principalTable: "Restaurants",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Rooms_Hotels_HotelId1",
                table: "Rooms",
                column: "HotelId1",
                principalTable: "Hotels",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Rooms_RoomTypes_RoomTypeId1",
                table: "Rooms",
                column: "RoomTypeId1",
                principalTable: "RoomTypes",
                principalColumn: "RoomTypeId",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Employees_Departments_DepartmentId1",
                table: "Employees");

            migrationBuilder.DropForeignKey(
                name: "FK_Employees_Positions_PositionId1",
                table: "Employees");

            migrationBuilder.DropForeignKey(
                name: "FK_GuestServiceUsages_Guests_GuestId1",
                table: "GuestServiceUsages");

            migrationBuilder.DropForeignKey(
                name: "FK_GuestServiceUsages_Reservations_ReservationId1",
                table: "GuestServiceUsages");

            migrationBuilder.DropForeignKey(
                name: "FK_GuestServiceUsages_Services_ServiceId1",
                table: "GuestServiceUsages");

            migrationBuilder.DropForeignKey(
                name: "FK_HouseKeepings_Employees_EmployeeId1",
                table: "HouseKeepings");

            migrationBuilder.DropForeignKey(
                name: "FK_HouseKeepings_Rooms_RoomId1",
                table: "HouseKeepings");

            migrationBuilder.DropForeignKey(
                name: "FK_Invoices_Guests_GuestId1",
                table: "Invoices");

            migrationBuilder.DropForeignKey(
                name: "FK_Invoices_Reservations_ReservationId1",
                table: "Invoices");

            migrationBuilder.DropForeignKey(
                name: "FK_MaintenanceRequests_Employees_ReportedEmployeeId1",
                table: "MaintenanceRequests");

            migrationBuilder.DropForeignKey(
                name: "FK_MaintenanceRequests_Rooms_RoomId1",
                table: "MaintenanceRequests");

            migrationBuilder.DropForeignKey(
                name: "FK_MenuItems_MenuCategories_MenuCategoryId1",
                table: "MenuItems");

            migrationBuilder.DropForeignKey(
                name: "FK_OrderItems_Orders_OrderId1",
                table: "OrderItems");

            migrationBuilder.DropForeignKey(
                name: "FK_Orders_Guests_GuestId1",
                table: "Orders");

            migrationBuilder.DropForeignKey(
                name: "FK_Orders_RestaurantTables_TableId1",
                table: "Orders");

            migrationBuilder.DropForeignKey(
                name: "FK_Payments_Invoices_InvoiceId1",
                table: "Payments");

            migrationBuilder.DropForeignKey(
                name: "FK_Payments_Orders_OrderId1",
                table: "Payments");

            migrationBuilder.DropForeignKey(
                name: "FK_Reservations_Guests_GuestId1",
                table: "Reservations");

            migrationBuilder.DropForeignKey(
                name: "FK_Reservations_Rooms_RoomId1",
                table: "Reservations");

            migrationBuilder.DropForeignKey(
                name: "FK_Restaurants_Hotels_HotelId1",
                table: "Restaurants");

            migrationBuilder.DropForeignKey(
                name: "FK_RestaurantTables_Restaurants_RestaurantId1",
                table: "RestaurantTables");

            migrationBuilder.DropForeignKey(
                name: "FK_Rooms_Hotels_HotelId1",
                table: "Rooms");

            migrationBuilder.DropForeignKey(
                name: "FK_Rooms_RoomTypes_RoomTypeId1",
                table: "Rooms");

            migrationBuilder.DropIndex(
                name: "IX_Rooms_HotelId1",
                table: "Rooms");

            migrationBuilder.DropIndex(
                name: "IX_Rooms_RoomTypeId1",
                table: "Rooms");

            migrationBuilder.DropIndex(
                name: "IX_RestaurantTables_RestaurantId1",
                table: "RestaurantTables");

            migrationBuilder.DropIndex(
                name: "IX_Restaurants_HotelId1",
                table: "Restaurants");

            migrationBuilder.DropIndex(
                name: "IX_Reservations_GuestId1",
                table: "Reservations");

            migrationBuilder.DropIndex(
                name: "IX_Reservations_RoomId1",
                table: "Reservations");

            migrationBuilder.DropIndex(
                name: "IX_Payments_InvoiceId1",
                table: "Payments");

            migrationBuilder.DropIndex(
                name: "IX_Payments_OrderId1",
                table: "Payments");

            migrationBuilder.DropIndex(
                name: "IX_Orders_GuestId1",
                table: "Orders");

            migrationBuilder.DropIndex(
                name: "IX_Orders_TableId1",
                table: "Orders");

            migrationBuilder.DropIndex(
                name: "IX_OrderItems_OrderId1",
                table: "OrderItems");

            migrationBuilder.DropIndex(
                name: "IX_MenuItems_MenuCategoryId1",
                table: "MenuItems");

            migrationBuilder.DropIndex(
                name: "IX_MaintenanceRequests_ReportedEmployeeId1",
                table: "MaintenanceRequests");

            migrationBuilder.DropIndex(
                name: "IX_MaintenanceRequests_RoomId1",
                table: "MaintenanceRequests");

            migrationBuilder.DropIndex(
                name: "IX_Invoices_GuestId1",
                table: "Invoices");

            migrationBuilder.DropIndex(
                name: "IX_Invoices_ReservationId1",
                table: "Invoices");

            migrationBuilder.DropIndex(
                name: "IX_HouseKeepings_EmployeeId1",
                table: "HouseKeepings");

            migrationBuilder.DropIndex(
                name: "IX_HouseKeepings_RoomId1",
                table: "HouseKeepings");

            migrationBuilder.DropIndex(
                name: "IX_GuestServiceUsages_GuestId1",
                table: "GuestServiceUsages");

            migrationBuilder.DropIndex(
                name: "IX_GuestServiceUsages_ReservationId1",
                table: "GuestServiceUsages");

            migrationBuilder.DropIndex(
                name: "IX_GuestServiceUsages_ServiceId1",
                table: "GuestServiceUsages");

            migrationBuilder.DropIndex(
                name: "IX_Employees_DepartmentId1",
                table: "Employees");

            migrationBuilder.DropIndex(
                name: "IX_Employees_PositionId1",
                table: "Employees");

            migrationBuilder.DropColumn(
                name: "HotelId1",
                table: "Rooms");

            migrationBuilder.DropColumn(
                name: "RoomTypeId1",
                table: "Rooms");

            migrationBuilder.DropColumn(
                name: "RestaurantId1",
                table: "RestaurantTables");

            migrationBuilder.DropColumn(
                name: "HotelId1",
                table: "Restaurants");

            migrationBuilder.DropColumn(
                name: "GuestId1",
                table: "Reservations");

            migrationBuilder.DropColumn(
                name: "RoomId1",
                table: "Reservations");

            migrationBuilder.DropColumn(
                name: "InvoiceId1",
                table: "Payments");

            migrationBuilder.DropColumn(
                name: "OrderId1",
                table: "Payments");

            migrationBuilder.DropColumn(
                name: "GuestId1",
                table: "Orders");

            migrationBuilder.DropColumn(
                name: "TableId1",
                table: "Orders");

            migrationBuilder.DropColumn(
                name: "OrderId1",
                table: "OrderItems");

            migrationBuilder.DropColumn(
                name: "MenuCategoryId1",
                table: "MenuItems");

            migrationBuilder.DropColumn(
                name: "ReportedEmployeeId1",
                table: "MaintenanceRequests");

            migrationBuilder.DropColumn(
                name: "RoomId1",
                table: "MaintenanceRequests");

            migrationBuilder.DropColumn(
                name: "GuestId1",
                table: "Invoices");

            migrationBuilder.DropColumn(
                name: "ReservationId1",
                table: "Invoices");

            migrationBuilder.DropColumn(
                name: "EmployeeId1",
                table: "HouseKeepings");

            migrationBuilder.DropColumn(
                name: "RoomId1",
                table: "HouseKeepings");

            migrationBuilder.DropColumn(
                name: "GuestId1",
                table: "GuestServiceUsages");

            migrationBuilder.DropColumn(
                name: "ReservationId1",
                table: "GuestServiceUsages");

            migrationBuilder.DropColumn(
                name: "ServiceId1",
                table: "GuestServiceUsages");

            migrationBuilder.DropColumn(
                name: "DepartmentId1",
                table: "Employees");

            migrationBuilder.DropColumn(
                name: "PositionId1",
                table: "Employees");

            migrationBuilder.AddColumn<string>(
                name: "ImageUrl",
                table: "Rooms",
                type: "text",
                nullable: true);
        }
    }
}

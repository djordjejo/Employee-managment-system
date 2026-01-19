using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace employee_management_system_b.Migrations
{
    /// <inheritdoc />
    public partial class Changeprojectnametotitle : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            //migrationBuilder.DropColumn(
            //    name: "AllocationPercentage",
            //    table: "EmployeeProjects");

            //migrationBuilder.DropColumn(
            //    name: "EndDate",
            //    table: "EmployeeProjects");

            //migrationBuilder.DropColumn(
            //    name: "StartDate",
            //    table: "EmployeeProjects");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "AllocationPercentage",
                table: "EmployeeProjects",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<DateTime>(
                name: "EndDate",
                table: "EmployeeProjects",
                type: "datetime2",
                nullable: true);

            migrationBuilder.AddColumn<DateTime>(
                name: "StartDate",
                table: "EmployeeProjects",
                type: "datetime2",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));
        }
    }
}

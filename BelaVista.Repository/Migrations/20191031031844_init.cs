using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace BelaVista.Repository.Migrations
{
    public partial class init : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Complaint",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    CondominiumId = table.Column<int>(nullable: false),
                    Description = table.Column<string>(nullable: true),
                    IsResolved = table.Column<bool>(nullable: false),
                    CreateDate = table.Column<DateTime>(nullable: false),
                    OccurrenceDate = table.Column<DateTime>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Complaint", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Condominium",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    Name = table.Column<string>(nullable: true),
                    Email = table.Column<string>(nullable: true),
                    Cpf = table.Column<string>(nullable: true),
                    Rg = table.Column<string>(nullable: true),
                    Phone = table.Column<string>(nullable: true),
                    ContactPhone = table.Column<string>(nullable: true),
                    Active = table.Column<bool>(nullable: false),
                    Password = table.Column<string>(nullable: true),
                    CreateDate = table.Column<DateTime>(nullable: false),
                    UpdateDate = table.Column<DateTime>(nullable: false),
                    Ap = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Condominium", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Meeting",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    CondominiunId = table.Column<int>(nullable: false),
                    Description = table.Column<string>(nullable: true),
                    DocAta = table.Column<byte[]>(nullable: true),
                    IsCancel = table.Column<bool>(nullable: false),
                    CreateDate = table.Column<DateTime>(nullable: false),
                    UpdateDate = table.Column<DateTime>(nullable: false),
                    ScheduleDate = table.Column<DateTime>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Meeting", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "RoleCondominiun",
                columns: table => new
                {
                    RoleId = table.Column<int>(nullable: false),
                    CondominiumId = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_RoleCondominiun", x => new { x.RoleId, x.CondominiumId });
                });

            migrationBuilder.CreateTable(
                name: "Roles",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    Description = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Roles", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "ScheduleStatus",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    Description = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ScheduleStatus", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "ScheduleType",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    Description = table.Column<string>(nullable: true),
                    CreateDate = table.Column<DateTime>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ScheduleType", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Scheduling",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    ScheduleTypeId = table.Column<int>(nullable: false),
                    CondominiumId = table.Column<int>(nullable: false),
                    ScheduleStatusId = table.Column<int>(nullable: false),
                    CreateDate = table.Column<DateTime>(nullable: false),
                    ScheduleDate = table.Column<DateTime>(nullable: false),
                    Description = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Scheduling", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Warning",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    CondominiumId = table.Column<int>(nullable: false),
                    Description = table.Column<string>(nullable: true),
                    ScheduleDate = table.Column<DateTime>(nullable: false),
                    CreateDate = table.Column<DateTime>(nullable: false),
                    UpdateDate = table.Column<DateTime>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Warning", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Visitant",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    CondominiumId = table.Column<int>(nullable: false),
                    Name = table.Column<string>(nullable: true),
                    Cpf = table.Column<string>(nullable: true),
                    Phone = table.Column<string>(nullable: true),
                    CreateDate = table.Column<DateTime>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Visitant", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Visitant_Condominium_CondominiumId",
                        column: x => x.CondominiumId,
                        principalTable: "Condominium",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Visitant_CondominiumId",
                table: "Visitant",
                column: "CondominiumId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Complaint");

            migrationBuilder.DropTable(
                name: "Meeting");

            migrationBuilder.DropTable(
                name: "RoleCondominiun");

            migrationBuilder.DropTable(
                name: "Roles");

            migrationBuilder.DropTable(
                name: "ScheduleStatus");

            migrationBuilder.DropTable(
                name: "ScheduleType");

            migrationBuilder.DropTable(
                name: "Scheduling");

            migrationBuilder.DropTable(
                name: "Visitant");

            migrationBuilder.DropTable(
                name: "Warning");

            migrationBuilder.DropTable(
                name: "Condominium");
        }
    }
}

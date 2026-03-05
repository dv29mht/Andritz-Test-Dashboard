using Microsoft.EntityFrameworkCore;
using SupplierApi.Data;
using SupplierApi.Models;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddCors(options =>
{
    options.AddPolicy("ViteDev", policy =>
    {
        policy
            .WithOrigins("http://localhost:5173", "https://dv29mht.github.io")
            .AllowAnyHeader()
            .AllowAnyMethod();
    });
});

builder.Services.AddDbContext<SupplierDb>(opt =>
    opt.UseSqlite("DataSource=file::memory:?cache=shared"));

var app = builder.Build();

// This ensures the database and tables are created when the app starts
using (var scope = app.Services.CreateScope())
{
    var db = scope.ServiceProvider.GetRequiredService<SupplierDb>();
    db.Database.EnsureCreated();
}

using (var scope = app.Services.CreateScope())
{
    var db = scope.ServiceProvider.GetRequiredService<SupplierDb>();
    db.Database.EnsureCreated();
}

app.UseCors("ViteDev");

app.MapGet("/api/suppliers", async (SupplierDb db) =>
    await db.Suppliers
            .OrderByDescending(s => s.RegistrationDate)
            .ToListAsync())
            .RequireCors("ViteDev");

app.MapPost("/api/suppliers", async (Supplier supplier, SupplierDb db) =>
{
    supplier.Id = 0;
    db.Suppliers.Add(supplier);
    await db.SaveChangesAsync();
    return Results.Created($"/api/suppliers/{supplier.Id}", supplier);
})
.RequireCors("ViteDev");

app.Run();

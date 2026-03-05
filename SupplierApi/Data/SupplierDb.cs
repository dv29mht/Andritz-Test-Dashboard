using Microsoft.EntityFrameworkCore;
using SupplierApi.Models;

namespace SupplierApi.Data;

public class SupplierDb : DbContext
{
    public SupplierDb(DbContextOptions<SupplierDb> options) : base(options) { }

    public DbSet<Supplier> Suppliers => Set<Supplier>();
}

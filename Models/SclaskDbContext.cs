using Microsoft.EntityFrameworkCore;

namespace sclask.Models
{
  public class SclaskDbContext : DbContext
  {
    public SclaskDbContext(DbContextOptions<SclaskDbContext> options) : base(options)
    {}

    protected override void OnModelCreating (ModelBuilder builder)
    {
      builder.Entity<Player>()
        .HasIndex(p => p.EmailAddress)
        .IsUnique();
    }

    public DbSet<Player> Players { get; set; }
    public DbSet<Game> Games { get; set; }
  }
}
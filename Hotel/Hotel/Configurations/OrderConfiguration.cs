using System.Collections.Immutable;
using Hotel.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
namespace Hotel.Configurations;

public class OrderConfiguration : IEntityTypeConfiguration<Order>
{
    public void Configure(EntityTypeBuilder<Order> builder)
    {
    builder.HasKey(o => o.Id);

    builder.HasOne(x => x.Guest)
        .WithMany()
        .HasForeignKey(o => o.GuestId)
        .OnDelete(DeleteBehavior.SetNull);
    
    builder.HasOne(x => x.Table)
        .WithMany()
        .HasForeignKey(o => o.TableId)
        .OnDelete(DeleteBehavior.SetNull);

    builder.Property(o => o.OrderType)
        .HasMaxLength(100);
    
    builder.Property(o => o.Status)
        .HasMaxLength(100);
    }
}
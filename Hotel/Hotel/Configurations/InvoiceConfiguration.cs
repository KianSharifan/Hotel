using System.Collections.Immutable;
using Hotel.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
namespace Hotel.Configurations;

public class InvoiceConfiguration : IEntityTypeConfiguration<Invoice>
{
    public void Configure(EntityTypeBuilder<Invoice> builder)
    {
        builder.HasKey(x => x.Id);

        builder.HasOne(x => x.Guest)
            .WithOne()
            .HasForeignKey<Invoice>(x => x.GuestId)
            .OnDelete(DeleteBehavior.Cascade);
        
        builder.HasOne(x => x.Reservation)
            .WithOne()
            .HasForeignKey<Invoice>(x => x.ReservationId)
            .OnDelete(DeleteBehavior.Cascade);

        builder.Property(x => x.Status)
            .HasMaxLength(100);
    }
}
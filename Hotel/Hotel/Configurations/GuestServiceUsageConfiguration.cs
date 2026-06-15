using System.Collections.Immutable;
using Hotel.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
namespace Hotel.Configurations;

public class GuestServiceUsageConfiguration : IEntityTypeConfiguration<GuestServiceUsage>
{
    public void Configure(EntityTypeBuilder<GuestServiceUsage> builder)
    {
        builder.HasKey(x => x.Id);
        
        builder.HasOne(x => x.Guest)
            .WithMany()
            .HasForeignKey(x => x.GuestId)
            .OnDelete(DeleteBehavior.Cascade);
        
        builder.HasOne(x => x.Service)
            .WithMany()
            .HasForeignKey(x => x.ServiceId)
            .OnDelete(DeleteBehavior.Cascade);
        
        builder.HasOne(x => x.Reservation)
            .WithMany()
            .HasForeignKey(x => x.ReservationId)
            .OnDelete(DeleteBehavior.Cascade);
    }
}
using Hotel.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Hotel.Configurations;

public class ReservationConfiguration : IEntityTypeConfiguration<Reservation>
{
    public void Configure(EntityTypeBuilder<Reservation> builder)
    {
        builder.HasKey(r => r.Id);
        
        builder.HasOne<Guest>()
            .WithMany()
            .HasForeignKey(r => r.GuestId)
            .OnDelete(DeleteBehavior.Cascade);
        
        builder.HasOne<Room>()
            .WithOne()
            .HasForeignKey<Reservation>(r => r.RoomId)
            .OnDelete(DeleteBehavior.Cascade);

        builder.Property(r => r.Status)
            .HasMaxLength(100);
        
        builder.Property(r => r.SpecialRequest)
            .HasMaxLength(200);
    } 
}
using System.Collections.Immutable;
using Hotel.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
namespace Hotel.Configurations;

public class RoomAmenityConfiguration : IEntityTypeConfiguration<RoomAmenities>
{
    public void Configure(EntityTypeBuilder<RoomAmenities> builder)
    {
        builder.HasKey(a => new{a.RoomId , a.AmenityId});
        
        builder.HasOne<Room>()
            .WithMany()
            .HasForeignKey(r => r.RoomId)
            .OnDelete(DeleteBehavior.Cascade);
        
        builder.HasOne<Amenity>()
            .WithMany()
            .HasForeignKey(r => r.AmenityId)
            .OnDelete(DeleteBehavior.Cascade);
    }
}
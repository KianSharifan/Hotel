using Hotel.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
namespace Hotel.Configurations;

public class RoomAmenityConfiguration : IEntityTypeConfiguration<RoomAmenities>
{
    public void Configure(EntityTypeBuilder<RoomAmenities> builder)
    {
        builder.HasKey(a => new{a.RoomTypeId , a.AmenityId});
        
        builder.HasOne(r => r.RoomType)
            .WithMany()
            .HasForeignKey(r => r.RoomTypeId)
            .OnDelete(DeleteBehavior.Cascade);
        
        builder.HasOne(a => a.Amenity)
            .WithMany()
            .HasForeignKey(r => r.AmenityId)
            .OnDelete(DeleteBehavior.Cascade);
    }
}
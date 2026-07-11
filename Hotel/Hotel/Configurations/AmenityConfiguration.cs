using Hotel.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
namespace Hotel.Configurations;

public class AmenityConfiguration : IEntityTypeConfiguration<Amenity>
{
    public void Configure(EntityTypeBuilder<Amenity> builder)
    {
        builder.HasKey(a => a.Id);
        
        builder.Property(a => a.Name)
            .HasMaxLength(100)
            .IsRequired();
    }
}
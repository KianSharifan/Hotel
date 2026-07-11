using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
namespace Hotel.Configurations;

public class HotelConfiguration : IEntityTypeConfiguration<Models.Hotel>
{
    public void Configure(EntityTypeBuilder<Models.Hotel> builder)
    {
        builder.HasKey(x => x.Id);

        builder.Property(x => x.Name)
            .IsRequired()
            .HasMaxLength(100);

        builder.Property(x => x.Address)
            .IsRequired()
            .HasMaxLength(300);
        
        builder.Property(x => x.City)
            .IsRequired()
            .HasMaxLength(100);
        
        builder.Property(x => x.Country)
            .IsRequired()
            .HasMaxLength(100);

        builder.Property(x => x.Phone)
            .IsRequired()
            .HasMaxLength(15);

        builder.HasIndex(x => x.Phone)
            .IsUnique();
        
        builder.Property(x => x.Email)
            .IsRequired()
            .HasMaxLength(100);

        builder.HasIndex(x => x.Email)
            .IsUnique(); 
    }
}
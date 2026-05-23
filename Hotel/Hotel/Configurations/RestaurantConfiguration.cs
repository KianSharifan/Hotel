using Hotel.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Hotel.Configurations;

public class RestaurantConfiguratio : IEntityTypeConfiguration<Restaurant>
{
    public void Configure(EntityTypeBuilder<Restaurant> builder)
    {
        builder.HasKey(r => r.Id);
        
        builder.HasOne<Models.Hotel>()
            .WithMany()
            .HasForeignKey(r => r.HotelId)
            .OnDelete(DeleteBehavior.Cascade);

        builder.Property(r => r.Name)
            .HasMaxLength(50);

        builder.Property(r => r.Address)
            .HasMaxLength(150);
    } 
}
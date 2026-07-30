namespace Hotel.Configurations;
using Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

public class RoomTypeConfiguration : IEntityTypeConfiguration<RoomType>
{
    public void Configure(EntityTypeBuilder<RoomType> builder)
    {
        builder.HasKey(rt => rt.RoomTypeId);
        
        builder.Property(rt => rt.Name)
            .HasMaxLength(100)
            .IsRequired();
        
        builder.Property(rt => rt.Description)
            .HasMaxLength(600);
        
        builder.Property(rt => rt.PicUrl)
            .HasMaxLength(500);
    }
}
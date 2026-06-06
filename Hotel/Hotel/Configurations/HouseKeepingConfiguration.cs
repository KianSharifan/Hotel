using System.Collections.Immutable;
using Hotel.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
namespace Hotel.Configurations;

public class HouseKeepingConfiguration : IEntityTypeConfiguration<HouseKeeping>
{
    public void Configure(EntityTypeBuilder<HouseKeeping> builder)
    {
        builder.HasKey(x => x.Id);
        
        builder.HasOne(x => x.Room)
            .WithMany()
            .HasForeignKey(x => x.RoomId)
            .OnDelete(DeleteBehavior.Cascade);
        
        builder.HasOne(x => x.Employee)
            .WithMany()
            .HasForeignKey(x => x.EmployeeId)
            .OnDelete(DeleteBehavior.Cascade);

        builder.Property(x => x.Status)
            .HasMaxLength(100);
        
        builder.Property(x => x.Notes)
            .HasMaxLength(200);
    }
}
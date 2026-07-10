using Hotel.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
namespace Hotel.Configurations;

public class MaintenanceRequestConfiguration : IEntityTypeConfiguration<MaintenanceRequest>
{
    public void Configure(EntityTypeBuilder<MaintenanceRequest> builder)
    {
        builder.HasKey(m => m.Id);

        builder.HasOne(x => x.Room)
            .WithMany()
            .HasForeignKey(m => m.RoomId)
            .OnDelete(DeleteBehavior.Cascade);
        
        builder.HasOne(x => x.ReportedEmployee)
            .WithMany()
            .HasForeignKey(m => m.ReportedEmployeeId)
            .OnDelete(DeleteBehavior.SetNull);

        builder.Property(m => m.Description)
            .HasMaxLength(500);
        
        builder.Property(m => m.Priority)
            .HasMaxLength(100);
        
        builder.Property(m => m.Status)
            .HasMaxLength(100);
    }
}
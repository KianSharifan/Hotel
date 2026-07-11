using Hotel.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
namespace Hotel.Configurations;

public class ShiftConfiguration : IEntityTypeConfiguration<Shift>
{
    public void Configure(EntityTypeBuilder<Shift> builder)
    {
        builder.HasKey(a => a.Id);
        
        builder.Property(a => a.Day)
            .IsRequired()
            .HasMaxLength(15);
    }
}
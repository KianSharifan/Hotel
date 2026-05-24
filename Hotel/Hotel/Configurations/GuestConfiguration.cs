using System.Collections.Immutable;
using Hotel.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
namespace Hotel.Configurations;

public class GuestConfiguration : IEntityTypeConfiguration<Guest>
{
    public void Configure(EntityTypeBuilder<Guest> builder)
    {
        builder.HasKey(x => x.GuestId);

        builder.Property(x => x.PassportNumber)
            .HasMaxLength(15);
        
        builder.Property(x => x.Nationality)
            .HasMaxLength(30);
    }
}
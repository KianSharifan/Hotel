namespace Hotel.Configurations;
using Hotel.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

public class TableReservationConfiguration : IEntityTypeConfiguration<TableReservation>
{
    public void Configure(EntityTypeBuilder<TableReservation> builder)
    {
        builder.HasKey(r => new{r.Time,r.TableId});
        
        builder.HasOne(x => x.Table)
            .WithMany()
            .HasForeignKey(x => x.TableId)
            .OnDelete(DeleteBehavior.Cascade);
    }
}
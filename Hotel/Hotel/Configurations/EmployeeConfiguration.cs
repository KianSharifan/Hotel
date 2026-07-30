using Hotel.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
namespace Hotel.Configurations;

public class EmployeeConfiguration : IEntityTypeConfiguration<Employee>
{
    public void Configure(EntityTypeBuilder<Employee> builder)
    {
        builder.HasKey(e => e.Id);
        
        builder.HasOne(e => e.Position)
            .WithMany()
            .HasForeignKey(p => p.PositionId)
            .OnDelete(DeleteBehavior.Restrict);
        
        builder.HasOne(e => e.Department)
            .WithMany()
            .HasForeignKey(e => e.DepartmentId)
            .OnDelete(DeleteBehavior.Cascade);
        
        builder.HasOne(e => e.User)
            .WithOne()
            .HasForeignKey<Employee>(x => x.Id)
            .OnDelete(DeleteBehavior.Cascade);
    }
}
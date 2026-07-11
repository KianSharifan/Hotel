namespace Hotel.Configurations;
using Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

public class UserConfiguration : IEntityTypeConfiguration<User>
{
    public void Configure(EntityTypeBuilder<User> builder)
    {
        builder.HasKey(u => u.Id); 
        
        builder.Property(u => u.Username)
        .IsRequired()
        .IsRequired()
        .HasMaxLength(50);
        
        builder.Property(u => u.Email)
        .HasMaxLength(150);
        
        builder.HasIndex(u => u.Email)
        .IsUnique();
        
        builder.Property(u => u.Phone)
        .HasMaxLength(15);

        builder.Property(u => u.PasswordHash)
            .HasMaxLength(256);
        
        builder.Property(u => u.FirstName)
            .HasMaxLength(20);
        
        builder.Property(u => u.LastName)
            .HasMaxLength(20);

        builder.HasOne(x => x.Role)
            .WithMany()
            .HasForeignKey(u => u.RoleId)
            .OnDelete(DeleteBehavior.Cascade);
        
        builder.ToTable(t =>
        {
            t.HasCheckConstraint(
                "CK_User_Email_AntiHack",
                "\"Email\" ~ '^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z][a-zA-Z]+$'"
            );
            t.HasCheckConstraint(
                "CK_User_Phone_OnlyNumbers",
                "\"Phone\" ~ '^[0-9]+$'"
            );
        });
    }
}
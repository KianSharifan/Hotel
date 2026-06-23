namespace Hotel.Mappers;
using Hotel.DTOs;
using Hotel.Models;

public static class UserMapper
{
    public static AdminUserDTO ToAdminDTO(this User user)
    {
        var output = new AdminUserDTO()
        {
            Id = user.Id,
            Email = user.Email,
            FirstName = user.FirstName,
            LastName = user.LastName,
            RoleId = user.RoleId,
            Phone = user.Phone,
            Username = user.Username,
            EmployeeId = user.EmployeeId,
            CreatedAt = user.CreatedAt
        };
        return output;
    }
    
    // public static U
}
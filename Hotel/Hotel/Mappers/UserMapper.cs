namespace Hotel.Mappers;
using DTOs;
using Models;

public static class UserMapper
{
    public static AdminUserDto ToAdminDto(this User user)
    {
        var output = new AdminUserDto()
        {
            Id = user.Id,
            Email = user.Email,
            FirstName = user.FirstName,
            LastName = user.LastName,
            RoleId = user.RoleId,
            Phone = user.Phone,
            Username = user.Username,
            CreatedAt = user.CreatedAt
        };
        return output;
    }
}
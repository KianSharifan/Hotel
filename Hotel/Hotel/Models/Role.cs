using System.ComponentModel.DataAnnotations;

namespace Hotel.Models;

public class Role
{
    public int RoleId { get; set; }
    [MaxLength(100)]
    public string? Name { get; set; }
}
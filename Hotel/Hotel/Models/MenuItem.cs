namespace Hotel.Models;

public class MenuItem
{
    public int Id { get; set; }
    public int MenuCategoryId { get; set; }
    public string? Name { get; set; }
    public string? Description { get; set; }
    public Double Price { get; set; }
}
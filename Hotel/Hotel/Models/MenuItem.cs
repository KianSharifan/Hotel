namespace Hotel.Models;

public class MenuItem
{
    public int Id { get; set; }
    public int MenuCategoryId { get; set; }
    public MenuCategory? MenuCategory { get; set; }
    public string? Name { get; set; }
    public string? Description { get; set; }
    private double _price;
    public double Price
    {
        get => _price;
        set
        {
            if (value < 0)
                throw new Exception();
            _price = value;
        }
    }
}
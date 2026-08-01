using Hotel.Models;
using Hotel.DTOs;
namespace Hotel.Interfaces;

public interface IHouseKeepingServices
{
    Task<HouseKeeping?> AssignHouseKeeping(HouseKeepingDto houseKeeping);
}
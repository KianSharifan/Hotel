namespace Hotel.Interfaces;
using Hotel.Models;
using Hotel.DTOs;

public interface IRoomServices
{
    Task<List<RoomType?>> AvailableRoomTypes(RoomSearchDto input);
    Task<Room?> FindAvailableRoom(RoomReservationDto input);
    Task<(int, int)> Reserve(RoomReservationDto input);
}
using Hotel.DTOs;
using Hotel.Models;

namespace Hotel.Mappers;

public static class MaintenanceRequestMapper
{
    public static MaintenanceRequestDto ToDto(this MaintenanceRequest maintenanceRequest)
    {
        var m = new MaintenanceRequestDto()
        {
            Id = maintenanceRequest.Id,
            RoomId = maintenanceRequest.RoomId,
            Description = maintenanceRequest.Description,
            ReportedEmployeeId = maintenanceRequest.ReportedEmployeeId,
            Priority = maintenanceRequest.Priority,
            Status = maintenanceRequest.Status,
            CreateDate = maintenanceRequest.CreatedDate,
            ModifyDate = maintenanceRequest.ModifiedDate
        };
        return m;
    }
}
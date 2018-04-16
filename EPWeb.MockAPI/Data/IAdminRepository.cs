using System.Collections.Generic;
using System.Threading.Tasks;
using EPWeb.MockAPI.Models;

namespace EPWeb.MockAPI.Data
{
    public interface IAdminRepository
    {
         string GetSystemVersionString();

         Task<ICollection<User>> GetNotAllowedUsers();

         void AllowUser(int id);
    }
}
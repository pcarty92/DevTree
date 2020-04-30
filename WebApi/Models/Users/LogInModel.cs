using System.ComponentModel.DataAnnotations;

namespace WebApi.Models.Users
{
    public class LogInModel
    {
        [Required]
        public string Username { get; set; }

        [Required]
        public string Password { get; set; }
    }
}

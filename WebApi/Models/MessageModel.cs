using System.ComponentModel.DataAnnotations;

namespace WebApi.Models
{
    public class MessageModel
    {
        [Required]
        public string Content { get; set; }

        [Required]
        public int UserIdReceiver { get; set; }
    }
}

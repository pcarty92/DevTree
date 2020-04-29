using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

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

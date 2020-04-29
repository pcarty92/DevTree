using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WebApi.Entities
{
    public class Message
    {
        public int Id { get; set; }
        public string Content { get; set; }
        public int UserIdSender { get; set; }
        public int UserIdReceiver { get; set; }
    }
}

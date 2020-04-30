namespace WebApi.Entities
{
    public class Message
    {
        public int Id { get; set; }
        public string Content { get; set; }
        public string UsernameSender { get; set; }
        public int UserIdSender { get; set; }
        public int UserIdReceiver { get; set; }
    }
}

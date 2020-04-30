namespace WebApi.Entities
{
    public class Job
    {
        public int Id { get; set; }
        public string JobName { get; set; }
        public string JobDescription { get; set; }
        public int Price { get; set; }
        public int UserId { get; set; }
        public string Username { get; set; }
    }
}

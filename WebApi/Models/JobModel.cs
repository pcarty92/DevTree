using System.ComponentModel.DataAnnotations;

namespace WebApi.Models
{
    public class JobModel
    {
        [Required]
        public string JobName { get; set; }

        [Required]
        public string JobDescription { get; set; }

        [Required]
        public int Price { get; set; }

    }
}

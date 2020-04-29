using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

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

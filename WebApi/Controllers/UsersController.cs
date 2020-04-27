using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using WebApi.Entities;
using WebApi.Helpers;
using WebApi.Models.Users;

namespace WebApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UsersController : ControllerBase
    {
        private UserService _userService;

        public UsersController(UserService userService)
        {
            _userService = userService;
        }

        [HttpGet]
        [Route("TestNum")]
        //GET: /api/Users/TestNum
        public IActionResult GetTestNum()
        {
            var result = _userService.Test();

            return Ok(result);
        }

        
        [HttpPost]
        [Route("Register")]
        //POST: /api/Users/Register
        public IActionResult Register(RegisterModel model)
        {
            User user = new User
            {
                Name = model.Name,
                Username = model.Username
            };

            if (_userService.CreateUser(user, model.Password))
                return Ok();
            else
                return BadRequest("Username already exists");

        }
        
    }
}
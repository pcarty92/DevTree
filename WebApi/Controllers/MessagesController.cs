using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using WebApi.Helpers;
using WebApi.Models;

namespace WebApi.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class MessagesController : ControllerBase
    {
        private MessageService _messageService;

        public MessagesController(MessageService messageService)
        {
            _messageService = messageService;
        }

        [HttpGet]
        [Route("GetUserMessages")]
        //GET: /api/Messages/GetUserMessages
        public IActionResult GetUserMessages()
        {
            var claimsIdentity = this.User.Identity as ClaimsIdentity;
            var userId = claimsIdentity.FindFirst(ClaimTypes.Name)?.Value;

            var messages = _messageService.GetUserMessages(userId);

            return Ok(messages);
        }

        [HttpPost]
        [Route("SendMessage")]
        //POST: /api/Messages/SendMessage
        public IActionResult SendMessage(MessageModel messageModel)
        {
            var claimsIdentity = this.User.Identity as ClaimsIdentity;
            var userId = claimsIdentity.FindFirst(ClaimTypes.Name)?.Value;

            if (_messageService.CreateMessage(messageModel, userId))
                return Ok();
            else
                return BadRequest("Message cannot be empty");
        }

        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            var claimsIdentity = this.User.Identity as ClaimsIdentity;
            var userId = claimsIdentity.FindFirst(ClaimTypes.Name)?.Value;

            if (_messageService.Delete(id, userId))
                return Ok();
            else
                return Unauthorized("Cannot delete message");
        }
    }
}
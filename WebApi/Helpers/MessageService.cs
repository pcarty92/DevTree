﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WebApi.Data;
using WebApi.Entities;
using WebApi.Models;

namespace WebApi.Helpers
{
    public class MessageService
    {
        private DataContext _context;

        public MessageService(DataContext context)
        {
            _context = context;
        }

        public IEnumerable<Message> GetUserMessages(string userId)
        {
            var messages = _context.Messages
                .Where(m => m.UserIdReceiver == int.Parse(userId));

            return messages;
        }

        public bool CreateMessage(MessageModel model, string senderId)
        {
            if (string.IsNullOrEmpty(model.Content))
                return false;

            Message message = new Message
            {
                Content = model.Content,
                UsernameSender = _context.Users.Find(int.Parse(senderId)).Username,
                UserIdSender = int.Parse(senderId),
                UserIdReceiver = model.UserIdReceiver
            };

            _context.Add(message);
            _context.SaveChanges();

            return true;
        }
    }
}

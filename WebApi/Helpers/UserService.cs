using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WebApi.Data;
using WebApi.Entities;

namespace WebApi.Helpers
{
    public class UserService
    {
        private DataContext _context;

        public UserService(DataContext context)
        {
            _context = context;
        }

        public int NumOfUsers()
        {
            return _context.Users.Count();
        }

        public User GetUserById(int id)
        {
            return _context.Users.Find(id);
        }

        public bool CreateUser(User user, string password)
        {
            if (_context.Users.Any(x => x.Username == user.Username))
                return false;

            byte[] passwordHash, passwordSalt;
            GeneratePasswordHash(password, out passwordHash, out passwordSalt);

            user.PasswordHash = passwordHash;
            user.PasswordSalt = passwordSalt;

            _context.Users.Add(user);
            _context.SaveChanges();

            return true;
        }

        public User Authenticate(string username, string password)
        {
            if (string.IsNullOrEmpty(username) || string.IsNullOrEmpty(password))
                return null;

            var user = _context.Users.SingleOrDefault(x => x.Username == username);

            if (user == null)
                return null;

            if (!VerifyPasswordHash(password, user.PasswordHash, user.PasswordSalt))
                return null;

            return user;
        }

        private static void GeneratePasswordHash(string password, out byte[] passwordHash, out byte[] passwordSalt)
        {
            using (var hmac = new System.Security.Cryptography.HMACSHA512())
            {
                passwordSalt = hmac.Key;
                passwordHash = hmac.ComputeHash(System.Text.Encoding.UTF8.GetBytes(password));
            }
        }

        private static bool VerifyPasswordHash(string password, byte[] storedHash, byte[] storedSalt)
        {
            if ((password == null) || (string.IsNullOrWhiteSpace(password)) ||
                (storedHash.Length != 64) || (storedSalt.Length != 128))
            {
                return false;
            }

            using (var hmac = new System.Security.Cryptography.HMACSHA512(storedSalt))
            {
                var computedHash = hmac.ComputeHash(System.Text.Encoding.UTF8.GetBytes(password));
                
                for (int i = 0; i < computedHash.Length; i++)
                {
                    if (computedHash[i] != storedHash[i])
                        return false;
                }
            }

            return true;
        }
    }
}

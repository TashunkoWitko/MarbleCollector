﻿namespace MarbleCollectorApi.ViewModels.Auth
{
    public class AuthResponse
    {
        public int Id { get; set; }
        public string Username { get; set; }

        public string Family { get; set; }
        public string Role { get; set; }
        public string Avatar { get; set; }
        public string Token { get; set; }
        public long TokenExpirationTime { get; set; }
    }
}

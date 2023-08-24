using Microsoft.AspNetCore.SignalR;

namespace ChatLeandroService
{
    public class Chat : Hub
    {
        public static List<Message> Messages;
        public Chat()
        {
            if(Messages== null) 
                Messages = new List<Message>();

        }

        public void NewMessage(string userName, string message)
        {
            Clients.All.SendAsync("newMessage", userName, message);
            Messages.Add(new Message()
            {
                Text = message,
                UserName = userName
            });
        }

        public void NewUser(string userName, string connectionId) 
        {
            Clients.Client(connectionId).SendAsync("previousMessages", Messages);
            Clients.All.SendAsync("newUser", userName);
        }
    }


    public class Message
    {
        public string UserName { get; set; }
        public string Text { get; set; }
    }
}

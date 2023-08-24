using ChatLeandroService.Model;
using Microsoft.AspNetCore.SignalR;
using System.Linq;

namespace ChatLeandroService
{
    public class Chat : Hub
    {
        public static IEnumerable<Message> Messages;
        public static IEnumerable<Message> AllMessages;
        public static List<User> Users;
        public static List<Room> Room;
        public static int roomId;

        public Chat()
        {
            if(Messages== null) 
                Messages = new List<Message>();
            if(AllMessages== null) 
                AllMessages = new List<Message>();
            if(Users== null)
                Users = new List<User>();
            if(Room == null)
                Room = new List<Room>();

        }

        public void NewMessage(string userName, string message, int roomId)
        {
            Clients.All.SendAsync("newMessage", userName, message,  roomId);
            Messages.Append(new Message()
            {
                Text = message,
                UserName = userName,
                RoomId = roomId
            });
        }

        public void NewUser(string userName, string connectionId) 
        {
            Clients.All.SendAsync("newUser", userName);
            Random rdm = new Random();
            Users.Add(new User()
            {
                Id = rdm.Next(),
                Name = userName,


            });
            
            Clients.All.SendAsync("previousUsers", Users);
            Clients.All.SendAsync("newUser", userName);
        }

        public void VerifyRoom(List<string> idUsers, string connectionId)
        {
            Clients.Client(connectionId).SendAsync("verifyRoom", idUsers);
            
            if(Room.Count == 0)
            {
                CreateRoom(idUsers);
            }
            var find = false;
            
            
            foreach (Room roomi in Room)
            {
                string sender = idUsers[0];
                string receiver = idUsers[1];
                if (roomi.PermissionUsers.Contains(sender) && roomi.PermissionUsers.Contains(receiver))
                {
                    find = true;
                    roomId = roomi.IdRoom;
                    Clients.Client(connectionId).SendAsync("previousRooms", roomId);
                    break;
                }
                   
            }

            if (find == false) 
            {
                roomId = CreateRoom(idUsers);
                Clients.Client(connectionId).SendAsync("previousRooms", roomId);

            }
            AllMessages = Messages.Where(x => x.RoomId == roomId);

            Clients.Client(connectionId).SendAsync("previousMessages", AllMessages);


        }


        public int CreateRoom(List<string> idUsers)
        {
            Random rdm = new Random();
            int rdmId = rdm.Next();

            Room.Add(new Room()
            {
                IdRoom = rdmId,
                PermissionUsers = idUsers

            }) ;

            return rdmId;
        }

    }


    
}

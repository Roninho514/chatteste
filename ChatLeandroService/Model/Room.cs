namespace ChatLeandroService.Model
{
    public class Room : Message
    {
        public int IdRoom { get; set; }
        public List<string> PermissionUsers { get; set; }
    }
}

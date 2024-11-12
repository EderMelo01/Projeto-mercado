public class User{
    public required String name;
    public required String senha;
    public bool logado;

    public bool bloqueado;
    public User(String name, String senha){
        this.name= name;
        this.senha= senha;
    }

}
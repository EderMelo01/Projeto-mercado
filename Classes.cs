public class User
{
    public int id;
    public string nome;
    public string senha;
    public bool logado;

    public bool bloqueado;
    public User(string nome, string senha)
    {
        this.nome = nome;
        this.senha = senha;
    }
    public User(string nome, string senha,bool logado, bool bloqueado)
    {
        this.nome = nome;
        this.senha = senha;
        this.logado= logado;
        this.bloqueado= bloqueado;
    }
}
public class Pessoa
{
    public required string nome;
    public required string senha;
}
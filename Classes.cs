using System.Text.Json.Serialization;

public class User
{
    public int id;
    public string nome;
    public string senha;
    public bool logado;
    public string data_nascimento;

    public bool bloqueado;
    public User(string nome, string senha, string data_nascimento)
    {
        this.nome = nome;
        this.senha = senha;
        this.data_nascimento= data_nascimento;
    }
    public User(string nome, string senha,bool logado, bool bloqueado, string data_nascimento)
    {
        this.nome = nome;
        this.senha = senha;
        this.logado= logado;
        this.bloqueado= bloqueado;
        this.data_nascimento= data_nascimento;
    }
    public User(){}
}
public class Pessoa
{
    [JsonInclude]
    public required string nome;
    [JsonInclude]
    public required string senha;
}
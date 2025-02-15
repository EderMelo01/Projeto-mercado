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
        this.data_nascimento = data_nascimento;
    }
    public User(int id, string nome, string senha, bool logado, bool bloqueado, string data_nascimento)
    {
        this.id = id;
        this.nome = nome;
        this.senha = senha;
        this.logado = logado;
        this.bloqueado = bloqueado;
        this.data_nascimento = data_nascimento;
    }
    public User() { }

    public static Dictionary<string, dynamic> userForMap(User user)
    {
        Dictionary<string, dynamic> dic = new Dictionary<string, dynamic>
        {
            { "id", user.id },
            { "nome", user.nome },
            { "senha", user.senha },
            { "logado", user.logado },
            { "bloqueado", user.bloqueado },
            { "data_nascimento", user.data_nascimento.ToString() }
        };
        return dic;
    }
}
public class Pessoa
{
    [JsonInclude]
    public required string nome;
    [JsonInclude]
    public required string senha;
}
public class Contas
{

   
    public int id_conta;
    [JsonInclude]
    public required string descricao;
    [JsonInclude]
    public Boolean Is_receber;
    [JsonInclude]
    public decimal valor;
    [JsonInclude]
    public int id_prestador;
    [JsonInclude]
    public DateTime data_emissao;
    [JsonInclude]
    public DateTime data_vencimento;
    public Prestador prestador;
    //[JsonInclude]
    //public int id_lote;
}
public class Prestador
{
    public int id_prestador;
    public string nome;

}

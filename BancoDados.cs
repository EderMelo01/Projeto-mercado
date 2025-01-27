using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using MySql.Data.MySqlClient;

namespace PrimeiroProjeto
{
    public class BancoDados
    {
        readonly string connectionString = "Server=localhost;Port=3306;Database=mercado;Uid=meu_usuario;Pwd=minha_senha;";
        private readonly MySqlConnection conn;

        private static BancoDados? instancia = null;
        private BancoDados()
        {
            conn = new MySqlConnection(connectionString);
            if (conn == null)
            {
                throw new Exception("erro");
            }
        }
        public static BancoDados Banco
        {
            get
            {
                instancia ??= new BancoDados();
                return instancia;
            }
        }
        public MySqlConnection Conexao()
        {

            conn.Open();
            return conn;
        }

    }
}
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using MySql.Data.MySqlClient;

namespace PrimeiroProjeto
{
    public class BancoDados
    {
        string connectionString = "Server=mysql;" +
        "Database=mercado;" +"Uid=[meu_usuario]@[mysql_container];" +"Pwd=minha_senha;";
        private readonly MySqlConnection conn;
        
        private static BancoDados instancia= null;
        private BancoDados(){
            conn= new MySqlConnection(connectionString);
            if(conn==null){
                throw new Exception("erro");
            }
            conn.Open();
        }
        public static BancoDados banco
        {
            get{
                if(instancia==null){
                    instancia= new BancoDados();
                }
                return instancia;
            }
        }
        public MySqlConnection conexao{
            get{
                return conexao;
            }
        }
    }
}
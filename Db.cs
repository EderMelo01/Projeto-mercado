using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Linq.Expressions;
using System.Threading.Tasks;
using MySql.Data.MySqlClient;
using MySql.EntityFrameworkCore.DataAnnotations;
using Org.BouncyCastle.Crypto.Digests;

namespace PrimeiroProjeto
{
    public class Db
    {
        public User GetUserByName(string name)
        {
            MySqlConnection conexao = BancoDados.Banco.Conexao();
            MySqlCommand selectCommand = new MySqlCommand($"SELECT * FROM USER WHERE(nome= '{name}' );", conexao);
            MySqlDataReader result = selectCommand.ExecuteReader();
            List<List<dynamic>> li=[];
            User user= new User();
            if(!result.HasRows){
                conexao.Close();
                return null;
            }
            while (result.Read())
                {
                    user.nome= result.GetString("nome");
                    user.senha= result.GetString("senha");
                    user.logado= result.GetInt32("logado")==0? false: true;
                    user.bloqueado= result.GetInt32("bloqueado")==0? false: true;
                    user.data_nascimento= result.GetDateTime("data_nascimento").ToString();
                }
            conexao.Close();
            return user;
        }
        public void Upgrade(string command)
        {
            MySqlConnection conexao = BancoDados.Banco.Conexao();
            MySqlCommand selectCommand = new MySqlCommand(command, conexao);
            MySqlDataReader resultado = selectCommand.ExecuteReader();
            conexao.Close();
        }
    }
}
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
        public List<User> GetQuery(string command)
        {
            MySqlConnection conexao = BancoDados.Banco.Conexao();
            MySqlCommand selectCommand = new MySqlCommand(command, conexao);
            MySqlDataReader result = selectCommand.ExecuteReader();
            List<List<dynamic>> li=[];
            List<User> users=[];
            while (result.Read())
                {
                    string nome= result.GetString("nome");
                    string senha= result.GetString("senha");
                    bool logado= result.GetInt32("logado")==0? false: true;
                    bool bloqueado= result.GetInt32("bloqueado")==0? false: true;
                    li.Add([nome, senha, logado, bloqueado]);
                }
            li.ForEach((result)=>{
                users.Add(new User(result[0], result[1], result[2], result[3]));
            });   //// fazer um for normal!!!!! e retornar a lista de user 
            
            conexao.Close();
            return users;
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
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Linq.Expressions;
using System.Threading.Tasks;
using Microsoft.VisualBasic;
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
            User user = new User();
            if (!result.HasRows)
            {
                conexao.Close();
                return null;
            }
            while (result.Read())
            {

                user.id = result.GetInt32("id");
                user.nome = result.GetString("nome");
                user.senha = result.GetString("senha");
                user.logado = result.GetInt32("logado") == 0 ? false : true;
                user.bloqueado = result.GetInt32("bloqueado") == 0 ? false : true;
                user.data_nascimento = result.GetDateTime("data_nascimento").ToString();
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
        public List<User> GetUsers()
        {
            MySqlConnection conexao = BancoDados.Banco.Conexao();
            MySqlCommand selectCommand = new MySqlCommand("SELECT * FROM USER;", conexao);
            MySqlDataReader result = selectCommand.ExecuteReader();
            List<User> users = new List<User>();
            while (result.Read())
            {
                User user = new User();
                user.id = result.GetInt32("id");
                user.nome = result.GetString("nome");
                user.logado = result.GetInt32("logado") == 0 ? false : true;
                user.bloqueado = result.GetInt32("bloqueado") == 0 ? false : true;
                user.data_nascimento = result.GetDateTime("data_nascimento").ToString();
                users.Add(user);
            }
            conexao.Close();
            return users;
        }
        public void InsertProduto(string caminho)
        {
            List<Dictionary<string, dynamic>> result = Produto.importacao(caminho);
            for (int i = 0; i < result.Count; i++)
            {
                MySqlConnection conexao = BancoDados.Banco.Conexao();
                MySqlCommand selectCommand = new MySqlCommand($"INSERT INTO PRODUTOS(nome, preco, perecivel) VALUES ('{result[i]["nome"]}', {result[i]["preco"]}, {result[i]["perecivel"]});", conexao);
                selectCommand.ExecuteReader();
                conexao.Close();
            }
        }
        public List<Dictionary<string, dynamic>> GetProdutos(){
            MySqlConnection conexao = BancoDados.Banco.Conexao();
            MySqlCommand selectCommand = new MySqlCommand($"SELECT * FROM PRODUTOS;", conexao);
            var result= selectCommand.ExecuteReader();
            List<Dictionary<string, dynamic>> produtos = new List<Dictionary<string, dynamic>>();
            while (result.Read())
            {
                Dictionary<string, dynamic> produto = new Dictionary<string, dynamic>(){
                    {"id", result.GetInt32("idProduto")},
                    {"nome", result.GetString("nome")},
                    {"preco", result.GetDouble("preco")},
                    {"perecivel", result.GetBoolean("perecivel")? "Sim": "Não"}
                };
                produtos.Add(produto);
            }
            conexao.Close();
            return produtos;
        }
    }
}
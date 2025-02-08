using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Linq.Expressions;
using System.Threading.Tasks;
using Microsoft.VisualBasic;
using MySql.Data.MySqlClient;
using MySql.EntityFrameworkCore.DataAnnotations;
using NHibernate.Linq.Functions;
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
        //////////////////////// Metodos do banco para os produtos
        /*public void InsertProduto(string caminho)
        {
            List<Dictionary<string, dynamic>> result = Produto.importacao(caminho);
            for (int i = 0; i < result.Count; i++)
            {
                MySqlConnection conexao = BancoDados.Banco.Conexao();
                MySqlCommand selectCommand = new MySqlCommand($"INSERT INTO PRODUTOS(nome, preco, perecivel) VALUES ('{result[i]["nome"]}', {result[i]["preco"]}, {result[i]["perecivel"]});", conexao);
                selectCommand.ExecuteReader();
                conexao.Close();
            }
        }*/
        public List<Dictionary<string, dynamic>> GetProdutos(string texto)
        {
            MySqlConnection conexao = BancoDados.Banco.Conexao();
            string query = "SELECT * FROM PRODUTOS " + texto;
            MySqlCommand selectCommand = new MySqlCommand(query, conexao);
            var result = selectCommand.ExecuteReader();
            List<Dictionary<string, dynamic>> produtos = [];
            while (result.Read())
            {

                Dictionary<string, dynamic> produto = new Dictionary<string, dynamic>(){
                    {"id_produto", result.GetInt32("id_produto")},
                    {"nome", result.GetString("nome")},
                    {"preco", result.GetDouble("preco")},
                    {"perecivel", result.GetBoolean("perecivel")? "Sim": "Não"},
                    {"status",result.GetBoolean("status")? 1: 0},
                    {"imagem", ""}
                };
                produtos.Add(produto);
            }
            conexao.Close();
            return produtos;
        }
        public void DeleteById(int id)
        {
            MySqlConnection conexao = BancoDados.Banco.Conexao();
            MySqlCommand selectCommand = new MySqlCommand($"DELETE FROM PRODUTOS WHERE id_produto= {id};", conexao);
            selectCommand.ExecuteReader();
            conexao.Close();

        }
        public void SetStatusById(int id, int novoStatus)
        {
            MySqlConnection conexao = BancoDados.Banco.Conexao();
            MySqlCommand selectCommand = new MySqlCommand($"UPDATE PRODUTOS SET status={novoStatus} WHERE id_produto= {id};", conexao);
            selectCommand.ExecuteReader();
            conexao.Close();
        }
        public bool InsertProduto(Produto produto)  
        {
            MySqlConnection conexao = BancoDados.Banco.Conexao();
            MySqlCommand selectCommand = new MySqlCommand($"INSERT INTO PRODUTOS(nome, preco,perecivel,status) VALUES ('{produto.nome}', {produto.preco.ToString().Replace(",", ".")},{produto.perecivel}, 1)", conexao);
            var results = selectCommand.ExecuteReader();
            conexao.Close();
            return results!=null? true: false;
        }
        public int AlterarProduto(Produto produto, int id)
        {
            MySqlConnection conexao = BancoDados.Banco.Conexao();
            MySqlCommand selectCommand = new MySqlCommand($"UPDATE PRODUTOS set nome='{produto.nome}', preco='{produto.preco.ToString().Replace(",", ".")}', perecivel='{produto.perecivel}' WHERE id_produto= {id} ", conexao);
            var result= selectCommand.ExecuteReader();
            conexao.Close();
            if(result!=null){
                return result.RecordsAffected;
            }
            return 0;  
        }
        
    }
}
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
    public class Financeiro
    {
        MySqlConnection conexao;
        public bool AdicionarContas(Contas conta)
        {
            try
            {
                conexao = BancoDados.Banco.Conexao();

                // Converte as datas para o formato correto do MySQL
                string dataVencimentoFormatada = conta.data_vencimento.ToString("yyyy-MM-dd");
                string dataEmissaoFormatada = conta.data_emissao.ToString("yyyy-MM-dd");

                // Query SQL corrigida
                string query = $@"
            INSERT INTO CONTAS (descricao, Is_receber, valor, id_prestador, data_emissao, data_vencimento, status)
            VALUES ('{conta.descricao}', {conta.Is_receber}, {conta.valor}, {conta.id_prestador}, '{dataEmissaoFormatada}', '{dataVencimentoFormatada}', 0)";

                MySqlCommand selectCommand = new MySqlCommand(query, conexao);
                selectCommand.ExecuteNonQuery(); // Correto para INSERT

                conexao.Close();
                return true;
            }
            catch (Exception ex)
            {
                Console.WriteLine("Erro ao adicionar conta: " + ex.Message);
                return false;
            }
            finally
            {
                if (conexao.State == ConnectionState.Open)
                    conexao.Close();
            }
        }
        public List<Dictionary<string, dynamic>> GetContas(int num)
        {
            conexao = BancoDados.Banco.Conexao();
            MySqlCommand selectCommand = new MySqlCommand($"SELECT * FROM CONTAS c INNER JOIN PRESTADOR p ON c.id_prestador= p.id_prestador WHERE Is_receber = {num};", conexao);
            List<Dictionary<string, dynamic>> contas = [];
            var result = selectCommand.ExecuteReader();
            while (result.Read())
            {
                Dictionary<string, dynamic> conta = new Dictionary<string, dynamic>(){
                    {"id", result.GetInt64("id_conta")},
                    { "descricao", result.GetString("descricao") },
                    { "pagador", result.GetString("nome")?? result.GetString("cpf")},
                    { "valor", result.GetDecimal("valor")},
                    { "data_emissao", result.GetDateTime("data_emissao") },
                    { "data_vencimento", result.GetDateTime("data_vencimento") },
                    {"status", result.GetInt32("status")}
                    
                };
                contas.Add(conta);
            }
            conexao.Close();
            return contas;
        }
        public void DeleteAcount(int num){
            conexao=BancoDados.Banco.Conexao();
            MySqlCommand selectCommand = new MySqlCommand($"DELETE FROM CONTAS WHERE id_conta= {num}",conexao);
            var result = selectCommand.ExecuteReader();
            conexao.Close();
        }
        public int UpdateAcount(Contas contas, int id)
        {
            string dataVencimentoFormatada = contas.data_vencimento.ToString("yyyy-MM-dd");
            string dataEmissaoFormatada = contas.data_emissao.ToString("yyyy-MM-dd");
            MySqlConnection conexao = BancoDados.Banco.Conexao();
            MySqlCommand selectCommand = new MySqlCommand($"UPDATE CONTAS set descricao='{contas.descricao}', Is_receber={contas.Is_receber}, valor={contas.valor},id_prestador={contas.id_prestador},data_emissao='{dataEmissaoFormatada}',data_vencimento='{dataVencimentoFormatada}' WHERE id_conta= {id} ", conexao);
            var result= selectCommand.ExecuteReader();
            conexao.Close();
            if(result!=null){
                return result.RecordsAffected;
            }
            return 0;  
        }
        public Dictionary<string, dynamic> GetContaById(int id){
            MySqlConnection conexao = BancoDados.Banco.Conexao();
            MySqlCommand selectCommand = new MySqlCommand($"SELECT * FROM CONTAS WHERE id_conta= {id} ", conexao);
            var result= selectCommand.ExecuteReader();
            Dictionary<string, dynamic> conta = [];
            while (result.Read())
            {
                conta = new Dictionary<string, dynamic>(){
                    {"tipoConta", result.GetInt16("Is_receber")},
                    {"descricao",result.GetString("descricao") },
                    {"valor", result.GetDecimal("valor")},
                    {"dataEmissao", result.GetDateTime("data_emissao").ToString("yyyy-MM-dd")},
                    {"dataVencimento", result.GetDateTime("data_vencimento").ToString("yyyy-MM-dd")}
                };
            }
            conexao.Close();
            return conta;
        }
    }
}

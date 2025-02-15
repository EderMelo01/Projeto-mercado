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
                string dataVencimentoFormatada = conta.data_vencimento.ToString("yyyy-MM-dd HH:mm:ss");
                string dataEmissaoFormatada = conta.data_emissao.ToString("yyyy-MM-dd HH:mm:ss");

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
    }
}

using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Threading.Tasks;
using MySql.Data.MySqlClient;

namespace PrimeiroProjeto
{
    public class Db
    {
        public MySqlDataReader getQuery(String command){
            MySqlConnection conexao= BancoDados.banco.conexao;
            MySqlCommand selectCommand =  new MySqlCommand(command, conexao);
            MySqlDataReader resultado = selectCommand.ExecuteReader();
            return resultado;
        }
    }
}
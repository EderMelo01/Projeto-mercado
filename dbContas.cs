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

namespace PrimeiroProjeto{
    public class Financeiro{
        MySqlConnection conexao = BancoDados.Banco.Conexao();
            MySqlCommand selectCommand = new MySqlCommand($"SELECT * FROM USER WHERE(nome= '{name}' );", conexao);
            MySqlDataReader result = selectCommand.ExecuteReader();
    }
}
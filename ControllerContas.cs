using Microsoft.AspNetCore.Mvc;
using NHibernate.Dialect.Function;
using PrimeiroProjeto;

using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using MySql.Data.MySqlClient;

[ApiController]
[Route("app/Contas")]
public class ControleContas : ControllerBase
{
    Financeiro db=new();
    [HttpPost("AdicionarContas")]
    public IActionResult AppendCount(Contas contas)
    {
        return db.AdicionarContas(contas)? Ok(): NotFound();
    }


}
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
    [HttpGet("getcontas/{num}")]
    public IActionResult GetContas([FromRoute]int num){
        return Ok(db.GetContas(num));
    }
    [HttpDelete ("DeletarContas/{num}") ]
    public void DeleteAcount([FromRoute]int num){
        db.DeleteAcount(num);
    }
    [HttpPut("AlterarContas/{num}")]
    public void UpdateAcount([FromRoute]int num){
    db.UpdateAcount(num);
    }

}

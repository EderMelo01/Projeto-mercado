using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using MySql.Data.MySqlClient;
using Microsoft.AspNetCore.Mvc;

namespace PrimeiroProjeto
{

    [ApiController]
    [Route("app/produtos")]
    public class ControllerProdutos : ControllerBase
    {
        Db control = new();

    
        [HttpGet("produtos")]
        public IActionResult GetbyStatus([FromQuery]int status, [FromQuery]string texto)
        {
            string query="";
            if (texto != "null" && !string.IsNullOrWhiteSpace(texto))
            {
                query+= $"WHERE LOWER(nome) LIKE '%{texto}%' ";
            }

            if (status < 2)
            {
                query+= texto != "null" && !string.IsNullOrWhiteSpace(texto)? $"AND status = {status}" : $"WHERE status = {status}";
            }
            List<Dictionary<string, dynamic>> produtos= control.GetProdutos(query);
            return produtos != null ? Ok(produtos) : NotFound();
        }
        [HttpGet("{id}")]
        public IActionResult ById(int id){

            var produto= control.GetProdutos($"WHERE id_produto ={id}");
            return produto!=null? Ok(produto) : NotFound();
        }
        [HttpDelete("{id}")]
        public void DeleteById(int id){
            control.DeleteById(id);
        }


        [HttpPut("{id}/{status}")]
        public void SetStatusById(int id, int novoStatus){
            control.SetStatusById(id, novoStatus);
        }

    }
}
using System;
using System.Collections.Generic;
using System.Linq;
using MySql.Data.MySqlClient;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;


namespace PrimeiroProjeto
{

    [ApiController]
    [Route("api/user")]
    public class UserController : ControllerBase
    {
        Db control = new();

        [HttpPost("login")]
        public ActionResult<string> Login(Pessoa pessoa){
            var users = control.GetUserByName(pessoa.nome);
            if (users == null)
            {
                return "Usuário não existe";
            }
            else
            {
                if (users.bloqueado)
                {
                    return "Usuário bloqueado";
                }
                else
                {
                    var senhaValida = BCrypt.Net.BCrypt.Verify(pessoa.senha, users.senha);
                    if (senhaValida && !users.logado)
                    {

                        control.Upgrade($"UPDATE USER SET logado= 1 WHERE nome = '{users.nome}'");
                        return "Logado com sucesso";

                    }
                    else if (users.logado)
                    {
                        return "Usuário já logado tente mais tarde, ou contate um admin";
                    }
                    else
                    {
                        return "Senha incorreta";
                    }
                }
            }
        }
         //[HttpPut("logout")] 

    }
}
using System.Data;
using System.Diagnostics;
using System.Net;
using Microsoft.AspNetCore.Mvc;
using PrimeiroProjeto;
using Controller = PrimeiroProjeto.Controller;
using System.Collections.Generic;
using System.Net.Mail;



var builder = WebApplication.CreateBuilder(args);
var app = builder.Build();


app.UseDefaultFiles();
app.UseStaticFiles();

Db control = new Db();

app.MapGet("/app/version", () => "0.0.1");

app.MapPost("/app/login", async (context) =>
{
    var pessoa = await context.Request.ReadFromJsonAsync<Pessoa>();
    if (pessoa == null)
    {
        context.Response.StatusCode = (int)HttpStatusCode.BadRequest;
        await context.Response.WriteAsync("Dados Inválidos");
        return;
    }
    var users = control.GetUserByName(pessoa.nome);
    if (users == null)
    {
        await context.Response.WriteAsync("Usuário não existe");
    }
    else
    {
        if (users.bloqueado)
        {
            await context.Response.WriteAsync("Usuário bloqueado");
        }
        else
        {
            if (users.senha == pessoa.senha && !users.logado)
            {

                control.Upgrade($"UPDATE USER SET logado= 1 WHERE nome = '{users.nome}'");
                await context.Response.WriteAsync("Logado com sucesso");

            }
            else if (users.logado)
            {
                await context.Response.WriteAsync("Usuário já logado tente mais tarde, ou contate um admin");
            }
            else
            {
                await context.Response.WriteAsync("Senha incorreta");
            }
        }
    }

});

/*var users = db.GetUserByName("Eder");
    if (users == null)
    {
        Console.WriteLine("Usuário não existe");
    }
    else
    {
        if (users.bloqueado)
        {
            Console.WriteLine("Usuário bloqueado");
        }
        else
        {
            if (users.senha == "1235" && !users.logado)
            {

                db.Upgrade($"UPDATE USER SET logado= 1 WHERE nome = '{users.nome}'");
                Console.WriteLine("Logado com sucesso");

            }
            else if (users.senha != "1235")
            {
                Console.WriteLine("Senha incorreta");
            }
            else
            {
                Console.WriteLine("Usuário já logado tente mais tarde, ou contate um admin");
            }
        }
    }*/


app.Run();

/*while (result.Read())
        {
            var nome = result.GetString("nome");
            var senha = result.GetString("senha");
            list.Add($"nome: {nome}, senha: {senha}");
        }
        await context.Response.WriteAsJsonAsync(list[0]);*/
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

Db db = new Db();

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
    var users = db.GetQuery($"SELECT * FROM USER WHERE(nome= '{pessoa.nome}' );");

    if (users[0].bloqueado)
    {
        await context.Response.WriteAsync("Usuário bloqueado");
    }
    else
    {
        if (users[0].senha == pessoa.senha && !users[0].logado)
        {

            db.Upgrade($"UPDATE USER SET logado= 1 WHERE nome = '{users[0].nome}'");
            await context.Response.WriteAsync("Logado com sucesso");

        }
        else if (users[0].senha != pessoa.senha)
        {
            await context.Response.WriteAsync("Senha incorreta");
        }
        else
        {
            await context.Response.WriteAsync("Usuário já logado tente mais tarde, ou contate um admin");
        }
    }
});

/*var users = db.GetQuery($"SELECT * FROM USER WHERE(nome= 'Eder' );");

if (users[0].bloqueado)
{
    Console.WriteLine("Usuário bloqueado");
}
else
{
    if (users[0].senha == "1235" && !users[0].logado)
    {

        db.Upgrade($"UPDATE USER SET logado= 1 WHERE nome = '{users[0].nome}'");
        Console.WriteLine("Logado com sucesso");

    }
    else if (users[0].senha != "1235")
    {
        Console.WriteLine("Senha incorreta");
    }
    else
    {
        Console.WriteLine("Usuário já logado tente mais tarde, ou contate um admin");
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
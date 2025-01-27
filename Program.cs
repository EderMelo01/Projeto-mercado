using System.Data;
using System.Diagnostics;
using System.Net;
using Microsoft.AspNetCore.Mvc;
using PrimeiroProjeto;
using System.Collections.Generic;
using System.Net.Mail;
using System.Text.Json;
using Microsoft.AspNetCore.SignalR;
using System.Reflection.PortableExecutable;
using Microsoft.AspNetCore.Builder;
using Microsoft.Extensions.DependencyInjection;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllers(); ///Define que terá controllers
var app = builder.Build();

app.MapControllers(); ///Diz para pagar rota de um controlador

app.UseDefaultFiles();
app.UseStaticFiles();

Db control = new();

app.MapGet("/app/version", () => "0.0.1");

/*app.MapPost("/app/login", async (context) =>
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
            var senhaValida = BCrypt.Net.BCrypt.Verify(pessoa.senha, users.senha);
            if (senhaValida && !users.logado)
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

});*/

app.MapGet("app/users", async (context) =>
{
    List<Dictionary<string, dynamic>> json = [];
    List<User> users = control.GetUsers();
    for (int i = 0; i < users.Count; i++)
    {
        json.Add(User.userForMap(users[i]));
    }
    await context.Response.WriteAsJsonAsync(json);
});
app.Run();
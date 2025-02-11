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
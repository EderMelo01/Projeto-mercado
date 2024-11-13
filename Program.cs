using System.Data;
using System.Diagnostics;
using System.Net;
using Microsoft.AspNetCore.Mvc;
using PrimeiroProjeto;
using Controller = PrimeiroProjeto.Controller;



var builder = WebApplication.CreateBuilder(args);
var app = builder.Build();


app.UseDefaultFiles();
app.UseStaticFiles();

Controller control = new Controller(new Db());

app.MapGet("/api/version", () => "0.0.1");

app.MapGet("/api/login", async (context) =>
{
    var result = control.getQuery("SELECT * FROM USER;");
    await context.Response.WriteAsJsonAsync(result);
});

app.Run();
var builder = WebApplication.CreateBuilder(args);

builder.Services.AddCors(policyBuilder =>
    policyBuilder.AddDefaultPolicy(policy =>
        policy.WithOrigins("*").AllowAnyHeader().AllowAnyHeader())
);

var app = builder.Build();

app.UseCors();

app.Urls.Add("https://localhost:3001");

var users = new Dictionary<string, string>()
{
    { "admin", "654321"},
    { "user", "123456"},
    { "test", "test"}
};

app.MapGet("/", () => "API is working");
app.MapPost("/login", async(HttpRequest request) =>
{
    var user = await request.ReadFromJsonAsync<User>();
    bool authorized = false;
    if (users.TryGetValue(user.Login, out string value))
    {
        authorized = value == user.Password;
    }

    if (authorized)
    {
        return Results.Ok("Logged in");
    }
    else
    {
        return Results.NoContent();
    }
}
);

app.Run();
record User(string Login, string Password);
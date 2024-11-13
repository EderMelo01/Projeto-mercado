async function requisicao() {
    let code = document.getElementById("barras").value;

    let url = `https://api.cosmos.bluesoft.com.br/gtins/${code}.json`;
    try {
        const response = await fetch(url, {
            method: "GET",
            headers: {
                "User-Agent": "Cosmos-API-Request",
                "X-Cosmos-Token": "EhneOzzKCFC7znF-yqgyhA",
            },
        });
        if (!response.ok) {
            throw new Error();
        }
        var body = await response.json();
        document.getElementById("name").value = body["description"];
    } catch (error) {
        console.error("Request failed:", error);
    }
}
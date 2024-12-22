document.getElementById("login-form").addEventListener("submit", function (event) {
    event.preventDefault();

    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    if(username === "admin" && password === "12345678") {
        alert("Login realizado com sucesso!");

        window.location.href = "pag_entrada.html";
    } else {
        alert("Usuário ou senha inválidos, tente novamente!");
    }
});
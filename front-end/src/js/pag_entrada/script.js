document.addEventListener("DOMContentLoaded", function () {
    const buttons = document.querySelectorAll(".button");
    buttons.forEach ((button) => {
        button.addEventListener("click", () => {
            alert('Você clicou no botão: ${button.textContent.trim()}');
        });
    });
});
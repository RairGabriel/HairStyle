document.addEventListener("DOMContentLoaded", function () {
    // Seleciona o botão correto
    let openPopupButton = document.getElementById("open-popup-button");
    let closePopupButton = document.getElementById("close-agendamento");
    let popup = document.getElementById("popup-agendamento");

    if (openPopupButton && popup && closePopupButton) {
        openPopupButton.addEventListener("click", function () {
            popup.style.display = "block";
        });

        closePopupButton.addEventListener("click", function () {
            popup.style.display = "none";
        });

        // Fecha o popup ao clicar fora dele
        window.addEventListener("click", function (event) {
            if (event.target === popup) {
                popup.style.display = "none";
            }
        });
    }
});



document.addEventListener("DOMContentLoaded", function() {
        fetch("{% url 'verificar_horarios' %}")  // Criaremos essa view
            .then(response => response.json())
            .then(data => {
                let selectHora = document.getElementById("hora");
                for (let option of selectHora.options) {
                    if (data.horarios_cheios.includes(option.value)) {
                        option.disabled = true;
                    }
                }
            });
});


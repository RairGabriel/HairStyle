document.addEventListener('DOMContentLoaded', function() {
    // Seleciona o botão de mudar tema, o ícone de tema, e o elemento body
    let botao = document.getElementById('mudar-tema');
    let themeIcon = document.getElementById('theme-icon');
    let body = document.body;

    // Verifica se um tema foi salvo anteriormente no localStorage
    let salvar_tema = localStorage.getItem('tema');
    if (salvar_tema) {
        // Se houver um tema salvo, ele é aplicado ao body
        body.classList.add(salvar_tema); 
        // Atualiza o ícone conforme o tema salvo
        if (salvar_tema === 'modo-escuro') {
            themeIcon.src = 'img/Icon/lua.png'; // Ícone de lua para modo escuro
        } else {
            themeIcon.src = 'img/Icon/sol-br.png'; // Ícone de sol para modo claro
        }
    }

    // Adiciona um evento de clique ao botão de mudar tema
    botao.addEventListener('click', function() {
        // Alterna entre o modo claro e escuro
        body.classList.toggle('modo-escuro');

        // Se o modo escuro estiver ativo, salva a preferência e muda o ícone
        if (body.classList.contains('modo-escuro')) {
            localStorage.setItem('tema', 'modo-escuro');
            themeIcon.src = 'img/Icon/lua.png'; // Atualiza ícone para lua
        } else {
            // Se o modo claro estiver ativo, salva a preferência e muda o ícone
            localStorage.setItem('tema', 'modo-claro');
            themeIcon.src = 'img/Icon/sol-br.png'; // Atualiza ícone para sol
        }
    });
});

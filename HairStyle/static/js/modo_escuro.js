document.addEventListener('DOMContentLoaded', function() {
    const botao = document.getElementById('mudar-tema');
    const themeIcon = document.getElementById('theme-icon');
    const body = document.body;

    // Verifica se há um tema salvo no localStorage
    const salvar_tema = localStorage.getItem('tema');
    if (salvar_tema) {
        body.classList.add(salvar_tema); // Aplica o tema salvo
        if (salvar_tema === 'modo-escuro') {
            themeIcon.src = 'img/Icon/lua.png';
        } else {
            themeIcon.src = 'img/Icon/sol-br.png';
        }
    }

    // Adiciona um listener para o clique no botão
    botao.addEventListener('click', function() {
        // Alterna entre os temas
        body.classList.toggle('modo-escuro');

        // Atualiza o ícone e salva a preferência no localStorage
        if (body.classList.contains('modo-escuro')) {
            localStorage.setItem('tema', 'modo-escuro');
            themeIcon.src = 'img/Icon/lua.png';
        } else {
            localStorage.setItem('tema', 'modo-claro');
            themeIcon.src = 'img/Icon/sol-br.png';
        }
    });
});

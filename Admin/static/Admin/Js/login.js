// Executa quando o documento é carregado completamente
document.addEventListener('DOMContentLoaded', () => {
    // Seleciona o formulário de login pelo ID
    const loginForm = document.getElementById('loginForm');

    // Adiciona um evento ao enviar o formulário
    loginForm.addEventListener('submit', (e) => {
        // Evita que o formulário seja enviado normalmente
        e.preventDefault();
        
        // Pega os valores dos campos de usuário e senha
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;

        // Valores de usuário e senha pré-definidos
        const predefinedUsername = "admin";
        const predefinedPassword = "1234";

        // Verifica se os valores inseridos correspondem aos pré-definidos
        if (username === predefinedUsername && password === predefinedPassword) {
            // Se corresponder, mostra uma mensagem de sucesso
            alert("Login bem-sucedido!");
            // Redireciona para  Agenda
            window.location.href = 'Agenda.html';
        } else {
            // Se não corresponder, mostra uma mensagem de erro
            alert("Usuário ou senha incorretos.");
        }
    });
});

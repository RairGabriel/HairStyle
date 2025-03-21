// Evento disparado quando o conteúdo do documento foi completamente carregado
document.addEventListener('DOMContentLoaded', function() {
    // Seleciona os formulários de login, cadastro e recuperação de senha pelo ID
    const loginForm = document.getElementById('login-form');
    const registerForm = document.getElementById('register-form');
    const forgotPasswordForm = document.getElementById('forgot-password-form');

    // Seleciona os botões para alternar entre os formulários
    const showLogin = document.getElementById('show-login');
    const showRegister = document.getElementById('show-register');
    const showForgotPassword = document.getElementById('show-forgot-password');
    const showLoginFromForgot = document.getElementById('show-login-from-forgot');

    // Adiciona ouvinte de evento para mostrar o formulário de cadastro
    showRegister.addEventListener('click', function() {
        loginForm.style.display = 'none';
        registerForm.style.display = 'block';
        forgotPasswordForm.style.display = 'none';
    });

    // Adiciona ouvinte de evento para mostrar o formulário de recuperação de senha
    showForgotPassword.addEventListener('click', function() {
        loginForm.style.display = 'none';
        registerForm.style.display = 'none';
        forgotPasswordForm.style.display = 'block';
    });

    // Adiciona ouvinte de evento para mostrar o formulário de login
    showLogin.addEventListener('click', function() {
        loginForm.style.display = 'block';
        registerForm.style.display = 'none';
        forgotPasswordForm.style.display = 'none';
    });

    // Adiciona ouvinte de evento para voltar ao formulário de login a partir da recuperação de senha
    showLoginFromForgot.addEventListener('click', function() {
        loginForm.style.display = 'block';
        registerForm.style.display = 'none';
        forgotPasswordForm.style.display = 'none';
    });

    // Lógica para o envio do formulário de login
    loginForm.querySelector('form').addEventListener('submit', function(e) {
        e.preventDefault(); // Evita o envio padrão do formulário
        const email = document.getElementById('login-email').value;
        const password = document.getElementById('login-password').value;

        // Recupera os usuários cadastrados no localStorage ou inicializa um array vazio
        const users = JSON.parse(localStorage.getItem('users')) || [];

        // Verifica se o email e a senha correspondem a um usuário cadastrado
        const user = users.find(user => user.email === email && user.password === password);

        if (user) {
            alert('Login realizado com sucesso!');
            // Redireciona para a página de home
            window.location.href = 'index.html';
        } else {
            alert('Email ou senha incorretos. Tente novamente.');
        }
    });

    // Lógica para o envio do formulário de cadastro
    registerForm.querySelector('form').addEventListener('submit', function(e) {
        e.preventDefault(); // Evita o envio padrão do formulário
        const nome = document.getElementById('register-nome').value;
        const email = document.getElementById('register-email').value;
        const password = document.getElementById('register-password').value;
        const confirmPassword = document.getElementById('register-confirm-password').value;

        // Verifica se as senhas coincidem
        if (password !== confirmPassword) {
            alert('As senhas não coincidem. Tente novamente.');
            return;
        }

        // Recupera os usuários cadastrados no localStorage ou inicializa um array vazio
        const users = JSON.parse(localStorage.getItem('users')) || [];

        // Verifica se o usuário já está cadastrado com o email fornecido
        const userExists = users.some(user => user.email === email);

        if (userExists) {
            alert('Usuário já cadastrado com este email.');
        } else {
            // Adiciona o novo usuário ao array de usuários
            users.push({ nome, email, password });
            localStorage.setItem('users', JSON.stringify(users));

            alert(`Usuário ${nome} cadastrado com sucesso!`);
            // Redireciona para a página de login após o cadastro
            window.location.href = 'login.html';
        }
    });

    // Lógica para o envio do formulário de recuperação de senha
    forgotPasswordForm.querySelector('form').addEventListener('submit', function(e) {
        e.preventDefault(); // Evita o envio padrão do formulário
        const email = document.getElementById('forgot-email').value;
        alert(`Link de redefinição de senha enviado para ${email}`);
        // Retorna ao formulário de login após a solicitação de recuperação de senha
        loginForm.style.display = 'block';
        registerForm.style.display = 'none';
        forgotPasswordForm.style.display = 'none';
    });
});

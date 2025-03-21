document.addEventListener('DOMContentLoaded', function () {
    let chatMessages = document.getElementById('chatMessages');
    let messageInput = document.getElementById('messageInput');
    let sendMessageButton = document.getElementById('sendMessageButton');

    // Função para adicionar mensagem ao chat
    function addMessage(text, type) {
        let messageElement = document.createElement('div');
        messageElement.classList.add('message', type);
        messageElement.textContent = text;
        chatMessages.appendChild(messageElement);
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }

    // Evento para enviar mensagem
    sendMessageButton.addEventListener('click', function () {
        let messageText = messageInput.value;
        if (messageText.trim() !== '') {
            addMessage(messageText, 'sent');
            messageInput.value = '';

            // Simular resposta do Studio Glimmer (apenas para demonstração)
            setTimeout(() => {
                addMessage('Recebido! Em que posso ajudar?', 'received');
            }, 1000);
        }
    });

    // Enviar mensagem ao pressionar Enter
    messageInput.addEventListener('keypress', function (e) {
        if (e.key === 'Enter') {
            sendMessageButton.click();
        }
    });

    // Simular uma mensagem recebida inicial
    setTimeout(() => {
        addMessage('Olá! Como posso ajudar você hoje?', 'received');
    }, 1000);
});

// Função responsável por carregar e exibir os agendamentos salvos no localStorage
function loadAgendamentos() {
    // Obtém o elemento do contêiner onde os agendamentos serão exibidos na página
    const agendamentosContainer = document.getElementById('agendamentos-container');
    // Limpa o conteúdo do contêiner para garantir que não haja duplicação de agendamentos
    agendamentosContainer.innerHTML = '';

    // Recupera os agendamentos armazenados no localStorage
    let agendamentos = localStorage.getItem('agendamentos');
    // Verifica se há agendamentos salvos no localStorage
    if (agendamentos) {
        // Converte a string JSON armazenada no localStorage de volta para um array de objetos
        agendamentos = JSON.parse(agendamentos);

        // Itera sobre cada agendamento no array para gerar e exibir o HTML correspondente
        agendamentos.forEach((agendamento, index) => {
            // Cria um novo elemento 'div' para representar cada agendamento
            const agendamentoDiv = document.createElement('div');
            // Adiciona a classe 'agendamento' ao elemento para aplicar o estilo correspondente
            agendamentoDiv.classList.add('agendamento');

            // Gera o HTML dinâmico para exibir as informações do agendamento
            const agendamentoHTML = `
                <h2>Agendamento ${index + 1}</h2>
                <p><strong>Nome:</strong> ${agendamento.nome}</p>
                <p><strong>Serviço:</strong> ${agendamento.servico}</p>
                <p><strong>Profissional:</strong> ${agendamento.profissional}</p>
                <p><strong>Data:</strong> ${agendamento.data}</p>
                <p><strong>Hora:</strong> ${agendamento.hora}</p>
                <p><strong>Mensagem:</strong> ${agendamento.mensagem}</p>
            `;

            // Insere o HTML gerado dentro da 'div' do agendamento
            agendamentoDiv.innerHTML = agendamentoHTML;
            // Adiciona a 'div' do agendamento ao contêiner na página
            agendamentosContainer.append(agendamentoDiv);
        });
    } else {
        // Exibe uma mensagem informando que não há agendamentos caso o localStorage esteja vazio
        agendamentosContainer.innerHTML = '<p>Você não possui agendamentos.</p>';
    }
}

// Configura a função loadAgendamentos para ser executada automaticamente quando a página é carregada
window.onload = loadAgendamentos;

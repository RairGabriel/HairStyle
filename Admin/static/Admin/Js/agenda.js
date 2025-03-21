document.addEventListener('DOMContentLoaded', function () {
    // Pega os agendamentos salvos no localStorage
    let agendamentos = localStorage.getItem('agendamentos');
    
    // Verifica se existem agendamentos no localStorage
    if (agendamentos) {
        // Se existir, transforma a string JSON em um array de objetos
        agendamentos = JSON.parse(agendamentos);
    } else {
        // Se não existir, cria um array vazio
        agendamentos = [];
    }

    // Pega o tbody da tabela onde os agendamentos vão aparecer
    const tbody = document.getElementById('agenda-tbody');
    
    // Função que salva os agendamentos no localStorage
    function saveAgendamentos() {
        localStorage.setItem('agendamentos', JSON.stringify(agendamentos));
    }

    // Passa por cada agendamento do array
    agendamentos.forEach((agendamento, index) => {
        // Cria uma nova linha na tabela
        const tr = document.createElement('tr');

        // Cria uma célula para a data e coloca o valor nela
        const tdData = document.createElement('td');
        tdData.textContent = agendamento.data;
        tr.appendChild(tdData);

        // Cria uma célula para o horário e coloca o valor nela
        const tdHora = document.createElement('td');
        tdHora.textContent = agendamento.hora;
        tr.appendChild(tdHora);

        // Cria uma célula para o serviço e coloca o valor nela
        const tdServico = document.createElement('td');
        tdServico.textContent = agendamento.servico;
        tr.appendChild(tdServico);

        // Cria uma célula para o profissional e coloca o valor nela
        const tdProfissional = document.createElement('td');
        tdProfissional.textContent = agendamento.profissional;
        tr.appendChild(tdProfissional);

        // Cria uma célula para o nome do cliente e coloca o valor nela
        const tdNome = document.createElement('td');
        tdNome.textContent = agendamento.nome;
        tr.appendChild(tdNome);

        // Cria uma célula para a mensagem e coloca o valor nela
        const tdMensagem = document.createElement('td');
        tdMensagem.textContent = agendamento.mensagem;
        tr.appendChild(tdMensagem);

        // Cria uma célula com o ícone de exclusão
        const tdAcao = document.createElement('td');
        tdAcao.innerHTML = '<span class="activity-icon">&#10006;</span>'; // Ícone de excluir
        tdAcao.querySelector('.activity-icon').addEventListener('click', function () {
            // Remove o agendamento do array pelo índice
            agendamentos.splice(index, 1);
            // Salva os agendamentos atualizados no localStorage
            saveAgendamentos();
            // Atualiza a tabela removendo a linha
            tbody.removeChild(tr);
        });
        tr.appendChild(tdAcao);

        // Adiciona a linha completa ao tbody da tabela
        tbody.appendChild(tr);
    });
});

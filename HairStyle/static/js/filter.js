// Aguarda até que o conteúdo do documento esteja completamente carregado
document.addEventListener("DOMContentLoaded", function() {
    // Seleciona todos os botões de filtro
    const filterButtons = document.querySelectorAll('.btn-filtro');
    // Seleciona todos os cartões de produto
    const productCards = document.querySelectorAll('.produto-card');
    
    // Adiciona um evento de clique a cada botão de filtro
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Obtém o valor do atributo 'data-filter' do botão clicado
            const filter = button.getAttribute('data-filter');
            
            // Itera sobre todos os cartões de produto
            productCards.forEach(card => {
                // Verifica se o filtro é '*' (todos os produtos) ou se o cartão de produto contém a classe do filtro
                if (filter === '*' || card.classList.contains(filter.substring(1))) {
                    // Se sim, exibe o cartão de produto
                    card.style.display = 'block';
                } else {
                    // Caso contrário, oculta o cartão de produto
                    card.style.display = 'none';
                }
            });
        });
    });
});

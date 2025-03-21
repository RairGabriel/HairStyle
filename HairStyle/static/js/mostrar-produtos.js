// Evento disparado quando o conteúdo do documento foi completamente carregado
document.addEventListener('DOMContentLoaded', () => {
    // Seleciona o container onde os produtos serão exibidos pelo ID
    const productsContainer = document.getElementById('productsContainer');

    // Carrega os produtos do localStorage ou inicializa um array vazio se não houver produtos
    let products = JSON.parse(localStorage.getItem('products')) || [];

    // Função para exibir os produtos no container
    function displayProducts() {
        // Limpa o container de produtos
        productsContainer.innerHTML = '';
        // Itera sobre o array de produtos e cria elementos HTML para cada produto
        products.forEach(product => {
            const productCard = document.createElement('div');
            productCard.classList.add('produto-card');
            productCard.innerHTML = `
                <img src="${product.imageUrl}" alt="${product.name}">
                <h2>${product.name}</h2>
                <p>${product.description}</p>
                <p>Preço: R$ ${product.price}</p>
                <a href="Mensagem.html"><button class="bnt-produto">Quero Este</button></a>
                `;
            productsContainer.appendChild(productCard);
        });
    }

    // Exibe os produtos ao carregar a página
    displayProducts();
});


function displayProducts() {
    productsContainer.innerHTML = '';
    products.forEach(product => {
        productsContainer.innerHTML += `
            <div class="produto-card">
                <h2>${product.name}</h2>
                <p>Preço: R$ ${product.price}</p>
            </div>
        `;
    });
}

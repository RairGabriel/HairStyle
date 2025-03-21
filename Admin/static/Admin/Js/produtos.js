// Aguarda até que todo o conteúdo do documento seja carregado e esteja pronto para ser manipulado
document.addEventListener('DOMContentLoaded', () => {
    // Seleciona o formulário de adição de produtos usando o ID
    const addProductForm = document.getElementById('addProductForm');
    // Seleciona o container onde os produtos serão exibidos, também pelo ID
    const productsContainer = document.getElementById('productsContainer');

    // Carrega os produtos salvos no localStorage ou, caso não existam, inicializa com um array vazio
    let products = JSON.parse(localStorage.getItem('products')) || [];

    // Função responsável por salvar o array de produtos no localStorage
    function saveProducts() {
        localStorage.setItem('products', JSON.stringify(products));
    }

    // Função para exibir os produtos no container designado
    function displayProducts() {
        // Limpa o conteúdo do container de produtos antes de exibir novos itens
        productsContainer.innerHTML = '';
        // Percorre o array de produtos, criando um card HTML para cada um
        products.forEach((product, index) => {
            const productCard = document.createElement('div');
            productCard.classList.add('produto-card');
            // Define o HTML interno do card de produto
            productCard.innerHTML = `
                <img src="${product.imageUrl}" alt="${product.name}">
                <h2>${product.name}</h2>
                <p>${product.description}</p>
                <p>Preço: R$ ${product.price}</p>
                <div class="button-container">
                    <button class="btn-edit" data-index="${index}">Editar</button>
                    <button class="btn-delete" data-index="${index}">Remover</button>
                </div>
            `;
            // Adiciona o card de produto ao container
            productsContainer.appendChild(productCard);
        });

        // Adiciona ouvintes de eventos para os botões de remoção de produtos
        document.querySelectorAll('.btn-delete').forEach(button => {
            button.addEventListener('click', (e) => {
                // Obtém o índice do produto a ser removido a partir do atributo data-index
                const index = e.target.getAttribute('data-index');
                // Remove o produto do array usando o índice e salva a alteração
                products.splice(index, 1);
                saveProducts();
                // Atualiza a exibição dos produtos no container
                displayProducts();
            });
        });

        // Adiciona ouvintes de eventos para os botões de edição de produtos
        document.querySelectorAll('.btn-edit').forEach(button => {
            button.addEventListener('click', (e) => {
                // Obtém o índice do produto a ser editado a partir do atributo data-index
                const index = e.target.getAttribute('data-index');
                const product = products[index];
                // Preenche o formulário de adição de produtos com os dados do produto selecionado
                document.getElementById('productName').value = product.name;
                document.getElementById('productDescription').value = product.description;
                document.getElementById('productPrice').value = product.price;
                // Remove o produto do array para permitir a edição
                products.splice(index, 1);
                // Atualiza a exibição dos produtos no container
                displayProducts();
            });
        });
    }

    // Adiciona um ouvinte de evento para o envio do formulário de adição de produtos
    addProductForm.addEventListener('submit', (e) => {
        // Previne o envio padrão do formulário
        e.preventDefault();

        // Obtém os valores dos campos do formulário de adição de produtos
        const productName = document.getElementById('productName').value;
        const productDescription = document.getElementById('productDescription').value;
        const productPrice = document.getElementById('productPrice').value;
        const productImage = document.getElementById('productImage').files[0];

        // Cria um objeto FileReader para ler o conteúdo do arquivo de imagem
        const reader = new FileReader();
        reader.readAsDataURL(productImage);
        reader.onload = function() {
            const productImageUrl = reader.result; // Obtém a URL da imagem após o carregamento
            // Cria um objeto de produto com os dados obtidos do formulário
            const product = {
                name: productName,
                description: productDescription,
                price: productPrice,
                imageUrl: productImageUrl
            };

            // Adiciona o novo produto ao array de produtos e salva no localStorage
            products.push(product);
            saveProducts();
            // Atualiza a exibição dos produtos no container
            displayProducts();
            // Reseta o formulário para permitir a entrada de novos produtos
            addProductForm.reset();
        };
    });

    // Exibe os produtos ao carregar a página
    displayProducts();
});

// No seu arquivo JS, onde processa a adição de um produto
const addProductForm = document.getElementById('addProductForm');

addProductForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const productName = document.getElementById('productName').value;
    const productDescription = document.getElementById('productDescription').value;
    const productPrice = document.getElementById('productPrice').value;
    const productImage = document.getElementById('productImage').files[0];

    const formData = new FormData();
    formData.append('name', productName);
    formData.append('description', productDescription);
    formData.append('price', productPrice);
    formData.append('image', productImage);

    fetch('{% url "add_product" %}', { // "add_product" é a URL que você vai configurar no Django
        method: 'POST',
        headers: {
            'X-CSRFToken': csrf_token, // Inclua o CSRF token
        },
        body: formData,
    })
    .then(response => response.json())
    .then(data => {
        // Atualiza a lista de produtos
        displayProducts(); // Aqui, você pode atualizar o estado da lista de produtos após o envio
    })
    .catch(error => console.error('Erro ao adicionar produto:', error));
});


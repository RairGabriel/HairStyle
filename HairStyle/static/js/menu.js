
window.addEventListener("scroll", function(){
    let header = document.querySelector('#header')
    header.classList.toggle('rolagem', window.scrollY > 500)
})


document.addEventListener('DOMContentLoaded', () => {
    const bannerTitle = document.querySelector('.banner h1');
    const buttons = document.querySelectorAll('.banner-content button');

    // Função para adicionar a classe "visible" aos itens
    function showBannerItems() {
        bannerTitle.classList.add('visible'); // Aparece o título
        buttons.forEach((button, index) => {
            setTimeout(() => {
                button.classList.add('visible'); // Aparece cada botão com atraso
            }, index * 500); // Atraso de 500ms entre os botões
        });
    }

    showBannerItems(); // Chama a função para fazer os itens aparecerem
});

document.addEventListener('DOMContentLoaded', () => {
    const aboutContent = document.querySelector('.about-content');
    
    // Função para adicionar a classe "visible" à 'about-content' quando ela entra na tela
    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Se a seção estiver visível, adicionamos a classe 'visible'
                entry.target.classList.add('visible');
                // Depois de adicionar a classe, podemos parar de observar essa seção
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.5 // A animação será disparada quando 50% da seção estiver visível
    });

    // Começamos a observar o elemento .about-content
    observer.observe(aboutContent);
});

document.addEventListener('DOMContentLoaded', () => {
    // Seleciona todos os elementos .card dentro da seção servicos
    const cards = document.querySelectorAll('#servicos .card');
    const title = document.querySelector('#servicos h2');  // Seleciona o título "Serviços"
    
    // Função para adicionar a classe 'visible' quando a carta entra na tela
    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Quando o título ou a carta entra na tela, adiciona a classe 'visible'
                entry.target.classList.add('visible');
                // Depois de adicionar a classe, podemos parar de observar esse elemento
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.5 // A animação será disparada quando 50% do card ou título estiver visível
    });

    // Observa o título
    if (title) observer.observe(title);

    // Observa cada um dos cards para ativar a animação
    cards.forEach(card => {
        observer.observe(card);
    });
});

// Detecta a rolagem da página
window.addEventListener('scroll', () => {
    const equipeTitle = document.querySelector('.equipe h1');
    const equipeCards = document.querySelectorAll('.equipe-card');

    // Verifica se o título está visível na tela
    if (equipeTitle.getBoundingClientRect().top < window.innerHeight) {
        equipeTitle.classList.add('visible');
    }

    // Verifica se os cartões estão visíveis na tela
    equipeCards.forEach(card => {
        if (card.getBoundingClientRect().top < window.innerHeight) {
            card.classList.add('visible');
        }
    });
});

// Função para abrir o pop-up e preencher o serviço automaticamente
function openAgendamento(servico) {
    // Definir o valor do serviço no campo de seleção
    document.getElementById('servico').value = servico;

    // Exibir o pop-up de agendamento
    document.getElementById('popup-agendamento').style.display = 'block';
}

// Fechar o pop-up quando o usuário clicar no 'x'
document.getElementById('close-agendamento').onclick = function() {
    document.getElementById('popup-agendamento').style.display = 'none';
}

// Detecta o scroll da página e ativa as animações das imagens
window.addEventListener('scroll', function() {
    var images = document.querySelectorAll('.img_galeria'); // Seleciona todas as imagens da galeria
    var windowHeight = window.innerHeight; // Obtém a altura da janela de visualização

    // Loop por todas as imagens
    images.forEach(function(image) {
        var imageTop = image.getBoundingClientRect().top; // Obtém a posição da imagem em relação à janela
        if (imageTop < windowHeight - 100) { // Quando a imagem estiver 100px antes de entrar na tela
            image.classList.add('visible'); // Adiciona a classe 'visible' para a animação
        }
    });
});



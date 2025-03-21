// Adiciona um evento que escuta o scroll da página
window.addEventListener("scroll", function(){
    // Seleciona o elemento do cabeçalho pelo ID
    let header = document.querySelector('#header');
    // Alterna a classe 'rolagem' dependendo da posição de rolagem (maior que 500px)
    header.classList.toggle('rolagem', window.scrollY > 500);
});

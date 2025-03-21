document.addEventListener('DOMContentLoaded', function () {
    // Pega os comentários salvos no localStorage
    let comentarios = JSON.parse(localStorage.getItem('comentarios')) || []; // Pega os comentários ou cria um array vazio
    
    // Pega o contêiner onde os comentários vão ser exibidos
    const depoimentosLista = document.getElementById('depoimentos-lista');
    
    // Adiciona os comentários ao painel de administração
    comentarios.forEach(comentario => {
        let comentarioElemento = document.createElement('div');
        comentarioElemento.classList.add('depoimento');
        
        let textoElemento = document.createElement('p');
        textoElemento.textContent = comentario.comentario;
        
        let nomeElemento = document.createElement('p');
        nomeElemento.classList.add('cliente');
        nomeElemento.textContent = comentario.nome;
        
        let studioElemento = document.createElement('p');
        studioElemento.classList.add('studio');
        studioElemento.textContent = 'Hair Style'; 
        
        let botaoExcluir = document.createElement('button');
        botaoExcluir.textContent = 'Excluir';
        botaoExcluir.classList.add('botao-excluir');
        botaoExcluir.addEventListener('click', () => {
            // Remove o comentário do localStorage
            comentarios = comentarios.filter(c => c.nome !== comentario.nome || c.comentario !== comentario.comentario);
            localStorage.setItem('comentarios', JSON.stringify(comentarios));
            
            // Remove o comentário da página
            comentarioElemento.remove();
        });
        
        comentarioElemento.append(textoElemento);
        comentarioElemento.append(nomeElemento);
        comentarioElemento.append(studioElemento);
        comentarioElemento.append(botaoExcluir);
        
        depoimentosLista.appendChild(comentarioElemento);
    });
});

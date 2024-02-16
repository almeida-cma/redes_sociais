// Dados de exemplo para demonstração
let dadosUsuario = {
    nome: "João Silva",
    bio: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    posts: [
        { assunto: "Geral", conteudo: "Sejam bem-vindos ao chat de apoio!", comentarios: [] },
        { assunto: "Geral", conteudo: "Como podemos ajudar?", comentarios: [] }
    ]
};

// Função para exibir informações do perfil
function exibirPerfil() {
    let infoPerfil = document.getElementById('perfil-info');
    infoPerfil.innerHTML = `
        <p><strong>Nome:</strong> ${dadosUsuario.nome}</p>
        <p><strong>Bio:</strong> ${dadosUsuario.bio}</p>
    `;
}

// Função para exibir posts
function exibirPosts() {
    let containerPosts = document.getElementById('posts');
    containerPosts.innerHTML = '';
    dadosUsuario.posts.forEach((post, indice) => {
        let elementoPost = document.createElement('div');
        elementoPost.classList.add('post'); // Adicionando a classe .post
        elementoPost.innerHTML = `
            <p><strong>Assunto:</strong> ${post.assunto}</p>
            <p>${post.conteudo}</p>
            <button class="botao-comentario" data-indice="${indice}">Comentar</button>
            <div class="comentarios"></div>
        `;
        let containerComentarios = elementoPost.querySelector('.comentarios');
        containerComentarios.innerHTML += '<h3>Comentários</h3>';
        post.comentarios.forEach(comentario => {
            containerComentarios.innerHTML += `<p>${comentario.nome}: ${comentario.conteudo}</p>`;
        });
        containerPosts.appendChild(elementoPost);
    });
}

// Função para lidar com a edição do perfil
document.getElementById('editar-perfil').addEventListener('click', function() {
    let novoNome = prompt("Digite seu novo nome:");
    let novaBio = prompt("Digite sua nova biografia:");
    if (novoNome && novaBio) {
        dadosUsuario.nome = novoNome;
        dadosUsuario.bio = novaBio;
        exibirPerfil();
    }
});

// Função para lidar com a adição de comentários nos posts
document.addEventListener('click', function(evento) {
    if (evento.target.classList.contains('botao-comentario')) {
        let indicePost = evento.target.getAttribute('data-indice');
        let nomePerfil = dadosUsuario.nome;
        let comentario = prompt(`Digite seu comentário como ${nomePerfil}:`);
        if (comentario) {
            dadosUsuario.posts[indicePost].comentarios.push({ nome: nomePerfil, conteudo: comentario });
            exibirPosts();
        }
    }
});

// Função para lidar com a adição de novos posts
document.getElementById('adicionar-post').addEventListener('click', function() {
    let conteudoPost = document.getElementById('conteudo-post').value.trim();
    let assuntoPost = document.getElementById('assunto-post').value.trim();
    if (conteudoPost && assuntoPost) {
        let nomePerfil = dadosUsuario.nome;
        dadosUsuario.posts.unshift({ assunto: assuntoPost, conteudo: `${nomePerfil}: ${conteudoPost}`, comentarios: [] });
        exibirPosts();
        document.getElementById('conteudo-post').value = '';
        document.getElementById('assunto-post').value = '';
    } else {
        alert("Por favor, digite o conteúdo do post e o assunto.");
    }
});

// Inicialização da exibição
exibirPerfil();
exibirPosts();

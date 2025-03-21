from django.contrib.auth.decorators import login_required
from django.contrib.auth.models import User
from django.contrib import messages
from django.shortcuts import render, redirect, get_object_or_404
from HairStyle.models import Comentario
from .models import Produto
from HairStyle.models import Agendamento
from django.db.models import Count, Sum
from .models import Estoque
from django.http import HttpResponseForbidden

@login_required
def cadastro(request):
    if request.method == "GET":
        return render(request, 'Admin/cadastro.html')  # Certo!

    username = request.POST.get('username')
    email = request.POST.get('email')
    senha = request.POST.get('senha')

    if User.objects.filter(username=username).exists():
        messages.error(request, "Usuário já existe!")
        return redirect('cadastro')

    user = User.objects.create_user(username=username, email=email, password=senha)
    user.save()

    messages.success(request, "Cadastro realizado com sucesso!")
    return redirect('login')  # Redireciona para a página de login

@login_required
def adm_agenda(request):
    return render(request, 'Admin/Agenda.html')

@login_required
def adicionar_produto(request):
    if request.method == 'POST':
        # Pega os dados do formulário
        nome = request.POST.get('productName')
        preco = request.POST.get('productPrice')
        descricao = request.POST.get('productDescription')
        imagem = request.FILES.get('productImage')

        # Cria um novo produto
        produto = Produto(
            nome=nome,
            preco=preco,
            descricao=descricao,
            imagem=imagem
        )
        produto.save()  # Salva o produto no banco de dados

        # Redireciona de volta para a página de produtos
        return redirect('listar_produto')  # Nome da URL para a página que lista os produtos

    produtos = Produto.objects.all()  # Pega todos os produtos no banco de dados
    return render(request, 'Admin/adm_produto.html', {'produtos': produtos})
@login_required
def listar_produtos(request):
    produtos = Produto.objects.all()  # Pega todos os produtos no banco de dados
    return render(request, 'Admin/listar_produtos.html', {'produtos': produtos})

@login_required
def editar_produto(request, produto_id):
    produto = get_object_or_404(Produto, id=produto_id)  # Pega o produto a ser editado
    if request.method == 'POST':
        produto.nome = request.POST.get('productName')
        produto.preco = request.POST.get('productPrice')
        produto.descricao = request.POST.get('productDescription')
        if 'productImage' in request.FILES:
            produto.imagem = request.FILES.get('productImage')
        produto.save()  # Salva as alterações no produto

        return redirect('produtos')  # Redireciona para a página de produtos

    return render(request, 'Admin/editar_produto.html', {'produto': produto})

@login_required
def excluir_produto(request, produto_id):
    produto = get_object_or_404(Produto, id=produto_id)
    produto.delete()  # Exclui o produto do banco de dados
    return redirect('listar_produto')  # Redireciona para a página de produtos


@login_required
def comentarios(request):
    # Obter todos os comentários, ordenados pela data de criação
    comentarios = Comentario.objects.all().order_by('-data_criacao')
    return render(request, 'Admin/Comentarios.html', {
        'comentarios': comentarios
    })
    
@login_required
def excluir_comentarios(request):
    if request.method == "POST":
        comentario_id = request.POST.get('delete_comentario')
        comentario = get_object_or_404(Comentario, id=comentario_id)
        comentario.delete()
        return redirect('excluir_comentarios')  

    comentarios = Comentario.objects.all().order_by('-data_criacao')
    return render(request, 'Admin/excluir_comentarios.html', {'comentarios': comentarios})    
    
@login_required   
def listar_agendamentos2(request):
    agendamentos = Agendamento.objects.all()  # Busca todos os agendamentos no banco
    return render(request, 'Admin/listar_agendamentos.html', {'agendamentos': agendamentos})

@login_required
def cancelar_agendamento(request, agendamento_id):
    agendamento = get_object_or_404(Agendamento, id=agendamento_id)
    agendamento.delete()  # Remove do banco de dados
    return redirect('adm_agendamentos')

@login_required
def remarcar_agendamento(request, agendamento_id):
    agendamento = get_object_or_404(Agendamento, id=agendamento_id)
   
    return redirect('editar_agendamento', agendamento_id=agendamento.id)

@login_required
def dashboard(request):
    # Conta quantas vezes cada serviço foi agendado
    servicos_mais_agendados = (
        Agendamento.objects.values('servico')
        .annotate(total=Count('servico'))
        .order_by('-total')  # Ordena do mais agendado para o menos agendado
    )

    # Calcula o faturamento total
    faturamento_total = Agendamento.objects.aggregate(Sum('valor'))['valor__sum'] or 0

    context = {
        'servicos_mais_agendados': servicos_mais_agendados,
        'faturamento_total': faturamento_total
    }
    return render(request, 'Admin/dashboard.html', context)

@login_required
# Exibir a lista de itens de estoque
def listar_estoque(request):
    itens = Estoque.objects.all()
    return render(request, 'Admin/listar.html', {'itens': itens})

@login_required
def adicionar_item(request):
    if request.method == 'POST':
        nome = request.POST.get('nome')
        descricao = request.POST.get('descricao')
        quantidade = int(request.POST.get('quantidade'))
        preco = float(request.POST.get('preco'))

        # Criando o item no banco de dados
        Estoque.objects.create(
            nome=nome,
            descricao=descricao,
            quantidade=quantidade,
            preco=preco
        )
        return redirect('listar_estoque')  # Redireciona para a listagem de estoque
    return render(request, 'Admin/adicionar.html')

@login_required
def editar_item(request, id):
    item = get_object_or_404(Estoque, id=id)

    if request.method == 'POST':
        item.nome = request.POST.get('nome')
        item.descricao = request.POST.get('descricao')
        item.quantidade = int(request.POST.get('quantidade'))
        item.preco = float(request.POST.get('preco'))

        item.save()  # Salva as alterações no banco de dados
        return redirect('listar_estoque')  # Redireciona para a listagem de estoque
    
    return render(request, 'Admin/editar.html', {'item': item})

@login_required
def excluir_item(request, id):
    item = get_object_or_404(Estoque, id=id)
    if request.method == 'POST':
        item.delete()  # Deleta o item do banco de dados
        return redirect('listar_estoque')  # Redireciona para a listagem de estoque
    return render(request, 'Admin/excluir.html', {'item': item})

@login_required
def base_view(request):
    return render(request, 'Admin/estoque.html')



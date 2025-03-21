from django.shortcuts import render, redirect, get_object_or_404
from Admin.models import Produto
from .models import Comentario
from .models import Agendamento
from django.contrib import messages
from django.http import JsonResponse
from django.db.models import Count, Sum

def index(request):
    range_numbers = range(1, 13)  # Lista de 1 a 12
    return render(request, 'HairStyle/index.html', {'range_numbers': range_numbers})

def agenda(request):
    return render(request, 'HairStyle/agenda.html')

def comentarios(request):
    return render(request, 'HairStyle/Comentarios.html')

def produtos(request):
    produtos = Produto.objects.all()  # Pega todos os produtos do banco de dados
    return render(request, 'HairStyle/produtos.html', {'produtos': produtos})

def comentarios_view(request):
    if request.method == 'POST':
        nome = request.POST.get('nome')
        comentario = request.POST.get('comentario')

        if nome and comentario:
            novo_comentario = Comentario.objects.create(nome=nome, comentario=comentario)

            # Se for uma requisição AJAX, retorna apenas o novo comentário
            if request.headers.get('X-Requested-With') == 'XMLHttpRequest':
                return JsonResponse({
                    'nome': novo_comentario.nome,
                    'comentario': novo_comentario.comentario,
                    'data_criacao': novo_comentario.data_criacao.strftime('%d/%m/%Y %H:%M')
                })

            return redirect(request.path)

    comentarios = Comentario.objects.all().order_by('-data_criacao')
    return render(request, 'HairStyle/Comentarios.html', {'comentarios': comentarios})

def agendar_servico(request):
    if request.method == 'POST':
        try:
            nome = request.POST.get('nome')
            servico = request.POST.get('servico')
            profissional = request.POST.get('profissional')
            data = request.POST.get('data')
            hora = request.POST.get('hora')
            mensagem = request.POST.get('mensagem', '')

            # Dicionário de preços dos serviços
            valor_dict = {
                'CorteSocial': 20,
                'CorteDegrade': 25,
                'CorteEBarba': 40,
                'CorteBarbaSombracelha': 50,
                'Coloracao': 100,
            }
            valor = valor_dict.get(servico, 0)

            # Verifica se já existem 3 agendamentos no mesmo horário
            agendamentos_existentes = Agendamento.objects.filter(data=data, hora=hora).count()
            if agendamentos_existentes >= 3:
                messages.error(request, "Este horário já está totalmente reservado. Escolha outro horário.")
                return redirect('index')

            # Criando e salvando o agendamento
            agendamento = Agendamento(
                nome=nome,
                servico=servico,
                profissional=profissional,
                data=data,
                hora=hora,
                mensagem=mensagem,
                valor=valor
            )
            agendamento.save()

            messages.success(request, "Agendamento realizado com sucesso!")
            return redirect('index')

        except Exception as e:
            messages.error(request, f"Erro ao salvar agendamento: {e}")
            return redirect('index')

    return render(request, 'HairStyle/index.html')

def verificar_horarios(request):
    horarios_cheios = []
    horarios = Agendamento.objects.values("data", "hora").annotate(count=Count("id"))

    for h in horarios:
        if h["count"] >= 3:
            horarios_cheios.append(h["hora"])

    return JsonResponse({"horarios_cheios": horarios_cheios})




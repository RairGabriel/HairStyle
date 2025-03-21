from django.urls import path
from . import views
from django.conf import settings
from django.conf.urls.static import static
from django.contrib.auth.decorators import login_required

urlpatterns = [
    path('agenda/', views.adm_agenda, name='adm_agenda'),
    
    path('cadastro/', views.cadastro, name='cadastro'),
    #path('comentarios/', views.comentarios, name='adm_comentarios'),
    path('produtos/adicionar/', login_required(views.adicionar_produto), name='adicionar_produto'),  # Protegido por login_required
    path('produtos/', views.listar_produtos, name='listar_produto'),
    path('produtos/editar/<int:produto_id>/', views.editar_produto, name='editar_produto'),
    path('produtos/excluir/<int:produto_id>/', views.excluir_produto, name='excluir_produto'),
    path('adm_agendamentos/', views.listar_agendamentos2, name='adm_agendamentos'),
    path('agendamentos/cancelar/<int:agendamento_id>/', views.cancelar_agendamento, name='cancelar_agendamento'),
    #path('agendamentos/remarcar/<int:agendamento_id>/', views.remarcar_agendamento, name='remarcar_agendamento'),
    path('dashboard/', views.dashboard, name='dashboard'),
    #path('estoque', views.base_view, name='estoque'),  # Página inicial (base)
    path('estoque/', views.listar_estoque, name='listar_estoque'),
    path('estoque/adicionar/', views.adicionar_item, name='adicionar_item'),
    path('estoque/editar/<int:id>/', views.editar_item, name='editar_item'),
    path('estoque/excluir/<int:id>/', views.excluir_item, name='excluir_item'),
    path('comentarios/', views.comentarios, name='adm_comentarios'),
    path('comentarios/excluir/', views.excluir_comentarios, name='excluir_comentarios'),
]

# Para servir arquivos de mídia
urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)

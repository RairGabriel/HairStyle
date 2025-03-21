from django.urls import path
from . import views



urlpatterns = [
    path('', views.index, name='index'),
    path('agenda/', views.agenda, name='agenda'),  # Página de agendamento
    path('comentarios/', views.comentarios, name='comentarios'),
    path('comentarios/enviar/', views.comentarios_view, name='comentarios_enviar'),  
    path('produtos/', views.produtos, name='produtos'),
    path('agendar/', views.agendar_servico, name='agendar_servico'),
    path("verificar_horarios/", views.verificar_horarios, name="verificar_horarios"),
]

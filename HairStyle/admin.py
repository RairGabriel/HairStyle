# admin.py
from django.contrib import admin
from .models import Comentario
from .models import Agendamento

class ComentarioAdmin(admin.ModelAdmin):
    list_display = ('nome', 'comentario', 'data_criacao')  # Exibe o nome, comentário e data de criação na lista
    search_fields = ('nome', 'comentario')  # Permite buscar comentários pelo nome ou conteúdo
    list_filter = ('data_criacao',)  # Permite filtrar os comentários pela data de criação

# Registra o modelo e o admin personalizado
admin.site.register(Comentario, ComentarioAdmin)



@admin.register(Agendamento)
class AgendamentoAdmin(admin.ModelAdmin):
    list_display = ('nome', 'servico', 'profissional', 'data', 'hora', 'valor')
    list_filter = ('servico', 'profissional', 'data')
    search_fields = ('nome', 'servico', 'profissional')
    ordering = ('data', 'hora')

    fieldsets = (
        ('Informações do Cliente', {
            'fields': ('nome', 'mensagem')
        }),
        ('Detalhes do Agendamento', {
            'fields': ('servico', 'profissional', 'data', 'hora', 'valor')
        }),
    )


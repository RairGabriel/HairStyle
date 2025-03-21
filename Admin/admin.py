from django.contrib import admin

from .models import Postagem

from .models import Produto

# Register your models here.


# @admin.register(Postagem)
class PostagemAdmin(admin.ModelAdmin):
    list_display = ['id', 'titulo', 'conteudo']
    list_display_links = ['id']
    list_editable = ['titulo']
    ordering = ['titulo']
    # list_per_page = 3


admin.site.register(Postagem, PostagemAdmin)



class ProdutoAdmin(admin.ModelAdmin):
    list_display = ('nome', 'preco', 'descricao', 'imagem')

admin.site.register(Produto, ProdutoAdmin)


from django.contrib import admin
from .models import Estoque

class EstoqueAdmin(admin.ModelAdmin):
    # Campos a serem exibidos na lista do Admin
    list_display = ('nome', 'descricao', 'quantidade', 'preco', 'data_adicao')

    # Campos filtráveis na barra lateral do Admin
    list_filter = ('data_adicao', 'quantidade')

    # Campos pesquisáveis no Admin
    search_fields = ('nome', 'descricao')

    # Ordenação padrão na lista
    ordering = ('-data_adicao',)  # Ordena pela data de adição (mais recente primeiro)

    # Formatação de campos
    fieldsets = (
        (None, {
            'fields': ('nome', 'descricao', 'quantidade', 'preco', 'data_adicao')
        }),
    )

    # Definir que o campo 'data_adicao' será somente leitura
    readonly_fields = ('data_adicao',)

# Registra o modelo Estoque no Admin
admin.site.register(Estoque, EstoqueAdmin)




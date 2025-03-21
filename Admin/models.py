from django.db import models
#-------------------------------------------------------------------------
# Create your models here.
class Postagem(models.Model):
    titulo = models.CharField(max_length=20)
    conteudo = models.TextField(max_length=50)
    imagem = models.ImageField(upload_to="images/", blank=True, null=True)

    class Meta:
        verbose_name_plural = 'Postagens'

    def __str__(self):
        return self.titulo
#--------------------------------------------------------------------------

class Produto(models.Model):
    nome = models.CharField(max_length=100)
    preco = models.DecimalField(max_digits=10, decimal_places=2)
    descricao = models.TextField()
    imagem = models.ImageField(upload_to='produtos/')

    def __str__(self):
        return self.nome

class Estoque(models.Model):
    nome = models.CharField(max_length=100)
    descricao = models.TextField()
    quantidade = models.IntegerField()
    preco = models.DecimalField(max_digits=10, decimal_places=2)
    data_adicao = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.nome
    




    

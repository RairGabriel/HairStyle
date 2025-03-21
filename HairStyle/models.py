# models.py
from django.db import models

class Comentario(models.Model):
    nome = models.CharField(max_length=255)
    comentario = models.TextField()
    data_criacao = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Comentário de {self.nome} em {self.data_criacao}"

class Agendamento(models.Model):
    nome = models.CharField(max_length=100)
    servico = models.CharField(max_length=50)
    profissional = models.CharField(max_length=50)
    data = models.DateField()
    hora = models.TimeField()
    mensagem = models.TextField(blank=True, null=True)
    valor = models.DecimalField(max_digits=10, decimal_places=2)  # Valor do serviço

    def __str__(self):
        return f"{self.nome} - {self.servico} ({self.data} às {self.hora})"

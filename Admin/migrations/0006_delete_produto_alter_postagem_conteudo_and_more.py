# Generated by Django 5.1.7 on 2025-03-16 00:38

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('Admin', '0005_produto_imagem'),
    ]

    operations = [
        migrations.DeleteModel(
            name='Produto',
        ),
        migrations.AlterField(
            model_name='postagem',
            name='conteudo',
            field=models.TextField(max_length=50),
        ),
        migrations.AlterField(
            model_name='postagem',
            name='titulo',
            field=models.CharField(max_length=20),
        ),
    ]

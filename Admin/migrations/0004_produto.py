# Generated by Django 5.1.7 on 2025-03-13 14:38

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('Admin', '0003_alter_postagem_conteudo_alter_postagem_titulo'),
    ]

    operations = [
        migrations.CreateModel(
            name='Produto',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('nome', models.CharField(max_length=255)),
                ('descricao', models.TextField()),
                ('preco', models.DecimalField(decimal_places=2, max_digits=10)),
            ],
        ),
    ]

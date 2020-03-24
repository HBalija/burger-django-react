# Generated by Django 3.0.4 on 2020-03-24 19:07

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('orders', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='Ingredient',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('salad', models.PositiveSmallIntegerField(default=0)),
                ('bacon', models.PositiveSmallIntegerField(default=0)),
                ('meat', models.PositiveSmallIntegerField(default=0)),
                ('cheese', models.PositiveSmallIntegerField(default=0)),
            ],
        ),
    ]

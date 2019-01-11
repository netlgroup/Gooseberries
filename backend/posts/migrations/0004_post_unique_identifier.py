# Generated by Django 2.1.5 on 2019-01-10 12:37

import backend.utils
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('posts', '0003_auto_20190110_0604'),
    ]

    operations = [
        migrations.AddField(
            model_name='post',
            name='unique_identifier',
            field=models.CharField(default=backend.utils.id_generator, max_length=8),
        ),
    ]
# Generated by Django 2.1.5 on 2019-01-08 13:45

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('threads', '0003_auto_20190108_1343'),
    ]

    operations = [
        migrations.AlterField(
            model_name='thread',
            name='id',
            field=models.BigAutoField(editable=False, primary_key=True, serialize=False),
        ),
    ]

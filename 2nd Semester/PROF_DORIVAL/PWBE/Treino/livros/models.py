from django.db import models

class Livro(models.Model):  
    titulo = models.CharField(max_length=50)
    autor = models.CharField(max_length=30)
    paginas = models.IntegerField()
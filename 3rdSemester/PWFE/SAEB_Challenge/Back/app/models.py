from django.db import models

class Users(models.Model):
    idUser = models.CharField(primary_key=True)
    name = models.CharField(max_length=256)
    email = models.EmailField()

class Tasks(models.Model):
    idTask = models.CharField()
    description = models.TextField()
    department = models.CharField()
    priorityChoices = {
        ('Low', 'Low Priority'),
        ('Medium', 'Medium Priority'),
        ('High', 'High Prioriry'),
    }
    priority = models.CharField(choices=priorityChoices)
    createdDate = models.DateField()
    statusChoices = {
        ('Todo', 'To-Do'),
        ('Doing', 'Doing'),
        ('Done', 'Done'),
    }
    status = models.CharField(choices=statusChoices, default="To-Do")

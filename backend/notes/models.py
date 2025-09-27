from django.db import models

# Create your models here.
import uuid

class User(models.Model):
    userid = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    username = models.CharField(max_length=100, unique=True)
    useremail = models.EmailField(unique=True)
    password = models.CharField(max_length=128)
    lastupdate = models.DateTimeField(auto_now=True)
    createdon = models.DateTimeField(auto_now_add=True)

class Note(models.Model):
    noteid = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    notetitle = models.CharField(max_length=255)
    notecontent = models.TextField()
    owner = models.ForeignKey(User, on_delete=models.CASCADE, related_name="notes")
    lastupdate = models.DateTimeField(auto_now=True)
    createdon = models.DateTimeField(auto_now_add=True)

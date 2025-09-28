from django.db import models
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager, PermissionsMixin
# Create your models here.
import uuid

class UserManager(BaseUserManager):
    def create_user(self, username, useremail, password=None):
        if not username or not useremail:
            raise ValueError("Username and email are required")
        user = self.model(username=username, useremail=useremail)
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, username, useremail, password):
        user = self.create_user(username, useremail, password)
        user.is_staff = True
        user.is_superuser = True
        user.save(using=self._db)
        return user
    
class User(AbstractBaseUser, PermissionsMixin):
    userid = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    username = models.CharField(max_length=100, unique=True)
    useremail = models.EmailField(unique=True)
    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)

    # Avoid reverse clashes
    groups = models.ManyToManyField("auth.Group", related_name="notes_users", blank=True)
    user_permissions = models.ManyToManyField(
        "auth.Permission", related_name="notes_users_permissions", blank=True
    )

    objects = UserManager()
    USERNAME_FIELD = "username"
    REQUIRED_FIELDS = ["useremail"]

    def __str__(self):
        return self.username

class Note(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    notetitle = models.CharField(max_length=255)
    notecontent = models.TextField()
    owner = models.ForeignKey(User, on_delete=models.CASCADE, related_name="notes")
    lastupdate = models.DateTimeField(auto_now=True)
    createdon = models.DateTimeField(auto_now_add=True)

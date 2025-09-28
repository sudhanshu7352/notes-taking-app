from rest_framework import generics, permissions, status
from rest_framework.response import Response
from rest_framework.permissions import AllowAny, IsAuthenticated
from .models import User, Note
from django.contrib.auth import authenticate, login
from .serializers import UserSerializer, NoteSerializer
from django.contrib.auth.hashers import make_password, check_password
from rest_framework.views import APIView
class RegisterUser(generics.CreateAPIView):
    serializer_class = UserSerializer
    permission_classes = [AllowAny]
    # def perform_create(self, serializer):
    #     serializer.save(password=make_password(self.request.data['password']))

class LoginUser(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        username = request.data.get("username")
        password = request.data.get("password")
        user = authenticate(request, username=username, password=password)
        if user:
            login(request, user)
            return Response({"detail": "Logged in successfully"})
        return Response({"detail": "Invalid credentials"}, status=status.HTTP_400_BAD_REQUEST)

class NoteListCreate(generics.ListCreateAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = NoteSerializer

    def get_queryset(self):
        return Note.objects.filter(owner=self.request.user)

    def perform_create(self, serializer):
        print("perfrm create")
        serializer.save()

class NoteRetrieveUpdateDestroy(generics.RetrieveUpdateDestroyAPIView):
    permission_classes = [permissions.IsAuthenticated]
    serializer_class = NoteSerializer

    def get_queryset(self):
        return Note.objects.filter(owner=self.request.user)

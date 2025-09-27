from django.urls import path
from .views import RegisterUser, LoginUser, NoteListCreate, NoteRetrieveUpdateDestroy

urlpatterns = [
    path('register/', RegisterUser.as_view(), name='register'),
    path('login/', LoginUser.as_view(), name='login'),
    path('notes/', NoteListCreate.as_view(), name='notes-list-create'),
    path('notes/<uuid:pk>/', NoteRetrieveUpdateDestroy.as_view(), name='note-rud'),
]

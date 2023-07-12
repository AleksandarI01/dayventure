from django.urls import path

from user.views import RetrieveUpdateDeleteUserView, RetrieveUsersList, RetrieveUserByIDView

urlpatterns = [
    path('me/', RetrieveUpdateDeleteUserView.as_view(), name='user-profile'),
    path('', RetrieveUsersList.as_view()),
    path('<int:user_id>/', RetrieveUserByIDView.as_view()),
    ]

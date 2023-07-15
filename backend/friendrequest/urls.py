from django.urls import path

from friendrequest.views import FriendsListView, FriendrequestPostView, FriendrequestGetPatchDeleteView, \
    FriendrequestListView

urlpatterns = [
    path('', FriendsListView.as_view()),
    path('request/<int:user_id>/', FriendrequestPostView.as_view()),
    path('requests/', FriendrequestListView.as_view()),
    path('requests/<int:friendrequest_id>/', FriendrequestGetPatchDeleteView.as_view()),
]

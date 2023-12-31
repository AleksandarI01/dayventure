"""
URL configuration for project project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.conf.urls.static import static
from django.contrib import admin
from django.urls import path, include
from rest_framework import permissions
from rest_framework_simplejwt import views as jwt_views
from drf_yasg.views import get_schema_view
from drf_yasg import openapi

from category.views import CategoryListView
from project import settings
from trip.views import ListTripsView, GeneralSearchListView

schema_view = get_schema_view(
   openapi.Info(
      title="DayVenture API",
      default_version='v1',
      description="API for the DayVenture App. Plan your adventure here. Every Day!",
      terms_of_service="https://www.google.com/policies/terms/",
      contact=openapi.Contact(email="dayventure.app@gmail.com"),
      license=openapi.License(name="BSD License"),
   ),
   public=True,  # Set to False restrict access to protected endpoints
   permission_classes=[permissions.AllowAny],  # Permissions for docs access
)

urlpatterns = [
   # Admin stuff
   path('api/admin/', admin.site.urls),
   path('api/docs/', schema_view.with_ui('swagger', cache_timeout=0), name='schema-swagger-ui'),

   # Token handling
   path('api/auth/token/', jwt_views.TokenObtainPairView.as_view(), name='token_obtain_pair'),
   path('api/auth/token/refresh/', jwt_views.TokenRefreshView.as_view(), name='token_refresh'),
   path('api/auth/token/verify/', jwt_views.TokenVerifyView.as_view(), name='token_refresh'),

   path('api/registration/', include('user_registration.urls')),
   path('api/password-reset/', include('user_registration.urls')),

   # main apps
   path('api/users/', include('user.urls')),
   path('api/friends/', include('friendrequest.urls')),
   path('api/trips/', include('trip.urls')),
   path('api/home/', ListTripsView.as_view()),
   path('api/categories/', CategoryListView.as_view()),
   path('api/notifications/', include('notification.urls')),
   path('api/search/', GeneralSearchListView.as_view()),

]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)

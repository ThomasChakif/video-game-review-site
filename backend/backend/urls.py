from django.contrib import admin
from django.urls import path, include
from api.views import CreateUserView
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView # we can use the pre-built views to gain and use user tokens

urlpatterns = [
    path("admin/", admin.site.urls),
    path("api/user/register/", CreateUserView.as_view(), name="register"), # when we go to this route, it'll call the view (CreateUserView) and allow us to create a new user
    path("api/token/", TokenObtainPairView.as_view(), name="get_token"),
    path("api/token/refresh/", TokenRefreshView.as_view(), name="refresh"),
    path("api-auth/", include("rest_framework.urls")), # link all of the prebuilt urls from the rest_framework
    # path("api/", include("api.urls")), #include all of the urls from the urls.py in the api folder
]
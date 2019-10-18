
from django.contrib import admin
from django.urls import path, include
from . import views 
from result.views import upload, download, list


urlpatterns = [
    path('', views.index, name='index'), #Home
    path('admin/', admin.site.urls),
    path('result/', include('result.urls')),
    path('register/', views.register, name="register"),
    path('accounts/', include('django.contrib.auth.urls')),
    path('profile/', views.profile, name="profile"),
    path('upload/', upload, name='upload'),
    path('download/', download, name='download'),
    path('list/', list, name='list' ),    

]

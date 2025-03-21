from django.conf import settings
from django.contrib import admin
from django.urls import path, include
from django.conf.urls.static import static

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', include('HairStyle.urls')),  # Inclui as URLs do HairStyle
    path('admin-panel/', include('Admin.urls')),  # Inclui as URLs do app Admin
    path('accounts/', include('django.contrib.auth.urls')),  # URLs de autenticação do Django
    
]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)


urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)

import os

from django.conf import settings
from django.conf.urls import include, url
from django.contrib import admin
from django.views.static import serve
from rest_framework import routers

from api import views


router = routers.DefaultRouter()
router.register('geolocations', views.GeoLocationViewSet)
router.register('markers', views.MarkerViewSet)

urlpatterns = [
    url(r'^api/v1/', include(router.urls)),
    url(r'^admin/', include(admin.site.urls)),
    url(r'^api-auth/',
        include('rest_framework.urls', namespace='rest_framework'))
]

if settings.DEBUG:
    doc_root = os.path.join(settings.BASE_DIR, "kudu/dist/")
    # static_ptn = static('^$', document_root=doc_root,
    #                     show_indexes=True, path="index.html")
    # print static_ptn
    # urlpatterns += static_ptn
    urlpatterns += [
        url(r'^$', serve, {'document_root': doc_root, 'path': 'index.html'}),
        url(r'^(?P<path>.+)$', serve, {'document_root': doc_root}),
    ]


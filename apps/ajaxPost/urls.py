from django.conf.urls import url
from . import views
urlpatterns = [
    url(r'^$', views.index),
    url(r'newQuote$', views.newQuote),
    url(r'getQuotes$', views.getQuotes)
]
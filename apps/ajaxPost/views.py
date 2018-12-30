from django.shortcuts import render, HttpResponse, redirect
from django.contrib import messages
from .models import *
from django.core import serializers
import json
from django.http import JsonResponse


def index(request):
    context = {
        "quotes" : "quotes"
    }
    
    return render(request, "index.html", context)

def newQuote(request):
    print(request.POST)
    Quote.objects.create(text = request.POST['message'])
    return redirect('/post/getQuotes')
def getQuotes(request):
    print(request)
    quotes = Quote.objects.all()
    return JsonResponse({'quotes': list(quotes.values())})

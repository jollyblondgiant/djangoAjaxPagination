from django.shortcuts import render, HttpResponse, redirect
from django.contrib import messages
from .models import *
from django.core import serializers
import json
from django.http import JsonResponse
import requests

def index(request):
    users = User.objects.all()
    if len(users) == 0:
        response = requests.get('https://randomuser.me/api/')
        results = response.json()['results']
        User.objects.create(first_name = results[0]['name']['first'], last_name = results[0]['name']['last'], email = results[0]['email'])
    context = {'users': users}
    return render(request, "pagination.html", context)

def name(request):
    # idx = 1
    # table = []
    # response = {}
    users = User.objects.filter(first_name__startswith = request.GET['name']).filter(created_at__gte = request.GET['start']).filter(created_at__lte = request.GET['end'])
    # for user in users:
    #     if len(table) < 5:
    #         table.append(user)
    #         response[idx] = table
    #     else:
    #         idx += 1
    #         table = []
    #         table.append(user)
    #         response[idx] = table
    # print("USERS", users)
    # print("RESPONSE", response)
    return JsonResponse({'users': list(users.values())})



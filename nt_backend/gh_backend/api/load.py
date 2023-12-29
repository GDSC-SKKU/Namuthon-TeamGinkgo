import json
from django.http import HttpResponse, JsonResponse
from django.shortcuts import render, redirect
from django.urls import path

from gh_backend.api.function.analyze_plant import gh_call as analyze_plant

def api_render(name, output):
    return path(f'{name}/', output, name=name)

def api_path():
    return [
        api_render('api/analyze_plant', analyze_plant)
    ]
import json
from django.http import HttpResponse, JsonResponse
from django.shortcuts import render, redirect
from django.urls import path

from gh_backend.api.function.hello_world import gh_call as hello_world
from gh_backend.api.function.site_info import gh_call as site_info

def api_render(name, output):
    return path(f'{name}/', output, name=name)

def api_path():
    return [
        api_render('api/gpt', hello_world),
        api_render('api/cefr', site_info),
        api_render('api/session_end', site_info),
    ]
from django.http import HttpResponse, JsonResponse
from gh_backend.config.env import SITE_URL, SITE_NAME

def gh_call(request):
    return JsonResponse({
        'name': SITE_NAME,
        'url': SITE_URL,
    })
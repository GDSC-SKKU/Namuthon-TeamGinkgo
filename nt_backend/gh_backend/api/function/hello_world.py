from django.http import HttpResponse, JsonResponse

def gh_call(request):
    return JsonResponse({
        'message': 'Hello World!'
    })
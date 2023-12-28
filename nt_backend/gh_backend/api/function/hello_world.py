from django.http import HttpResponse, JsonResponse
import json

# 예시 데이터
example_data = {
    "name": "딸기",
    "accuracy": 0.95,
    "disease": [
        {"name": "딸기잿빛곰팡이병", "type": "초기"}
    ],
    "information": {
        "병징": "처음에는 꽃잎에 침입하고 차차 수술, 암술, 꽃받침 및 수확기 과일에 발생하고 발생한 과일은 1-2일사이에 문드러지고 회색가루의 곰팡이가 생긴다. 개화후 발병한 것은 어린과일이 미이라 현상으로 갈변한다. 병원균(Botrytis cinerea) 균사, 포자(분생포자), 균핵을 형성한다. 균사, 포자형태로 당해를 보내며 포자도 전염된다.",
        "방제": "과다한 시비와 밀식을 피하고, 과번무가 되지 않도록 한다. 자주 환기하여 시설내 병원균의 밀도를 낮추는 것이 중요하다."
    }
}

def gh_call(request):
    # POST JSON 데이터를 처리
    if request.method == 'POST':
        try:
            request_data = json.loads(request.body)
            for key in request_data:
                example_data[key] = request_data[key]
        except json.JSONDecodeError:
            return JsonResponse({"error": "Invalid JSON"}, status=400)

    return JsonResponse(example_data)
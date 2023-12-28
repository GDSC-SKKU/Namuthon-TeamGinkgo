from django.http import HttpResponse, JsonResponse

def gh_call(request):
    
    global response_count
    response_count = -1
    
    response_list = [
        "Hello! I'm a police officer. Do you have any questions about law enforcement or anything else you'd like to discuss?",
        "I'm glad to hear that! What specific questions or topics would you like to discuss today?",
        "Could you please provide more details on that? What specifically would you like to know about the police?",
        "A police officer enforces the law, maintains public order, and prevents, detects, and investigates crimes. We also respond to emergencies and assist the public. Is there anything else you'd like to know about the role of a police officer?",
        "Police officers respond to a wide range of emergencies, including accidents, medical emergencies, domestic disturbances, and criminal activities. Is there a specific type of emergency you're interested in learning more about?",
        "I'm interested in hearing more about this. Could you elaborate on the specific type of emergency you'd like to learn more about?",
        "Police officers often respond to emergencies such as accidents, domestic disputes, violent incidents, and medical emergencies. Is there anything else you'd like to know about the emergencies police officers handle?",
        "Your input is valuable. Could you expand a bit more on that point? Are there any specific aspects of police work or emergencies you'd like to discuss in more detail?",
    ]
    
    response_count = response_count + 1
    message = response_list[response_count]
    return JsonResponse({
        'messages': {
            "role": 'PoliceOfficer',
            "content": message
        }
    })
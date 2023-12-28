from django.http import HttpResponse, JsonResponse
from pymongo.mongo_client import MongoClient

import numpy as np
import pandas as pd
import matplotlib.pyplot as plt
import cv2
from glob import glob
import os
import json
import torch
from torch import nn
from torchvision import models
from torch.utils.data import Dataset
import torch.nn.functional as F
import base64
from gh_backend.base_dir import BASE_DIR
import warnings
warnings.filterwarnings("ignore")

MODEL_PATH = os.path.join(BASE_DIR, 'gh_backend', 'model', 'best_model.pt')

def Return_Disease_Function(base64_input):
    crop = {'1':'딸기','2':'토마토','3':'파프리카','4':'오이','5':'고추','6':'시설포도'}
    disease = {'1':{'a1':'딸기잿빛곰팡이병','a2':'딸기흰가루병','b1':'냉해피해','b6':'다량원소결핍 (N)','b7':'다량원소결핍 (P)','b8':'다량원소결핍 (K)'},
            '2':{'a5':'토마토흰가루병','a6':'토마토잿빛곰팡이병','b2':'열과','b3':'칼슘결핍','b6':'다량원소결핍 (N)','b7':'다량원소결핍 (P)','b8':'다량원소결핍 (K)'},
            '3':{'a9':'파프리카흰가루병','a10':'파프리카잘록병','b3':'칼슘결핍','b6':'다량원소결핍 (N)','b7':'다량원소결핍 (P)','b8':'다량원소결핍 (K)'},
            '4':{'a3':'오이노균병','a4':'오이흰가루병','b1':'냉해피해','b6':'다량원소결핍 (N)','b7':'다량원소결핍 (P)','b8':'다량원소결핍 (K)'},
            '5':{'a7':'고추탄저병','a8':'고추흰가루병','b3':'칼슘결핍','b6':'다량원소결핍 (N)','b7':'다량원소결핍 (P)','b8':'다량원소결핍 (K)'},
            '6':{'a11':'시설포도탄저병','a12':'시설포도노균병','b4':'일소피해','b5':'축과병'}}
    risk = {'1':'초기','2':'중기','3':'말기'}

    label_decoder = {0: '1_00_0', 1: '1_a1_1', 2: '1_a1_2', 3: '1_a1_3', 4: '1_a2_1', 5: '1_a2_2', 6: '1_a2_3', 7: '1_b1_1', 8: '1_b1_2', 9: '1_b1_3', 10: '1_b6_1', 11: '1_b6_2', 12: '1_b6_3', 13: '1_b7_1', 14: '1_b7_2', 15: '1_b7_3', 16: '1_b8_1', 17: '1_b8_2', 18: '1_b8_3', 19: '2_00_0', 20: '2_a5_1', 21: '2_a5_2', 22: '2_a5_3', 23: '2_a6_1', 24: '2_a6_2', 25: '2_a6_3', 26: '2_b2_1', 27: '2_b2_2', 28: '2_b2_3', 29: '2_b3_1', 30: '2_b3_2', 31: '2_b3_3', 32: '2_b6_1', 33: '2_b6_2', 34: '2_b6_3', 35: '2_b7_1', 36: '2_b7_2', 37: '2_b7_3', 38: '2_b8_1', 39: '2_b8_2', 40: '2_b8_3', 41: '3_00_0', 42: '3_a9_1', 43: '3_a9_2', 44: '3_a9_3', 45: '3_a10_1', 46: '3_a10_2', 47: '3_a10_3', 48: '3_b3_1', 49: '3_b3_2', 50: '3_b3_3', 51: '3_b6_1', 52: '3_b6_2', 53: '3_b6_3', 54: '3_b7_1', 55: '3_b7_2', 56: '3_b7_3', 57: '3_b8_1', 58: '3_b8_2', 59: '3_b8_3', 60: '4_00_0', 61: '4_a3_1', 62: '4_a3_2', 63: '4_a3_3', 64: '4_a4_1', 65: '4_a4_2', 66: '4_a4_3', 67: '4_b1_1', 68: '4_b1_2', 69: '4_b1_3', 70: '4_b6_1', 71: '4_b6_2', 72: '4_b6_3', 73: '4_b7_1', 74: '4_b7_2', 75: '4_b7_3', 76: '4_b8_1', 77: '4_b8_2', 78: '4_b8_3', 79: '5_00_0', 80: '5_a7_1', 81: '5_a7_2', 82: '5_a7_3', 83: '5_a8_1', 84: '5_a8_2', 85: '5_a8_3', 86: '5_b3_1', 87: '5_b3_2', 88: '5_b3_3', 89: '5_b6_1', 90: '5_b6_2', 91: '5_b6_3', 92: '5_b7_1', 93: '5_b7_2', 94: '5_b7_3', 95: '5_b8_1', 96: '5_b8_2', 97: '5_b8_3', 98: '6_00_0', 99: '6_a11_1', 100: '6_a11_2', 101: '6_a11_3', 102: '6_a12_1', 103: '6_a12_2', 104: '6_a12_3', 105: '6_b4_1', 106: '6_b4_2', 107: '6_b4_3', 108: '6_b5_1', 109: '6_b5_2',110: '6_b5_3'}
    
    class CNN_Model(nn.Module):
        def __init__(self, class_n, rate=0.1):
            super(CNN_Model, self).__init__()
            self.model = models.resnet50(pretrained=True)
            self.dropout = nn.Dropout(rate)
            self.output_layer = nn.Linear(in_features=1000, out_features=class_n, bias=True)

        def forward(self, inputs):
            output = self.output_layer(self.dropout(self.model(inputs)))
            return output

    model = CNN_Model(112)
    save_path = MODEL_PATH
    model.load_state_dict(torch.load(save_path, map_location=torch.device('cpu')))

    model.eval()
    base64_input = base64_input.split(",")[1]
    input = base64.b64decode(base64_input)
    nparr = np.frombuffer(input, np.uint8)
    img = cv2.imdecode(nparr, cv2.IMREAD_COLOR)
    img = cv2.resize(img, dsize=(256, 256), interpolation=cv2.INTER_AREA)
    img = img.astype(np.float32) / 255
    img = np.transpose(img, (2, 0, 1))
    model.eval()

    output = model(torch.tensor(img, dtype=torch.float32).unsqueeze(0))
    probabilities = F.softmax(output, dim=1)

    # Get the highest probability and its corresponding index
    max_prob, prediction = torch.max(probabilities, dim=1)
    max_prob = max_prob.item()  # Convert to a Python number

    detection = label_decoder[torch.tensor(torch.argmax(output, dim=1), dtype=torch.int32).detach().numpy()[0]]
    detection = detection.split("_")
    name = crop[detection[0]]
    disease_name = disease[detection[0]][detection[1]]
    if detection[2] == 0:
        risk_name = None
    else:
        risk_name = risk[detection[2]]
    return max_prob, name, disease_name, risk_name

def get_plantdata_from_database(name, disease_name):
    uri = "mongodb+srv://skku:skku@namuthon-teamginkgo.ql5nn2f.mongodb.net/?retryWrites=true&w=majority"
    # Create a new client and connect to the server
    client = MongoClient(uri)

    try:
        client.admin.command('ping')
        # Directly use the collection object말
        collection = client.static.plantdata
        # Use the find_one method to search for a document that matches the given criteria
        query = {"이름": name, "병명": disease_name}
        result = collection.find_one(query)
        print(result)
        if result:
            
            return {
                        "초기 병징": result['병징']['초기'],
                        "중기 병징": result['병징']['중기'],
                        "말기 병징": result['병징']['말기'],
                        "해결 방안": result['해결방안']
                    }

        else:
            return None
    
    except Exception as e:
        print(e)

def gh_call(request):
    body_unicode = request.body.decode('utf-8')
    body = json.loads(body_unicode)
    accuracy, name, disease_name, risk_name = Return_Disease_Function(body["base64Image"])
    information = get_plantdata_from_database(name, disease_name)

    return JsonResponse({
        'name': name,
        'accuracy': accuracy,
        'disease': [{"name": disease_name, "type": risk_name}],
        'information': information
    })
# PAP

## 설치

### Frontend (nt_frontend)

프로젝트 실행을 위해서는 Node.js (20.10.0 LTS) 및 Ionic Framework가 셋업되어 있어야 합니다.
- Node.js: https://nodejs.org/en
- Ionic Framework: `npm i -g @ionic/cli`

[초기 셋업] 아래와 같은 명령어로 프로젝트 실행을 위한 모듈을 설치할 수 있습니다.
```
npm install
```

아래와 같은 명령어로 실행할 수 있습니다.
```
ionic serve
```

### Backend (nt_backend)

[초기 셋업] 프로젝트 실행을 위해서는 Django를 비롯하여 각종 모듈이 셋업되어 있어야 합니다.
```
pip install Django django-cors-headers django-environ pytorch torchvision pandas numpy scikit-learn pymongo
```

아래와 같은 명령어로 실행할 수 있습니다.
```
python manage.py runserver
```
import environ
import os
from gh_backend.base_dir import BASE_DIR

environ.Env.read_env(os.path.join(BASE_DIR, '.env'))
env = environ.Env(
    # set casting, default value
    DEBUG=(bool, False)
)
DEBUG = not bool(env('PRODUCTION', default=False))
SECRET_KEY = env('SECRET_KEY', default='gh_backend-insecure')

MONGODB_CONNECTION_STRING = env('MONGODB_CONNECTION_STRING', default="mongodb+srv://skku:skku@namuthon-teamginkgo.ql5nn2f.mongodb.net/?retryWrites=true&w=majority")
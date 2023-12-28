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
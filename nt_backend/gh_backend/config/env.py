from gh_backend.env import env

SITE_URL = env('SITE_URL', default='http://demo.geonhui.com')
SITE_NAME = env('SITE_NAME', default='Demo site without environment variables')
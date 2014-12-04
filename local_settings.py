DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.postgresql_psycopg2',
        'NAME': 'arcade_game'
    }
}

EMAIL_USE_TLS = True
EMAIL_HOST = 'smtp.gmail.com'
EMAIL_HOST_USER = 'chuckcwh@gmail.com'
EMAIL_HOST_PASSWORD = 'b12456789'
# EMAIL_HOST_PASSWORD = os.environ['EMAIL_PASSWORD']
EMAIL_PORT = 587
DEFAULT_FROM_EMAIL = 'chuckcwh@gmail.com'
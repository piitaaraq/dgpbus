from pathlib import Path
from datetime import timedelta
import os

# BASE_DIR is the directory that holds the project
BASE_DIR = Path(__file__).resolve().parent.parent

# SECRET KEY and DEBUG mode
SECRET_KEY = 'django-insecure-ks=1)p43w!y!=y-wf13m8*vwmxsr@@dp#a=0hx44h2*=n(!j!m'
DEBUG = True

# Allowed hosts
ALLOWED_HOSTS = [
    'localhost',
    '127.0.0.1',
    '192.168.68.63',
    '192.168.68.55',
    '192.168.210.192',
]

# Installed apps for the project
INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    'django_extensions',
    'dgp_bus',
    'rest_framework',
    'rest_framework_simplejwt',
    'corsheaders',
]

# Middleware configuration
MIDDLEWARE = [
    'corsheaders.middleware.CorsMiddleware',
    'django.middleware.security.SecurityMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
]

# Celery setup
CELERY_BROKER_URL = 'redis://localhost:6379/0'
CELERY_ACCEPT_CONTENT = ['json']
CELERY_TASK_SERIALIZER = 'json'
CELERY_BEAT_SCHEDULE = {
    'clear-expired-values-every-30-days': {
        'task': 'dgp_bus.tasks.clear_expired_column_values',
        'schedule': 2592000,
    },
}


# Cross-origin resource sharing (CORS) settings
CORS_ALLOWED_ORIGINS = [
    "http://localhost:8080",  # Vue app running locally
    "http://192.168.68.63:8080",  # Local network IP for frontend
    "http://192.168.68.63",  # Local network IP for frontend
    "http://192.168.68.55:8080",  # Another local network IP if needed
    "http://192.168.68.55",  # Another local network IP if needed
    "http://192.168.210.192",  # Another local network IP if needed
    "http://192.168.210.192:8080",  # Another local network IP if needed
]

# REST framework settings, including JWT authentication
REST_FRAMEWORK = {
    'DEFAULT_AUTHENTICATION_CLASSES': (
        'rest_framework_simplejwt.authentication.JWTAuthentication',
    ),
    'DEFAULT_PERMISSION_CLASSES': (
        'rest_framework.permissions.AllowAny',  # Only restrict specific views
    ),
}

AUTH_USER_MODEL = 'dgp_bus.StaffAdminUser'

# SIMPLE JWT token settings (customize as needed)
SIMPLE_JWT = {
    'ACCESS_TOKEN_LIFETIME': timedelta(minutes=60),
    'REFRESH_TOKEN_LIFETIME': timedelta(days=1),
    'AUTH_HEADER_TYPES': ('Bearer',),  # Token header type
}

# Root URL configuration
ROOT_URLCONF = 'dgp_bus_project.urls'

# Template settings
TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [os.path.join(BASE_DIR, 'templates')],
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.debug',
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
            ],
        },
    },
]

# WSGI application
WSGI_APPLICATION = 'dgp_bus_project.wsgi.application'

# Database settings
DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.mysql',
        'NAME': 'busrides',
        'USER': 'peter',
        'PASSWORD': 'peter',
        'HOST': 'localhost',
        'PORT': '3306',
    }
}

# Password validation settings
AUTH_PASSWORD_VALIDATORS = [
    {
        'NAME': 'django.contrib.auth.password_validation.UserAttributeSimilarityValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.MinimumLengthValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.CommonPasswordValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.NumericPasswordValidator',
    },
]

# Internationalization and timezone settings
LANGUAGE_CODE = 'en-us'
TIME_ZONE = 'UTC'
USE_I18N = True
USE_TZ = True

# Static files settings
STATIC_URL = 'static/'

# Default primary key field type
DEFAULT_AUTO_FIELD = 'django.db.models.BigAutoField'

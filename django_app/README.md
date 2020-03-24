## Backend Quickstart

Create Python3 virtual environment


From the `django_app` folder:

Install requirements:

    pip install -r ./requirements.txt

Create .env file and define environment variables showed in env.sample.
For development, only DEBUG set to true and DATABASE_URL variables are required.

Migrate the database:

    python manage.py migrate

Create super user:

    python manage.py createsuperuser

Run development server:

    python manage.py runserver

To view admin page, point your browser to:

    127.0.0.1:8000/admin/

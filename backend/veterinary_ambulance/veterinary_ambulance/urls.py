from django.contrib import admin
from django.urls import path, include
from django.http import HttpResponse

def home(request):
    return HttpResponse("""
    <h1>Veterinary Ambulance Booking System API</h1>
    <p>API is running successfully.</p>

    <h2>Available Endpoints</h2>

    <p><a href="/admin/">Admin Panel</a></p>
    <p><a href="/api/owners/">Owners</a></p>
    <p><a href="/api/pets/">Pets</a></p>
    <p><a href="/api/vets/">Vets</a></p>
    <p><a href="/api/vaccines/">Vaccines</a></p>
    <p><a href="/api/appointments/">Appointments</a></p>
    <p><a href="/api/pet-vaccines/">Pet Vaccines</a></p>
    """)

urlpatterns = [
    path('', home),
    path('admin/', admin.site.urls),
    path('api/', include('clinic.urls')),
]
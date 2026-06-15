from django.http import JsonResponse
from django.contrib import admin
from django.urls import path, include


def home(request):
    return JsonResponse({
        "project": "Veterinary Ambulance Booking System",
        "version": "1.0",
        "status": "API Running Successfully",
        "description": "REST API for managing pet owners, pets, veterinarians, vaccines, appointments, and pet vaccination records.",
        "endpoints": {
            "owners": "/api/owners/",
            "pets": "/api/pets/",
            "vets": "/api/vets/",
            "vaccines": "/api/vaccines/",
            "appointments": "/api/appointments/",
            "pet_vaccines": "/api/pet-vaccines/",
            "admin": "/admin/"
        }
    })


urlpatterns = [
    path('', home),
    path('admin/', admin.site.urls),
    path('api/', include('clinic.urls')),
]
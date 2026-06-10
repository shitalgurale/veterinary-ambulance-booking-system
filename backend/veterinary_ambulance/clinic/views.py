from rest_framework.viewsets import ModelViewSet
from .models import Owner, Pet, Vet, Vaccine, Appointment, PetVaccine
from .serializers import (
    OwnerSerializer,
    PetSerializer,
    VetSerializer,
    VaccineSerializer,
    AppointmentSerializer,
    PetVaccineSerializer
)


class OwnerViewSet(ModelViewSet):
    queryset = Owner.objects.all()
    serializer_class = OwnerSerializer


class PetViewSet(ModelViewSet):
    queryset = Pet.objects.all()
    serializer_class = PetSerializer


class VetViewSet(ModelViewSet):
    queryset = Vet.objects.all()
    serializer_class = VetSerializer


class VaccineViewSet(ModelViewSet):
    queryset = Vaccine.objects.all()
    serializer_class = VaccineSerializer


class AppointmentViewSet(ModelViewSet):
    queryset = Appointment.objects.all()
    serializer_class = AppointmentSerializer


class PetVaccineViewSet(ModelViewSet):
    queryset = PetVaccine.objects.all()
    serializer_class = PetVaccineSerializer
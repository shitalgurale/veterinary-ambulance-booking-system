from rest_framework import serializers
from .models import Owner, Pet, Vet, Vaccine, Appointment, PetVaccine


class OwnerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Owner
        fields = '__all__'


class PetSerializer(serializers.ModelSerializer):
    class Meta:
        model = Pet
        fields = '__all__'


class VetSerializer(serializers.ModelSerializer):
    class Meta:
        model = Vet
        fields = '__all__'


class VaccineSerializer(serializers.ModelSerializer):
    class Meta:
        model = Vaccine
        fields = '__all__'


class AppointmentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Appointment
        fields = '__all__'


class PetVaccineSerializer(serializers.ModelSerializer):
    class Meta:
        model = PetVaccine
        fields = '__all__'
from rest_framework import serializers
from .models import Owner, Pet, Vet, Vaccine, Appointment, PetVaccine


# -------------------------
# OWNER
# -------------------------
class OwnerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Owner
        fields = '__all__'


# -------------------------
# VET
# -------------------------
class VetSerializer(serializers.ModelSerializer):
    class Meta:
        model = Vet
        fields = '__all__'


# -------------------------
# PET (OWNER FIXED)
# -------------------------
class PetSerializer(serializers.ModelSerializer):
    owner = OwnerSerializer(read_only=True)

    owner_id = serializers.PrimaryKeyRelatedField(
        queryset=Owner.objects.all(),
        write_only=True,
        source="owner"
    )

    class Meta:
        model = Pet
        fields = '__all__'


# -------------------------
# VACCINE
# -------------------------
class VaccineSerializer(serializers.ModelSerializer):
    class Meta:
        model = Vaccine
        fields = '__all__'


# -------------------------
# APPOINTMENT (PET + VET FIXED)
# -------------------------
class AppointmentSerializer(serializers.ModelSerializer):
    pet = PetSerializer(read_only=True)
    vet = VetSerializer(read_only=True)

    pet_id = serializers.PrimaryKeyRelatedField(
        queryset=Pet.objects.all(),
        write_only=True,
        source="pet"
    )

    vet_id = serializers.PrimaryKeyRelatedField(
        queryset=Vet.objects.all(),
        write_only=True,
        source="vet"
    )

    class Meta:
        model = Appointment
        fields = '__all__'


# -------------------------
# PET VACCINE (optional expand)
# -------------------------
class PetVaccineSerializer(serializers.ModelSerializer):
    pet = PetSerializer(read_only=True)
    vaccine = VaccineSerializer(read_only=True)

    pet_id = serializers.PrimaryKeyRelatedField(
        queryset=Pet.objects.all(),
        write_only=True,
        source="pet"
    )

    vaccine_id = serializers.PrimaryKeyRelatedField(
        queryset=Vaccine.objects.all(),
        write_only=True,
        source="vaccine"
    )

    class Meta:
        model = PetVaccine
        fields = '__all__'
from django.db import models


class Owner(models.Model):
    name = models.CharField(max_length=255)
    phone = models.CharField(max_length=20)

    def __str__(self):
        return self.name


class Vet(models.Model):
    name = models.CharField(max_length=255)
    specialization = models.CharField(max_length=255, blank=True)

    def __str__(self):
        return self.name


class Pet(models.Model):
    name = models.CharField(max_length=255)
    species = models.CharField(max_length=100)
    age = models.PositiveIntegerField()
    owner = models.ForeignKey(Owner, on_delete=models.CASCADE)

    def __str__(self):
        return self.name


class Vaccine(models.Model):
    name = models.CharField(max_length=255)
    description = models.TextField(blank=True)

    def __str__(self):
        return self.name


class Appointment(models.Model):
    date = models.DateTimeField()
    pet = models.ForeignKey(Pet, on_delete=models.CASCADE)
    vet = models.ForeignKey(Vet, on_delete=models.CASCADE)

    def __str__(self):
        return f"{self.pet} - {self.date}"


class PetVaccine(models.Model):
    pet = models.ForeignKey(Pet, on_delete=models.CASCADE)
    vaccine = models.ForeignKey(Vaccine, on_delete=models.CASCADE)
    time_of_vaccination = models.DateTimeField()

    def __str__(self):
        return f"{self.pet} - {self.vaccine}"
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import (
    OwnerViewSet,
    PetViewSet,
    VetViewSet,
    VaccineViewSet,
    AppointmentViewSet,
    PetVaccineViewSet
)

router = DefaultRouter()
router.register('owners', OwnerViewSet)
router.register('pets', PetViewSet)
router.register('vets', VetViewSet)
router.register('vaccines', VaccineViewSet)
router.register('appointments', AppointmentViewSet)
router.register('pet-vaccines', PetVaccineViewSet)

urlpatterns = [
    path('', include(router.urls)),
]
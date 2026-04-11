from django.urls import path, include
from rest_framework.routers import DefaultRouter
from rest_framework.authtoken.views import obtain_auth_token
from .views import ChargingStationViewSet, BookingViewSet, RegisterView, WardViewSet

router = DefaultRouter()
router.register(r'stations', ChargingStationViewSet)
router.register(r'bookings', BookingViewSet)
router.register(r'wards', WardViewSet)

urlpatterns = [
    path('', include(router.urls)), 
    
    path('register/', RegisterView.as_view(), name='register'),
    
    path('api-token-auth/', obtain_auth_token, name='api_token_auth'),
]
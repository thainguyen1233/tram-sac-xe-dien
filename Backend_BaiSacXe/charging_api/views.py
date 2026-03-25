from rest_framework import viewsets
from django.utils import timezone
from .models import ChargingStation, Booking
from .serializers import ChargingStationSerializer, BookingSerializer

from rest_framework import status, generics
from rest_framework.response import Response
from .serializers import UserSerializer

class RegisterView(generics.CreateAPIView):
    serializer_class = UserSerializer
class ChargingStationViewSet(viewsets.ModelViewSet):
    queryset = ChargingStation.objects.all()
    serializer_class = ChargingStationSerializer

class BookingViewSet(viewsets.ModelViewSet):
    queryset = Booking.objects.all()
    serializer_class = BookingSerializer

    def get_queryset(self):
        now = timezone.now()
        expired = Booking.objects.filter(expiry_time__lt=now).exclude(status__in=['Cancelled', 'Completed'])
        for b in expired:
            b.status = 'Cancelled'
            b.save() 
        return Booking.objects.all().order_by('-booking_time')
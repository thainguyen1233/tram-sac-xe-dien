from rest_framework import viewsets, generics, status, permissions
from rest_framework.response import Response
from django.utils import timezone
from .models import ChargingStation, Booking, Ward
from .serializers import ChargingStationSerializer, BookingSerializer, UserSerializer, WardSerializer

class RegisterView(generics.CreateAPIView):
    permission_classes = [permissions.AllowAny]
    serializer_class = UserSerializer

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        if serializer.is_valid():
            user = serializer.save()
            # Trả về dữ liệu để Android nhận diện thành công
            return Response({
                "id": user.id,
                "username": user.username,
                "email": user.email
            }, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class ChargingStationViewSet(viewsets.ModelViewSet):
    permission_classes = [permissions.AllowAny]
    queryset = ChargingStation.objects.all()
    serializer_class = ChargingStationSerializer

    def get_queryset(self):
        queryset = ChargingStation.objects.all()
        ward_id = self.request.query_params.get('ward_id')
        if ward_id:
            queryset = queryset.filter(ward_id=ward_id)
        return queryset

class WardViewSet(viewsets.ModelViewSet):
    permission_classes = [permissions.AllowAny]
    queryset = Ward.objects.all()
    serializer_class = WardSerializer

class BookingViewSet(viewsets.ModelViewSet):
    permission_classes = [permissions.AllowAny]
    # Thêm dòng này vào để hết lỗi
    queryset = Booking.objects.all() 
    serializer_class = BookingSerializer

    def get_queryset(self):
        # Logic tự động hủy của bạn vẫn giữ nguyên ở đây
        now = timezone.now()
        expired = Booking.objects.filter(
            expiry_time__lt=now
        ).exclude(status__in=['Cancelled', 'Completed'])
        
        for b in expired:
            b.status = 'Cancelled'
            b.save() 
            
        # Trả về kết quả đã sắp xếp
        return Booking.objects.all().order_by('-booking_time')
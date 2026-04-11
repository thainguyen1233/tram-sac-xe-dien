from rest_framework import serializers
from .models import ChargingStation, Booking, Ward

class WardSerializer(serializers.ModelSerializer):
    class Meta:
        model = Ward
        fields = '__all__'

from django.contrib.auth.models import User
from rest_framework import serializers

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'password', 'email']
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        user = User.objects.create_user(**validated_data)
        return user
class ChargingStationSerializer(serializers.ModelSerializer):
    people_charging = serializers.SerializerMethodField()

    class Meta:
        model = ChargingStation
        fields = ['id', 'name', 'address', 'latitude', 'longitude', 'total_slots', 'available_slots', 'ward', 'vehicle_density', 'people_charging']

    def get_people_charging(self, obj):
        return obj.total_slots - obj.available_slots

class BookingSerializer(serializers.ModelSerializer):
    station_name = serializers.ReadOnlyField(source='station.name')

    class Meta:
        model = Booking
        fields = '__all__'
        read_only_fields = ['expiry_time', 'qr_code_data', 'booking_time']
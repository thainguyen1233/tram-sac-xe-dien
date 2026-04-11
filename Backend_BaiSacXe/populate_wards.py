import os
import django
import sys

sys.stdout.reconfigure(encoding='utf-8')

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'server_parking.settings')
django.setup()

from charging_api.models import Ward, ChargingStation

def populate_data():
    wards_data = [
        {"name": "Tràng Tiền", "district": "Hoàn Kiếm"},
        {"name": "Hàng Bạc", "district": "Hoàn Kiếm"},
        {"name": "Láng Hạ", "district": "Đống Đa"},
        {"name": "Ô Chợ Dừa", "district": "Đống Đa"},
        {"name": "Dịch Vọng", "district": "Cầu Giấy"},
        {"name": "Nghĩa Tân", "district": "Cầu Giấy"},
        {"name": "Bạch Khoa", "district": "Hai Bà Trưng"},
        {"name": "Trương Định", "district": "Hai Bà Trưng"},
        {"name": "Mỹ Đình 1", "district": "Nam Từ Liêm"},
        {"name": "Mỹ Đình 2", "district": "Nam Từ Liêm"},
    ]

    for data in wards_data:
        ward, created = Ward.objects.get_or_create(name=data["name"], district=data["district"])
        if created:
            print(f"Created ward: {ward}")

    # Map existing stations to wards (just for demo)
    stations = ChargingStation.objects.all()
    wards = Ward.objects.all()
    if stations.exists() and wards.exists():
        for i, station in enumerate(stations):
            station.ward = wards[i % wards.count()]
            station.save()
            print(f"Mapped {station.name} to {station.ward.name}")

if __name__ == "__main__":
    populate_data()

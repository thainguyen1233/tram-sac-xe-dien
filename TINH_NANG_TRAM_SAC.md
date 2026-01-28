# TÍNH NĂNG TRẠM SẠC XE ĐIỆN - CAR PARKING SMART

## Tổng Quan
Đã thêm tính năng quản lý trạm sạc xe điện hoàn chỉnh vào ứng dụng Car Parking Smart với các chức năng:

### 1. **Hiển Thị Thông Tin Trạm Sạc**
- ✅ Mỗi bãi đỗ xe hiện có thông tin về trạm sạc (nếu có)
- ✅ Hiển thị số chỗ sạc còn trống/tổng số (VD: ⚡ Còn 12/20 chỗ sạc)
- ✅ Icon đặc biệt cho bãi có trạm sạc còn chỗ trống
- ✅ Cập nhật thời gian thực số chỗ sạc

### 2. **Ưu Tiên Xe Gần Nhất (Priority Queue)**
Khi nhiều xe cùng yêu cầu sạc:
- ✅ Hệ thống tự động sắp xếp theo khoảng cách đến trạm
- ✅ Xe gần trạm nhất được ưu tiên cao nhất
- ✅ Hiển thị vị trí trong hàng đợi cho các xe khác
- ✅ Thông báo rõ ràng về trạng thái ưu tiên

**Ví dụ:**
```
Xe A: Cách trạm 500m  → Ưu tiên 1 (Được đặt ngay)
Xe B: Cách trạm 1.2km → Ưu tiên 2 (Hàng đợi vị trí 2/3)
Xe C: Cách trạm 2.5km → Ưu tiên 3 (Hàng đợi vị trí 3/3)
```

### 3. **Gợi Ý Trạm Thay Thế**
Khi trạm sạc gần nhất đã đầy:
- ✅ Tự động tìm 3 trạm sạc gần nhất còn chỗ
- ✅ Hiển thị khoảng cách và số chỗ trống của mỗi trạm
- ✅ Cho phép xem chi tiết và điều hướng đến trạm thay thế
- ✅ Nếu tất cả trạm đều đầy → Gợi ý đặt chỗ đỗ thường

**Ví dụ Gợi Ý:**
```
🔋 GỢI Ý TRẠM SẠC THAY THẾ:

1. Bãi đỗ xe Keangnam Landmark
   ⚡ Còn 8/12 chỗ • Cách 2.3 km

2. Bãi đỗ xe Royal City
   ⚡ Còn 7/10 chỗ • Cách 3.1 km

3. Bãi đỗ xe Aeon Mall
   ⚡ Còn 5/10 chỗ • Cách 4.5 km
```

### 4. **Danh Sách Trạm Sạc**
- ✅ Xem tất cả trạm sạc trong khu vực
- ✅ Sắp xếp theo khoảng cách từ vị trí hiện tại
- ✅ Hiển thị trạng thái (còn chỗ/đầy) của mỗi trạm
- ✅ Tìm trạm sạc gần nhất có chỗ trống

## Các Trạm Sạc Hiện Có

| ID | Tên Bãi | Chỗ Sạc | Vị Trí |
|----|---------|---------|--------|
| 1 | Big C Thăng Long | 8 chỗ | Trần Duy Hưng, Cầu Giấy |
| 2 | Aeon Mall Hà Đông | 10 chỗ | Cổ Linh, Long Biên |
| 4 | Vincom Trần Duy Hưng | 6 chỗ | Trần Duy Hưng, Cầu Giấy |
| 5 | Keangnam Landmark | 12 chỗ | Phạm Hùng, Nam Từ Liêm |
| 6 | Lotte Center | 15 chỗ | Liễu Giai, Ba Đình |
| 8 | Royal City | 10 chỗ | Nguyễn Trãi, Thanh Xuân |
| 9 | **ĐH Mỏ Địa chất** | **20 chỗ** | **Phố Viên, Bắc Từ Liêm** |

## Luồng Sử Dụng

### Kịch Bản 1: Đặt Chỗ Sạc Thành Công
1. Người dùng nhấn vào marker bãi đỗ xe
2. Thấy thông tin: "Có trạm sạc điện • Còn 12/20 chỗ sạc"
3. Nhấn "Đặt trước"
4. Chọn "Đặt chỗ sạc xe điện"
5. Hệ thống kiểm tra hàng đợi
6. Nếu là xe gần nhất → ✅ Đặt thành công ngay lập tức
7. Nếu không → ⏳ Thêm vào hàng đợi với thông báo vị trí

### Kịch Bản 2: Trạm Đầy - Gợi Ý Thay Thế
1. Người dùng chọn trạm sạc đã đầy
2. Hệ thống thông báo: "Trạm sạc đã đầy!"
3. Tự động hiển thị 3 trạm thay thế gần nhất
4. Người dùng chọn:
   - "Xem trạm đầu tiên" → Zoom đến trạm đó
   - "Xem tất cả" → Hiển thị danh sách đầy đủ
   - "Đóng" → Quay lại

### Kịch Bản 3: Tìm Trạm Sạc Gần Nhất
1. Người dùng nhấn "Tìm trạm sạc gần nhất"
2. Hệ thống tính toán khoảng cách đến tất cả trạm
3. Tìm trạm gần nhất còn chỗ trống
4. Zoom đến trạm đó và hiển thị thông tin
5. Nếu không có trạm nào còn chỗ → Hiển thị tất cả trạm

## Cấu Trúc Dữ Liệu

### ParkingLot (Đã Cập Nhật)
```kotlin
data class ParkingLot(
    val id: Int,
    val name: String,
    val lat: Double,
    val lon: Double,
    val totalSpots: Int,
    var availableSpots: Int,
    val address: String,
    var isNearest: Boolean = false,
    val hasChargingStation: Boolean = false,      // MỚI
    val totalChargingSpots: Int = 0,              // MỚI
    var availableChargingSpots: Int = 0           // MỚI
)
```

### ChargingRequest (Mới)
```kotlin
data class ChargingRequest(
    val vehicleId: String,
    val userLat: Double,
    val userLon: Double,
    val timestamp: Long,
    val distanceToStation: Double
)
```

## Các Hàm Chính

### 1. `showChargingStationDialog(parking: ParkingLot)`
Hiển thị dialog với các tùy chọn khi người dùng chọn bãi có trạm sạc

### 2. `requestChargingSpot(parking: ParkingLot)`
Tạo yêu cầu sạc xe và thêm vào hàng đợi ưu tiên

### 3. `processChargingRequest(parking: ParkingLot, request: ChargingRequest)`
Xử lý yêu cầu sạc, kiểm tra ưu tiên và cấp phát chỗ

### 4. `processChargingRequestQueue()`
Xử lý hàng đợi định kỳ (được gọi mỗi 10 giây)

### 5. `findNearestChargingStation()`
Tìm và hiển thị trạm sạc gần nhất còn chỗ

### 6. `suggestAlternativeChargingStations(userLat, userLon, currentStation)`
Gợi ý 3 trạm sạc thay thế khi trạm hiện tại đầy

### 7. `showAllChargingStations()`
Hiển thị danh sách tất cả trạm sạc với trạng thái

## Thuật Toán Ưu Tiên

```
1. Khi có yêu cầu sạc mới:
   - Tính khoảng cách từ xe đến trạm
   - Thêm vào hàng đợi
   - Sắp xếp hàng đợi theo khoảng cách (tăng dần)

2. Xử lý hàng đợi:
   - Lấy yêu cầu đầu tiên (xe gần nhất)
   - Kiểm tra trạm còn chỗ không
   - Nếu có → Cấp phát chỗ, xóa khỏi hàng đợi
   - Nếu không → Gợi ý trạm thay thế

3. Cập nhật định kỳ (10 giây):
   - Cập nhật số chỗ trống
   - Xử lý hàng đợi
   - Cập nhật UI
```

## Thông Báo Người Dùng

### Thành Công
```
✅ ĐẶT CHỖ SẠC THÀNH CÔNG!
Bạn được ưu tiên vì gần trạm nhất
⚡ Bãi đỗ xe Khu A - ĐH Mỏ Địa chất
Còn 11 chỗ sạc
```

### Hàng Đợi
```
⏳ Đã thêm vào hàng đợi (Vị trí: 2/3)
Có 1 xe gần hơn đang được ưu tiên
Khoảng cách của bạn: 1.2 km
```

### Trạm Đầy
```
❌ Tất cả trạm sạc đều đã đầy!
Vui lòng thử lại sau hoặc đặt chỗ đỗ thường
```

## Kiểm Thử

### Test Case 1: Một Xe Đặt Chỗ
- ✅ Xe gần trạm → Đặt thành công ngay
- ✅ Cập nhật số chỗ trống
- ✅ Hiển thị thông báo thành công

### Test Case 2: Ba Xe Cùng Đặt
- ✅ Xe A (500m) → Ưu tiên 1, đặt ngay
- ✅ Xe B (1.2km) → Ưu tiên 2, hàng đợi
- ✅ Xe C (2.5km) → Ưu tiên 3, hàng đợi

### Test Case 3: Trạm Đầy
- ✅ Hiển thị thông báo trạm đầy
- ✅ Gợi ý 3 trạm thay thế
- ✅ Cho phép xem chi tiết trạm thay thế

### Test Case 4: Tất Cả Trạm Đầy
- ✅ Thông báo tất cả trạm đầy
- ✅ Gợi ý đặt chỗ đỗ thường
- ✅ Hiển thị danh sách trạm (kể cả đầy)

## Cải Tiến Tương Lai

1. **Đặt Trước Theo Thời Gian**
   - Cho phép đặt chỗ sạc theo giờ
   - Thông báo khi đến giờ

2. **Thông Báo Push**
   - Thông báo khi có chỗ trống
   - Thông báo khi đến lượt trong hàng đợi

3. **Tích Hợp Thanh Toán**
   - Thanh toán phí sạc qua app
   - Lịch sử giao dịch

4. **Thống Kê**
   - Thời gian sạc trung bình
   - Trạm sạc phổ biến nhất
   - Giờ cao điểm

5. **Đánh Giá Trạm Sạc**
   - Người dùng đánh giá chất lượng
   - Báo cáo sự cố

## Kết Luận

Tính năng trạm sạc xe điện đã được tích hợp hoàn chỉnh với:
- ✅ Quản lý chỗ sạc thời gian thực
- ✅ Hệ thống ưu tiên thông minh
- ✅ Gợi ý trạm thay thế
- ✅ UI/UX thân thiện
- ✅ Xử lý nhiều trường hợp đặc biệt

Ứng dụng giờ đây có thể phục vụ hiệu quả nhu cầu sạc xe điện của người dùng!

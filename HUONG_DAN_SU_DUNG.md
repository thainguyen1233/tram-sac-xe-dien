# HƯỚNG DẪN SỬ DỤNG TÍNH NĂNG TRẠM SẠC XE ĐIỆN

## 🔍 CÁCH TÌM KIẾM TRẠM SẠC

### Phương Pháp 1: Tìm Kiếm Trực Tiếp
Gõ vào ô tìm kiếm một trong các từ khóa sau:

#### Tìm Trạm Sạc Gần Nhất:
```
trạm sạc
sạc xe điện
charging station
```
→ App sẽ tự động tìm và hiển thị trạm sạc gần nhất còn chỗ trống

#### Tìm Bãi Đỗ Xe Cụ Thể:
```
Big C
Keangnam
ĐH Mỏ
Lotte
Royal City
Aeon Mall
```
→ App sẽ hiển thị bãi đỗ xe đó và thông báo nếu có trạm sạc

### Phương Pháp 2: Sử Dụng Autocomplete
1. Gõ ít nhất 2 ký tự vào ô tìm kiếm
2. Danh sách gợi ý sẽ hiển thị
3. Các bãi có trạm sạc sẽ có icon ⚡
4. Chọn bãi muốn xem

### Phương Pháp 3: Click Trực Tiếp Trên Bản Đồ
1. Nhìn vào bản đồ
2. Các marker có icon đặc biệt (la bàn) là trạm sạc còn chỗ
3. Click vào marker để xem chi tiết

## ⚡ CÁCH ĐẶT CHỖ SẠC

### Bước 1: Tìm Trạm Sạc
Sử dụng một trong 3 phương pháp trên

### Bước 2: Xem Thông Tin
Bottom sheet sẽ hiển thị:
- Tên bãi đỗ xe
- Số chỗ đỗ còn trống
- **Số chỗ sạc còn trống** (VD: ⚡ Còn 12/20 chỗ sạc)
- Khoảng cách từ vị trí của bạn

### Bước 3: Đặt Chỗ
Nhấn nút **"Đặt trước"**, sẽ có 3 tùy chọn:

#### Tùy Chọn 1: Đặt Chỗ Đỗ Thường
- Đặt chỗ đỗ xe bình thường (không sạc)

#### Tùy Chọn 2: Đặt Chỗ Sạc Xe Điện ⚡
- Hệ thống kiểm tra hàng đợi
- Nếu bạn là xe gần nhất → Đặt thành công ngay
- Nếu không → Thêm vào hàng đợi với thông báo vị trí

#### Tùy Chọn 3: Tìm Trạm Sạc Gần Nhất
- Tìm trạm sạc khác gần hơn hoặc có nhiều chỗ hơn

## 🎯 HỆ THỐNG ƯU TIÊN

### Khi Nhiều Xe Cùng Đặt:
App tự động sắp xếp theo khoảng cách:

**Ví dụ:**
```
Trạm: Bãi ĐH Mỏ Địa chất (Còn 1 chỗ sạc)

Xe A: 500m   → Ưu tiên 1 ✅ Đặt thành công
Xe B: 1.2km  → Ưu tiên 2 ⏳ Hàng đợi vị trí 2/3
Xe C: 2.5km  → Ưu tiên 3 ⏳ Hàng đợi vị trí 3/3
```

### Thông Báo Bạn Nhận Được:

#### Nếu Được Ưu Tiên:
```
✅ ĐẶT CHỖ SẠC THÀNH CÔNG!
Bạn được ưu tiên vì gần trạm nhất
⚡ Bãi đỗ xe Khu A - ĐH Mỏ Địa chất
Còn 11 chỗ sạc
```

#### Nếu Trong Hàng Đợi:
```
⏳ Đã thêm vào hàng đợi (Vị trí: 2/3)
Có 1 xe gần hơn đang được ưu tiên
Khoảng cách của bạn: 1.2 km
```

## 🔄 KHI TRẠM ĐẦY

### Tự Động Gợi Ý
Nếu trạm bạn chọn đã đầy, app sẽ:
1. Thông báo trạm đã đầy
2. Tự động tìm 3 trạm thay thế gần nhất
3. Hiển thị khoảng cách và số chỗ trống

### Ví Dụ Gợi Ý:
```
🔋 GỢI Ý TRẠM SẠC THAY THẾ:

1. Bãi đỗ xe Keangnam Landmark
   ⚡ Còn 8/12 chỗ • Cách 2.3 km

2. Bãi đỗ xe Royal City
   ⚡ Còn 7/10 chỗ • Cách 3.1 km

3. Bãi đỗ xe Aeon Mall
   ⚡ Còn 5/10 chỗ • Cách 4.5 km
```

### Các Nút Hành Động:
- **Xem trạm đầu tiên**: Zoom đến trạm gần nhất
- **Xem tất cả**: Hiển thị danh sách đầy đủ
- **Đóng**: Quay lại

## 📋 XEM TẤT CẢ TRẠM SẠC

### Cách Xem:
1. Tìm kiếm "trạm sạc" hoặc "sạc xe điện"
2. Hoặc chọn "Xem tất cả" trong dialog gợi ý

### Danh Sách Hiển Thị:
```
⚡ TẤT CẢ TRẠM SẠC XE ĐIỆN

1. Bãi đỗ xe Khu A - ĐH Mỏ Địa chất
   ✅ Còn 12/20 chỗ • Cách 0.5 km

2. Bãi đỗ xe Lotte Center
   ❌ Đã đầy (0/15) • Cách 1.2 km

3. Bãi đỗ xe Keangnam Landmark
   ✅ Còn 8/12 chỗ • Cách 2.3 km
...
```

## 📍 DANH SÁCH TRẠM SẠC HIỆN CÓ

| STT | Tên Bãi | Chỗ Sạc | Khu Vực |
|-----|---------|---------|---------|
| 1 | Big C Thăng Long | 8 chỗ | Cầu Giấy |
| 2 | Aeon Mall Hà Đông | 10 chỗ | Long Biên |
| 3 | Vincom Trần Duy Hưng | 6 chỗ | Cầu Giấy |
| 4 | Keangnam Landmark | 12 chỗ | Nam Từ Liêm |
| 5 | Lotte Center | 15 chỗ | Ba Đình |
| 6 | Royal City | 10 chỗ | Thanh Xuân |
| 7 | **ĐH Mỏ Địa chất** | **20 chỗ** | **Bắc Từ Liêm** |

## 💡 MẸO SỬ DỤNG

### 1. Tìm Nhanh Trạm Gần Nhất
Gõ: `sạc` → Enter
→ App tự động tìm trạm gần nhất

### 2. Tìm Bãi Cụ Thể
Gõ tên bãi (VD: `Keangnam`, `Lotte`, `ĐH Mỏ`)
→ Xem ngay có trạm sạc không

### 3. Xem Trước Khi Đi
- Kiểm tra số chỗ sạc còn trống
- Xem khoảng cách
- Đặt trước để đảm bảo có chỗ

### 4. Sử Dụng Hàng Đợi
- Nếu xa trạm, bạn sẽ vào hàng đợi
- Khi có chỗ trống, hệ thống tự động xử lý
- Xe gần nhất luôn được ưu tiên

### 5. Lưu Vị Trí Xe
- Sau khi đỗ, nhấn "Lưu vị trí xe"
- Khi quay lại, nhấn "Tìm xe của tôi"
- App sẽ chỉ đường đi bộ về xe

## ⚠️ LƯU Ý

### Bật GPS
- Cần bật GPS để tính khoảng cách chính xác
- Hệ thống ưu tiên dựa trên vị trí thực tế

### Cập Nhật Thời Gian Thực
- Số chỗ trống cập nhật mỗi 10 giây
- Hàng đợi được xử lý tự động
- Thông tin luôn chính xác

### Đặt Trước
- Đặt trước để đảm bảo có chỗ
- Chỗ sẽ được giữ cho bạn
- Đến đúng giờ để không mất chỗ

## 🎬 KỊCH BẢN SỬ DỤNG THỰC TẾ

### Kịch Bản 1: Đi Học Tại ĐH Mỏ
```
1. Mở app
2. Gõ "ĐH Mỏ" hoặc "Mỏ"
3. Chọn "Bãi đỗ xe Khu A - ĐH Mỏ Địa chất ⚡"
4. Xem: "Còn 12/20 chỗ sạc • Cách 0.5 km"
5. Nhấn "Đặt trước"
6. Chọn "Đặt chỗ sạc xe điện"
7. Nhận thông báo: "✅ ĐẶT CHỖ SẠC THÀNH CÔNG!"
```

### Kịch Bản 2: Đi Mua Sắm
```
1. Mở app
2. Gõ "trạm sạc"
3. App hiển thị: "⚡ TRẠM SẠC GẦN NHẤT"
4. Xem danh sách 3 trạm gần nhất
5. Chọn trạm phù hợp
6. Đặt chỗ sạc
```

### Kịch Bản 3: Trạm Đầy
```
1. Chọn trạm Lotte (đã đầy)
2. Nhận thông báo: "Trạm sạc đã đầy!"
3. Xem gợi ý 3 trạm thay thế
4. Chọn "Xem trạm đầu tiên"
5. Đặt chỗ tại trạm thay thế
```

## 📞 HỖ TRỢ

Nếu gặp vấn đề:
1. Kiểm tra GPS đã bật chưa
2. Kiểm tra kết nối internet
3. Thử tìm kiếm lại
4. Khởi động lại app nếu cần

---

**Chúc bạn sử dụng app hiệu quả! ⚡🚗**

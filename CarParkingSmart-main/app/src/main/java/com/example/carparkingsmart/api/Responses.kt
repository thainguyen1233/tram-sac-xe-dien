package com.example.carparkingsmart.api

data class RegisterResponse(val id: Int, val username: String, val email: String)
data class LoginResponse(val token: String)
data class WardResponse(val id: Int, val name: String, val district: String)

data class StationResponse(
    val id: Int,
    val name: String,
    val address: String,
    val latitude: Double,
    val longitude: Double,
    val total_slots: Int,
    val available_slots: Int,
    val ward: Int?,
    val vehicle_density: String = "Thấp",
    val people_charging: Int = 0
)

data class BookingRequest(
    val station: Int,
    val user_id: String,
    val status: String,
    val scheduled_time: String?,
    val amount: Double = 0.0
)

data class BookingResponse(val id: Int, val status: String, val qr_code_data: String, val expiry_time: String?)
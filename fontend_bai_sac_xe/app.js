const API_BASE = 'http://127.0.0.1:8000/api';

const state = {
    wards: [],
    selectedWardId: null,
    stations: [],
    currentStation: null,
};

// Initialize
document.addEventListener('DOMContentLoaded', async () => {
    lucide.createIcons();
    await fetchWards();
    setupEventListeners();
});

async function fetchWards() {
    try {
        const response = await fetch(`${API_BASE}/wards/`);
        state.wards = await response.json();
        renderWardList();
        if (state.wards.length > 0) {
            selectWard(state.wards[0].id);
        }
    } catch (error) {
        console.error('Error fetching wards:', error);
    }
}

function renderWardList() {
    const list = document.getElementById('ward-list');
    list.innerHTML = state.wards.map(ward => `
        <li class="ward-item ${state.selectedWardId === ward.id ? 'active' : ''}" 
            onclick="selectWard(${ward.id})">
            ${ward.name}
        </li>
    `).join('');
}

async function selectWard(wardId) {
    state.selectedWardId = wardId;
    const ward = state.wards.find(w => w.id === wardId);
    const titleEl = document.getElementById('selected-ward-title');
    titleEl.textContent = `Phường ${ward.name}`;
    titleEl.style.background = 'var(--accent-gradient)';
    titleEl.style.webkitBackgroundClip = 'text';
    titleEl.style.backgroundClip = 'text';
    titleEl.style.webkitTextFillColor = 'transparent';
    renderWardList();
    await fetchStations(wardId);
}

async function fetchStations(wardId) {
    try {
        const response = await fetch(`${API_BASE}/stations/?ward_id=${wardId}`);
        state.stations = await response.json();
        renderStations();
        updateStats();
    } catch (error) {
        console.error('Error fetching stations:', error);
    }
}

function renderStations() {
    const grid = document.getElementById('station-grid');
    grid.innerHTML = state.stations.map(station => `
        <div class="station-card" onclick="openBookingModal(${station.id})">
            <div class="card-header">
                <span class="status-badge ${station.available_slots > 0 ? 'status-available' : 'status-busy'}">
                    ${station.available_slots > 0 ? 'Còn chỗ' : 'Hết chỗ'}
                </span>
                <span class="density-badge">⚡ ${station.vehicle_density}</span>
            </div>
            <h2>${station.name}</h2>
            <span class="address">${station.address}</span>
            <div class="occupancy-info">
                <span>🚘 Đang sạc: <strong>${station.people_charging}</strong> xe</span>
            </div>
            <div class="slots-info">
                <span>Trống: <strong>${station.available_slots}/${station.total_slots}</strong> cổng</span>
                <i data-lucide="arrow-right"></i>
            </div>
        </div>
    `).join('');
    lucide.createIcons();
}

function updateStats() {
    const totalOccupancy = state.stations.reduce((acc, s) => acc + s.people_charging, 0);
    const availableTotal = state.stations.reduce((acc, s) => acc + s.available_slots, 0);
    
    // Giả lập mật độ trung bình của phường
    const densityMap = { "Thấp": 1, "Vừa": 2, "Cao": 3 };
    const avgDensityVal = state.stations.reduce((acc, s) => acc + (densityMap[s.vehicle_density] || 1), 0) / (state.stations.length || 1);
    const avgDensity = avgDensityVal > 2.5 ? "Cao" : (avgDensityVal > 1.5 ? "Vừa" : "Thấp");

    document.getElementById('occupancy-count').textContent = totalOccupancy;
    document.getElementById('available-stations').textContent = availableTotal;
    document.getElementById('area-density').textContent = avgDensity;
    document.getElementById('ward-stats').textContent = `Hiện có ${state.stations.length} trạm sạc đang hoạt động.`;
}

function openBookingModal(stationId) {
    state.currentStation = state.stations.find(s => s.id === stationId);
    document.getElementById('modal-station-name').textContent = state.currentStation.name;
    const modal = document.getElementById('booking-modal');
    modal.style.display = 'flex';
    setTimeout(() => modal.classList.add('active'), 10);
    resetModal();
}

function resetModal() {
    document.getElementById('booking-modal').classList.remove('active');
    document.getElementById('qr-container').classList.add('hidden');
    document.getElementById('date-time-picker').classList.add('hidden');
}

function setupEventListeners() {
    // Sử dụng event delegation cho nút close để đảm bảo hoạt động kể cả khi Lucide thay đổi DOM
    document.addEventListener('click', (e) => {
        if (e.target.closest('#close-modal')) {
            const modal = document.getElementById('booking-modal');
            modal.classList.remove('active');
            setTimeout(() => modal.style.display = 'none', 300);
        }
        
        // Đóng khi click ra ngoài modal
        const modal = document.getElementById('booking-modal');
        if (e.target === modal) {
            modal.classList.remove('active');
            setTimeout(() => modal.style.display = 'none', 300);
        }
    });

    document.getElementById('btn-sac-ngay').onclick = () => {
        createBooking('Confirmed');
    };

    document.getElementById('btn-dat-truoc').onclick = () => {
        document.getElementById('date-time-picker').classList.remove('hidden');
        document.getElementById('qr-container').classList.add('hidden');
    };

    // Simulate booking for "Đặt trước" when date/time is picked
    document.getElementById('booking-time').onchange = () => {
        createBooking('Pending');
    };
}

async function createBooking(status) {
    const bookingDate = document.getElementById('booking-date').value;
    const bookingTime = document.getElementById('booking-time').value;
    
    let scheduled_time = null;
    if (status === 'Pending' && bookingDate && bookingTime) {
        scheduled_time = `${bookingDate}T${bookingTime}:00Z`;
    }

    try {
        const payload = {
            station: state.currentStation.id,
            user_id: `WEB_USER_${Math.floor(Math.random() * 10000)}`,
            status: status === 'Confirmed' ? 'Confirmed' : 'Pending',
            scheduled_time: scheduled_time,
            amount: 0
        };

        const response = await fetch(`${API_BASE}/bookings/`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        });

        if (!response.ok) {
            const err = await response.json();
            throw new Error(err.detail || "Không thể đặt chỗ");
        }

        const booking = await response.json();
        
        document.getElementById('qr-container').classList.remove('hidden');
        document.getElementById('date-time-picker').classList.add('hidden');
        
        document.getElementById('qr-text').textContent = status === 'Confirmed' ? 
            "Quét mã này tại trạm để sạc ngay!" : 
            `Mã giữ chỗ ngày ${bookingDate} lúc ${bookingTime}.`;
        
        document.getElementById('qr-image').src = `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${booking.qr_code_data}`;
        
        // Refresh data
        await fetchStations(state.selectedWardId);
        
    } catch (error) {
        alert("Lỗi: " + error.message);
    }
}

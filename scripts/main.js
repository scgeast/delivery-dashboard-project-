// Data global untuk menyimpan data Excel
let rawData = [];
let filteredData = [];

// Chart objects
let charts = {};

// Inisialisasi aplikasi
document.addEventListener('DOMContentLoaded', function() {
    updateLastUpdateTime();
    
    // Event listener untuk upload file
    document.getElementById('file-upload').addEventListener('change', handleFileUpload);
    
    // Event listener untuk filter
    document.getElementById('apply-filters').addEventListener('click', applyFilters);
    document.getElementById('reset-filters').addEventListener('click', resetFilters);
    
    // Event listener untuk area filter change (untuk update plant filter)
    document.getElementById('area-filter').addEventListener('change', updatePlantFilterOptions);
    
    // Event listener untuk toggle filter
    document.querySelector('.filter-toggle').addEventListener('click', function() {
        const icon = this.querySelector('.fa-chevron-down');
        if (icon) {
            icon.classList.toggle('fa-chevron-down');
            icon.classList.toggle('fa-chevron-up');
        }
    });
    
    // Inisialisasi tooltips Bootstrap
    const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
    tooltipTriggerList.map(function (tooltipTriggerEl) {
        return new bootstrap.Tooltip(tooltipTriggerEl);
    });
});

// Update last update time
function updateLastUpdateTime() {
    const now = new Date();
    const formattedDate = now.toLocaleString('id-ID', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    });
    document.getElementById('last-update').textContent = `Last Update: ${formattedDate}`;
}

// Tampilkan loading indicator
function showLoading() {
    document.getElementById('loading-spinner').style.display = 'block';
}

// Sembunyikan loading indicator
function hideLoading() {
    document.getElementById('loading-spinner').style.display = 'none';
}

// Tampilkan pesan error
function showError(message) {
    // Buat element untuk menampilkan error
    const errorDiv = document.createElement('div');
    errorDiv.className = 'alert alert-danger alert-dismissible fade show';
    errorDiv.innerHTML = `
        ${message}
        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
    `;
    
    // Sisipkan error message setelah header
    const header = document.querySelector('.header');
    header.parentNode.insertBefore(errorDiv, header.nextSibling);
    
    // Hapus otomatis setelah 5 detik
    setTimeout(() => {
        if (errorDiv.parentNode) {
            errorDiv.parentNode.removeChild(errorDiv);
        }
    }, 5000);
}

// Validasi data yang dibaca dari Excel
function validateData(data) {
    if (!Array.isArray(data) || data.length === 0) {
        throw new Error('Data tidak valid atau kosong');
    }
    
    // Cek kolom yang diperlukan
    const requiredColumns = ['Area', 'DP Date', 'DP No', 'Plant Name', 'QTY', 'Truck No', 'Sales Man', 'Distance', 'End Customer Name'];
    const firstRow = data[0];
    
    const missingColumns = requiredColumns.filter(col => !firstRow.hasOwnProperty(col));
    if (missingColumns.length > 0) {
        throw new Error(`Kolom yang diperlukan tidak ditemukan: ${missingColumns.join(', ')}`);
    }
    
    return true;
}

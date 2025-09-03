// Data global untuk menyimpan data Excel
let rawData = [];
let filteredData = [];

// Chart objects
let charts = {};

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
    const loadingElement = document.getElementById('loading-spinner');
    if (loadingElement) {
        loadingElement.style.display = 'block';
    }
}

// Sembunyikan loading indicator
function hideLoading() {
    const loadingElement = document.getElementById('loading-spinner');
    if (loadingElement) {
        loadingElement.style.display = 'none';
    }
}

// Tampilkan pesan error
function showError(message) {
    // Hapus pesan sebelumnya jika ada
    const existingAlerts = document.querySelectorAll('.alert');
    existingAlerts.forEach(alert => alert.remove());
    
    // Buat element untuk menampilkan error
    const errorDiv = document.createElement('div');
    errorDiv.className = 'alert alert-danger alert-dismissible fade show';
    errorDiv.innerHTML = `
        <i class="fas fa-exclamation-circle me-2"></i> ${message}
        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
    `;
    
    // Sisipkan error message setelah header
    const header = document.querySelector('.header');
    if (header) {
        header.parentNode.insertBefore(errorDiv, header.nextSibling);
    }
    
    // Hapus otomatis setelah 5 detik
    setTimeout(() => {
        if (errorDiv.parentNode) {
            errorDiv.parentNode.removeChild(errorDiv);
        }
    }, 5000);
}

// Tampilkan pesan sukses
function showSuccess(message) {
    // Hapus pesan sebelumnya jika ada
    const existingAlerts = document.querySelectorAll('.alert');
    existingAlerts.forEach(alert => alert.remove());
    
    // Buat element untuk menampilkan pesan sukses
    const successDiv = document.createElement('div');
    successDiv.className = 'alert alert-success alert-dismissible fade show';
    successDiv.innerHTML = `
        <i class="fas fa-check-circle me-2"></i> ${message}
        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
    `;
    
    // Sisipkan pesan sukses setelah header
    const header = document.querySelector('.header');
    if (header) {
        header.parentNode.insertBefore(successDiv, header.nextSibling);
    }
    
    // Hapus otomatis setelah 5 detik
    setTimeout(() => {
        if (successDiv.parentNode) {
            successDiv.parentNode.removeChild(successDiv);
        }
    }, 5000);
}

// Process data
function processData() {
    updateLastUpdateTime();
    if (typeof updateKPIs === 'function') updateKPIs();
    if (typeof updateCharts === 'function') updateCharts();
    hideLoading();
}

// Inisialisasi aplikasi
document.addEventListener('DOMContentLoaded', function() {
    updateLastUpdateTime();
    
    // Buat loading spinner jika belum ada
    if (!document.getElementById('loading-spinner')) {
        const loadingDiv = document.createElement('div');
        loadingDiv.id = 'loading-spinner';
        loadingDiv.className = 'loading-spinner';
        loadingDiv.innerHTML = `
            <div class="text-center">
                <div class="spinner-border text-primary" role="status">
                    <span class="visually-hidden">Loading...</span>
                </div>
                <p class="mt-2">Processing data...</p>
            </div>
        `;
        loadingDiv.style.display = 'none';
        document.body.appendChild(loadingDiv);
    }
    
    // Event listener untuk upload file
    document.getElementById('file-upload').addEventListener('change', handleFileUpload);
    
    // Event listener untuk filter
    document.getElementById('apply-filters').addEventListener('click', applyFilters);
    document.getElementById('reset-filters').addEventListener('click', resetFilters);
    
    // Event listener untuk area filter change (untuk update plant filter)
    document.getElementById('area-filter').addEventListener('change', updatePlantFilterOptions);
    
    // Event listener untuk sample data
    const sampleDataBtn = document.getElementById('sample-data-btn');
    if (sampleDataBtn) {
        sampleDataBtn.addEventListener('click', useSampleData);
    }
});

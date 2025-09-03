// Fungsi untuk menangani klik tombol "Use Sample Data"
document.addEventListener('DOMContentLoaded', function() {
    const useSampleBtn = document.getElementById('sample-data-btn');
    if (useSampleBtn) {
        useSampleBtn.addEventListener('click', loadSampleData);
    }
});

// Fungsi untuk memuat sample data
function loadSampleData() {
    try {
        // Generate sample data
        const generator = new DataGenerator();
        const sampleData = generator.generateForUI(300);
        
        // Simpan data ke variabel global
        window.rawData = sampleData;
        window.filteredData = [...sampleData];
        
        // Update UI
        updateFilterOptions();
        processData();
        
        // Tampilkan pesan sukses
        showSuccess('Sample data berhasil dimuat! Gunakan filter untuk menjelajahi data.');
        
    } catch (error) {
        console.error('Error loading sample data:', error);
        showError('Error memuat sample data. Silakan cek console untuk detailnya.');
    }
}

// Fungsi untuk menampilkan pesan sukses
function showSuccess(message) {
    // Hapus pesan sebelumnya jika ada
    const existingAlerts = document.querySelectorAll('.alert');
    existingAlerts.forEach(alert => alert.remove());
    
    // Buat element alert
    const alertDiv = document.createElement('div');
    alertDiv.className = 'alert alert-success alert-dismissible fade show';
    alertDiv.innerHTML = `
        <i class="fas fa-check-circle me-2"></i> ${message}
        <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
    `;
    
    // Tambahkan alert setelah header
    const header = document.querySelector('.header');
    if (header) {
        header.parentNode.insertBefore(alertDiv, header.nextSibling);
    }
}

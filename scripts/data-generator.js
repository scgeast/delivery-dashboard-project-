// Generator data contoh untuk Dashboard Delivery Order
class DataGenerator {
    constructor() {
        this.areas = ['Jakarta', 'Bandung', 'Surabaya', 'Medan', 'Semarang', 'Bali', 'Makassar'];
        this.plants = ['Plant A', 'Plant B', 'Plant C', 'Plant D', 'Plant E'];
        this.trucks = ['B 1234 CD', 'B 5678 EF', 'B 9012 GH', 'B 3456 IJ', 'B 7890 KL', 'L 1234 MN', 'L 5678 OP'];
        this.salesmen = ['Budi Santoso', 'Sari Dewi', 'Agus Wijaya', 'Dian Pratama', 'Rina Handayani'];
        this.customers = [
            'PT. Customer Prima', 
            'CV. Makmur Jaya', 
            'PT. Sejahtera Abadi', 
            'UD. Lancar Barokah', 
            'PT. Sentosa Sejati',
            'CV. Berkah Mulia',
            'PT. Jaya Makmur',
            'UD. Tunas Baru'
        ];
    }

    // Generate data contoh
    generateSampleData(rows = 500) {
        const data = [];
        const startDate = new Date();
        startDate.setMonth(startDate.getMonth() - 3); // Data dari 3 bulan lalu hingga sekarang

        for (let i = 0; i < rows; i++) {
            const area = this.getRandomItem(this.areas);
            const plant = this.getRandomItem(this.plants);
            const dpDate = this.getRandomDate(startDate, new Date());
            const dpNo = `DP${this.getRandomInt(1000, 9999)}`;
            const qty = this.getRandomInt(100, 2000);
            const truckNo = this.getRandomItem(this.trucks);
            const salesman = this.getRandomItem(this.salesmen);
            const distance = this.getRandomInt(10, 300);
            const customer = this.getRandomItem(this.customers);

            data.push({
                'Area': area,
                'DP Date': dpDate,
                'DP No': dpNo,
                'Plant Name': plant,
                'QTY': qty,
                'Truck No': truckNo,
                'Sales Man': salesman,
                'Distance': distance,
                'End Customer Name': customer
            });
        }

        return data;
    }

    // Generate file Excel dari data
    generateExcelFile(data, filename = 'sample-data.xlsx') {
        const worksheet = XLSX.utils.json_to_sheet(data);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, 'Delivery Data');
        XLSX.writeFile(workbook, filename);
    }

    // Generate data dan download file Excel
    generateAndDownload() {
        const sampleData = this.generateSampleData(1000);
        this.generateExcelFile(sampleData, 'delivery-sample-data.xlsx');
        showSuccess('Sample data generated and downloaded successfully!');
    }

    // Generate data untuk UI tanpa download
    generateForUI(rows = 200) {
        return this.generateSampleData(rows);
    }

    // Helper function untuk mendapatkan item acak dari array
    getRandomItem(array) {
        return array[Math.floor(Math.random() * array.length)];
    }

    // Helper function untuk mendapatkan integer acak
    getRandomInt(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    // Helper function untuk mendapatkan tanggal acak
    getRandomDate(start, end) {
        const date = new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
        return date.toISOString().split('T')[0]; // Format YYYY-MM-DD
    }
}

// Fungsi untuk menggunakan sample data di UI
function useSampleData() {
    try {
        const generator = new DataGenerator();
        const sampleData = generator.generateForUI(300);
        
        // Simpan data mentah
        window.rawData = sampleData;
        window.filteredData = [...window.rawData];
        
        // Update filter options
        if (typeof updateFilterOptions === 'function') {
            updateFilterOptions();
        }
        
        // Proses data dan update dashboard
        if (typeof processData === 'function') {
            processData();
        }
        
        showSuccess('Sample data loaded successfully! Use filters to explore the data.');
    } catch (error) {
        console.error('Error loading sample data:', error);
        showError('Error loading sample data. Please check console for details.');
    }
}

// Fungsi untuk menambahkan button generator ke UI
function addDataGeneratorToUI() {
    // Cek jika sudah ada button generator
    if (document.getElementById('data-generator-btn')) {
        return;
    }

    // Buat container untuk button
    const generatorContainer = document.createElement('div');
    generatorContainer.className = 'generator-container text-center mt-3';
    
    // Buat button untuk generate dan download
    const generatorBtn = document.createElement('button');
    generatorBtn.id = 'data-generator-btn';
    generatorBtn.className = 'btn btn-info mb-2 me-2';
    generatorBtn.innerHTML = '<i class="fas fa-download me-2"></i>Generate Sample Data';
    generatorBtn.onclick = function() {
        const generator = new DataGenerator();
        generator.generateAndDownload();
    };

    // Buat button untuk menggunakan sample data di UI
    const sampleDataBtn = document.createElement('button');
    sampleDataBtn.id = 'sample-data-btn';
    sampleDataBtn.className = 'btn btn-outline-primary mb-2';
    sampleDataBtn.innerHTML = '<i class="fas fa-vial me-2"></i>Use Sample Data';
    sampleDataBtn.onclick = useSampleData;

    // Buat info text
    const infoText = document.createElement('p');
    infoText.className = 'text-muted small';
    infoText.innerHTML = 'Generate sample Excel data for testing or use sample data directly in the dashboard.';

    // Tambahkan ke container
    generatorContainer.appendChild(generatorBtn);
    generatorContainer.appendChild(sampleDataBtn);
    generatorContainer.appendChild(infoText);

    // Tambahkan ke DOM setelah upload area
    const uploadArea = document.querySelector('.upload-area');
    if (uploadArea) {
        uploadArea.parentNode.insertBefore(generatorContainer, uploadArea.nextSibling);
    }
}

// Fungsi untuk menampilkan pesan sukses
function showSuccess(message) {
    // Hapus pesan error sebelumnya jika ada
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
            const bsAlert = new bootstrap.Alert(successDiv);
            bsAlert.close();
        }
    }, 5000);
}

// Fungsi untuk menampilkan pesan error
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
            const bsAlert = new bootstrap.Alert(errorDiv);
            bsAlert.close();
        }
    }, 5000);
}

// Inisialisasi generator ketika dokumen sudah load
document.addEventListener('DOMContentLoaded', function() {
    addDataGeneratorToUI();
});

// Style CSS untuk generator button
const generatorStyles = `
.generator-container {
    padding: 15px;
    background-color: #f8f9fa;
    border-radius: 5px;
    border: 1px dashed #17a2b8;
    margin-bottom: 20px;
}

#data-generator-btn {
    background-color: #17a2b8;
    border-color: #17a2b8;
}

#data-generator-btn:hover {
    background-color: #138496;
    border-color: #117a8b;
}

#sample-data-btn {
    border-color: #0d6efd;
    color: #0d6efd;
}

#sample-data-btn:hover {
    background-color: #0d6efd;
    color: white;
}
`;

// Tambahkan style ke document
const styleSheet = document.createElement('style');
styleSheet.textContent = generatorStyles;
document.head.appendChild(styleSheet);

// data-generator.js - Versi diperbaiki

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
        startDate.setMonth(startDate.getMonth() - 3);

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
        try {
            const worksheet = XLSX.utils.json_to_sheet(data);
            const workbook = XLSX.utils.book_new();
            XLSX.utils.book_append_sheet(workbook, worksheet, 'Delivery Data');
            XLSX.writeFile(workbook, filename);
            return true;
        } catch (error) {
            console.error('Error generating Excel file:', error);
            return false;
        }
    }

    // Generate data dan download file Excel
    generateAndDownload() {
        try {
            const sampleData = this.generateSampleData(1000);
            const success = this.generateExcelFile(sampleData, 'delivery-sample-data.xlsx');
            
            if (success && typeof showSuccess === 'function') {
                showSuccess('Sample data generated and downloaded successfully!');
            } else if (!success) {
                throw new Error('Failed to generate Excel file');
            }
        } catch (error) {
            console.error('Error generating sample data:', error);
            if (typeof showError === 'function') {
                showError('Error generating sample data: ' + error.message);
            }
        }
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
        return date.toISOString().split('T')[0];
    }
}

// Fungsi untuk menggunakan sample data di UI
function useSampleData() {
    try {
        showLoading();
        
        const generator = new DataGenerator();
        const sampleData = generator.generateForUI(300);
        
        // Set global variables
        window.rawData = sampleData;
        window.filteredData = [...window.rawData];
        
        // Update UI components
        if (typeof updateFilterOptions === 'function') {
            updateFilterOptions();
        }
        
        if (typeof updateKPIs === 'function') {
            updateKPIs();
        }
        
        if (typeof updateCharts === 'function') {
            updateCharts();
        }
        
        hideLoading();
        
        if (typeof showSuccess === 'function') {
            showSuccess('Sample data loaded successfully! Use filters to explore the data.');
        }
        
        console.log('Sample data loaded:', sampleData);
    } catch (error) {
        console.error('Error loading sample data:', error);
        hideLoading();
        
        if (typeof showError === 'function') {
            showError('Error loading sample data: ' + error.message);
        }
    }
}

// Fungsi untuk menambahkan button generator ke UI
function addDataGeneratorToUI() {
    if (document.getElementById('data-generator-btn')) return;

    const generatorContainer = document.createElement('div');
    generatorContainer.className = 'generator-container text-center mt-3';
    
    const generatorBtn = document.createElement('button');
    generatorBtn.id = 'data-generator-btn';
    generatorBtn.className = 'btn btn-info mb-2 me-2';
    generatorBtn.innerHTML = '<i class="fas fa-download me-2"></i>Generate Sample Data';
    generatorBtn.onclick = function() {
        const generator = new DataGenerator();
        generator.generateAndDownload();
    };

    const sampleDataBtn = document.createElement('button');
    sampleDataBtn.id = 'sample-data-btn';
    sampleDataBtn.className = 'btn btn-outline-primary mb-2';
    sampleDataBtn.innerHTML = '<i class="fas fa-vial me-2"></i>Use Sample Data';
    sampleDataBtn.onclick = useSampleData;

    const infoText = document.createElement('p');
    infoText.className = 'text-muted small';
    infoText.innerHTML = 'Generate sample Excel data for testing or use sample data directly in the dashboard.';

    generatorContainer.appendChild(generatorBtn);
    generatorContainer.appendChild(sampleDataBtn);
    generatorContainer.appendChild(infoText);

    // Tempatkan di UI - cari tempat yang sesuai
    const uploadArea = document.querySelector('.upload-area') || document.querySelector('.card') || document.body;
    if (uploadArea) {
        uploadArea.parentNode.insertBefore(generatorContainer, uploadArea.nextSibling);
    }
}

// Initialize dengan event listener yang aman
function initDataGenerator() {
    try {
        // Tambahkan UI elements
        addDataGeneratorToUI();
        
        // Setup event listeners jika ada element dengan ID tertentu
        const sampleBtn = document.getElementById('sampleDataBtn');
        if (sampleBtn) {
            sampleBtn.addEventListener('click', useSampleData);
        }
        
        console.log("Data generator initialized successfully");
    } catch (error) {
        console.error("Error initializing data generator:", error);
    }
}

// Pastikan DOM sudah loaded sebelum initializing
document.addEventListener('DOMContentLoaded', function() {
    console.log("DOM loaded, initializing data generator");
    setTimeout(initDataGenerator, 100);
});

// Juga initialize ketika window fully loaded
window.addEventListener('load', function() {
    console.log("Window fully loaded, initializing data generator");
    initDataGenerator();
});

// Export untuk global usage
window.DataGenerator = DataGenerator;
window.useSampleData = useSampleData;
window.initDataGenerator = initDataGenerator;

console.log("Data generator loaded successfully");

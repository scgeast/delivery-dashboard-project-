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

// Fungsi untuk menambahkan button generator ke UI
function addDataGeneratorToUI() {
    // Cek jika sudah ada button generator
    if (document.getElementById('data-generator-btn')) {
        return;
    }

    // Buat container untuk button
    const generatorContainer = document.createElement('div');
    generatorContainer.className = 'generator-container text-center mt-3';
    
    // Buat button
    const generatorBtn = document.createElement('button');
    generatorBtn.id = 'data-generator-btn';
    generatorBtn.className = 'btn btn-info mb-3';
    generatorBtn.innerHTML = '<i class="fas fa-download me-2"></i>Generate Sample Data';
    generatorBtn.onclick = function() {
        const generator = new DataGenerator();
        generator.generateAndDownload();
    };

    // Buat info text
    const infoText = document.createElement('p');
    infoText.className = 'text-muted small';
    infoText.innerHTML = 'Generate sample Excel data for testing. File will be downloaded automatically.';

    // Tambahkan ke container
    generatorContainer.appendChild(generatorBtn);
    generatorContainer.appendChild(infoText);

    // Tambahkan ke DOM setelah upload area
    const uploadArea = document.querySelector('.upload-area');
    if (uploadArea) {
        uploadArea.parentNode.insertBefore(generatorContainer, uploadArea.nextSibling);
    }
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
}

#data-generator-btn {
    background-color: #17a2b8;
    border-color: #17a2b8;
}

#data-generator-btn:hover {
    background-color: #138496;
    border-color: #117a8b;
}
`;

// Tambahkan style ke document
const styleSheet = document.createElement('style');
styleSheet.textContent = generatorStyles;
document.head.appendChild(styleSheet);

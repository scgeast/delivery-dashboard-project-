// Handle file upload
function handleFileUpload(event) {
    const file = event.target.files[0];
    if (!file) return;
    
    // Validasi ukuran file
    const fileSizeMB = file.size / (1024 * 1024);
    if (fileSizeMB < 2 || fileSizeMB > 30) {
        showError('Ukuran file harus antara 2MB dan 30MB');
        return;
    }
    
    showLoading();
    
    const reader = new FileReader();
    reader.onload = function(e) {
        try {
            const data = new Uint8Array(e.target.result);
            const workbook = XLSX.read(data, { type: 'array' });
            
            // Ambil data dari sheet pertama
            const worksheet = workbook.Sheets[workbook.SheetNames[0]];
            const jsonData = XLSX.utils.sheet_to_json(worksheet);
            
            // Validasi data
            validateData(jsonData);
            
            // Simpan data mentah
            rawData = jsonData;
            filteredData = [...rawData];
            
            // Update filter options
            updateFilterOptions();
            
            // Proses data dan update dashboard
            processData();
            
            hideLoading();
        } catch (error) {
            hideLoading();
            showError(`Error membaca file: ${error.message}`);
            console.error('Error processing file:', error);
        }
    };
    
    reader.onerror = function() {
        hideLoading();
        showError('Error membaca file. Pastikan file tidak corrupt dan formatnya benar.');
    };
    
    reader.readAsArrayBuffer(file);
}

// Update opsi filter
function updateFilterOptions() {
    // Area filter
    const areas = [...new Set(rawData.map(item => item.Area))].filter(Boolean);
    const areaFilter = document.getElementById('area-filter');
    areaFilter.innerHTML = '';
    areas.forEach(area => {
        const option = document.createElement('option');
        option.value = area;
        option.textContent = area;
        areaFilter.appendChild(option);
    });
    
    // Plant filter
    updatePlantFilterOptions();
    
    // Salesman filter
    const salesmen = [...new Set(rawData.map(item => item['Sales Man']))].filter(Boolean);
    const salesmanFilter = document.getElementById('salesman-filter');
    salesmanFilter.innerHTML = '';
    salesmen.forEach(salesman => {
        const option = document.createElement('option');
        option.value = salesman;
        option.textContent = salesman;
        salesmanFilter.appendChild(option);
    });
    
    // Customer filter
    const customers = [...new Set(rawData.map(item => item['End Customer Name']))].filter(Boolean);
    const customerFilter = document.getElementById('customer-filter');
    customerFilter.innerHTML = '';
    customers.forEach(customer => {
        const option = document.createElement('option');
        option.value = customer;
        option.textContent = customer;
        customerFilter.appendChild(option);
    });
    
    // Set date range
    const dates = rawData.map(item => {
        const date = new Date(item['DP Date']);
        return isNaN(date) ? null : date;
    }).filter(d => d !== null);
    
    if (dates.length > 0) {
        const minDate = new Date(Math.min.apply(null, dates));
        const maxDate = new Date(Math.max.apply(null, dates));
        
        document.getElementById('start-date').valueAsDate = minDate;
        document.getElementById('end-date').valueAsDate = maxDate;
    }
}

// Update plant filter berdasarkan area yang dipilih
function updatePlantFilterOptions() {
    const selectedAreas = Array.from(document.getElementById('area-filter').selectedOptions)
        .map(option => option.value);
    
    let plants;
    if (selectedAreas.length > 0) {
        plants = [...new Set(rawData
            .filter(item => selectedAreas.includes(item.Area))
            .map(item => item['Plant Name'])
        )].filter(Boolean);
    } else {
        plants = [...new Set(rawData.map(item => item['Plant Name']))].filter(Boolean);
    }
    
    const plantFilter = document.getElementById('plant-filter');
    plantFilter.innerHTML = '';
    plants.forEach(plant => {
        const option = document.createElement('option');
        option.value = plant;
        option.textContent = plant;
        plantFilter.appendChild(option);
    });
}

// Terapkan filter
function applyFilters() {
    const selectedAreas = Array.from(document.getElementById('area-filter').selectedOptions)
        .map(option => option.value);
    const selectedPlants = Array.from(document.getElementById('plant-filter').selectedOptions)
        .map(option => option.value);
    const selectedSalesmen = Array.from(document.getElementById('salesman-filter').selectedOptions)
        .map(option => option.value);
    const selectedCustomers = Array.from(document.getElementById('customer-filter').selectedOptions)
        .map(option => option.value);
    
    const startDate = new Date(document.getElementById('start-date').value);
    const endDate = new Date(document.getElementById('end-date').value);
    endDate.setHours(23, 59, 59, 999); // Sampai akhir hari
    
    filteredData = rawData.filter(item => {
        // Filter area
        if (selectedAreas.length > 0 && !selectedAreas.includes(item.Area)) {
            return false;
        }
        
        // Filter plant
        if (selectedPlants.length > 0 && !selectedPlants.includes(item['Plant Name'])) {
            return false;
        }
        
        // Filter salesman
        if (selectedSalesmen.length > 0 && !selectedSalesmen.includes(item['Sales Man'])) {
            return false;
        }
        
        // Filter customer
        if (selectedCustomers.length > 0 && !selectedCustomers.includes(item['End Customer Name'])) {
            return false;
        }
        
        // Filter tanggal
        const itemDate = new Date(item['DP Date']);
        if (isNaN(itemDate) || itemDate < startDate || itemDate > endDate) {
            return false;
        }
        
        return true;
    });
    
    // Update dashboard dengan data yang sudah difilter
    processData();
}

// Reset filter
function resetFilters() {
    document.getElementById('area-filter').selectedIndex = -1;
    document.getElementById('plant-filter').selectedIndex = -1;
    document.getElementById('salesman-filter').selectedIndex = -1;
    document.getElementById('customer-filter').selectedIndex = -1;
    
    const dates = rawData.map(item => {
        const date = new Date(item['DP Date']);
        return isNaN(date) ? null : date;
    }).filter(d => d !== null);
    
    if (dates.length > 0) {
        const minDate = new Date(Math.min.apply(null, dates));
        const maxDate = new Date(Math.max.apply(null, dates));
        
        document.getElementById('start-date').valueAsDate = minDate;
        document.getElementById('end-date').valueAsDate = maxDate;
    }
    
    filteredData = [...rawData];
    processData();
}

// Proses data dan update dashboard
function processData() {
    updateLastUpdateTime();
    updateKPIs();
    updateCharts();
}

// Update KPI cards
function updateKPIs() {
    // Total Area
    const totalArea = new Set(filteredData.map(item => item.Area)).size;
    document.getElementById('total-area').textContent = totalArea;
    
    // Total Plant
    const totalPlant = new Set(filteredData.map(item => item['Plant Name'])).size;
    document.getElementById('total-plant').textContent = totalPlant;
    
    // Total Volume
    const totalVolume = filteredData.reduce((sum, item) => sum + (Number(item.QTY) || 0), 0);
    document.getElementById('total-volume').textContent = totalVolume.toLocaleString();
    
    // Avg Volume
    const avgVolume = filteredData.length > 0 ? totalVolume / filteredData.length : 0;
    document.getElementById('avg-volume').textContent = avgVolume.toFixed(2);
    
    // Total TM (Truck No)
    const totalTM = new Set(filteredData.map(item => item['Truck No'])).size;
    document.getElementById('total-tm').textContent = totalTM;
    
    // Total Trip (DP No)
    const totalTrip = new Set(filteredData.map(item => item['DP No'])).size;
    
    // Avg Load/Trip
    const avgLoadTrip = totalTrip > 0 ? totalVolume / totalTrip : 0;
    document.getElementById('avg-load-trip').textContent = avgLoadTrip.toFixed(2);
}

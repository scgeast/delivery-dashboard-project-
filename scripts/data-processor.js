// data-processor.js - Versi diperbaiki

function processData() {
    console.log("Processing data for dashboard update");
    
    try {
        // Validasi data
        if (!filteredData || !Array.isArray(filteredData) || filteredData.length === 0) {
            console.warn("No filtered data available for processing");
            return null;
        }
        
        // 1. Update KPI cards
        updateKPIs();
        
        // 2. Process data untuk charts
        const processedData = {
            // Data untuk volume per area
            volumePerArea: processVolumePerArea(),
            
            // Data untuk volume per plant
            volumePerPlant: processVolumePerPlant(),
            
            // Data untuk average volume per area
            avgVolumePerArea: processAvgVolumePerArea(),
            
            // Data untuk volume per salesman
            volumePerSalesman: processVolumePerSalesman(),
            
            // Data untuk volume per customer
            volumePerCustomer: processVolumePerCustomer(),
            
            // Data untuk volume per truck
            volumePerTruck: processVolumePerTruck(),
            
            // Data untuk trip per truck
            tripPerTruck: processTripPerTruck(),
            
            // Data untuk average load per truck
            avgLoadPerTruck: processAvgLoadPerTruck(),
            
            // Data untuk average distance per area
            avgDistancePerArea: processAvgDistancePerArea(),
            
            // Data untuk average distance per plant
            avgDistancePerPlant: processAvgDistancePerPlant(),
            
            timestamp: new Date().toISOString()
        };
        
        console.log("Data processed successfully:", processedData);
        
        // 3. Update charts dengan data yang sudah diproses
        if (typeof updateCharts === 'function') {
            updateCharts(processedData);
        } else {
            console.warn("updateCharts function not available");
        }
        
        return processedData;
        
    } catch (error) {
        console.error("Error processing data:", error);
        showError('Error processing data: ' + error.message);
        throw error;
    }
}

// Helper functions untuk memproses berbagai jenis data
function processVolumePerArea() {
    const areaVolume = {};
    filteredData.forEach(item => {
        const area = item.Area || 'Unknown';
        const volume = Number(item.QTY) || 0;
        areaVolume[area] = (areaVolume[area] || 0) + volume;
    });
    
    return {
        labels: Object.keys(areaVolume),
        values: Object.values(areaVolume)
    };
}

function processVolumePerPlant() {
    const plantVolume = {};
    filteredData.forEach(item => {
        const plant = item['Plant Name'] || 'Unknown';
        const volume = Number(item.QTY) || 0;
        plantVolume[plant] = (plantVolume[plant] || 0) + volume;
    });
    
    // Ambil hanya 10 plant dengan volume tertinggi
    const sortedPlants = Object.entries(plantVolume)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 10);
    
    return {
        labels: sortedPlants.map(item => item[0]),
        values: sortedPlants.map(item => item[1])
    };
}

function processAvgVolumePerArea() {
    const areaData = {};
    
    filteredData.forEach(item => {
        const area = item.Area || 'Unknown';
        const volume = Number(item.QTY) || 0;
        
        if (!areaData[area]) {
            areaData[area] = { totalVolume: 0, count: 0 };
        }
        
        areaData[area].totalVolume += volume;
        areaData[area].count += 1;
    });
    
    // Hitung rata-rata
    const result = {};
    for (const area in areaData) {
        result[area] = areaData[area].totalVolume / areaData[area].count;
    }
    
    return {
        labels: Object.keys(result),
        values: Object.values(result)
    };
}

function processVolumePerSalesman() {
    const salesmanVolume = {};
    filteredData.forEach(item => {
        const salesman = item['Sales Man'] || 'Unknown';
        const volume = Number(item.QTY) || 0;
        salesmanVolume[salesman] = (salesmanVolume[salesman] || 0) + volume;
    });
    
    // Ambil hanya 10 salesman dengan volume tertinggi
    const sortedSalesmen = Object.entries(salesmanVolume)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 10);
    
    return {
        labels: sortedSalesmen.map(item => item[0]),
        values: sortedSalesmen.map(item => item[1])
    };
}

function processVolumePerCustomer() {
    const customerVolume = {};
    filteredData.forEach(item => {
        const customer = item['End Customer Name'] || 'Unknown';
        const volume = Number(item.QTY) || 0;
        customerVolume[customer] = (customerVolume[customer] || 0) + volume;
    });
    
    // Ambil hanya 10 customer dengan volume tertinggi
    const sortedCustomers = Object.entries(customerVolume)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 10);
    
    return {
        labels: sortedCustomers.map(item => item[0]),
        values: sortedCustomers.map(item => item[1])
    };
}

// Stub functions untuk data yang belum diimplementasi
function processVolumePerTruck() {
    console.log("processVolumePerTruck called - needs implementation");
    return { labels: [], values: [] };
}

function processTripPerTruck() {
    console.log("processTripPerTruck called - needs implementation");
    return { labels: [], values: [] };
}

function processAvgLoadPerTruck() {
    console.log("processAvgLoadPerTruck called - needs implementation");
    return { labels: [], values: [] };
}

function processAvgDistancePerArea() {
    console.log("processAvgDistancePerArea called - needs implementation");
    return { labels: [], values: [] };
}

function processAvgDistancePerPlant() {
    console.log("processAvgDistancePerPlant called - needs implementation");
    return { labels: [], values: [] };
}

// Pastikan fungsi tersedia secara global
window.processData = processData;
window.dataProcessor = {
    processData,
    processVolumePerArea,
    processVolumePerPlant,
    processAvgVolumePerArea,
    processVolumePerSalesman,
    processVolumePerCustomer
};

console.log("Data processor loaded successfully");

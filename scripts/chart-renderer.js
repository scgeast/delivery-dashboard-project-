// Update semua charts
function updateCharts() {
    updateVolumePerAreaChart();
    updateVolumePerPlantChart();
    updateAvgVolumeAreaChart();
    updateAvgVolumePlantChart();
    updateVolumePerTruckChart();
    updateTripPerTruckChart();
    updateAvgLoadTruckChart();
    updateAvgDistanceAreaChart();
    updateAvgDistancePlantChart();
    updateVolumeSalesmanChart();
    updateVolumeCustomerChart();
}

// Fungsi helper untuk menghasilkan warna acak
function getRandomColor() {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

// Fungsi helper untuk menghasilkan array warna
function generateColors(count) {
    const colors = [];
    for (let i = 0; i < count; i++) {
        colors.push(getRandomColor());
    }
    return colors;
}

// Chart: Total Volume Delivery Per Area
function updateVolumePerAreaChart() {
    const areaVolume = {};
    filteredData.forEach(item => {
        const area = item.Area || 'Unknown';
        const volume = Number(item.QTY) || 0;
        areaVolume[area] = (areaVolume[area] || 0) + volume;
    });
    
    const ctx = document.getElementById('volume-per-area-chart').getContext('2d');
    if (charts['volumePerArea']) {
        charts['volumePerArea'].destroy();
    }
    
    const backgroundColors = generateColors(Object.keys(areaVolume).length);
    
    charts['volumePerArea'] = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: Object.keys(areaVolume),
            datasets: [{
                label: 'Total Volume',
                data: Object.values(areaVolume),
                backgroundColor: backgroundColors,
                borderColor: backgroundColors.map(color => color.replace('0.7', '1')),
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            scales: {
                y: {
                    beginAtZero: true,
                    title: {
                        display: true,
                        text: 'Volume'
                    }
                },
                x: {
                    title: {
                        display: true,
                        text: 'Area'
                    }
                }
            },
            plugins: {
                legend: {
                    display: false
                },
                title: {
                    display: true,
                    text: 'Total Volume per Area'
                }
            }
        }
    });
}

// Chart: Total Volume Delivery Per Plant Name
function updateVolumePerPlantChart() {
    const plantVolume = {};
    filteredData.forEach(item => {
        const plant = item['Plant Name'] || 'Unknown';
        const volume = Number(item.QTY) || 0;
        plantVolume[plant] = (plantVolume[plant] || 0) + volume;
    });
    
    // Ambil hanya 10 plant dengan volume tertinggi untuk kejelasan visual
    const sortedPlants = Object.entries(plantVolume)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 10);
    
    const ctx = document.getElementById('volume-per-plant-chart').getContext('2d');
    if (charts['volumePerPlant']) {
        charts['volumePerPlant'].destroy();
    }
    
    const backgroundColors = generateColors(sortedPlants.length);
    
    charts['volumePerPlant'] = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: sortedPlants.map(item => item[0]),
            datasets: [{
                label: 'Total Volume',
                data: sortedPlants.map(item => item[1]),
                backgroundColor: backgroundColors,
                borderColor: backgroundColors.map(color => color.replace('0.7', '1')),
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            scales: {
                y: {
                    beginAtZero: true,
                    title: {
                        display: true,
                        text: 'Volume'
                    }
                },
                x: {
                    title: {
                        display: true,
                        text: 'Plant Name'
                    }
                }
            },
            plugins: {
                legend: {
                    display: false
                },
                title: {
                    display: true,
                    text: 'Total Volume per Plant (Top 10)'
                }
            }
        }
    });
}

// Implementasi fungsi chart lainnya akan mengikuti pola yang sama...
// Untuk singkatnya, saya tidak menuliskan semua fungsi chart di sini

// Chart: Total Volume Per Sales Man
function updateVolumeSalesmanChart() {
    const salesmanVolume = {};
    filteredData.forEach(item => {
        const salesman = item['Sales Man'] || 'Unknown';
        const volume = Number(item.QTY) || 0;
        salesmanVolume[salesman] = (salesmanVolume[salesman] || 0) + volume;
    });
    
    // Ambil hanya 10 salesman dengan volume tertinggi untuk kejelasan visual
    const sortedSalesmen = Object.entries(salesmanVolume)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 10);
    
    const ctx = document.getElementById('volume-salesman-chart').getContext('2d');
    if (charts['volumeSalesman']) {
        charts['volumeSalesman'].destroy();
    }
    
    const backgroundColors = generateColors(sortedSalesmen.length);
    
    charts['volumeSalesman'] = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: sortedSalesmen.map(item => item[0]),
            datasets: [{
                label: 'Total Volume',
                data: sortedSalesmen.map(item => item[1]),
                backgroundColor: backgroundColors,
                borderColor: backgroundColors.map(color => color.replace('0.7', '1')),
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            indexAxis: 'y', // Chart horizontal
            scales: {
                x: {
                    beginAtZero: true,
                    title: {
                        display: true,
                        text: 'Volume'
                    }
                },
                y: {
                    title: {
                        display: true,
                        text: 'Sales Man'
                    }
                }
            },
            plugins: {
                legend: {
                    display: false
                },
                title: {
                    display: true,
                    text: 'Total Volume per Sales Man (Top 10)'
                }
            }
        }
    });
}

// Chart: Total Volume Per End Customer Name
function updateVolumeCustomerChart() {
    const customerVolume = {};
    filteredData.forEach(item => {
        const customer = item['End Customer Name'] || 'Unknown';
        const volume = Number(item.QTY) || 0;
        customerVolume[customer] = (customerVolume[customer] || 0) + volume;
    });
    
    // Ambil hanya 10 customer dengan volume tertinggi untuk kejelasan visual
    const sortedCustomers = Object.entries(customerVolume)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 10);
    
    const ctx = document.getElementById('volume-customer-chart').getContext('2d');
    if (charts['volumeCustomer']) {
        charts['volumeCustomer'].destroy();
    }
    
    const backgroundColors = generateColors(sortedCustomers.length);
    
    charts['volumeCustomer'] = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: sortedCustomers.map(item => item[0]),
            datasets: [{
                label: 'Total Volume',
                data: sortedCustomers.map(item => item[1]),
                backgroundColor: backgroundColors,
                borderColor: backgroundColors.map(color => color.replace('0.7', '1')),
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            indexAxis: 'y', // Chart horizontal
            scales: {
                x: {
                    beginAtZero: true,
                    title: {
                        display: true,
                        text: 'Volume'
                    }
                },
                y: {
                    title: {
                        display: true,
                        text: 'End Customer'
                    }
                }
            },
            plugins: {
                legend: {
                    display: false
                },
                title: {
                    display: true,
                    text: 'Total Volume per End Customer (Top 10)'
                }
            }
        }
    });
}

# Dashboard Summary Daily Delivery Order

Dashboard untuk menganalisis data delivery order dari file Excel.

## Fitur

- Upload file Excel (2MB - 30MB)
- Filter data berdasarkan Area, Tanggal, Plant, Salesman, dan Customer
- Key Performance Indicators (KPI)
- Visualisasi data dengan berbagai chart
- Dua tab: Logistic dan Sales Performance

## Format Data yang Diperlukan

File Excel harus memiliki kolom berikut:
- Area
- DP Date (Delivery Date/Day)
- DP No (untuk menghitung Trip)
- Plant Name
- QTY (untuk menghitung Volume)
- Truck No (TM)
- Sales Man
- Distance
- End Customer Name

## Cara Penggunaan

1. Buka file `index.html` di browser
2. Upload file Excel yang sesuai format
3. Gunakan filter untuk menyaring data (opsional)
4. Lihat hasil analisis di dashboard

## Teknologi yang Digunakan

- HTML5
- CSS3 dengan Bootstrap 5
- JavaScript ES6+
- Chart.js untuk visualisasi data
- SheetJS (xlsx) untuk membaca file Excel
- Font Awesome untuk ikon

## Struktur Project


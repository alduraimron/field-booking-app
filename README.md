# 🚀 Seport

Application for reserving sport fields. User can see schedule of fields and booking the field. This app is design for making it easier to user book sports fields. 

## ✨ Features 

- view list of sport center
- view the schedule list for each field
- booking a field

## 🛠️ Tech Stack

**Frontend:** React.js, TailwindCSS\
**Backend:** Laravel, MySql

## 🚀 Getting Started

### Prerequisites

- Node v22.16.0 or later
- PHP 8.3.6 or later
- Composer 2.8.9 or later
- MySql

### Installation

**Back-end**

1. Make sure you have database MySql
2. From frontend folder move to backend folder:
```bash
cd ../backend
```
3. Provide all environtment variables in `.env` with:
```bash
DB_CONNECTION=mysql
DB_HOST=
DB_PORT=
DB_DATABASE=
DB_USERNAME=
DB_PASSWORD=
```
4. Download the packages:
```bash
composer install
```
5. Generate app key & run migration:
```bash
php artisan key:generate
php artisan migrate
```
6. Run the app:
```bash
composer run dev
```

**Front-end**

1. Clone this github repository :
```bash
git clone https://github.com/alduraimron/field-booking-app.git
cd field-booking-app/frontend
```
2. Provide all environtment variables in `.env` with :
```bash
# your backend URL 
VITE_API_BASE_URL=
# example = http://192.168.1.14:8000
```
3. Download the packages:
```bash
npm install
```
4. Run the app:
```bash
npm run dev
```

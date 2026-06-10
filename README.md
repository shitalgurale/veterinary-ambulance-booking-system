# Veterinary Ambulance Booking System

Full Stack Veterinary Ambulance Booking System built using Django, Django REST Framework, React.js, Vite, JavaScript, MySQL, HTML, and CSS.

## 🚀 Tech Stack

### Backend

* Python
* Django
* Django REST Framework (DRF)

### Frontend

* React.js
* Vite
* JavaScript
* CSS

### Database

* MySQL

---

## 📋 Features

### Pet Owner Management

* Add new pet owners
* View owner details
* Update owner information
* Delete owners

### Pet Management

* Register pets
* Associate pets with owners
* View pet records
* Update pet information

### Veterinarian Management

* Add veterinarians
* Manage vet profiles
* View veterinarian records

### Appointment Management

* Schedule appointments
* Update appointment details
* View appointment history
* Cancel appointments

### Ambulance Booking

* Emergency ambulance requests
* Veterinary ambulance management
* Service tracking

---

## 📁 Project Structure

```text
Veterinary Ambulance Booking System
│
├── backend/
│   ├── manage.py
│   ├── requirements.txt
│   └── ...
│
├── frontend/
│   ├── src/
│   ├── package.json
│   └── ...
│
└── README.md
```

---

## ⚙️ Backend Setup

Navigate to backend directory:

```bash
cd backend
```

Create virtual environment:

```bash
python -m venv venv
```

Activate virtual environment:

### Windows

```bash
venv\Scripts\activate
```

Install dependencies:

```bash
pip install -r requirements.txt
```

Run migrations:

```bash
python manage.py migrate
```

Start Django server:

```bash
python manage.py runserver
```

Backend URL:

```text
http://127.0.0.1:8000/
```

---

## ⚙️ Frontend Setup

Navigate to frontend directory:

```bash
cd frontend/veterinary_ambulance
```

Install dependencies:

```bash
npm install
```

Start development server:

```bash
npm run dev
```

Frontend URL:

```text
http://localhost:5173/
```

---

## API Endpoints

### Owners

```text
GET    /owners/
POST   /owners/
PUT    /owners/{id}/
DELETE /owners/{id}/
```

### Pets

```text
GET    /pets/
POST   /pets/
PUT    /pets/{id}/
DELETE /pets/{id}/
```

### Veterinarians

```text
GET    /vets/
POST   /vets/
PUT    /vets/{id}/
DELETE /vets/{id}/
```

### Appointments

```text
GET    /appointments/
POST   /appointments/
PUT    /appointments/{id}/
DELETE /appointments/{id}/
```

---

## 🎯 Future Enhancements

* JWT Authentication
* Role-based access control
* Real-time ambulance tracking
* Notifications and alerts
* Dashboard analytics
* Payment integration

---

## 👨‍💻 Author

**Shital Gurale**

GitHub: https://github.com/shitalgurale

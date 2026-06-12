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

* Sqlite
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

Project Structure
.
├── backend/
│   └── veterinary_Ambulance/
│       ├── manage.py
│       └── veterinary_ambulance/
├── frontend/
│   └── veterinary_ambulance/
│       ├── src/
│       └── package.json
└── README.md
Getting Started
Backend
cd backend/veterinary_Ambulance
pip install -r requirements.txt
python manage.py migrate
python manage.py runserver

The backend will be available at:

http://127.0.0.1:8000/
Frontend
cd frontend/veterinary_ambulance
npm install
npm run dev

The frontend will be available at:

http://localhost:5173/
API Endpoints
/api/
/api/owners/
/api/pets/
/api/vets/
/api/appointments/

Create virtual environment:

```bash
python -m venv venv
```

Activate virtual environment:

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

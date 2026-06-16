# 🐾 Veterinary Ambulance Booking System

A full-stack web application designed to simplify veterinary service management by providing ambulance booking, appointment scheduling, and pet record management in one platform.

## 🚀 Live Demo

- **Frontend (Vercel):** https://veterinary-ambulance-booking-system.vercel.app
- **Backend API (Render):** https://veterinary-ambulance-booking-system.onrender.com


## 🚀 Features

- 🐶 Pet Management (CRUD)
- 👤 Owner Management (CRUD)
- 👨‍⚕️ Veterinarian Management (CRUD)
- 📅 Appointment Scheduling
- 🚑 Veterinary Ambulance Booking
- 🔄 REST API Integration
- ✅ Form Validation and Error Handling
- 💾 Database Management with SQLite
- 📱 Responsive User Interface using Material UI

## 🛠️ Tech Stack

### Frontend
- React.js
- Material UI
- JavaScript
- HTML5
- CSS3

### Backend
- Python
- Django
- Django REST Framework

### Database
- SQLite

## 📂 Project Modules

- Owner Management
- Pet Management
- Veterinarian Management
- Appointment Booking
- Ambulance Booking
- API Integration
- Validation & Error Handling

## 🎯 Key Highlights

- Developed a complete full-stack veterinary management system.
- Implemented CRUD operations for Owners, Pets, Vets, and Appointments.
- Built an ambulance booking and scheduling module to streamline emergency services.
- Integrated RESTful APIs between frontend and backend.
- Implemented input validation and error handling for improved reliability.
- Designed and managed the database using SQLite.

## 🛠️ Tech Stack

### Frontend
- React
- Vite
- Material UI (MUI)
- React Router

### Backend
- Python
- Django
- Django REST Framework

### Database
- SQLite (Development)

### Deployment
- Vercel (Frontend)
- Render (Backend)
## 📂 Project Structure

```
Veterinary Ambulance Booking System/
│
├── backend/
│   └── veterinary_ambulance/
│
└── frontend/
    └── veterinary_ambulance/
```

---

## ⚙️ Local Setup

### Clone the repository

```bash
git clone https://github.com/shitalgurale/veterinary-ambulance-booking-system.git
cd veterinary-ambulance-booking-system
```

### Backend Setup

```bash
cd backend/veterinary_ambulance

python -m venv venv

# Windows
venv\Scripts\activate

pip install -r requirements.txt

python manage.py migrate

python manage.py runserver
```

### Frontend Setup

```bash
cd frontend/veterinary_ambulance

npm install

npm run dev
```

---

## 🔧 Environment Variables

Create a `.env` file in the frontend project:

```env
VITE_API_URL=http://127.0.0.1:8000/api
```

For production, configure:

```env
VITE_API_URL=https://your-render-backend.onrender.com/api
```
## 👩‍💻 Author

**Shital Gurale**

- GitHub: https://github.com/shitalgurale
- LinkedIn: https://www.linkedin.com/in/shital-gurale-7a8b00407/

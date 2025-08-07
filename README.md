
# 🛠️ Service Booking System – Backend

This is the **backend API** for a secure, role-based **Service Booking System**, built with Node.js, Express.js, and MongoDB. It supports JWT authentication and role-based access for users and admins.

---

## 🚀 Features

- 🔐 **JWT Authentication** (Access + Refresh Tokens)
- 👤 **User Roles**: `user`, `admin`
- 📅 **Booking Management**:
  - Users: create, view, update, cancel own bookings
  - Admins: view all bookings, approve, reject, delete any
- 🧱 **Modular Codebase**: Controllers, Routes, Middleware, Models
- 🌐 **MongoDB** integration via Mongoose

---

## 📁 Project Structure

```
service-booking-backend/
├── config/
│   └── connectMongoDb.js
├── controllers/
│   ├── admin.controller.js
│   ├── auth.controller.js
│   └── user.controller.js
├── middlewares/
│   ├── auth.middlewares.js
│   └── authorizeRole.js
├── model/
│   ├── booking.model.js
│   └── user.model.js
├── routes/
│   ├── admin.routes.js
│   ├── auth.routes.js
│   └── user.routes.js
├── .env
├── .gitignore
├── index.js
├── package.json
└── README.md
```

---

## ⚙️ Installation & Setup

```bash
# 1. Clone the repository
git clone https://github.com/durgeshkr-5/service-booking-system-with-auth.git
cd service-booking-system-with-auth

# 2. Install dependencies
npm install

# 3. Configure environment variables
touch .env
```

### ✅ Example `.env`

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
ACCESS_TOKEN_SECRET=youraccesstokensecret
REFRESH_TOKEN_SECRET=yourrefreshtokensecret
```

```bash
# 4. Run the development server
npm run dev
```

---

## 📬 API Overview

### 🔐 Auth Routes

| Method | Endpoint     | Description           |
|--------|--------------|-----------------------|
| POST   | `/signup`    | Register new user     |
| POST   | `/login`     | Login and get tokens  |
| POST   | `/refresh`   | Refresh access token  |

### 👤 User Routes

| Method | Endpoint         | Description                 |
|--------|------------------|-----------------------------|
| GET    | `/bookings`      | View own bookings           |
| POST   | `/bookings`      | Create new booking          |
| PUT    | `/bookings/:id`  | Update own pending booking  |
| DELETE | `/bookings/:id`  | Cancel own pending booking  |

### 🛡️ Admin Routes

| Method | Endpoint                      | Description              |
|--------|-------------------------------|--------------------------|
| GET    | `/admin/bookings`             | View all bookings        |
| PATCH  | `/admin/bookings/:id/approve` | Approve booking          |
| PATCH  | `/admin/bookings/:id/reject`  | Reject booking           |
| DELETE | `/admin/bookings/:id`         | Delete any booking       |

---

## 🧑‍💻 Author

**Durgesh Kumar** – Full Stack Web Developer  
[GitHub](https://github.com/durgeshfsd) • [LinkedIn](https://linkedin.com/in/durgesh-kumar-fsd)

---

## 📄 License



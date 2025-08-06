# 🌤️ Fidenz Weather App – Full Stack Project

This project is a secure full stack weather information application built for the Fidenz Technologies Full Stack Assignment 2025.

It includes:

- A **React frontend** for displaying real-time weather data.
- A **Node.js + Express backend** that integrates with the **OpenWeatherMap API**.
- Secure login/logout using **Auth0 Authentication**.
- In-memory **caching** to optimize API calls.
- A mobile-friendly, responsive UI.

---

## 📦 Tech Stack

| Layer           | Technology                  |
|----------------|-----------------------------|
| Frontend       | React + Tailwind CSS        |
| Backend        | Node.js + Express           |
| Auth           | Auth0 (SPA + Auth0 React SDK) |
| Weather API    | OpenWeatherMap              |
| Caching        | node-cache (5-minute TTL)   |

---

## 📁 Folder Structure

```
weather-app/
├── client/                 # React frontend
│   └── src/
│       ├── components/     # WeatherCard component
│       ├── services/       # API calls
│       └── App.jsx
├── server/                 # Node + Express backend
│   ├── controllers/
│   ├── routes/
│   ├── utils/
│   ├── cache/
│   ├── app.js
│   └── server.js
├── cities.json             # Provided city code data
└── README.md
```

---

## 🔐 Authentication (Auth0)

- The app uses **Auth0** for secure authentication.
- Users **must be logged in** to view the weather dashboard.
- Auth0 **SPA SDK** handles login/logout and user sessions.

### Test Account

> Use the following test account to log in:

```
Email: careers@fidenz.com
Password: Pass#fidenz
```

---

## 🔒 MFA (Multi-Factor Authentication)

Due to **Auth0 free tier limitations**, MFA options such as Email or OTP cannot be enabled unless the account is upgraded to a **Pro/Enterprise plan**.

The codebase and structure are ready for MFA, and policies can be enforced in Auth0 Dashboard → Security → Multi-Factor Auth if an upgrade is made.

---

## 🚀 Setup Instructions

### 📌 Prerequisites

- Node.js installed
- Git installed
- OpenWeatherMap API key (register at [https://openweathermap.org/](https://openweathermap.org/))
- Auth0 account (free)

---

### 1. Clone the Repository

```bash
git clone https://github.com/heshanjeewantha/weather-app.git
cd weather-app
```

### 2. Setup Backend

```bash
cd server
npm install
```

Create `.env` file in `/server`:

```env
PORT=5000
OPENWEATHER_API_KEY=your_openweather_api_key_here
```

Run backend:

```bash
node server.js
```

Backend API is now available at: `http://localhost:5000/api/weather`

### 3. Setup Frontend

```bash
cd ../client
npm install
```

Create `.env` file in `/client`:

```env
VITE_AUTH0_DOMAIN=your-auth0-domain
VITE_AUTH0_CLIENT_ID=your-auth0-client-id
VITE_BACKEND_URL=http://localhost:5000
```

Run frontend:

```bash
npm run dev
```

Visit: `http://localhost:5173`

---

## ⚙️ Features

✅ Auth0-secured routes

✅ Weather data from OpenWeatherMap API

✅ Displays: City name, weather condition, temperature

✅ Data caching for 5 minutes

✅ Responsive design (mobile + desktop)

✅ Error handling and loading states

✅ Individual API calls for better reliability

---

## 🏗️ Architecture

### Backend
- **Express.js** server with RESTful API endpoints
- **Individual weather API calls** for each city (more reliable than group endpoints)
- **In-memory caching** with 5-minute TTL to reduce API calls
- **Error handling** for failed city requests
- **Environment variable** configuration

### Frontend
- **React 18** with functional components and hooks
- **Auth0 React SDK** for authentication
- **Axios** for HTTP requests
- **Tailwind CSS** for styling
- **Responsive design** for mobile and desktop

### Data Flow
1. User logs in via Auth0
2. Frontend requests weather data from backend
3. Backend checks cache first
4. If cache miss, makes individual API calls to OpenWeatherMap
5. Results are cached and returned to frontend
6. Frontend displays weather cards

---



## 🔗 Important Links

- [Auth0 Docs](https://auth0.com/docs)
- [OpenWeatherMap API Docs](https://openweathermap.org/api)
- [React Documentation](https://react.dev/)
- [Tailwind CSS](https://tailwindcss.com/)

---

## 🛠️ Development Notes

### Weather API
- Uses individual city API calls instead of group endpoint for better compatibility
- Implements error handling for individual city failures
- Caches successful responses for 5 minutes

### Authentication
- Implements Auth0 SPA authentication flow
- Protects weather data behind authentication
- Handles loading states during auth checks

### Styling
- Uses Tailwind CSS v4 with Vite integration
- Responsive design with mobile-first approach
- Clean, modern UI with weather-themed styling

---

## 🙌 Author

**Developed by:** heshan jeewantha 
**GitHub:** https://github.com/heshanjeewantha
**Email:** heshanjeewantha@gmail.com

---



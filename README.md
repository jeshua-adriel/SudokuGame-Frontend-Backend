# 🎮 Sudoki Game

A full-stack web-based Sudoku game built with **React** and **Django REST Framework**. The project combines interactive Sudoku gameplay with player accounts, authentication, and score tracking.

> **Sudoki** — because solving Sudoku is easier than spelling it. 😄

## ✨ Features

* 🧩 Interactive Sudoku gameplay
* 👤 Player registration and login
* 🔐 User authentication
* 🏆 High-score tracking
* 📊 Player score persistence
* ⚡ React-based interactive frontend
* 🐍 Django REST Framework backend
* 📱 Responsive game interface
* 🎵 Optional game audio and sound effects

## 🛠️ Tech Stack

### Frontend

* **React.js**
* **Vite**
* **JavaScript**
* **CSS**

### Backend

* **Python**
* **Django**
* **Django REST Framework**
* **Gunicorn**

### Database

* **SQLite** for local development

### Deployment

* **Render** — Backend/API hosting
* **Netlify** — Frontend hosting

## 📁 Project Structure

```text
SudokiGame/
│
├── Backend/
│   ├── sudoku_app/
│   │   ├── settings.py
│   │   ├── urls.py
│   │   ├── wsgi.py
│   │   └── ...
│   │
│   ├── manage.py
│   ├── requirements.txt
│   └── ...
│
└── Frontend/
    ├── src/
    │   ├── components/
    │   ├── pages/
    │   ├── hooks/
    │   ├── styles/
    │   └── ...
    │
    ├── public/
    ├── package.json
    └── ...
```

## 🚀 Getting Started

### Prerequisites

Make sure you have the following installed:

* Python 3.x
* Node.js
* npm
* Git

---

## 🔧 Backend Setup

Navigate to the backend directory:

```bash
cd Backend
```

Create a virtual environment:

```bash
python -m venv venv
```

Activate the virtual environment.

**Windows:**

```bash
venv\Scripts\activate
```

**macOS/Linux:**

```bash
source venv/bin/activate
```

Install the required Python packages:

```bash
pip install -r requirements.txt
```

Run database migrations:

```bash
python manage.py migrate
```

Start the Django development server:

```bash
python manage.py runserver
```

The API will be available at:

```text
http://127.0.0.1:8000/
```

---

## 💻 Frontend Setup

Open another terminal and navigate to the frontend:

```bash
cd Frontend
```

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

The frontend will typically be available at:

```text
http://localhost:5173/
```

## 🔑 Player Accounts

Players can create an account using:

* Username
* Email
* Password
* Age
* Gender

After registration, players can log in and access their game session.

Player information and high scores are managed through the Django REST API.

## 🏆 Score System

The game keeps track of each player's performance and stores their **high score** in the backend.

This allows scores to persist between sessions rather than being stored only in the browser.

## 🔌 API

The frontend communicates with the Django REST Framework backend through REST API endpoints.

Example API structure:

```text
/api/
├── users/
│   ├── register/
│   └── login/
│
└── ...
```

The frontend uses the returned authentication token to make authenticated API requests.

## 🔐 Authentication

Authentication uses token-based access between the React frontend and Django backend.

The frontend stores the authentication token locally and includes it in API requests:

```text
Authorization: Bearer <access_token>
```

## 🌐 Deployment

The project can be deployed using separate hosting services for the frontend and backend.

### Backend

The Django backend can be deployed using **Render** with Gunicorn:

```bash
gunicorn --chdir sudoku_app sudoku_app.wsgi:application
```

Make sure `gunicorn` is included in `requirements.txt`:

```text
gunicorn
```

### Frontend

The React frontend can be built using:

```bash
npm run build
```

The generated `dist` directory can then be deployed to a static hosting service such as Netlify.

## ⚙️ Environment Variables

For production, configure the frontend API URL using an environment variable:

```env
VITE_API_URL=https://your-backend-url/api
```

The frontend falls back to the local development API when the variable is not provided.

## 🎯 Project Goals

This project was created to explore and demonstrate:

* Full-stack web development
* React frontend development
* REST API development
* Django backend development
* Authentication and user management
* Database integration
* Game logic implementation
* Frontend/backend communication
* Deployment of a full-stack application

## 📚 What I Learned

Through the development of Sudoki, I gained practical experience in:

* Building interactive interfaces with React
* Creating REST APIs with Django REST Framework
* Connecting a React frontend to a Python backend
* Implementing user registration and authentication
* Managing persistent player data
* Handling API errors and authentication responses
* Deploying a full-stack application

## 🔮 Future Improvements

Potential improvements include:

* [ ] Difficulty selection
* [ ] Timer and completion statistics
* [ ] Global leaderboard
* [ ] Daily Sudoku challenges
* [ ] Player statistics
* [ ] Improved mobile support
* [ ] More game animations and effects
* [ ] Additional sound effects and background music
* [ ] Improved authentication and account management

## 👨‍💻 Developer

**Adriel Jeshua Z. Luisaga**

Graduating Computer Engineering student interested in software development, backend development, embedded systems, networking, and machine learning.

---

⭐ If you found the project interesting, feel free to explore the code and give the repository a star!

# Keep Notes App

A full-stack notes taking app built with **Next.js (frontend)**, **Django (backend)**, and **MySQL**.
The app allows users to register, log in, and manage their personal notes with a clean handcrafted UI.

## sample project image
   <img width="1554" height="674" alt="image" src="https://github.com/user-attachments/assets/6ff56b39-f5d0-47be-9d35-a916fe16c1e4" />
   <img width="1560" height="636" alt="image" src="https://github.com/user-attachments/assets/c41c8bf1-07c0-4d15-8a91-53377f54b93a" />
   <img width="1655" height="791" alt="image" src="https://github.com/user-attachments/assets/d86b8e00-0365-4112-80d8-3ee11cc78788" />

---

## ✨ Features

* 🔐 User authentication (Sign up / Login) with session handling
* 📝 Notes CRUD (Create, Read, Update, Delete)
* 🎨 Handcrafted UI (no pre-made component libraries)
* 🌐 API communication via **Axios**
* 📦 State management with **Redux Toolkit**
* 📂 Pages: Home, Signup, Login, Notes CRUD
* 🧹 Strict commit hygiene, clean code practices

---

## ⚡ Tech Stack

* **Frontend**: Next.js (React + TypeScript), Redux Toolkit, Axios
* **Backend**: Django + Django REST Framework
* **Database**: MySQL
* **Deployment Ready**: Dockerized setup for both backend and frontend (Pending)

---

## 🚀 Installation & Running Locally

### 1. Clone the Repository

```bash
git clone https://github.com/sudhanshu7352/notes-taking-app.git

```

---

### 2. Backend (Django API)

1. Navigate to backend folder:

   ```bash
   cd backend
   ```
2. Create a virtual environment:

   ```bash
   python -m venv venv
   source venv/bin/activate   # Linux/Mac
   venv\Scripts\activate      # Windows
   ```
3. Install dependencies:

   ```bash
   pip install -r requirements.txt
   ```
4. Setup environment variables in `.env`:

   ```
    MYSQL_DATABASE=defaultdb
    MYSQL_USER=username
    MYSQL_PASSWORD=db_password
    MYSQL_HOST=hostname
    MYSQL_PORT=0000
   ```
5. Run migrations and start server:

   ```bash
   python manage.py migrate
   python manage.py runserver
   ```

---

### 3. Frontend (Next.js App)

1. Navigate to frontend folder:

   ```bash
   cd frontend
   ```
2. Install dependencies:

   ```bash
   npm install
   ```
3. Create `.env.local` file:

   ```
   NEXT_PUBLIC_API_URL=http://localhost:8000
   ```
4. Run the development server:

   ```bash
   npm run dev
   ```

   Open: [http://localhost:3000](http://localhost:3000)

---

### 4. Run with Docker (Optional)

1. Ensure you have **Docker & Docker Compose** installed.
2. From root directory:

   ```bash
   docker-compose up --build
   ```
3. App will be available at:

   * Frontend: `http://localhost:3000`
   * Backend: `http://localhost:8000`

---

## 📂 Folder Structure

```
keep-notes/
│── backend/                 # Django backend
│   ├── keepnotes/       # django project setup
│   ├── notes/           # Authentication, user management, Notes CRUD
│   ├── manage.py
│   └── requirements.txt
│   └── .env                     # Environment variables
|
│── frontend/                # Next.js frontend
│   ├── app/                # Pages (Home, Login, Signup, Notes CRUD)
│   ├── components/          # Reusable UI components (Loader, Navbar, etc.)
│   ├── store/               # Redux slices (auth, notes)
│   └── utils/               # auth
|   └── services/            # axios config
│   └── .env                     # Environment variables
|
│── README.md                # Documentation

```

---

## ✅ Usage Flow

1. Register a new account from Signup page.
2. Login using credentials.
3. Create, edit, or delete notes from dashboard.
4. Logout anytime via navbar. (Pending)

---

## 👨‍💻 Author

Built with ❤️ by Sudhanshu

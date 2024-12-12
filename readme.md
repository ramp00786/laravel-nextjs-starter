
# Laravel-11 Next.js-15 Quick Starter Project

A quick starter project combining **Laravel 11** (backend) and **Next.js 15** (frontend) with basic user authentication and paper submission functionality. This project demonstrates how to integrate a modern frontend with a robust backend, providing login, register, and paper submission features.

## Features

1. **User Authentication**  
   - Registration and login functionality using JWT.
   - Middleware for route protection on both backend and frontend.

2. **Paper Submission**  
   - Users can submit papers with the following fields:
     - Title
     - Gender (Male/Female)
     - Description (rich text editor)
     - Multiple images
     - PDF file
   - Papers can be viewed, edited, or deleted.

3. **Frontend Framework**:  
   - Next.js 15
   - Bootstrap for styling.

4. **Backend Framework**:  
   - Laravel 11
   - Sanctum for authentication.

---

## Getting Started

Follow these steps to set up the project locally.

### Prerequisites

- Node.js (16.x or higher)
- PHP (8.x or higher)
- Composer
- MySQL

### Installation

#### Backend (Laravel)

1. **Clone the repository**:
   ```bash
   git clone ramp00786/laravel-nextjs-starter.git
   cd my-backend
   ```

2. **Install dependencies**:
   ```bash
   composer install
   ```

3. **Configure the environment**:
   - Create a `.env` file in the `backend` directory:
     ```bash
     cp .env.example .env
     ```
   - Update database credentials and other environment variables in the `.env` file:
     ```plaintext
     DB_DATABASE=your_database
     DB_USERNAME=your_username
     DB_PASSWORD=your_password

     SANCTUM_STATEFUL_DOMAINS=localhost:3000
     SESSION_DOMAIN=localhost
     ```

4. **Generate the application key**:
   ```bash
   php artisan key:generate
   ```

5. **Run database migrations**:
   ```bash
   php artisan migrate
   ```

6. **Run the backend server**:
   ```bash
   php artisan serve
   ```

#### Frontend (Next.js)

1. **Navigate to the frontend directory**:
   ```bash
   cd ../my-frontend
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Configure the environment**:
   - Create a `.env.local` file in the `frontend` directory:
     ```bash
     API_URL=http://localhost:8000/api
     ```

4. **Run the frontend server**:
   ```bash
   npm run dev
   ```

5. Open the application in your browser:
   - Frontend: [http://localhost:3000](http://localhost:3000)
   - Backend API: [http://localhost:8000/api](http://localhost:8000/api)

---

## Usage

1. **Register a new user** on the registration page.
2. **Log in** with your credentials to access protected pages.
3. **Submit a paper** with the following details:
   - Title
   - Gender
   - Description (with a rich text editor)
   - Multiple images
   - A PDF file
4. **View your papers** in a tabular format.
5. **Edit or delete papers** from the list.

---

## Project Structure

### Backend (Laravel)

```
backend/
├── app/
├── config/
├── database/
├── routes/
│   ├── api.php
│   └── web.php
└── .env
```

### Frontend (Next.js)

```
frontend/
├── components/
├── hooks/
├── login/
│   ├── page.js
├── register/
│   ├── page.js
├── papers/
│   ├── page.js
|   |── submit/
|       |── page.js
├── styles/
├── utils/
└── .env.local
```

---

## Contributing

Contributions are welcome! Feel free to submit a pull request or create an issue.

---

## License

This project is licensed under the [MIT License](LICENSE).

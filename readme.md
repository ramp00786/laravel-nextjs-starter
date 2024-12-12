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
   git clone https://github.com/your-repo-name.git
   cd your-repo-name/backend

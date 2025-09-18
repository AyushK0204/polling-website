# 🗳️ Poll & Voting Full-Stack Application

This is a complete web application that allows users to participate in polls created by an administrator. It features a secure, role-based authentication system, a robust backend API, and a responsive frontend. This project demonstrates full CRUD cycles, role-based access control, and clean API design.

## 🔗 Live Application & Demo

* **Live Frontend:** [https://polling-website-client.vercel.app/](https://polling-website-client.vercel.app/)
* **Live Backend API:** [https://polling-website-server.vercel.app/](https://polling-website-server.vercel.app/)
* **Demo Video:** [https://drive.google.com/file/d/1dMHngwFKtj7Hawuldyujm5v1tTkGTuoq/view?usp=drive_link]

---

## 🚀 Technologies Used & Justification

### Frontend

| Technology | Justification |
| :--- | :--- |
| **React** | Chosen for its component-based architecture, which makes building complex and reusable UI elements efficient and manageable. |
| **Vite** | Selected as the build tool for its incredibly fast development server and optimized production builds. |
| **Tailwind CSS** | Used for its utility-first approach, allowing for rapid and consistent styling directly within the HTML. |
| **React Router** | The standard for handling client-side routing and navigation in a modern single-page application. |
| **Axios** | A promise-based HTTP client for making reliable and clean requests to the backend API. |

### Backend

| Technology | Justification |
| :--- | :--- |
| **Node.js & Express** | A classic combination for building fast, scalable, and lightweight backend APIs, all within the JavaScript ecosystem. |
| **MongoDB** | A flexible NoSQL database, chosen for its ease of use with JavaScript and its ability to store complex, nested data like poll options. |
| **Mongoose** | Provides a straightforward, schema-based solution to model application data, enforce validation, and manage business logic. |
| **JWT** | Implemented for secure, stateless authentication, stored in `httpOnly` cookies for enhanced security against XSS attacks. |
| **bcryptjs** | Used to hash user passwords before storing them, ensuring user data security. |

---

## 📊 ER Diagram (Database Schema)

This is a text representation of the database models and their relationship.

```
+------------------+           +----------------------+
|      User        |           |         Poll         |
+------------------+           +----------------------+
| _id (PK)         |           | _id (PK)             |
| name (String)    |           | question (String)    |
| email (String)   |           | options (Array)      |
| password (String)|           |   - option (String)  |
| role (String)    |           |   - votes (Number)   |
|                  |           | closesAt (Date)      |
+------------------+           | votedBy (Array of Ref)|
        |                      +----------------------+
        |                            |           |
        +------(createdBy)-----------+           |
        |                            |           |
        +-------(votedBy)------------+-----------+
```

* A `User` can create many `Polls` (One-to-Many via `createdBy`).
* Many `Users` can vote on many `Polls` (Many-to-Many via `votedBy`).

---

## ⚙️ Project Setup and Installation Instructions

### Prerequisites

* Node.js and npm
* Git
* MongoDB (A local instance or a free cluster from MongoDB Atlas)

### Installation

1.  **Clone the Repository**
    ```sh
    git clone <your-repository-url>
    ```

2.  **Backend Setup (`/backend`)**
    * Navigate to the backend directory: `cd backend`
    * Install dependencies: `npm install`
    * Create a `.env` file and add the following variables:
        ```env
        PORT=5000
        MONGO_URI=<your_mongodb_connection_string>
        JWT_SECRET=<your_unique_jwt_secret>
        JWT_EXPIRE=30d
        CORS_ORIGIN=http://localhost:5173
        ```
    * Start the local server: `npm run dev`

3.  **Frontend Setup (`/client`)**
    * Navigate to the client directory: `cd client`
    * Install dependencies: `npm install`
    * Create a `.env` file and add the following variable:
        ```env
        VITE_API_BASE_URL=http://localhost:5000/api
        ```
    * Start the local development server: `npm run dev`

---

## 📡 API Endpoints List

### Authentication (`/api/users`)

| Method | Route | Purpose | Access |
| :--- | :--- | :--- | :--- |
| `POST` | `/register` | Register a new user | Public |
| `POST` | `/login` | Log in a user | Public |
| `GET` | `/me` | Get current user (session check) | Private |
| `POST` | `/logout` | Log out the current user | Private |

### Polls (`/api/polls`)

| Method | Route | Purpose | Access |
| :--- | :--- | :--- | :--- |
| `GET` | `/` | Get all **open** polls for the homepage | Public |
| `POST` | `/` | Create a new poll | Private/Admin |
| `GET` | `/:id` | Get a single poll by ID | Public |
| `PUT` | `/:id` | Update a poll | Private/Admin |
| `DELETE` | `/:id` | Delete a poll | Private/Admin |
| `POST` | `/:id/vote` | Cast a vote on a poll | Private |
| `GET` | `/admin` | Get **all** polls for the admin dashboard | Private/Admin |
| `GET` | `/my-votes` | Get polls the current user has voted on | Private |

# 🗳️ Poll & Voting App

**Poll & Voting App** is a full-stack web application that allows users to create, vote on, and view the results of polls. This web-based tool offers a seamless experience for:

✅ **Securely registering and logging in with role-based access (User & Admin)**  
✅ **Creating, updating, and deleting polls as an administrator**  
✅ **Voting on active polls and viewing dynamic results**

## 🚀 Built With

This project is built using the following technologies:

- [![MongoDB](https://img.shields.io/badge/MongoDB-116149?style=for-the-badge&logo=mongodb&logoColor=white)](https://www.mongodb.com/)
- [![React](https://img.shields.io/badge/React-087EA4?style=for-the-badge&logo=react&logoColor=white)](https://react.dev/)
- [![Express.js](https://img.shields.io/badge/Express.js-202020?style=for-the-badge&logo=express&logoColor=white)](https://expressjs.com/)
- [![Node.js](https://img.shields.io/badge/Node.js-215732?style=for-the-badge&logo=node.js&logoColor=white)](https://nodejs.org/)
- [![Vite](https://img.shields.io/badge/Vite-363D55?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)
- [![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)

## ✅ Prerequisites

Before you begin, make sure you have the following installed on your system:

- **Node.js** (LTS version recommended) – [Download here](https://nodejs.org/)
- **npm** or **yarn** (Comes with Node.js)
- **Git** (For cloning the repository) – [Download here](https://git-scm.com/)
- **MongoDB** (A local instance or a free cluster from MongoDB Atlas) – [Get Started here](https://www.mongodb.com/try/download/community)

### Must-Have Basic Knowledge

To work with this project effectively, you should have **basic knowledge** of:

- JavaScript & ES6+
- React fundamentals
- Node.js & Express basics
- REST APIs & database handling (MongoDB)

Once you have these installed and understand the basics, you're ready to set up the project! 🚀

## ⚙️ Installation

1.  Clone the repo
    ```sh
    git clone <your-repository-url>
    ```

2.  Install Dependencies
    -   For Client
        ```sh
        cd client
        npm install
        ```
    -   For Server
        ```sh
        cd ..
        cd backend
        npm install
        ```

3.  Add Environment Variables

    To run this project, you will need to add the following environment variables to your `.env` files.

    -   For Client (`/client/.env`)
        ```
        VITE_API_BASE_URL=http://localhost:5000/api
        ```

    -   For Server (`/backend/.env`)
        ```
        PORT=5000
        MONGO_URI=<your_mongodb_connection_string>
        JWT_SECRET=<your_unique_jwt_secret>
        JWT_EXPIRE=30d
        CORS_ORIGIN=http://localhost:5173
        ```

## 🔗 Live Website

-   **Frontend:** [https://polling-website-client.vercel.app/](https://polling-website-client.vercel.app/)
-   **Backend API:** [https://polling-website-server.vercel.app/](https://polling-website-server.vercel.app/)

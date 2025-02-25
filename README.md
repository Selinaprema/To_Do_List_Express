# To_Do_List_Express

## Description  
A full-stack React to-do list app where users can register, log in, and manage tasks. The backend, built with Node.js and Express, uses MongoDB for data storage. Middleware ensures security by restricting non-JSON requests, enforcing username validation, and limiting task length. Only authenticated users can create, edit, and delete tasks.

## Getting Started  

### Prerequisites  
Before running the project, ensure you have the following installed:  

- [Node.js](https://nodejs.org/) - Required to run the application  
- [npm](https://www.npmjs.com/) - Comes with Node.js to manage dependencies  
- [MongoDB](https://www.mongodb.com/) *(optional but recommended)* for database management  
- A modern web browser for testing the app  

### Installation  

Follow these steps to set up the development environment:  

#### Install Dependencies  

1. **Navigate to the frontend folder and install dependencies:**  
    ```bash
    cd frontend
    npm install
    ```
2. **Navigate to the backend folder and install dependencies, including Express:**  
    ```bash
    cd backend
    npm install
    npm install express
    ```

### Running the Application  

#### Start the Backend Server:  
1. Ensure you are in the backend folder:  
    ```bash
    cd backend
    ```
2. Start the backend server:  
    ```bash
    node server.js
    ```

#### Start the Frontend Application:  
1. Open a new terminal and navigate to the frontend folder:  
    ```bash
    cd frontend
    ```
2. Start the React development server:  
    ```bash
    npm start
    ```

This will launch the application at `http://localhost:3000`.  

## Features  

### Front-end  
- A **user-friendly** interface built with **React**.  
- Users can **register and log in** securely.  
- Task management functionality:  
  - **Add**, **edit**, **remove**, and **view** tasks.  
- User authentication ensures only **logged-in users** can manage tasks.  

### Back-end  
- Built with **Node.js and Express**.  
- Secure **authentication system** for user login and registration.  
- Middleware validation for:  
  - **Usernames** that do not end with `@gmail.com` (HTTP 403 rejection).  
  - **Tasks exceeding 140 characters** (HTTP 400 rejection).  
  - **Requests not in JSON format** (HTTP 400 rejection).  
- Optional **MongoDB database** integration for storing user tasks.  

## Built With  

- [React](https://reactjs.org/) - A JavaScript library for building user interfaces  
- [React-Router](https://reactrouter.com/) - For managing navigation and routing  
- [Express](https://expressjs.com/) - A minimal Node.js framework for handling backend requests  
- [MongoDB](https://www.mongodb.com/) *(optional)* - A NoSQL database for task storage  
- [JWT (jsonwebtoken)](https://github.com/auth0/node-jsonwebtoken) - For securing API requests  
- [Axios](https://axios-http.com/) - For making API requests  

## Authors  

- **Selina Prema**  

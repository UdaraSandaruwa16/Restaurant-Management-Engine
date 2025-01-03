# Restaurant Management Engine with CMS

![Demo App](/RME-CMS-Client/public/RME landing.png)

A full-stack restaurant management engine with a content management system (CMS), developed using React, Express, and MongoDB.
## Table of Contents

1. [Introduction](#introduction)<br>
2. [Features](#Features)<br>
3. [Technologies Used](#TechnologiesUsed)<br>
4. [Getting Started](#GettingStarted)<br>
5. [Installation](#Installation)<br>
6. [Usage](#Usage)<br>
7. [Contributing](#Contributing)<br>
8. [Contact](#Contact)<br>

## <a name="introduction"> Introduction</a>

This project is a full-stack web application designed to manage restaurant operations efficiently. It includes a content management system (CMS) for managing menu items, reservations, orders, and other aspects of a restaurant. The application is built using React for the frontend, Express for the backend, and MongoDB as the database.

## <a name="Features"> Features<a/>

- Menu Management: Add, update, and delete menu items with descriptions, prices, and categories.
- Order Management: Track customer orders and update their statuses in real-time.
- Reservation System: Manage table reservations, view availability, and confirm bookings.
- User Authentication: Secure login and registration for restaurant staff and customers.
- Content Management System (CMS): Easy-to-use interface for managing restaurant content.
- Responsive Design: Optimized for both desktop and mobile devices.

## <a name="TechnologiesUsed">Technologies Used<a/>

### Frontend:

- React
- React Router (for navigation)
- Axios (for API calls)

### Backend:

- Express
- MongoDB
- Mongoose (for database management)
- Multer (for file uploads)
- Cloudinary

## <a name="GettingStarted"> Getting Started<a/>

### Prerequisites
Before you begin, ensure you have met the following requirements:

- Node.js (version 14.x or later)
- npm or yarn
- MongoDB (local or cloud instance)

## <a name="Installation"> Installation<a/>
### Clone the repository:

```bash
git clone 
cd 
```

### Install the dependencies:
```bash
# For backend
cd api
npm install
```
```bash
# For frontend
cd client
npm install
```
### Set up environment variables:

Create a .env file in the backend directory and configure the following variables:

```bash
DATABASE_URL=mongodb://localhost:27017/restaurant
```

### Run the application:

```bash
# Start the backend server
cd backend
npm run start
```
```bash
# Start the frontend server
cd frontend
npm start
```
## <a name="Usage"> Usage<a/>
Once the application is up and running, staff can log in to manage menu items, handle reservations, and process orders. The CMS provides an intuitive interface for updating restaurant content, managing users, and tracking restaurant operations.

## <a name="Contributing"> Contributing<a/>
We welcome contributions! To contribute, follow these steps:

1. Fork the repository.<br>
2. Create a new branch (git checkout -b feature/your-feature-name).<br>
3. Make your changes.<br>
4. Commit your changes (git commit -m 'Add some feature').<br>
5. Push to the branch (git push origin feature/your-feature-name).<br>
6. Open a Pull Request.<br>




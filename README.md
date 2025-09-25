# SaaS Notes Application

## Tech Stack
- The backend is built with **Node.js and Express.js**, while the frontend uses **React.js**.  
- **MongoDB** serves as the database, and authentication is handled using **JWT (JSON Web Tokens)** for secure login and role-based access.  
- The entire application is deployed on **Vercel**, and CORS is enabled so the frontend and automated scripts can communicate with the backend without issues.  

---

## Authentication
- Users log in using predefined accounts, and their access is controlled with JWT tokens.  
- Admins can upgrade subscriptions, while members can only manage notes.  
- This ensures that only authorized actions are allowed based on the user’s role.  

---

## Multi-Tenancy Approach
- **Tenant Isolation:** I implemented using a shared schema with a tenantId field in the notes collection.  
- **Data Segregation:** Each note document includes a tenantId to ensure data is isolated per tenant.  

---

## Deployment
- Backend on **Render** and Frontend on **Vercel**  
- A health endpoint is provided.  
- CORS is enabled to allow automated scripts and dashboards to access the API. 

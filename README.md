# Imagify

Imagify is a web application that allows users to generate images from text. The frontend is built with Vite, ReactJS, Tailwind CSS, and Framer Motion. The backend uses Node.js, Express.js, and MongoDB.

## Live Demo

You can view the live version of the project here:  
[**Project Link**](https://imagify-frontend-kappa.vercel.app/)

## Table of Contents

- [Features](#features)
- [Frontend](#frontend)
- [Backend](#backend)
- [API Integration](#api-integration)
  
## Features

- Generate images from text using ClipDrop API.
- User authentication and authorization.
- Responsive and modern UI built with Tailwind CSS.
- Smooth animations using Framer Motion.
- Secure backend with Node.js and Express.js.
- MongoDB database for storing user data and generated images.

## Frontend

### Tech Stack:
- **Vite + React**  
- **Tailwind CSS**  
- **Framer Motion**

## Backend API

### User Routes

- **POST /register**  
  Registers a new user.  
  **Controller**: `registerUser`

- **POST /login**  
  Logs in an existing user.  
  **Controller**: `loginUser`

- **GET /credits**  
  Retrieves user credit information (authentication required).  
  **Middleware**: `userAuth`  
  **Controller**: `userCredits`

- **POST /pay-stripe**  
  Initiates a payment process using Stripe (authentication required).  
  **Middleware**: `userAuth`  
  **Controller**: `paymentStripe`

- **POST /verify-stripe**  
  Verifies a Stripe payment (authentication required).  
  **Middleware**: `userAuth`  
  **Controller**: `verifyStripe`

### Image Routes

- **POST /generate-image**  
  Generates an image based on user input (authentication required).  
  **Middleware**: `userAuth`  
  **Controller**: `generateImage`

## ClipDrop API Integration

This project leverages the **ClipDrop API** to provide text-to-image generation functionality. Users can input descriptive prompts, and the API generates high-quality images based on those prompts.

## Stripe Integration

This project uses **Stripe** for secure payments. Users can purchase credits with the following plans:

- **$10**: Basic Plan  
- **$50**: Advance Plan  
- **$250**: Business Plan  

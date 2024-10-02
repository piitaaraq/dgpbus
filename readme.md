# Hospital Appointment & Ride Management System

This repository contains both the frontend and backend applications for managing hospital appointments, transportation scheduling, and translator needs. The frontend is built using Vue.js, while the backend is powered by Django and MariaDB.

## Table of Contents
- [Project Overview](#project-overview)
- [Technologies Used](#technologies-used)
- [Requirements](#requirements)
- [Setup Instructions](#setup-instructions)
  - [Backend Setup](#backend-setup)
  - [Frontend Setup](#frontend-setup)
- [Environment Variables](#environment-variables)
- [Usage](#usage)
- [Contributing](#contributing)
- [License](#license)

---

## Project Overview

This project is designed to help manage hospital appointments and rides for patients, with the ability for patients to book appointments, request a translator, and arrange transport. It includes:

- **Frontend**: Built using Vue.js for interactive user interfaces.
- **Backend**: A Django API that handles appointments, rides, and user authentication.
- **Database**: MariaDB is used as the database for storing all patient, ride, and hospital information.

## Technologies Used

- **Frontend**: Vue.js 3, Pinia for state management, Axios for API calls, Vue Router, Vue i18n for localization, and Bulma for CSS styling.
- **Backend**: Django, Django REST Framework, MariaDB, and Simple JWT for authentication.
- **Database**: MariaDB

## Requirements

### Backend
- Python 3.9+
- MariaDB
- Django 4.x
- Django REST Framework
- Simple JWT (for authentication)

### Frontend
- Node.js 16.x+
- NPM or Yarn

## Setup Instructions

### Backend Setup

1. **Clone the repository**:
   ```bash
   git clone https://github.com/yourusername/project-name.git
   cd project-name/backend


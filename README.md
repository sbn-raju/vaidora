<div align="center">

# 🌿 Vaidora

**A full-stack platform for an Ayurveda practice: online classes, patient consultations, and payments in one place.**

![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Express.js](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-4169E1?style=for-the-badge&logo=postgresql&logoColor=white)
![RabbitMQ](https://img.shields.io/badge/RabbitMQ-FF6600?style=for-the-badge&logo=rabbitmq&logoColor=white)
![Razorpay](https://img.shields.io/badge/Razorpay-0C2451?style=for-the-badge&logo=razorpay&logoColor=white)

</div>

---

## 📖 Overview

**Vaidora** is a custom-built full-stack platform made for an Ayurveda doctor to manage **online classes** and **patient consultations**.

It has separate dashboards for three user roles: **Users**, **Administrators**, and **Doctors**. Patients can browse open consultation slots, pay through **Razorpay**, and book appointments. For online classes held on **Google Meet** or **Zoom**, only signed-in users who have paid the fee can get into the session.

The platform also covers the admin side: managing users, bookings, payments, and class operations.

---

## ✨ Features

### 👤 For Users / Patients
- Browse available consultation slots
- Pay securely through Razorpay
- Book appointments with the doctor
- Join paid online classes (Google Meet / Zoom) after paying

### 🩺 For Doctors
- Set availability that turns into bookable time slots
- View and manage upcoming consultations
- Manage online class sessions

### 🛠️ For Administrators
- Manage users and roles
- Oversee bookings and appointments
- Track payment records
- Handle class-related operations

### 🔐 Core Platform Capabilities
- **Role-based access control** with dedicated dashboards per role
- **Payment-gated access**: classes and appointments are confirmed only after payment
- **Booking conflict handling** to prevent double bookings
- **Asynchronous background processing** through RabbitMQ

---

## 🧰 Tech Stack

| Technology | Role in the Project |
|---|---|
| **React.js** | Built three role-specific dashboards (users, administrators, doctors), each with its own interface and workflows. |
| **Express.js** | Runs the backend APIs and business logic: authentication, appointment booking, class access checks, payment operations, and communication between frontend and database. |
| **PostgreSQL** | Main relational database for users, doctor availability, consultation slots, appointments, payment records, and other structured data. |
| **RabbitMQ** | Message broker for asynchronous communication between components, keeping background work out of the main request-response cycle. |
| **Razorpay** | Collects consultation and class fees so payment is completed before an appointment is confirmed or a paid class is unlocked. |

---

## 🏗️ Architecture

```
┌──────────────────────────────────────────────┐
│                React.js Frontend             │
│   ┌──────────┐  ┌──────────┐  ┌──────────┐   │
│   │   User   │  │  Doctor  │  │  Admin   │   │
│   │Dashboard │  │Dashboard │  │Dashboard │   │
│   └──────────┘  └──────────┘  └──────────┘   │
└───────────────────────┬──────────────────────┘
                        │ REST API
┌───────────────────────▼──────────────────────┐
│               Express.js Backend             │
│  Auth · Bookings · Class Access · Payments   │
└───────┬───────────────┬──────────────┬───────┘
        │               │              │
┌───────▼──────┐ ┌──────▼──────┐ ┌─────▼──────┐
│  PostgreSQL  │ │  RabbitMQ   │ │  Razorpay  │
│   Database   │ │   Broker    │ │  Payments  │
└──────────────┘ └─────────────┘ └────────────┘
```

---

## 🔄 How It Works

### Consultation Booking Flow
1. The doctor sets availability, which the system turns into time slots.
2. The patient browses and picks an open slot.
3. The patient pays through Razorpay.
4. Once payment is confirmed, the appointment is booked and the slot is locked.

### Paid Class Access Flow
1. The user signs in to the platform.
2. The user pays the class fee through Razorpay.
3. The backend checks **authentication + payment status**.
4. Only verified, paid users get access to the Google Meet / Zoom session.

---

## 🚀 Getting Started

### Prerequisites
- [Node.js](https://nodejs.org/) (LTS recommended)
- [PostgreSQL](https://www.postgresql.org/)
- [RabbitMQ](https://www.rabbitmq.com/)
- A [Razorpay](https://razorpay.com/) account (test keys work for development)

### Installation

```bash
# Clone the repository
git clone https://github.com/sbn-raju/vaidora.git
cd vaidora

# Install dependencies
npm install
```

### Environment Variables

Create a `.env` file and add your configuration, for example:

```env
DATABASE_URL=postgresql://user:password@localhost:5432/vaidora
RABBITMQ_URL=amqp://localhost
RAZORPAY_KEY_ID=your_razorpay_key_id
RAZORPAY_KEY_SECRET=your_razorpay_key_secret
JWT_SECRET=your_jwt_secret
```

> ⚠️ Adjust the variable names to match the project's actual configuration.

### Run the App

```bash
npm run dev
```

---

## 📚 What I Learned

<details>
<summary><b>🧩 Building role-based dashboards</b></summary>
<br>
I learned how to design and build several dashboards for different user types: users, administrators, and doctors. Each one had its own permissions, responsibilities, and workflows. This taught me how to structure frontend applications around role-specific requirements.
</details>

<details>
<summary><b>🤝 Understanding real-world client requirements</b></summary>
<br>
This was my first full-stack project delivered for a client. I learned how to understand business requirements, talk with stakeholders, turn real-world problems into technical solutions, and build features that solve actual operational problems.
</details>

<details>
<summary><b>⚠️ Thinking about edge cases and failure scenarios</b></summary>
<br>
I learned to think beyond the happy path and spot what could go wrong: appointment booking conflicts, payment failures, unauthorized class access, invalid requests, and other unexpected situations. It changed how I approach application development and system reliability.
</details>

<details>
<summary><b>💳 Integrating payment gateways</b></summary>
<br>
Integrating Razorpay gave me hands-on experience with online payment workflows. I learned how to connect payment services to backend APIs, manage payment records, and make payment confirmation a core part of appointment booking and paid class access.
</details>

<details>
<summary><b>⚙️ Designing scalable backend systems</b></summary>
<br>
Working with Express.js, PostgreSQL, and RabbitMQ showed me how backend services, relational databases, and message brokers work together. I gained experience with asynchronous processing, separation of responsibilities, and building systems that can grow as business requirements change.
</details>

<details>
<summary><b>📅 Appointment and scheduling workflows</b></summary>
<br>
Building the consultation booking system taught me how to turn doctor availability into bookable time slots. Patients could pick open slots, pay, and book consultations. This helped me understand scheduling logic, booking workflows, and why conflicting requests need careful handling.
</details>

<details>
<summary><b>🔒 Securing paid online class access</b></summary>
<br>
A key requirement was making sure only signed-in users who had paid could join online classes on Google Meet or Zoom. I learned how to tie authentication, payment status, and access authorization together to enforce business rules.
</details>

<details>
<summary><b>👥 Team coordination and project management</b></summary>
<br>
Since this was my first major client-facing project, I also learned how to coordinate with teammates, split responsibilities, track progress, manage dependencies, and deliver features within the project requirements.
</details>

---

## 🔗 Links

- **Source Code:** [github.com/sbn-raju/vaidora](https://github.com/sbn-raju/vaidora)
- **Live Demo:** _Coming soon_

---

<div align="center">

Made with 💚 by [sbn-raju](https://github.com/sbn-raju)

</div>
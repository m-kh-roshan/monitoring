# 📡 **Monitoring Site System**

A modern, fully automated website monitoring system built with **Node.js**, **Fastify**, **TypeScript**, and **MongoDB**. Users can register, add their websites, and receive alerts (SMS / Email / Telegram) when their sites go down. Each user can choose **only one notification method**, and it must be **verified** before alerts can be sent.

---

## 🚀 **Features**

* 🔐 **Authentication** — Secure JWT-based auth (Access + Refresh Tokens)
* 🌐 **Site Monitoring** — Scheduled checks using **Agenda** (MongoDB-powered scheduler)
* 🔎 **Validation** — Reliable validation with **Fastify Schema** + **TypeBox**
* 📨 **Multi-channel Notifications**:

  * **SMS** (Kavenegar)
  * **Email** (SendMailer)
  * **Telegram Bot** API
* 🛠 **Advanced Error Handling** with Fastify's built‑in error handler
* 📘 **API Documentation** via **@fastify/swagger** using schema definitions
* 🚀 **HTTP Requests** powered by **Got**
* 📦 **Database** using **MongoDB** + **Mongoose**, fully compatible with Agenda jobs
* 🔒 **Stateless Architecture** — No sessions, fully token‑based

---

## 🧰 **Tech Stack**

| Component         | Technology                    |
| ----------------- | ----------------------------- |
| **Runtime**       | `Node.js`                     |
| **Framework**     | `Fastify`                     |
| **Language**      | `TypeScript`                  |
| **Database**      | `MongoDB` + `Mongoose`        |
| **Job Scheduler** | `Agenda`                      |
| **HTTP Client**   | `Got`                         |
| **Validation**    | `TypeBox` + Fastify Validator |
| **API Docs**      | `@fastify/swagger`            |
| **Auth**          | JWT (Access & Refresh)        |
| **Email**         | `SendMailer`                  |
| **SMS**           | Kavenegar                     |
| **Telegram Bot**  | Telegram Bot API              |

---

## 📦 **Project Structure**

```
project-root/
├── src/
│   ├── modules/
│   │   ├── sites/
│   │   ├── tokens/
│   │   └── users/
│   ├── utilities/
│   ├── agenda/
│   ├── plugins/
│   ├── types/
│   ├── agendaWorker.ts
│   └── serer.ts
├── .env
├── package.json
└── README.md
```

---

## ⚙️ **Environment Variables (.env)**

Create a `.env` file in the project root with the following:

```env
DB_NAME=monitoringSite
DB_HOST=127.0.0.1
DB_PORT=27017

DB_AGENDA_COLLECTION=jobs
JWT_SECRET=dbaa04b8-a935-4eb2-8948-919a14b1dc13

# Email Configuration
MAIL_HOST=
MAIL_PORT=587
MAIL_USER=
MAIL_PASSWORD=
MAIL_FROM=

DEV=true
BASE_URL=http://localhost:3000

SCHEDULE_TIME=30

# Bot Configuration
BOT_TOKEN=
BOT_USERNAME=
SOCIAL_NETWORK_API_URL=https://tapi.telegram.org
SOCIAL_NETWORK_URL=https://t.me

# SMS Configuration
SMS_SENDER=
SMS_API_KEY=
```

---

## 📥 **Installation**

```bash
git clone https://github.com/m-kh-roshan/monitoring
cd monitoring
npm install
```

---

## ▶️ **Running the Project**

### **Development Mode**

```bash
npm run dev
```

### **Production Mode**

```bash
npm run build
npm start
```

### **Starting the Agenda Worker**

```bash
npm run startAgenda
```

> ⚠️ For deployment, you should run the worker using a process manager like **PM2**.

---

## 🔄 **Monitoring Logic**

Every `SCHEDULE_TIME` minutes:

1. The system checks all registered websites.
2. The status is verified using **Got**.
3. If a website is **Down**:

   * An alert is sent (SMS/Email/Telegram), if the chosen method is **verified**.
4. `lastNotified` is updated to prevent spam.

---

## 📘 **API Documentation**

Once the server is running:

```
GET /docs
```

Access **Swagger UI** for full API documentation.

---

## 🔐 **Authentication Flow**

1. User logs in.
2. System issues **Access Token** (short‑lived) + **Refresh Token** (long‑lived).
3. Tokens are completely **stateless** — no server-side session storage.

---

## 📡 **Alert System**

| Channel      | Service           |
| ------------ | ----------------- |
| **Email**    | SMTP (SendMailer) |
| **SMS**      | Kavenegar         |
| **Telegram** | Bot API           |

---

## 🧪 **Validation**

All inputs are validated using:

* **TypeBox Schemas**
* Fastify's built‑in JSON schema validator

---

## 🛡 **Error Handling**

* Centralized Fastify Error Handler
* Unified JSON error response format
* Support for custom exceptions

---

## 👨‍💻 **Contributing**

Contributions, issues, and feature requests are welcome!

---

## 📄 License

MIT

---

## ⭐ If you like this project, don't forget to star it!

# Come to Sri Lanka 🌴

**Come to Sri Lanka** is a full-stack web application designed to guide tourists, travelers, and locals through exploring Sri Lanka's top destinations, booking accommodations, arranging transport, planning trip budgets, and leaving travel feedback.

---

## 🌟 Key Features

- **Destination & Places Explorer**: Discover iconic landmarks, heritage sites, beaches, and national parks across Sri Lanka.
- **Hotel & Restaurant Bookings**: Browse, view details, and book hotels and top-rated restaurants.
- **Transport Services**: Plan local travel options including tuk-tuks, trains, and private vehicles.
- **Trip Budgeting Tool**: Estimate and manage trip costs.
- **Multilingual Support**: Built-in internationalization (`i18n`) for multi-language navigation.
- **User Authentication**: Secure signup/login using JWT authentication & password hashing (`bcrypt`).
- **User Dashboard & My Bookings**: View, manage, and track personal bookings and trip plans.
- **Admin Dashboard**: Comprehensive admin management for viewing bookings, users, and content controls.
- **Feedback & Reviews**: Submit and view travel experiences and ratings.

---

## 🛠️ Tech Stack

### **Frontend**
- **Framework**: [React 19](https://react.dev/) + [Vite](https://vitejs.dev/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Routing**: `react-router-dom` (v7)
- **Internationalization**: `i18next` / `react-i18next`

### **Backend**
- **Runtime**: [Node.js](https://nodejs.org/) & [Express.js](https://expressjs.com/)
- **Database**: SQLite3 / MongoDB
- **Security**: JSON Web Tokens (JWT), `bcrypt` password hashing, CORS

---

## 📁 Project Structure

```text
software project/
├── client/                 # React Frontend Application
│   ├── public/             # Static assets (images, icons, logos)
│   └── src/
│       ├── components/     # Reusable UI components (Navbar, Footer, etc.)
│       ├── pages/          # Application pages (Home, Hotels, Booking, Admin, etc.)
│       ├── i18n.js         # Multilingual configuration
│       ├── App.jsx         # App router & layout configuration
│       └── main.jsx        # Entry point
├── server/                 # Node.js Express Backend API
│   ├── controllers/        # Route controllers (Auth, Bookings, Hotels, Admin, etc.)
│   ├── database/           # SQLite DB setup & files
│   ├── middleware/         # Auth & validation middleware
│   ├── routes/             # API endpoints
│   ├── seed_admin.js       # Admin account seeder script
│   └── server.js           # Server entry point
├── .gitignore              # Git ignore rules
└── README.md               # Project documentation
```

---

## 🚀 Getting Started

### Prerequisites
Make sure you have installed:
- [Node.js](https://nodejs.org/) (v18 or higher recommended)
- [npm](https://www.npmjs.com/)

---

### 1️⃣ Installation

Clone the repository and install dependencies for both `client` and `server`:

```bash
# Clone the repository
git clone https://github.com/sankalana2002/CometoSriLanka.git
cd CometoSriLanka

# Install Client Dependencies
cd client
npm install

# Install Server Dependencies
cd ../server
npm install
```

---

### 2️⃣ Running the Application

#### Start Backend API Server
```bash
cd server
node server.js
```
*The backend server will run on `http://localhost:5000` (or configured port).*

#### Seed Admin User (Optional)
```bash
cd server
node seed_admin.js
```

#### Start Frontend Client
```bash
cd client
npm run dev
```
*Open your browser and navigate to `http://localhost:5173` (or the URL shown in terminal).*

---

## 📝 License

This project is open-source and available under the [ISC License](LICENSE).

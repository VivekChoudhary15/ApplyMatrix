# ApplyMatrix - Job Portal Application

A modern full-stack job portal application built with React, Node.js, Express, and MongoDB. This platform allows job seekers to find and apply for jobs, while enabling companies to post job listings and manage applications.

## 🚀 Features

### For Job Seekers

- **User Authentication**: Secure login/signup with Clerk
- **Browse Jobs**: Search and filter through available job listings
- **Apply for Jobs**: One-click job applications with resume upload
- **Application Tracking**: View all applied jobs and their status
- **Profile Management**: Update personal information and resume

### For Companies/Recruiters

- **Company Registration**: Create company profiles with logo upload
- **Job Management**: Post, edit, and manage job listings
- **Application Review**: View and manage job applications
- **Visibility Control**: Toggle job visibility on/off
- **Dashboard**: Comprehensive overview of posted jobs and applications

## 🛠️ Tech Stack

### Frontend

- **React** - UI library
- **React Router** - Navigation
- **Tailwind CSS** - Styling
- **Axios** - HTTP client
- **Clerk** - Authentication
- **React Toastify** - Notifications
- **Moment.js** - Date formatting

### Backend

- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - Database
- **Mongoose** - ODM
- **Cloudinary** - File storage
- **JWT** - Token authentication
- **bcrypt** - Password hashing
- **Multer** - File upload middleware

## 📋 Prerequisites

Before running this application, make sure you have:

- **Node.js** (v14 or higher)
- **npm** or **yarn**
- **MongoDB Atlas** account
- **Cloudinary** account
- **Clerk** account

## 🚀 Quick Start

### Option 1: Live Demo (Recommended)

**Frontend (Client):** [https://your-frontend-app.vercel.app](https://your-frontend-app.vercel.app)

**Backend (API):** [https://your-backend-app.render.com](https://your-backend-app.render.com)

> **Note:** The frontend is deployed on Vercel and the backend API is deployed on Render. Both are connected and fully functional.

### Option 2: Local Development

#### 1. Clone the Repository

```bash
git clone https://github.com/yourusername/apply-matrix.git
cd apply-matrix
```

#### 2. Backend Setup

```bash
# Navigate to server directory
cd server

# Install dependencies
npm install

# Create .env file
cp .env.example .env
```

#### 3. Configure Environment Variables

Create a `.env` file in the `server` directory:

```env
# Database
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/apply-matrix

# JWT Secret
JWT_SECRET=your-jwt-secret-key

# Clerk
CLERK_SECRET_KEY=your-clerk-secret-key
CLERK_WEBHOOK_SECRET=your-clerk-webhook-secret

# Cloudinary
CLOUDINARY_CLOUD_NAME=your-cloudinary-cloud-name
CLOUDINARY_API_KEY=your-cloudinary-api-key
CLOUDINARY_API_SECRET=your-cloudinary-api-secret

# Server
PORT=5000
```

#### 4. Frontend Setup

```bash
# Navigate to client directory
cd ../client

# Install dependencies
npm install

# Create .env file
cp .env.example .env.local
```

Configure frontend environment variables in `.env.local`:

```env
# Backend API URL (use your deployed backend URL or localhost for development)
REACT_APP_BACKEND_URL=http://localhost:5000/

# Clerk
REACT_APP_CLERK_PUBLISHABLE_KEY=your-clerk-publishable-key
```

#### 5. Start the Application

**Terminal 1 (Backend):**

```bash
cd server
npm run dev
```

**Terminal 2 (Frontend):**

```bash
cd client
npm start
```

The application will be available at:

- Frontend: `http://localhost:3000`
- Backend: `http://localhost:5000`

## 📁 Project Structure

```
apply-matrix/
├── client/                 # React frontend
│   ├── src/
│   │   ├── components/     # Reusable components
│   │   ├── pages/          # Page components
│   │   ├── context/        # React context
│   │   ├── assets/         # Static assets
│   │   └── App.jsx         # Main app component
│   ├── public/
│   └── package.json
├── server/                 # Node.js backend
│   ├── controllers/        # Route controllers
│   ├── models/            # Database models
│   ├── routes/            # API routes
│   ├── config/            # Configuration files
│   ├── middleware/        # Custom middleware
│   └── server.js          # Entry point
└── README.md
```

## 🔧 API Endpoints

### Authentication

- `POST /api/company/register` - Register company
- `POST /api/company/login` - Company login
- `POST /api/users` - Create/update user

### Jobs

- `GET /api/jobs` - Get all jobs
- `GET /api/jobs/:id` - Get job by ID
- `POST /api/jobs/apply` - Apply for job
- `POST /api/company/post-job` - Post new job
- `POST /api/company/change-visibility` - Toggle job visibility

### Applications

- `GET /api/users/applications` - Get user applications
- `GET /api/company/job-applicants` - Get job applicants
- `POST /api/company/change-application-status` - Update application status

## 🌐 Deployment

### Backend Deployment (Render)

1. Create account on [Render](https://render.com)
2. Connect your GitHub repository
3. Select the `server` directory for deployment
4. Set environment variables in Render dashboard
5. Deploy as a Web Service

### Frontend Deployment (Vercel)

1. Create account on [Vercel](https://vercel.com)
2. Connect your GitHub repository
3. Select the `client` directory for deployment
4. Set environment variables in Vercel dashboard
5. Update `REACT_APP_BACKEND_URL` to your deployed backend URL

## 📝 Environment Variables

### Backend (.env)

```env
MONGODB_URI=             # MongoDB connection string
JWT_SECRET=              # JWT secret key
CLERK_SECRET_KEY=        # Clerk secret key
CLERK_WEBHOOK_SECRET=    # Clerk webhook secret
CLOUDINARY_CLOUD_NAME=   # Cloudinary cloud name
CLOUDINARY_API_KEY=      # Cloudinary API key
CLOUDINARY_API_SECRET=   # Cloudinary API secret
PORT=5000               # Server port
```

### Frontend (.env.local)

```env
REACT_APP_BACKEND_URL=           # Backend API URL (your deployed backend)
REACT_APP_CLERK_PUBLISHABLE_KEY= # Clerk publishable key
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [Clerk](https://clerk.com) for authentication
- [Cloudinary](https://cloudinary.com) for file storage
- [MongoDB Atlas](https://mongodb.com) for database hosting
- [Tailwind CSS](https://tailwindcss.com) for styling

## 📞 Support

For support, email your-email@example.com or create an issue in the GitHub repository.

---

**Made with ❤️ by [Your Name]**

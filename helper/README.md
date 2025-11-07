# MasterSolis - Complete Full-Stack Career Platform

A comprehensive career platform built with Next.js (App Router), TypeScript, Node.js, Express, and MongoDB, featuring AI-powered resume building, job matching, and career services.

## 🚀 Tech Stack

### Frontend
- **Next.js 14** with App Router
- **TypeScript** for type safety
- **Tailwind CSS** for styling
- **React Hook Form** for form management
- **Zod** for validation
- **Axios** for API calls

### Backend
- **Node.js** with Express
- **TypeScript** for type safety
- **MongoDB** with Mongoose ODM
- **JWT** for authentication
- **Multer** for file uploads
- **OpenAI API** for AI features
- **Nodemailer** for emails

## 📁 Project Structure

```
mastersolis/
├── helper/                    # Backend (Node.js/Express)
│   ├── src/
│   │   ├── config/           # Database & app configuration
│   │   ├── controllers/      # API request handlers
│   │   ├── middleware/       # Auth, upload, validation middleware
│   │   ├── models/          # MongoDB models
│   │   ├── routes/          # API routes
│   │   ├── services/        # Business logic (OpenAI, Email)
│   │   ├── utils/           # Utility functions
│   │   └── index.ts         # Server entry point
│   ├── uploads/             # File upload directory
│   ├── package.json
│   └── .env
│
└── mastersolis-site/         # Frontend (Next.js)
    ├── src/
    │   ├── app/             # Next.js App Router pages
    │   ├── components/      # Reusable React components
    │   │   ├── ui/          # Base UI components
    │   │   ├── layout/      # Layout components
    │   │   └── sections/    # Page sections
    │   ├── context/         # React context providers
    │   ├── lib/             # Utility functions & API client
    │   └── types/           # TypeScript type definitions
    ├── public/              # Static assets
    ├── package.json
    └── .env.local
```

## ✨ Features

### 🏠 Public Pages
- **Home**: Hero banner, service highlights, testimonials carousel, CTA sections
- **About**: Mission, vision, values, AI-generated team intro, milestones timeline
- **Services**: Service listings with AI-generated descriptions, detail pages
- **Projects**: Portfolio grid with tags, filtering, search, and project details
- **Blog/News**: Post listings, AI summarization, category/tag filtering
- **Contact**: Contact form with AI-generated auto-replies

### 💼 Careers Platform
- **Job Listings**: Searchable job board with filtering by type, level, location
- **Job Details**: Comprehensive job descriptions with application forms
- **Resume Upload**: PDF/DOC resume upload with local storage
- **Application Tracking**: Status tracking for submitted applications

### 📄 Resume Builder & ATS
- **Resume Creation**: Form-based resume builder with multiple templates
- **ATS Scoring**: Automated resume optimization scoring (0-100)
- **Template Selection**: Modern, Classic, Creative, and Minimal templates
- **PDF Export**: Download resumes as PDF files
- **Direct Job Application**: Submit resumes directly to job openings

### 👨‍💼 Admin Dashboard
- **User Management**: View and manage user accounts
- **Job Management**: Create, edit, delete job postings
- **Application Reviews**: Review job applications and update statuses
- **Content Management**: Manage blogs, services, projects, testimonials
- **Contact Management**: View and respond to contact form submissions

### 🤖 AI Features
- **Content Generation**: Auto-generate taglines, service descriptions
- **Blog Summarization**: AI-powered blog post summaries
- **Project Summaries**: Generate project descriptions
- **Contact Replies**: Automated email responses to contact forms
- **Team Introductions**: AI-generated team content

## 🛠️ Installation & Setup

### Prerequisites
- Node.js 18+ 
- MongoDB (local or cloud)
- OpenAI API key (optional, for AI features)

### Backend Setup

1. **Navigate to backend directory**:
   ```bash
   cd helper
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Environment configuration**:
   ```bash
   cp .env.example .env
   ```
   
   Update `.env` with your configuration:
   ```env
   MONGODB_URI=mongodb://localhost:27017/mastersolis
   JWT_SECRET=your-super-secure-jwt-secret
   PORT=5000
   OPENAI_API_KEY=your-openai-api-key
   EMAIL_SERVICE=gmail
   EMAIL_USER=your-email@gmail.com
   EMAIL_PASS=your-app-password
   FRONTEND_URL=http://localhost:3000
   ```

4. **Start development server**:
   ```bash
   npm run dev
   ```

   The API will be available at `http://localhost:5000`

### Frontend Setup

1. **Navigate to frontend directory**:
   ```bash
   cd mastersolis-site
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Environment configuration**:
   Create `.env.local`:
   ```env
   NEXT_PUBLIC_API_URL=http://localhost:5000/api
   NEXT_PUBLIC_APP_NAME=MasterSolis
   NEXT_PUBLIC_APP_URL=http://localhost:3000
   ```

4. **Start development server**:
   ```bash
   npm run dev
   ```

   The app will be available at `http://localhost:3000`

## 📚 API Endpoints

### Authentication
```
POST /api/auth/register    # User registration
POST /api/auth/login       # User login
GET  /api/auth/profile     # Get user profile
PUT  /api/auth/profile     # Update user profile
```

### Jobs & Applications
```
GET    /api/jobs           # Get all jobs (with filters)
GET    /api/jobs/:id       # Get job by ID
POST   /api/jobs/:id/apply # Apply for job (with resume upload)
POST   /api/jobs           # Create job (admin)
PUT    /api/jobs/:id       # Update job (admin)
DELETE /api/jobs/:id       # Delete job (admin)
```

### Resume Management
```
GET    /api/resumes/templates    # Get resume templates
POST   /api/resumes             # Create resume
GET    /api/resumes/:id         # Get resume by ID
PUT    /api/resumes/:id         # Update resume
DELETE /api/resumes/:id         # Delete resume
GET    /api/resumes/user/list   # Get user's resumes
```

### Content Management
```
GET  /api/blogs           # Get published blogs
GET  /api/blogs/:slug     # Get blog by slug
GET  /api/services        # Get services
GET  /api/services/:slug  # Get service by slug
GET  /api/projects        # Get projects (with filters)
GET  /api/projects/:slug  # Get project by slug
GET  /api/testimonials    # Get testimonials
```

### Contact & Communication
```
POST /api/contact         # Submit contact form
GET  /api/contact         # Get contact submissions (admin)
PUT  /api/contact/:id     # Update contact status (admin)
```

## 🎨 Design System

The application uses a consistent design system with:

- **Colors**: Blue primary (#2563eb), with gray neutrals
- **Typography**: Inter font family with responsive sizing
- **Components**: Reusable UI components with consistent styling
- **Responsive**: Mobile-first responsive design
- **Accessibility**: ARIA labels, keyboard navigation, proper contrast

## 🔐 Authentication & Security

- **JWT-based authentication** with HTTP-only cookies
- **Role-based access control** (user/admin roles)
- **Password hashing** with bcrypt
- **Rate limiting** on API endpoints
- **Input validation** and sanitization
- **File upload security** with type and size restrictions

## 📊 ATS Resume Scoring Algorithm

The ATS scoring system evaluates resumes on multiple criteria:

- **Personal Information** (20 points): Contact details, professional summary
- **Experience Section** (30 points): Work history, detailed descriptions, achievements
- **Education Section** (15 points): Educational background
- **Skills Section** (20 points): Technical and soft skills
- **Additional Sections** (15 points): Certifications, projects
- **Formatting Bonus**: Consistent dates, quantifiable achievements, keywords

## 🚀 Deployment

### Backend Deployment
1. Build the application: `npm run build`
2. Set production environment variables
3. Deploy to your preferred platform (Heroku, DigitalOcean, AWS, etc.)

### Frontend Deployment
1. Build the application: `npm run build`
2. Deploy to Vercel, Netlify, or similar platform
3. Update API URL in environment variables

## 📝 Usage Examples

### Creating a Resume (cURL)
```bash
curl -X POST http://localhost:5000/api/resumes \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -d '{
    "template": "modern",
    "personalInfo": {
      "firstName": "John",
      "lastName": "Doe",
      "email": "john@example.com",
      "phone": "+1234567890",
      "address": "123 Main St, City, State",
      "summary": "Experienced software developer..."
    },
    "experience": [...],
    "skills": [...]
  }'
```

### Applying for a Job (JavaScript)
```javascript
const formData = new FormData();
formData.append('firstName', 'John');
formData.append('lastName', 'Doe');
formData.append('email', 'john@example.com');
formData.append('phone', '+1234567890');
formData.append('resume', resumeFile);

fetch('http://localhost:5000/api/jobs/JOB_ID/apply', {
  method: 'POST',
  body: formData
});
```

## ✅ Implementation Checklist

### Backend ✅
- [x] MongoDB models (User, Job, Resume, Blog, Service, Project, Testimonial, Contact)
- [x] Authentication system with JWT
- [x] File upload middleware with Multer
- [x] OpenAI service integration
- [x] Email service with Nodemailer
- [x] ATS scoring algorithm
- [x] Complete API endpoints
- [x] Error handling and validation

### Frontend ✅
- [x] Next.js project setup with TypeScript
- [x] Authentication context and pages
- [x] Responsive navigation and footer
- [x] Homepage with hero, services, testimonials, CTA sections
- [x] UI component library
- [x] Type definitions
- [x] API client setup

### Remaining Features 🚧
- [ ] About page with team intro and timeline
- [ ] Services listing and detail pages
- [ ] Projects portfolio with filtering
- [ ] Blog listing and detail pages
- [ ] Careers job board and applications
- [ ] Resume builder interface
- [ ] Admin dashboard
- [ ] Contact page with form

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit changes: `git commit -m 'Add amazing feature'`
4. Push to branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🆘 Support

For support and questions:
- Create an issue on GitHub
- Email: support@mastersolis.com
- Documentation: [Project Wiki]

---

**Built with ❤️ by the MasterSolis Team**
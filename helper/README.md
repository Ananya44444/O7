# Backend for Mastersolis

This is the backend server for Mastersolis website, built with Node.js, Express, TypeScript, and MongoDB.

## Features

- User Authentication & Authorization
- Blog Management
- Career Portal with Resume Parsing
- Contact Form Processing
- Testimonials Management
- AI-powered Content Generation
- Email Service Integration
- Admin Dashboard API

## Project Structure

```
src/
├── config/         # Configuration files
├── controllers/    # Request handlers
├── models/        # Database models
├── routes/        # API routes
├── services/      # Business logic
├── middleware/    # Custom middleware
└── utils/         # Utility functions
```

## Getting Started

1. Install dependencies:
   ```bash
   npm install
   ```

2. Create a `.env` file in the root directory with the following variables:
   ```
   PORT=5000
   MONGODB_URI=your_mongodb_uri
   JWT_SECRET=your_jwt_secret
   OPENAI_API_KEY=your_openai_api_key
   EMAIL_SERVICE=your_email_service
   EMAIL_USER=your_email_user
   EMAIL_PASS=your_email_password
   ```

3. Run the development server:
   ```bash
   npm run dev
   ```

4. Build for production:
   ```bash
   npm run build
   ```

## API Documentation

[API documentation will be added here]

## Testing

Run tests using:
```bash
npm test
```
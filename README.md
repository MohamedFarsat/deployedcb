# AOAI x ChatAndBuild Hackathon Submission Platform

A modern web application for managing hackathon submissions built with React, TypeScript, and Supabase.

## Admin Credentials

**Email:** `admin@aoai.local`  
**Password:** `AOAI@ChatAndBuild2024!Secure`

The password is securely encrypted using bcrypt with a salt rounds of 10.

## Features

- User authentication and profiles
- Hackathon submission management
- Admin dashboard for reviewing submissions
- Voting system for submissions
- Secure admin authentication with encrypted passwords

## Tech Stack

- React 18
- TypeScript
- Vite
- Tailwind CSS
- Supabase
- React Router
- bcryptjs for password encryption

## Getting Started

1. Install dependencies:
```bash
npm install
```

2. Set up environment variables in `.env`:
```
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

3. Run the development server:
```bash
npm run dev
```

4. Build for production:
```bash
npm run build
```

## Security

- Admin passwords are encrypted using bcrypt
- Supabase Row Level Security (RLS) enabled
- Secure authentication flow
- Environment variables for sensitive data

## License

MIT

# Next.js Firebase Authentication App

## Overview
This is a Next.js 13 application with Firebase authentication, built with TypeScript, React, and Tailwind CSS. The application features a login system with an admin panel and notifications interface. The UI is primarily in Arabic (RTL layout).

## Project Setup (Last Updated: December 3, 2025)

### Tech Stack
- **Framework**: Next.js 13.5.1 (App Router)
- **Language**: TypeScript 5.2.2
- **Styling**: Tailwind CSS 3.3.3
- **UI Components**: Radix UI components
- **Authentication**: Firebase Auth
- **Database**: Firebase Firestore & Realtime Database

### Key Features
- Firebase authentication (email/password)
- Admin panel with real-time online users count
- Notifications system
- RTL (Right-to-Left) layout support
- Dark theme UI with green accents
- Show OTP and Show PIN buttons (visible only when data available)
- Applications sorted by date (newest first)

### Firebase Configuration
The application uses Firebase for authentication and database services. The Firebase configuration is currently hardcoded in `lib/firestore.ts`. 

**Important**: For production deployment, consider moving Firebase configuration to environment variables for better security.

### Development Setup
- **Port**: 5000 (configured for Replit)
- **Host**: 0.0.0.0 (allows Replit proxy)
- **Dev Command**: `npm run dev`

### Project Structure
- `/app` - Next.js app directory with pages and routes
  - `/login` - Login page
  - `/admin` - Admin panel
  - `/notifications` - Notifications page
- `/components` - React components
  - `/ui` - Reusable UI components (Radix UI)
- `/lib` - Utility functions and Firebase setup
- `/public` - Static assets

### Deployment
Configured for Replit Autoscale deployment:
- **Build**: `npm run build`
- **Start**: `npm start`
- **Target**: Autoscale (stateless web app)

## Recent Changes
- December 3, 2025: Added new features
  - Added online users count display to admin and notifications pages
  - Added Show OTP and Show PIN buttons (only visible when data is available)
  - Sorted applications by date (newest first)
  - Both admin page list and application cards now have OTP/PIN toggle buttons
- December 3, 2025: Initial import and Replit environment setup
  - Configured Next.js to run on port 5000
  - Set up development workflow
  - Configured deployment settings for production

## Notes
- The application includes pre-filled login credentials in the code (me199@admin.xo) - consider removing for production
- Firebase API keys are exposed in client-side code - this is normal for Firebase but ensure proper security rules are set in Firebase Console

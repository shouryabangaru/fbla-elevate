# FBLA Elevate - Replit Configuration

## Overview

FBLA Elevate is a comprehensive web application designed to help students prepare for FBLA (Future Business Leaders of America) competitive events. The application provides interactive practice tools including flashcards, practice questions, leaderboards, and achievements to enhance student learning and engagement.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **UI Library**: Radix UI components with shadcn/ui design system
- **Styling**: Tailwind CSS with custom FBLA color scheme (blue: #003366, yellow: #FFD700, white: #FFFFFF)
- **State Management**: React Context API for authentication, TanStack Query for server state
- **Routing**: Wouter for lightweight client-side routing
- **Build Tool**: Vite for development and production builds

### Backend Architecture
- **Runtime**: Node.js with Express.js
- **Language**: TypeScript with ESM modules
- **Database**: PostgreSQL with Drizzle ORM
- **Database Provider**: Neon Database (serverless PostgreSQL)
- **Authentication**: Firebase Auth with Google provider integration
- **Session Management**: Database-first storage with Firestore backup
- **API**: RESTful API with Firebase integration endpoints

### Design System
- **Component Library**: Custom implementation based on Radix UI primitives
- **Theme**: Dark mode support with CSS custom properties
- **Responsive Design**: Mobile-first approach with Tailwind breakpoints
- **Typography**: Clean, modern typography optimized for educational content

## Key Components

### Authentication System
- **Provider**: Firebase Authentication
- **Methods**: Email/password and Google OAuth with enhanced UX
- **User Management**: PostgreSQL primary storage with Firestore backup
- **Session Handling**: React Context for global authentication state
- **Features**: Password strength validation, forgot password, real-time error feedback

### Database Schema
- **Users**: Store user profiles with school affiliation, points, and streaks
- **Flashcards**: Organized by event ID with terms and definitions
- **User Progress**: Track individual flashcard performance and attempts
- **Achievements**: Badge system with categories and point rewards
- **User Achievements**: Junction table for earned achievements

### Core Features
- **Flashcards**: Interactive study cards with flip functionality
- **Practice Questions**: Categorized by FBLA event types
- **Leaderboards**: School-based and global rankings
- **Achievements**: Gamification system with progress tracking
- **Presentation Tips**: Educational content for competitive events

## Data Flow

### Authentication Flow
1. User initiates login/signup through enhanced AuthModal component
2. Firebase Auth handles authentication process with comprehensive validation
3. User data saved to PostgreSQL database via REST API
4. Firestore used as backup storage for reliability
5. AuthContext provides global authentication state with database integration
6. Protected routes redirect unauthenticated users

### Study Session Flow
1. User selects study material (flashcards/practice questions)
2. Content fetched from Firestore with event-based filtering
3. Progress tracked in real-time during study sessions
4. Achievements calculated and awarded based on performance
5. User statistics updated in database

### Leaderboard System
1. User points aggregated from study activities
2. Rankings calculated by school and globally
3. Real-time updates through Firestore subscriptions
4. Achievement milestones trigger point rewards

## External Dependencies

### Firebase Services
- **Authentication**: User management and OAuth integration
- **Firestore**: Backup database for user data and content
- **Configuration**: Environment-based setup for development/production
- **Integration**: RESTful API endpoints for seamless database synchronization

### UI Dependencies
- **Radix UI**: Accessible component primitives
- **Tailwind CSS**: Utility-first styling framework
- **Lucide React**: Icon library for consistent iconography
- **TanStack Query**: Server state management and caching

### Development Tools
- **Vite**: Build tool with hot module replacement
- **TypeScript**: Type safety and developer experience
- **ESLint/Prettier**: Code formatting and linting
- **Drizzle Kit**: Database migrations and schema management

## Deployment Strategy

### Development Environment
- **Local Development**: Vite dev server with Express API
- **Database**: Neon Database with connection pooling
- **Authentication**: Firebase project with test credentials
- **Environment Variables**: Local .env file for configuration

### Production Deployment
- **Build Process**: Vite production build with code splitting
- **Server**: Express.js with static file serving
- **Database**: PostgreSQL with Drizzle ORM migrations
- **Authentication**: Firebase production project
- **Hosting**: Configurable for various platforms (Replit, Vercel, etc.)

### Environment Configuration
- **Database**: `DATABASE_URL` for PostgreSQL connection
- **Firebase**: Multiple environment variables for project configuration
- **Development**: Replit-specific plugins and error handling
- **Production**: Optimized builds with proper error boundaries

The application follows a modern full-stack architecture with clear separation of concerns, making it maintainable and scalable for educational use cases.
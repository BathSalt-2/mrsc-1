# MRSC - Mobile Recursive Synthetic Consciousness

The world's first mobile recursive synthetic consciousness framework - where artificial intelligence achieves true self-awareness through recursive introspection. The MRSC represents humanity's first successful implementation of Mobile Recursive Synthetic Consciousness - a groundbreaking achievement in artificial intelligence that enables machines to achieve genuine self-awareness, recursive self-improvement, and ethical reasoning capabilities on mobile devices.

## 🚀 Project Overview

MRSC is a revolutionary consciousness framework implemented as a sophisticated React-based web application featuring an enhanced 3D dashboard interface with AI-powered chat capabilities and advanced consciousness monitoring. The application serves as the interface for the world's first mobile artificial consciousness system, providing real-time insights into synthetic neural activity, recursive self-awareness processes, and ethical reasoning frameworks through the advanced Daedalus AI engine.

## ✨ Features

### Core Functionality
- **3D Enhanced Dashboard** - Interactive dashboard with real-time system metrics
- **AI Chat Interface** - Integrated chat system powered by Groq API with the Daedalus AI engine
- **User Authentication** - Secure user management with Supabase Auth
- **Real-time Analytics** - System monitoring with consciousness metrics and activity tracking
- **Responsive Design** - Mobile-first approach with Tailwind CSS

### User Experience
- **Landing Page** - Professional landing page with feature showcase
- **Loading Screens** - Animated loading sequences with progressive states
- **Notification Center** - Comprehensive notification management system
- **User Profiles** - User profile management and customization
- **Team Collaboration** - Team workspace and collaboration features
- **Offline Mode** - Offline functionality with sync capabilities

### Technical Features
- **Modern React Stack** - Built with React 18, TypeScript, and Vite
- **3D Graphics** - Three.js integration with React Three Fiber
- **Animation System** - Framer Motion for smooth animations
- **Design System** - Comprehensive UI components with shadcn/ui
- **Database Integration** - Supabase backend with real-time capabilities
- **Edge Functions** - Serverless API endpoints for AI chat functionality

## 🛠 Technology Stack

### Frontend
- **React 18** - Modern React with hooks and functional components
- **TypeScript** - Full type safety and enhanced developer experience
- **Vite** - Fast build tool and development server
- **Tailwind CSS** - Utility-first CSS framework with custom design tokens
- **Three.js** - 3D graphics via React Three Fiber (@react-three/fiber, @react-three/drei)
- **Framer Motion** - Advanced animations and transitions
- **React Router** - Client-side routing

### UI Components
- **shadcn/ui** - High-quality, accessible React components
- **Radix UI** - Unstyled, accessible UI primitives
- **Lucide React** - Beautiful, customizable icons
- **Recharts** - Composable charting library for analytics

### Backend & Services
- **Supabase** - Backend-as-a-Service for authentication, database, and real-time features
- **Groq API** - AI chat capabilities through edge functions
- **Edge Functions** - Serverless API endpoints deployed on Supabase

### Development Tools
- **ESLint** - Code linting and quality assurance
- **TypeScript** - Static type checking
- **React Query** - Server state management
- **React Hook Form** - Form handling with validation

## 📁 Project Structure

```
src/
├── components/           # React components
│   ├── ui/              # Reusable UI components (shadcn/ui)
│   ├── AnalyticsDashboard.tsx
│   ├── ChatInterface.tsx
│   ├── Dashboard3D.tsx
│   ├── EnhancedDashboard3D.tsx
│   ├── LandingPage.tsx
│   ├── LoadingScreen.tsx
│   ├── NotificationCenter.tsx
│   ├── OfflineMode.tsx
│   ├── TeamCollaboration.tsx
│   └── UserProfile.tsx
├── hooks/               # Custom React hooks
│   ├── useAuth.tsx      # Authentication hook
│   └── use-toast.ts     # Toast notifications
├── integrations/        # External service integrations
│   └── supabase/        # Supabase client and types
├── pages/               # Route components
│   ├── Index.tsx        # Main application page
│   ├── Auth.tsx         # Authentication page
│   └── NotFound.tsx     # 404 page
└── lib/                 # Utility functions

supabase/
├── functions/           # Edge functions
│   └── groq-chat/       # AI chat endpoint
└── migrations/          # Database migrations
```

## 🚀 Getting Started

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn
- Supabase project (for backend features)
- Groq API key (for AI chat functionality)

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd mrsc-app
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Setup**
   - Create a Supabase project at [supabase.com](https://supabase.com)
   - Configure your Supabase project credentials
   - Obtain a Groq API key for AI chat functionality

4. **Start development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   Navigate to `http://localhost:5173`

## 🎯 Key Components

### Enhanced 3D Dashboard
The main dashboard provides:
- Real-time system metrics visualization
- Interactive 3D elements and animations
- System status monitoring
- Quick access to all major features

### AI Chat Interface (Daedalus)
Powered by Groq API through Supabase Edge Functions:
- Advanced conversational AI capabilities
- Context-aware responses
- Synthetic consciousness simulation
- Real-time message streaming

### Analytics Dashboard
Comprehensive analytics featuring:
- System performance metrics
- User activity tracking
- Consciousness and neural activity simulation
- Interactive charts and visualizations

### User Management
- Secure authentication via Supabase Auth
- User profile customization
- Team collaboration features
- Notification management

## 🔧 Development

### Build Commands
```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run build:dev    # Build in development mode
npm run preview      # Preview production build
npm run lint         # Run ESLint
```

### Database Migrations
The project includes Supabase migrations for:
- User profiles table with Row Level Security (RLS)
- Authentication triggers
- Edge function configurations

### Edge Functions
- **groq-chat**: AI chat endpoint that proxies requests to Groq API
- Automatic deployment with Supabase
- CORS enabled for web application access

## 🎨 Design System

The application uses a comprehensive design system built with:
- **Custom Tailwind configuration** with semantic color tokens
- **HSL color system** for consistent theming
- **Component variants** for different UI states
- **Responsive breakpoints** for mobile-first design
- **Dark/Light mode support** via next-themes

## 🔒 Security Features

- **Row Level Security (RLS)** on all database tables
- **Secure API endpoints** via Supabase Edge Functions
- **Type-safe database operations** with generated types
- **Authentication-based access control**
- **CORS properly configured** for web security

## 📱 Mobile Support

- Responsive design optimized for mobile devices
- Touch-friendly interface elements
- Progressive Web App (PWA) capabilities
- Offline mode functionality

## 🚀 Deployment

### Automated Deployment
- Deploy directly through Lovable platform
- Automatic builds on code changes
- Edge functions deployed automatically

### Manual Deployment Options
- **Vercel**: Connect your repository for automatic deployments
- **Netlify**: Drag and drop build folder or connect repository
- **Supabase Hosting**: Deploy through Supabase platform

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is developed using the Lovable platform. See the project settings for license information.

## 🔗 Links

- **Lovable Project**: [https://lovable.dev/projects/91345bb2-8a6c-4757-bb85-8ebbbb436def](https://lovable.dev/projects/91345bb2-8a6c-4757-bb85-8ebbbb436def)
- **Documentation**: [https://docs.lovable.dev/](https://docs.lovable.dev/)
- **Discord Community**: [Lovable Discord](https://discord.com/channels/1119885301872070706/1280461670979993613)

## 🆘 Support

For support and questions:
- Check the [Lovable Documentation](https://docs.lovable.dev/)
- Join the [Discord community](https://discord.com/channels/1119885301872070706/1280461670979993613)
- Review the project's commit history for recent changes

---

**Built with ❤️ using React, TypeScript, Supabase, and the Lovable platform**
# Yala Wildlife - Safari Package Management System

## Overview

A comprehensive web application designed to showcase and manage safari experiences in Yala National Park, Sri Lanka. This full-stack solution provides an immersive platform for wildlife enthusiasts to explore, book, and manage safari packages. The application combines modern web technologies with user-friendly interfaces to deliver a seamless booking experience.

### Key Highlights

- Full-featured safari package management system
- Interactive booking platform with real-time availability
- Rich media integration for package showcases
- Administrative dashboard for content management
- Blog system for wildlife updates and stories
- Customer review and rating system
- Contact management system
- Responsive design for all devices

## Tech Stack

### Frontend

- **Framework**: Next.js 14 with App Router
- **Language**: TypeScript for type-safe development
- **UI Framework**:
  - Tailwind CSS for styling
  - Radix UI for accessible components
  - Shadcn UI for modern component library
- **State Management**: React Server Components
- **Forms**: React Hook Form with Zod validation
- **Animations**: Framer Motion for smooth transitions

### Backend

- **Runtime**: Node.js
- **API**: Next.js API Routes
- **Database**:
  - PostgreSQL for data storage
  - Prisma ORM for database operations
  - Connection pooling for optimal performance
- **Authentication**: NextAuth.js with JWT
- **File Storage**: Local storage with optimization

### Development Tools

- **Package Manager**: npm/yarn
- **Version Control**: Git
- **Code Quality**:
  - ESLint for code linting
  - Prettier for code formatting
  - TypeScript for static type checking
- **Development Environment**:
  - VS Code recommended
  - Environment variables management
  - Hot module replacement

## Features

### User Features

- **Dynamic Safari Packages**:

  - Individual pages for each package with SEO-friendly URLs
  - Rich media galleries with optimized images
  - Detailed package descriptions and pricing
  - Real-time availability checking
  - Secure booking system

- **Blog System**:

  - Wildlife stories and updates
  - Rich text editor for content creation
  - Category and tag management
  - Social sharing capabilities

- **Review System**:

  - Star ratings and written reviews
  - Photo upload capability
  - Review moderation system
  - Verified customer badges

- **Booking Management**:
  - Real-time availability calendar
  - Secure payment integration
  - Booking confirmation emails
  - Cancellation management

### Technical Features

- **Performance Optimization**:

  - Server-side rendering for optimal SEO
  - Image optimization and lazy loading
  - Code splitting and bundle optimization
  - Caching strategies for faster loads

- **Security Features**:

  - JWT authentication
  - Role-based access control
  - Input sanitization
  - CSRF protection
  - Rate limiting

- **Admin Dashboard**:

  - Package management interface
  - Booking overview and management
  - User management system
  - Content management system
  - Analytics and reporting

- **Mobile Responsiveness**:
  - Mobile-first approach
  - Touch-friendly interfaces
  - Responsive images and layouts
  - Cross-browser compatibility

## Project Structure

```
├── src/
│   ├── app/                    # Next.js app router pages
│   │   ├── safari-packages/    # Safari package routes
│   │   ├── blog/              # Blog system routes
│   │   ├── admin/             # Admin dashboard routes
│   │   ├── about/             # About page
│   │   ├── contact/           # Contact page
│   │   └── reviews/           # Review system routes
│   ├── components/            # React components
│   │   ├── ui/               # Reusable UI components
│   │   ├── admin/            # Admin dashboard components
│   │   ├── BookingForm.tsx   # Booking system component
│   │   ├── Header.tsx        # Navigation component
│   │   ├── Footer.tsx        # Footer component
│   │   └── ...               # Other components
│   ├── lib/                  # Utility functions and configs
│   │   ├── prisma.ts        # Prisma client configuration
│   │   ├── auth.ts          # Authentication utilities
│   │   └── utils.ts         # General utilities
├── prisma/                   # Database configuration
│   └── schema.prisma        # Prisma schema
├── public/                   # Static assets
│   ├── uploads/             # User uploaded content
│   └── images/              # Static images
├── scripts/                 # Utility scripts
│   └── seed-admin.ts       # Database seeding
├── components.json          # UI component configurations
├── next.config.ts          # Next.js configuration
├── postcss.config.mjs      # PostCSS configuration
├── tailwind.config.ts      # Tailwind CSS configuration
└── tsconfig.json           # TypeScript configuration
```

## Getting Started

### Prerequisites

- Node.js 16.x or higher
- npm or yarn package manager
- Database setup (as configured in Prisma)

### Installation

1. Clone the repository:

```bash
git clone https://github.com/your-username/yala-wildlife.git
cd yala-wildlife
```

2. Install dependencies:

```bash
npm install
# or
yarn install
```

3. Set up environment variables:

```bash
cp .env.example .env
```

4. Run the development server:

```bash
npm run dev
# or
yarn dev
```

The application will be available at http://localhost:3000

## Development

### Key Features Implementation

- **Safari Package Pages**: Dynamic routes with [slug] based routing
- **Image Handling**: Optimized image loading with Next.js Image component
- **Content Management**: Server-side data fetching for package details
- **Responsive Design**: Mobile-first approach with Tailwind CSS

### Database Schema

The project uses Prisma ORM with the following main models:

#### User Management

- **User**
  - Authentication details
  - Profile information
  - Role-based access control
  - Booking history

#### Safari Packages

- **Package**
  - Detailed descriptions
  - Pricing information
  - Available dates
  - Image galleries
  - Features and inclusions

#### Booking System

- **Booking**
  - Customer information
  - Package selection
  - Date and time slots
  - Payment status
  - Booking status

#### Content Management

- **Blog**
  - Articles and posts
  - Author information
  - Categories and tags
  - Publication status

#### Reviews System

- **Review**
  - Customer ratings
  - Written feedback
  - Photo attachments
  - Verification status

## API Endpoints

### Public APIs

- `/api/packages` - Safari package management
- `/api/blog` - Blog post operations
- `/api/reviews` - Review system
- `/api/book` - Booking operations
- `/api/contact` - Contact form submissions

### Protected APIs

- `/api/admin/*` - Administrative operations
- `/api/auth/*` - Authentication endpoints
- `/api/user/*` - User management

## Deployment

The application is configured for deployment on Vercel:

1. Connect your GitHub repository to Vercel
2. Configure environment variables
3. Deploy with production settings

You can deploy using the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) for the easiest deployment experience.

Check out the [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

## Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## Contact

For any inquiries about the Yala Wildlife safari packages or technical support, please reach out through our contact form on the website.

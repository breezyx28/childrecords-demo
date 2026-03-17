# Child Record Application

A comprehensive Next.js application for managing and tracking children's health records, growth charts, and milestones.

## Tech Stack

- **Framework**: Next.js 14
- **Styling**: Tailwind CSS
- **State Management**: Redux Toolkit
- **API Handling**: RTK Query for API calls and caching
- **UI Components**: Material-UI, Shadcn, DaisyUI
- **Form Handling**: React Hook Form
- **Data Visualization**: Recharts
- **Authentication**: Custom OAuth implementation with cookie-based session management
- **Date Handling**: Day.js
- **Type Checking**: TypeScript

## Data Management & Authentication

The application uses Redux Toolkit Query (RTK Query) for efficient API handling, providing:

- Automatic caching and cache invalidation
- Real-time data synchronization
- Optimistic updates
- Type-safe API calls

Authentication flow:

1. Google OAuth for user authentication
2. Cookie-based session management for persistent user sessions
3. Secure token storage in HTTP-only cookies
4. Automatic token refresh handling

## Prerequisites

- Node.js 18+
- npm or yarn
- Git

## Getting Started

1. **Clone the repository**

   ```bash
   git clone https://github.com/breezyx28/child-record
   cd child-record
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Environment Setup**
   Create a `.env.local` file with the following variables:

   ```env
   NEXT_PUBLIC_API_URL=your_api_url
   NEXT_PUBLIC_DOMAIN_URL="your_website_url"
   NEXT_PUBLIC_API_IMAGES="your_api_image_url
   NEXT_PUBLIC_GA_ID=your_google_client_id
   ```

4. **Development Server**

   ```bash
   # Run on port 5000
   npm run dev

   # Run master branch on port 4000
   npm run dev:master
   ```

## Project Structure

```
child-record/
├── app/                    # Next.js 14 app directory
│   ├── (pages)/           # Route groups
│   ├── dashboard/         # Dashboard routes
│   └── layout.tsx         # Root layout
├── components/            # Reusable components
│   ├── ui/               # UI components
│   ├── charts/           # Chart components
│   └── sections/         # Page sections
├── redux/                # Redux store and slices
├── hooks/                # Custom React hooks
├── styles/               # Global styles
├── types/                # TypeScript types
├── utils/                # Utility functions
└── validator/            # Form validation schemas
```

## Key Features

- 📊 Growth Charts
- 📝 Health Records Management
- 🎯 Milestone Tracking
- 📱 Responsive Design
- 🔐 Google Authentication
- 📅 Appointment Scheduling
- 📈 Progress Monitoring

## Available Scripts

- `npm run dev` - Start development server on port 5000
- `npm run build` - Build production application
- `npm run start` - Start production server on port 4040
- `npm run lint` - Run ESLint
- `npm run tsc` - Type check TypeScript
- `npm run deploy` - Build and deploy production
- `npm run deploy-dev` - Build and deploy development

## Deployment

The application can be deployed using the following commands:

```bash
# Production Deployment
npm run deploy

# Development Deployment
npm run deploy-dev
```

## Contributing

1. Create a feature branch
2. Make your changes
3. Run tests and type checking
4. Submit a pull request

## License

This project is private and proprietary.

## Support

For support, please contact the development team or raise an issue in the repository.

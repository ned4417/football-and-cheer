# INYFC Website

Modern revamp of the Inland Northwest Youth Football & Cheer League website, built with Next.js, TypeScript, and Tailwind CSS.

## Overview

This is a complete rebuild of the inyfc.org website featuring a modern, mobile-first design tailored for youth sports. The website serves young athletes and their families with easy registration, schedule viewing, and program information.

## Technology Stack

- **Framework**: Next.js 15.5.2 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Images**: Next.js Image component with optimization

## Features

### 🏟️ Modern Sports Design
- Dark sports field-themed background with gradient
- Glassmorphism effects and backdrop blur
- Mobile-first responsive design
- Professional typography and spacing

### 🏃‍♂️ Interactive Registration
- Program selection (Football & Cheerleading)
- Age group filtering (K-8th grade divisions)
- Important dates and pricing information
- Enhanced UX with clickable program cards

### 📅 Dynamic Schedule System
- 6-week season schedule generation
- Real team names: Pirates, Blackhawks, Panthers, G-Men, Highlanders, Bears, Falcons, United, Wildcats
- Authentic locations: Valley Christian School, Ferris High School, Mt. Spokane High School
- Advanced filtering by grade, week, location, and team
- Game times, field assignments, and directions

### 🎯 Hero Section
- Large logo display with cycling message banner
- Smooth animations and transitions
- Call-to-action buttons for registration
- Statistics showcase (1,200+ athletes, 48+ teams, 25+ years)

### 📱 Navigation
- Mobile hamburger menu with smooth animations
- Sticky header with scroll effects
- Logo integration with app-icon styling
- Responsive dropdown menus

## Getting Started

First, install dependencies:

```bash
npm install
```

Run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Project Structure

```
src/
├── app/
│   ├── globals.css          # Tailwind v4 configuration and design system
│   ├── layout.tsx           # Root layout with metadata
│   └── page.tsx             # Homepage with all components
├── components/
│   ├── Navigation.tsx       # Mobile-first navigation header
│   ├── Hero.tsx            # Hero section with logo and messaging
│   ├── Registration.tsx    # Interactive registration flow
│   └── Schedule.tsx        # Dynamic schedule with filtering
└── public/
    ├── inyfc-small-logo.png # Navigation logo
    └── inyfc-big-logo.png   # Hero section logo
```

## Design System

### Color Palette
- **Primary**: Green tones (`#166534`, `#22c55e`) - Field green
- **Secondary**: Blue tones (`#1e40af`, `#3b82f6`) - Team colors
- **Accent**: Yellow/Gold (`#eab308`, `#fbbf24`) - Championship gold
- **Neutral**: Dark grays (`#171717`, `#404040`) - Professional backgrounds

### Key Components
- Glassmorphism cards with `backdrop-blur-sm`
- Smooth Framer Motion animations
- Mobile-responsive grid layouts
- Interactive hover states and transitions

## Development Notes

### Tailwind CSS v4
This project uses Tailwind CSS v4 with the new `@theme` directive in `globals.css` instead of a traditional config file.

### Image Assets
- Logos are optimized PNG files with transparent backgrounds
- Navigation logo uses app-icon styling with white background and rounded corners
- Hero logo is prominently displayed at large sizes (96x96 on desktop)

### State Management
- React hooks for component state (filters, selections)
- No external state management needed for current scope
- Local state for registration flow and schedule filtering

## Key Features Implementation

### Schedule Generation
The schedule system generates a realistic 6-week season starting September 13th, 2025, with:
- Grade-appropriate game counts (K-1st: 2 games/week, others: 3 games/week)
- Time slots: 9:00 AM, 11:00 AM, 1:00 PM, 3:00 PM
- Random but logical team matchups
- Field assignments across multiple locations

### Registration Flow
Enhanced UX with:
- Visual program selection with radio button indicators
- Age group filtering based on selected program
- Pricing tiers with early bird incentives
- Contact information for support

## Deployment

This project is optimized for deployment on Vercel:

```bash
npm run build
```

The build process includes:
- Static optimization for improved performance
- Image optimization and compression
- CSS purging and minification
- TypeScript compilation and type checking

## Contributing

When making changes:
1. Follow the existing component structure and naming conventions
2. Maintain mobile-first responsive design principles
3. Use TypeScript for all new components
4. Test across different screen sizes
5. Ensure animations are smooth and performant

## Support

For questions about the INYFC organization:
- Website: inyfc.org
- Email: registration@inyfc.org
- Phone: (509) 555-0123

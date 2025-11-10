# Namaa (نماء) - Faith & Productivity Tracker

## Overview

Namaa is a bilingual (Arabic/English) web application designed to help users track their daily faith-based activities and productivity goals. The application combines Islamic spiritual practices (prayers, Quran reading) with modern productivity tracking (tasks, lessons, goals) in a clean, modern interface with a white and gold theme.

The app focuses on daily habit tracking, progress visualization, and motivational content to support users in maintaining consistent spiritual and academic routines. All data is stored locally in the browser using localStorage, making it a privacy-focused, offline-first application.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture

**Framework & Build System**
- React with TypeScript for type-safe component development
- Vite as the build tool and development server
- Wouter for lightweight client-side routing
- TanStack Query for state management (though primarily unused due to localStorage approach)

**UI Component System**
- Shadcn UI component library with Radix UI primitives
- Tailwind CSS for utility-first styling with custom theme configuration
- Custom design system with white/gold color scheme
- Full dark/light mode support with theme toggle
- Bilingual RTL/LTR layout support for Arabic and English

**State Management Pattern**
- Custom localStorage hooks (`useLocalStorage`) for persistent data storage
- Context API for global settings (theme, language, username, font size)
- No backend API calls - fully client-side data management
- Cross-component synchronization via custom localStorage events

**Component Structure**
- Page-level components for each feature (Dashboard, Tasks, Prayers, Quran, Lessons, etc.)
- Reusable UI components from Shadcn library
- Custom components (IntroAnimation, ProgressCard, ReminderDialog, AppHeader)
- Custom hooks for feature-specific logic (useTasks, usePrayers, useQuran, useLessons, useReminders)

### Data Architecture

**Storage Strategy**
- Browser localStorage as the sole data persistence layer
- No backend server or database integration
- Data organized by feature and date (e.g., `namaa_tasks`, `namaa_prayers_2024-01-15`)
- Settings stored separately in `namaa_settings`

**Data Models (Zod Schemas)**
- Task: title, completed status, priority, due date
- Prayer: daily tracking of 5 Islamic prayers (Fajr, Dhuhr, Asr, Maghrib, Isha)
- Quran: daily page reading tracker (5 pages/day target)
- Lessons: weekly metrics including focus rating, interaction, homework completion
- Reminders: custom notification system with time, type, and repeat settings

**Data Flow**
- Custom hooks abstract localStorage operations
- Date-based keys for daily data to support weekly/historical views
- Real-time synchronization across components via custom events
- Progress calculations performed in-memory from stored data

### Key Features & Architecture Decisions

**Bilingual Support**
- Translation system with full English/Arabic content (`translations.ts`)
- RTL layout switching based on language selection
- Dual font support: Inter for English, Cairo for Arabic (loaded from Google Fonts)
- Language toggle persisted in user settings

**Theme System**
- CSS custom properties for color theming
- Automatic dark mode class application to document root
- Theme toggle component in header
- Tailwind configured to support both light and dark variants

**Progressive Web App Characteristics**
- Intro animation on first visit (with localStorage flag to show once)
- Responsive design for mobile and desktop
- Offline-first architecture (no network requirements)
- Fast load times with Vite bundling

**Progress Tracking**
- Real-time calculation of completion percentages
- Daily progress for tasks, prayers, Quran reading, and lessons
- Weekly overview aggregating data across 7 days
- Visual progress bars and percentage displays

**Notification System**
- Custom reminder management (not browser notifications)
- Time-based and recurring reminder configuration
- Integration with user notification preferences in settings

### External Dependencies

**Core Libraries**
- React 18+ with TypeScript
- Vite for development and production builds
- Wouter for routing

**UI Framework**
- Shadcn UI (collection of Radix UI components)
- Radix UI primitives (Dialog, Dropdown, Progress, Switch, etc.)
- Tailwind CSS with PostCSS
- Lucide React for icons

**Utilities**
- date-fns for date manipulation and formatting
- zod for schema validation
- class-variance-authority and clsx for conditional styling
- TanStack React Query (minimal usage)

**Development Tools**
- TypeScript for type checking
- ESBuild for server bundling
- Drizzle ORM configured but unused (no database)

**Build Configuration**
- Vite plugins: React, error overlay, Replit integrations (cartographer, dev banner)
- Path aliases configured: `@/` for client/src, `@shared/` for shared code
- Custom Tailwind theme with extended colors and design tokens

### Architecture Rationale

**localStorage Over Backend**
The decision to use localStorage instead of a backend database prioritizes user privacy, offline functionality, and deployment simplicity. This makes the app immediately usable without authentication, server costs, or network dependencies. The trade-off is data limited to a single browser/device.

**Component-First Design**
Each feature (tasks, prayers, Quran, lessons) has dedicated page components and custom hooks that encapsulate all business logic. This separation makes features independent and maintainable.

**Bilingual from the Start**
Building RTL/LTR and dual-language support into the core architecture ensures cultural and linguistic accessibility is not an afterthought but a fundamental feature.

**Design System Consistency**
Using Shadcn UI provides pre-built, accessible components while allowing customization through Tailwind. The white/gold theme is applied consistently via CSS custom properties and Tailwind configuration.
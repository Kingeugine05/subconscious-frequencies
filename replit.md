# Bioneural Beats Application

## Overview

This is the most comprehensive binaural beats and sound therapy meditation application ever built, featuring 300+ frequencies and soundscapes across 27+ categories with advanced challenge and ritual systems, comprehensive meditation journaling capabilities, and deep user engagement features. The app generates binaural beats, color noises, and natural soundscapes using the Web Audio API, combining therapeutic audio experiences from pure sine waves to complex noise textures. 

### Core Frequency Collections:
- **Nervous System Regulation**: 21 specialized frequencies for autonomic nervous system balance, vagus nerve activation, HRV optimization, trauma release, and stress cycle interruption based on biofeedback research and Monroe Institute protocols
- **Triple Number Codes**: 9 numerological frequencies (111Hz-999Hz) for manifestation, sovereignty, abundance, and spiritual mastery
- **Solfeggio Frequencies**: Ancient healing tones for cellular transformation and spiritual alignment
- **Brainwave States**: Precise frequencies for Delta (deep healing), Theta (creativity/astral), Alpha (relaxation), Beta (focus), and Gamma (peak awareness)
- **Chakra Alignment**: Color-coded energy center frequencies from Root 256Hz through Crown 480Hz
- **Research Frequencies**: Monroe Institute, Gateway Project, and consciousness exploration frequencies including ultra-low states (0.07Hz-0.8Hz) for deep meditation and quantum field work
- **Quantum Frequencies**: Advanced consciousness frequencies for ego dissolution, thoughtform manipulation, and mystical states
- **Trauma Healing**: Specialized frequencies for PTSD relief, emotional reset, and nervous system regulation
- **Manifestation**: Frequencies specifically tuned for abundance, success, love attraction, and goal achievement
- **Color Noises**: Complete spectrum of therapeutic sound textures including White, Pink, Brown, Blue, Violet, Grey, Green, and Black noise for focus, sleep, anxiety relief, and sensory masking
- **Natural Soundscapes**: Organic audio environments including rainfall, thunderstorms, ocean waves, crackling fire, forest wind, crickets, frogs, and cicadas for deep relaxation and nature connection
- **Cosmic Soundscapes**: Space-based frequencies and NASA planetary recordings including deep space, Saturn rings, Earth resonance, solar wind, lunar frequencies, and pulsar rhythms for cosmic consciousness
- **Engineered Textures**: Advanced sound technologies including fractal noise, quantum noise, DNA resonance, Fibonacci tones, neural oscillations, and isochronic pulses for experimental therapy
- **Additional Categories**: Mental health (OCD/anxiety), zodiac alignment, planetary resonance, crystal healing, color therapy, musical healing, cleansing, and primal Earth frequencies

### Advanced User Engagement Features:
- **Complete Access**: All 300+ frequencies and soundscapes across 27+ categories are freely accessible from the start - no content is locked behind challenges or achievements
- **Gamification System**: Comprehensive engagement mechanics including daily rewards, mystery boxes, leaderboards, and achievement notifications to maximize user retention
- **Social Features**: Live user counter showing global active meditators, global leaderboard rankings, and social sharing prompts for viral growth
- **Special Events**: Daily rotating bonus events with point multipliers to encourage daily app usage
- **Challenge System**: Optional daily micro-challenges, weekly deep-dives, and monthly mastery challenges that reward energy points for engagement and progress tracking
- **Ritual Templates**: Guided multi-step frequency rituals for morning activation, evening integration, and power transformation sessions
- **Goal Setting & Progress Tracking**: Comprehensive system with visual progress bars, achievement badges, and user level progression purely for motivation
- **Streak Tracking**: Daily practice consistency tracking with visual progress indicators and bonus energy points
- **Smart Recommendations**: Mood-based frequency suggestions with detailed explanations
- **Comprehensive Search**: Search across frequency names, categories, carrier frequencies, beat rates, and purposes
- **Session Analytics**: Detailed tracking of usage patterns, favorite categories, and session statistics
- **Audio Download**: Generate and download custom binaural beat audio files up to 9 hours using advanced mathematical generation
- **Breathing Integration**: Visual breathing guides synchronized with frequency work for deeper states
- **Advanced Visualization System**: 6 stunning visual designs (Cosmic Mandala, Quantum Field, Neural Network, Crystal Cave, Galactic Spiral, DNA Helix) with customizable color palettes, animation speed, and intensity controls
- **Visualization Slideshow**: Auto-cycling slideshow mode that transitions between all visualization designs with user-configurable intervals (10-120 seconds)
- **Manual Visualization Control**: Quick navigation buttons to manually switch between visualization presets with real-time preview
- **Meditation Journal**: Comprehensive note-taking system for documenting meditation insights, session experiences, breakthrough moments, and spiritual discoveries with rich categorization, tagging, and search capabilities

The application uses universal, non-denominational spiritual terminology accessible to practitioners of all backgrounds, carefully avoiding any Abrahamic religious references to ensure broad spiritual accessibility. All frequency descriptions use inclusive language such as "universal" and "cosmic" instead of denominational terms. The app provides the most extensive frequency library available for meditation, consciousness exploration, nervous system regulation, manifestation work, trauma healing, and spiritual development. The gamification system enhances user engagement without restricting access to any therapeutic content.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
The frontend is built using React with TypeScript and follows a component-based architecture. The main application uses Vite as the build tool and bundler for fast development and optimized production builds. The UI is constructed with shadcn/ui components built on top of Radix UI primitives, providing accessible and customizable components. The styling is handled through Tailwind CSS with a comprehensive design system including CSS custom properties for theming and custom glassmorphism effects. State management is handled through React hooks (useState, useRef, useEffect) for local component state, with TanStack Query for server state management and caching. The app includes advanced user experience features like category-based preset filtering, favorite preset management, quick session templates, and session goal tracking.

### Audio Engine
The core audio functionality uses a dual approach: Web Audio API for real-time playback and mathematical sine wave generation for audio downloads. Real-time playback leverages oscillator nodes, stereo panner nodes, gain nodes, and analyser nodes with proper resource management. The download system uses direct mathematical calculation to generate sine waves, bypassing Web Audio API buffer limitations and enabling unlimited duration audio file generation up to 9 hours. This hybrid approach ensures both responsive real-time audio and comprehensive download capabilities.

### Routing and Navigation
The application uses Wouter as a lightweight client-side router, providing a simpler alternative to React Router. The routing is configured in App.tsx with route definitions for the main bioneural beats interface and a 404 not-found page.

### Backend Architecture
The backend is built with Express.js using TypeScript and follows a modular structure. The server setup includes middleware for JSON parsing, URL encoding, request logging with timing, and error handling. The application uses a plugin-based architecture where Vite is conditionally loaded for development mode, while production serves static files.

### Data Storage Solutions
The application uses a dual storage approach. For development and basic functionality, it implements an in-memory storage system with a clean interface pattern (IStorage) that can be easily swapped for different implementations. For production scenarios, it's configured to use PostgreSQL with Drizzle ORM as the database layer. The database configuration uses Neon Database as the PostgreSQL provider with connection pooling and serverless capabilities.

### Database Schema
The current schema includes:
- **Users table**: Fields for id (UUID primary key), username (unique text field), and password (text field)
- **Notes table**: Comprehensive meditation journal system with fields for id (UUID), title, content, category, tags (array), frequency, sessionDuration, mood, insights, isFavorite (boolean), createdAt, and updatedAt timestamps

The schema is defined using Drizzle ORM with Zod integration for runtime validation and type safety. Notes support rich categorization including Session Insights, Meditation Journey, Frequency Experience, Dreams & Visions, Breakthrough Moments, Manifestation Notes, Energy Work, Daily Practice, and Goals & Intentions.

### Authentication and Session Management
The architecture is prepared for session-based authentication using connect-pg-simple for PostgreSQL session storage. The session management integrates with the database layer and provides secure session handling capabilities.

### Development and Build Process
The development environment uses tsx for TypeScript execution, while the build process employs esbuild for server bundling and Vite for client bundling. The configuration supports both development and production modes with appropriate optimizations for each environment.

## External Dependencies

### UI Framework and Styling
- **Radix UI**: Comprehensive set of low-level UI primitives for accessibility and customization
- **Tailwind CSS**: Utility-first CSS framework for rapid UI development
- **shadcn/ui**: Pre-built component library built on Radix UI with consistent design patterns
- **Lucide React**: Icon library providing consistent iconography throughout the application

### Database and ORM
- **Neon Database**: Serverless PostgreSQL database provider for scalable data storage
- **Drizzle ORM**: Type-safe ORM with excellent TypeScript integration
- **Drizzle Kit**: Database migration and schema management tooling
- **connect-pg-simple**: PostgreSQL session store for Express sessions

### State Management and Data Fetching
- **TanStack Query**: Powerful data synchronization for React applications with caching and background updates
- **React Hook Form**: Performant forms library with minimal re-renders
- **Hookform Resolvers**: Validation resolvers for React Hook Form integration

### Development Tools
- **Vite**: Fast build tool and development server with hot module replacement
- **TypeScript**: Static type checking for improved developer experience and code reliability
- **esbuild**: Fast JavaScript bundler for server-side code compilation

### Utility Libraries
- **date-fns**: Modern JavaScript date utility library for date manipulation and formatting
- **clsx**: Utility for constructing className strings conditionally
- **nanoid**: Secure URL-friendly unique string ID generator
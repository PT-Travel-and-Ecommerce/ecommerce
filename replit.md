# Overview

Shopco is a full-stack e-commerce application built with Next.js 14, PostgreSQL, and Prisma ORM. The application provides a complete e-commerce solution with product management, shopping cart, SSO authentication, and admin dashboard. It features a modern, responsive UI and integrates with external SSO (https://ssoauth.darulgs.co.id) for secure user authentication.

## Recent Changes (November 3, 2025)
- **Multiple Image Upload**: Admin products form now supports uploading 3 product images directly from laptop
- **Homepage Product Categories**: Added isNewArrival and isTopSelling database fields to dynamically display products in "NEW ARRIVALS" and "TOP SELLING" sections
- **Image Upload API**: Implemented /api/upload endpoint for handling image uploads with validation (5MB max, image types only)
- **Dynamic Homepage**: Homepage now fetches products from database instead of hardcoded data

## Previous Changes (October 28, 2025)
- **Full-Stack Implementation**: Converted from frontend-only to full-stack with PostgreSQL database
- **Prisma ORM Integration**: Database schema with Product, User, Order, OrderItem, Payment, and Settings models
- **SSO Authentication**: Integration with darulgs.co.id SSO for user login/registration
- **Admin Dashboard**: Complete admin panel for managing products, settings, and payments
- **API Routes**: RESTful API endpoints for all CRUD operations
- **Checkout Flow**: SSO-protected checkout with payment information modal

# User Preferences

Preferred communication style: Simple, everyday language.

# System Architecture

## Frontend Architecture

**Framework & Rendering Strategy**
- Built on Next.js 14 App Router with TypeScript for type safety and modern React features
- Utilizes Server-Side Rendering (SSR) and Static Site Generation (SSG) for optimal performance and SEO
- Component-based architecture with React 18 for modular, reusable UI elements

**State Management**
- Redux Toolkit (@reduxjs/toolkit) for global state management
- Redux Persist for cart persistence across sessions using browser localStorage
- Separate slices for products (color/size selections) and carts (shopping cart items, quantities, pricing)
- Custom Redux hooks (useAppDispatch, useAppSelector) for type-safe state access

**Styling & UI Components**
- Tailwind CSS utility-first framework with custom configuration
- ShadCN UI component library (Radix UI primitives) for accessible, customizable components
- Custom fonts (Integral CF, Satoshi) loaded via Next.js font optimization
- Framer Motion for smooth animations and transitions
- CSS modules for component-specific styles (SpinnerLoader)

**Key Design Patterns**
- Client Components ("use client") for interactive features (cart, filters, animations)
- Server Components by default for static content and SEO optimization
- Responsive-first design with mobile breakpoints (xs: 375px) and desktop-focused layouts
- Custom frame width (77.5rem) for consistent content containment

## Application Structure

**Page Organization**
- Homepage: Product showcases (new arrivals, top selling), brand displays, reviews carousel
- Shop Page: Product grid with filters (categories, price, colors, size, dress style) and pagination
- Product Detail Page: Dynamic routing with image gallery, specifications, reviews, and related products
- Cart Page: Shopping cart management with order summary and SSO-protected checkout flow
- Admin Dashboard: Protected admin panel at /admin with Products, Settings, and Payments management

**Core Features - Client Flow**
- Product browsing with filtering and sorting capabilities
- Shopping cart with add/remove/update quantity functionality
- Product attributes selection (size, color) with visual feedback
- Price calculations including discounts (percentage and amount-based)
- **SSO Authentication**: Redirect to https://ssoauth.darulgs.co.id/login for unauthenticated checkout
- **Checkout Modal**: Display payment information (total, bank accounts, WhatsApp contact)
- **WhatsApp Confirmation**: Direct link to WhatsApp for payment confirmation

**Core Features - Admin Flow**
- Dashboard with statistics (total products, orders, pending payments, revenue)
- **Products CRUD**: Create, read, update, delete products with images, pricing, stock management
  - **Multiple Image Upload**: Upload up to 3 product images directly from laptop
  - **Homepage Categories**: Mark products as "NEW ARRIVALS" or "TOP SELLING" via checkboxes
  - **Auto-save Images**: Images uploaded are saved to /public/uploads with unique filenames
- **Settings Management**: Configure bank accounts and WhatsApp contact number
- **Payments Monitoring**: View all payments, verify or reject payment confirmations
- Order status tracking (PENDING, CONFIRMED, SHIPPED, DELIVERED, CANCELLED)

**Data Flow**
- **Database**: PostgreSQL with Prisma ORM for all data persistence
- **Frontend State**: Redux store manages cart state with localStorage persistence
- **API Routes**: RESTful endpoints for all database operations
- **SSO Integration**: Token-based authentication with cookie session management
- Product selections (size/color) tracked in products slice
- Calculated properties: totalPrice, adjustedTotalPrice, totalQuantities

## Component Architecture

**Layout Components**
- TopBanner: Promotional banner with dismissible functionality
- TopNavbar: Desktop navigation with dropdown menus, mobile sheet navigation, search input, cart indicator
- Footer: Multi-section footer with newsletter, social links, payment badges

**Reusable UI Components**
- ProductCard: Displays product image, title, rating, pricing with discount badges
- ReviewCard: Customer review display with rating, user verification, optional actions
- CartCounter: Quantity selector with increment/decrement controls
- Rating: Star rating component wrapper around react-simple-star-rating
- InputGroup: Compound component for styled form inputs with icons
- Custom Slider: Range slider for price filtering

**Feature-Specific Components**
- Filters: Sidebar/drawer filtering system (categories, price range, colors, sizes, dress styles)
- Tabs: Product detail tabs (specifications, reviews, FAQs)
- PhotoSection: Product image gallery with thumbnail selection
- AddToCart: Cart addition with attribute validation

## External Dependencies

**UI & Animation Libraries**
- Radix UI primitives (@radix-ui/react-*): Accordion, Dialog, Navigation Menu, Select, Separator, Slider, Slot
- Framer Motion: Animation library for smooth transitions and view-based animations
- embla-carousel-react: Carousel implementation for product/review displays
- vaul: Drawer component for mobile interfaces
- react-icons: Icon library (Lucide, React Icons)
- holy-loader: Page loading indicator

**Utility Libraries**
- class-variance-authority: CVA for component variant management
- clsx & tailwind-merge: Class name utilities and Tailwind optimization
- usehooks-ts: Custom React hooks (useMediaQuery, useIsClient, useWindowSize)

**State & Data Management**
- react-redux: React bindings for Redux
- redux-persist: State persistence with localStorage adapter
- Custom storage wrapper for SSR compatibility (prevents hydration errors)
- **Prisma Client**: @prisma/client for type-safe database operations
- **Database**: PostgreSQL with connection via DATABASE_URL environment variable

**Type System**
- TypeScript with strict mode enabled
- Custom type definitions for Product, Review, Cart, CartItem, Discount
- **Prisma Generated Types**: Auto-generated from Prisma schema
- Path aliases (@/*) for clean imports

**Backend & Database**
- **Prisma ORM**: Database schema and migrations management
- **PostgreSQL**: Relational database with models for Product, User, Order, OrderItem, Payment, Settings
- **API Routes**: Next.js API routes in /api for all backend operations
  - `/api/products` - Product CRUD operations
  - `/api/orders` - Order creation and management
  - `/api/payments` - Payment verification and tracking
  - `/api/settings` - Bank accounts and WhatsApp configuration
  - `/api/auth/session` - SSO session verification
  - `/api/auth/callback` - SSO authentication callback

**Authentication & Security**
- **SSO Integration**: External authentication via https://ssoauth.darulgs.co.id
- **Session Management**: HTTP-only cookies for secure token storage
- **useAuth Hook**: Client-side authentication state management
- **Protected Routes**: Admin dashboard requires authentication (future enhancement)
- **Secure Secrets**: DATABASE_URL stored in Replit Secrets (not in code)

**Development Tools**
- PostCSS & Tailwind CSS for styling compilation
- Next.js built-in TypeScript support
- ESLint for code quality (via next lint)

**Deployment Considerations**
- **Replit Deployment**: Configured for Replit with autoscale deployment target
- **Custom server ports**: 5000 with network binding (0.0.0.0:5000) for Replit compatibility
- **Build Command**: npm run build (Next.js production build)
- **Start Command**: npm run start (production server on port 5000)
- **Database Migrations**: Prisma migrations applied to Replit PostgreSQL database
- **Environment Variables**: DATABASE_URL (via Replit Secrets), optional NEXT_PUBLIC_SUPABASE_* for file uploads
- Image optimization via Next.js Image component
- Font optimization with local font loading

## Database Schema

**Product Model**
- Fields: id, name, description, price, discount, image, images[], category, sizes[], colors[], rating, stock, isNewArrival, isTopSelling
- Relationships: orderItems (one-to-many)
- Indexes: category, isNewArrival, isTopSelling (for faster homepage queries)

**User Model**
- Fields: id, email, name, ssoId (unique from SSO provider)
- Relationships: orders (one-to-many)

**Order Model**
- Fields: id, userId, totalAmount, status (enum), paymentProof, timestamps
- Relationships: user, orderItems, payment
- Statuses: PENDING, PROCESSING, CONFIRMED, SHIPPED, DELIVERED, CANCELLED

**OrderItem Model**
- Fields: id, orderId, productId, quantity, price, size, color
- Relationships: order, product

**Payment Model**
- Fields: id, orderId (unique), amount, status (enum), paymentMethod, paymentProof, notes
- Relationships: order
- Statuses: PENDING, VERIFIED, REJECTED

**Settings Model**
- Fields: id, key (unique), value, type
- Used for: bank_accounts (JSON array), whatsapp_number (string)
# Database Seeding Guide

## Overview
This project includes a comprehensive seeding system that populates the database with sample data for development and testing purposes.

## What Gets Seeded

### 1. Admin User
- **Email**: `admin@ecommerce.com`
- **Password**: `admin123`
- **Role**: ADMIN
- **Purpose**: Access to admin dashboard at `/admin/login`

### 2. Products (15 items)
All products use images from the `/public/images/` directory.

#### T-Shirts (8 products)
1. **Black Graphic T-Shirt** - Rp 120,000 (pic1.png)
2. **Striped Orange T-Shirt** - Rp 130,000 - 10% off (pic4.png)
3. **Courage Orange T-Shirt** - Rp 145,000 (pic6.png)
4. **Olive Graphic T-Shirt** - Rp 135,000 - 15% off (pic9.png)
5. **Heavy Metal T-Shirt** - Rp 140,000 (pic10.png)
6. **Olive Rights T-Shirt** - Rp 125,000 (pic11.png)
7. **Rainbow Art T-Shirt** - Rp 150,000 - 15% off (pic13.png)
8. **Baseball Striped T-Shirt** - Rp 135,000 (pic15.png)

#### Jeans (2 products)
1. **Skinny Fit Jeans** - Rp 240,000 - 20% off (pic2.png)
2. **Black Skinny Jeans** - Rp 260,000 (pic8.png)

#### Shorts (1 product)
1. **Denim Shorts** - Rp 180,000 - 10% off (pic7.png)

#### Shirts (2 products)
1. **Checkered Shirt** - Rp 180,000 (pic3.png)
2. **Striped Green Shirt** - Rp 190,000 - 5% off (pic5.png)

#### Polo Shirts (2 products)
1. **Blue Polo Shirt** - Rp 160,000 (pic12.png)
2. **Pink Striped Polo** - Rp 170,000 - 10% off (pic14.png)

### 3. Settings (2 items)
- **site_name**: "Shop.co"
- **site_description**: "Your one-stop shop for fashion"

## How to Run Seeding

### First Time Setup
```bash
# Install dependencies
npm install

# Push schema to database
npx prisma db push

# Run seed
npm run db:seed
```

### Reset and Re-seed
```bash
# Reset database and re-seed (WARNING: Deletes all data)
npx prisma db push --force-reset
npm run db:seed
```

### Manual Seed Only
```bash
npm run db:seed
```

## Product Categories
- **T-Shirts**: Casual t-shirts with various designs
- **Jeans**: Denim pants in different styles
- **Shorts**: Casual shorts
- **Shirts**: Button-up shirts
- **Polo**: Polo shirts

## Product Attributes
Each product includes:
- Name and description
- Price (in IDR)
- Discount percentage (0-20%)
- Main image and gallery images
- Category
- Available sizes
- Available colors
- Rating (4.3 - 4.8 stars)
- Stock quantity (35-70 units)

## Image Assets
All product images are stored in `/public/images/` directory:
- Format: PNG
- Naming: pic1.png to pic15.png
- Additional: dress-style images for UI elements

## Database Schema
The seed file uses Prisma ORM with PostgreSQL database. Key models:
- **User**: Authentication and user management
- **Product**: Product catalog
- **Settings**: Site configuration
- **Order**: Customer orders
- **Payment**: Payment tracking

## Development Notes
- Passwords are hashed using bcryptjs (salt rounds: 10)
- Product prices are in Indonesian Rupiah (IDR)
- All products have realistic stock levels
- Ratings are between 4.3 and 4.8 for quality appearance
- Discounts range from 0% to 20%

## Admin Access
After seeding, you can access the admin panel:
1. Navigate to `http://localhost:5000/admin/login`
2. Login with:
   - Email: `admin@ecommerce.com`
   - Password: `admin123`
3. Manage products, orders, payments, and settings

## Troubleshooting

### Error: "password does not exist"
This is a TypeScript lint error that appears before Prisma Client is regenerated. Run:
```bash
npx prisma generate
```

### Error: "Cannot execute step"
The database has existing data. Use force reset:
```bash
npx prisma db push --force-reset
npm run db:seed
```

### Error: "Connection refused"
Make sure PostgreSQL is running and the DATABASE_URL in `.env` is correct.

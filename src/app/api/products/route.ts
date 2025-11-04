import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const category = searchParams.get('category');
    const limit = searchParams.get('limit');

    const products = await prisma.product.findMany({
      where: category ? { category } : undefined,
      take: limit ? parseInt(limit) : undefined,
      orderBy: { createdAt: 'desc' },
    });

    return NextResponse.json(products);
  } catch (error) {
    console.error('Error fetching products:', error);
    return NextResponse.json(
      { error: 'Failed to fetch products' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      name,
      description,
      price,
      discount,
      image,
      images,
      category,
      sizes,
      colors,
      rating,
      stock,
      isNewArrival,
      isTopSelling,
    } = body;

    const product = await prisma.product.create({
      data: {
        name,
        description,
        price,
        discount,
        image,
        images: images || [],
        category,
        sizes: sizes || [],
        colors: colors || [],
        rating,
        stock: stock || 0,
        isNewArrival: isNewArrival || false,
        isTopSelling: isTopSelling || false,
      },
    });

    return NextResponse.json(product, { status: 201 });
  } catch (error) {
    console.error('Error creating product:', error);
    return NextResponse.json(
      { error: 'Failed to create product' },
      { status: 500 }
    );
  }
}

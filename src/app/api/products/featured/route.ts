import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const type = searchParams.get('type');

    let products;
    
    if (type === 'newArrivals') {
      products = await prisma.product.findMany({
        where: { isNewArrival: true },
        orderBy: { createdAt: 'desc' },
        take: 10,
      });
    } else if (type === 'topSelling') {
      products = await prisma.product.findMany({
        where: { isTopSelling: true },
        orderBy: { createdAt: 'desc' },
        take: 10,
      });
    } else {
      return NextResponse.json(
        { error: 'Invalid type parameter' },
        { status: 400 }
      );
    }

    return NextResponse.json(products);
  } catch (error) {
    console.error('Error fetching featured products:', error);
    return NextResponse.json(
      { error: 'Failed to fetch products' },
      { status: 500 }
    );
  }
}

import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json();
    const { status, notes } = body;

    const payment = await prisma.payment.update({
      where: { id: params.id },
      data: {
        status,
        ...(notes && { notes }),
      },
    });

    if (status === 'VERIFIED') {
      await prisma.order.update({
        where: { id: payment.orderId },
        data: { status: 'CONFIRMED' },
      });
    }

    return NextResponse.json(payment);
  } catch (error) {
    console.error('Error updating payment:', error);
    return NextResponse.json(
      { error: 'Failed to update payment' },
      { status: 500 }
    );
  }
}

import { NextResponse } from 'next/server';
import prisma from '@/app/lib/prisma';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const wishes = await prisma.wish.findMany({
      orderBy: {
        createdAt: 'desc',
      },
    });

    return NextResponse.json({ success: true, wishes });
  } catch (error) {
    console.error('Error fetching wishes:', error);
    return NextResponse.json(
      { error: 'Failed to fetch wishes' },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, message } = body;

    if (!name || !message) {
      return NextResponse.json(
        { error: 'Name and message are required' },
        { status: 400 }
      );
    }

    const existingWish = await prisma.wish.findFirst({
      where: { name: { equals: name, mode: 'insensitive' } },
    });

    if (existingWish) {
      return NextResponse.json(
        { error: 'Name has already been submitted. Please use a different name.' },
        { status: 409 }
      );
    }

    const wish = await prisma.wish.create({
      data: {
        name,
        message,
      },
    });

    return NextResponse.json({ success: true, wish });
  } catch (error) {
    console.error('Error submitting wish:', error);
    return NextResponse.json(
      { error: 'Failed to submit wish' },
      { status: 500 }
    );
  }
}

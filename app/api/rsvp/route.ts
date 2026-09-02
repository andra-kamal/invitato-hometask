import { NextResponse } from 'next/server';
import prisma from '@/app/lib/prisma';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, isAttending, guestCount } = body;

    if (!name || isAttending === undefined) {
      return NextResponse.json(
        { error: 'Name and attendance status are required' },
        { status: 400 }
      );
    }

    const existingRsvp = await prisma.rsvp.findFirst({
      where: { name: { equals: name, mode: 'insensitive' } },
    });
    
    if (existingRsvp) {
      return NextResponse.json(
        { error: 'Name has already been submitted. Please use a different name.' },
        { status: 409 }
      );
    }

    const rsvp = await prisma.rsvp.create({
      data: {
        name,
        isAttending: Boolean(isAttending),
        guestCount: isAttending ? Number(guestCount) || 1 : 0,
      },
    });

    return NextResponse.json({ success: true, rsvp });
  } catch (error) {
    console.error('Error submitting RSVP:', error);
    return NextResponse.json(
      { error: 'Failed to submit RSVP' },
      { status: 500 }
    );
  }
}

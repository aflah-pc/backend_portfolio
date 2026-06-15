import { NextResponse } from 'next/server';
import { getDb } from '@/lib/db';

export async function GET(request) {
  try {
    const db = await getDb();
    const inquiries = await db.all('SELECT * FROM inquiries ORDER BY id DESC');
    return NextResponse.json(inquiries);
  } catch (error) {
    console.error('Failed to fetch inquiries:', error);
    return NextResponse.json({ error: 'Failed to fetch inquiries' }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const db = await getDb();
    const data = await request.json();

    const { name, email, subject, message } = data;

    if (!name || !email || !subject || !message) {
      return NextResponse.json({ error: 'Missing required inquiry fields' }, { status: 400 });
    }

    const result = await db.run(`
      INSERT INTO inquiries (name, email, subject, message)
      VALUES (?, ?, ?, ?)
    `,
      name,
      email,
      subject,
      message
    );

    const newInquiry = {
      id: result.lastID,
      name,
      email,
      subject,
      message,
      created_at: new Date().toISOString()
    };

    return NextResponse.json(newInquiry, { status: 201 });
  } catch (error) {
    console.error('Failed to save inquiry:', error);
    return NextResponse.json({ error: 'Failed to save inquiry' }, { status: 500 });
  }
}

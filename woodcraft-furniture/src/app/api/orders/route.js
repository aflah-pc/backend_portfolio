import { NextResponse } from 'next/server';
import { getDb } from '@/lib/db';

export async function GET(request) {
  try {
    const db = await getDb();
    const orders = await db.all('SELECT * FROM orders ORDER BY id DESC');

    const parsedOrders = orders.map(o => ({
      ...o,
      items: o.items ? JSON.parse(o.items) : []
    }));

    return NextResponse.json(parsedOrders);
  } catch (error) {
    console.error('Failed to fetch orders:', error);
    return NextResponse.json({ error: 'Failed to fetch orders' }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const db = await getDb();
    const data = await request.json();

    const { customer_name, customer_email, address, items, subtotal, shipping, tax, total } = data;

    if (!customer_name || !customer_email || !address || !items || !Array.isArray(items)) {
      return NextResponse.json({ error: 'Missing required checkout information' }, { status: 400 });
    }

    const itemsString = JSON.stringify(items);

    const result = await db.run(`
      INSERT INTO orders (customer_name, customer_email, address, items, subtotal, shipping, tax, total)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `,
      customer_name,
      customer_email,
      address,
      itemsString,
      parseFloat(subtotal || 0),
      parseFloat(shipping || 0),
      parseFloat(tax || 0),
      parseFloat(total || 0)
    );

    const newOrder = {
      id: result.lastID,
      customer_name,
      customer_email,
      address,
      items,
      subtotal: parseFloat(subtotal || 0),
      shipping: parseFloat(shipping || 0),
      tax: parseFloat(tax || 0),
      total: parseFloat(total || 0),
      created_at: new Date().toISOString()
    };

    return NextResponse.json(newOrder, { status: 201 });
  } catch (error) {
    console.error('Failed to create order:', error);
    return NextResponse.json({ error: 'Failed to create order' }, { status: 500 });
  }
}

import { NextResponse } from 'next/server';
import { getDb } from '@/lib/db';

export async function GET(request) {
  try {
    const db = await getDb();
    const products = await db.all('SELECT * FROM products ORDER BY id DESC');
    
    // Parse stringified JSON fields (features) for each product
    const parsedProducts = products.map(p => ({
      ...p,
      features: p.features ? JSON.parse(p.features) : []
    }));

    return NextResponse.json(parsedProducts);
  } catch (error) {
    console.error('Failed to fetch products:', error);
    return NextResponse.json({ error: 'Failed to fetch products' }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const db = await getDb();
    const data = await request.json();
    
    const { name, category, price, rating, image, description, badge, features, dimensions } = data;

    if (!name || !category || price === undefined) {
      return NextResponse.json({ error: 'Name, category, and price are required' }, { status: 400 });
    }

    const finalRating = rating !== undefined ? parseFloat(rating) : 5.0;
    const finalFeatures = Array.isArray(features) ? JSON.stringify(features) : JSON.stringify([]);

    const result = await db.run(`
      INSERT INTO products (name, category, price, rating, image, description, badge, features, dimensions)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
    `, 
      name, 
      category, 
      parseFloat(price), 
      finalRating, 
      image || 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80', 
      description || '', 
      badge || '', 
      finalFeatures, 
      dimensions || ''
    );

    const newProduct = {
      id: result.lastID,
      name,
      category,
      price: parseFloat(price),
      rating: finalRating,
      image: image || 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      description: description || '',
      badge: badge || '',
      features: Array.isArray(features) ? features : [],
      dimensions: dimensions || ''
    };

    return NextResponse.json(newProduct, { status: 201 });
  } catch (error) {
    console.error('Failed to create product:', error);
    return NextResponse.json({ error: 'Failed to create product' }, { status: 500 });
  }
}

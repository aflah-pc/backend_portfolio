import { NextResponse } from 'next/server';
import { getDb } from '@/lib/db';

export async function GET(request, { params }) {
  try {
    const { id } = await params;
    const db = await getDb();
    const product = await db.get('SELECT * FROM products WHERE id = ?', id);

    if (!product) {
      return NextResponse.json({ error: 'Product not found' }, { status: 404 });
    }

    const parsedProduct = {
      ...product,
      features: product.features ? JSON.parse(product.features) : []
    };

    return NextResponse.json(parsedProduct);
  } catch (error) {
    console.error('Failed to fetch product:', error);
    return NextResponse.json({ error: 'Failed to fetch product' }, { status: 500 });
  }
}

export async function PUT(request, { params }) {
  try {
    const { id } = await params;
    const db = await getDb();
    const data = await request.json();
    
    const { name, category, price, rating, image, description, badge, features, dimensions } = data;

    const existingProduct = await db.get('SELECT * FROM products WHERE id = ?', id);
    if (!existingProduct) {
      return NextResponse.json({ error: 'Product not found' }, { status: 404 });
    }

    const finalName = name !== undefined ? name : existingProduct.name;
    const finalCategory = category !== undefined ? category : existingProduct.category;
    const finalPrice = price !== undefined ? parseFloat(price) : existingProduct.price;
    const finalRating = rating !== undefined ? parseFloat(rating) : existingProduct.rating;
    const finalImage = image !== undefined ? image : existingProduct.image;
    const finalDescription = description !== undefined ? description : existingProduct.description;
    const finalBadge = badge !== undefined ? badge : existingProduct.badge;
    const finalFeatures = features !== undefined ? (Array.isArray(features) ? JSON.stringify(features) : JSON.stringify([])) : existingProduct.features;
    const finalDimensions = dimensions !== undefined ? dimensions : existingProduct.dimensions;

    await db.run(`
      UPDATE products 
      SET name = ?, category = ?, price = ?, rating = ?, image = ?, description = ?, badge = ?, features = ?, dimensions = ?
      WHERE id = ?
    `, 
      finalName, 
      finalCategory, 
      finalPrice, 
      finalRating, 
      finalImage, 
      finalDescription, 
      finalBadge, 
      finalFeatures, 
      finalDimensions,
      id
    );

    const updatedProduct = {
      id: parseInt(id),
      name: finalName,
      category: finalCategory,
      price: finalPrice,
      rating: finalRating,
      image: finalImage,
      description: finalDescription,
      badge: finalBadge,
      features: features !== undefined && Array.isArray(features) ? features : (existingProduct.features ? JSON.parse(existingProduct.features) : []),
      dimensions: finalDimensions
    };

    return NextResponse.json(updatedProduct);
  } catch (error) {
    console.error('Failed to update product:', error);
    return NextResponse.json({ error: 'Failed to update product' }, { status: 500 });
  }
}

export async function DELETE(request, { params }) {
  try {
    const { id } = await params;
    const db = await getDb();

    const existingProduct = await db.get('SELECT * FROM products WHERE id = ?', id);
    if (!existingProduct) {
      return NextResponse.json({ error: 'Product not found' }, { status: 404 });
    }

    await db.run('DELETE FROM products WHERE id = ?', id);
    return NextResponse.json({ message: 'Product deleted successfully', id: parseInt(id) });
  } catch (error) {
    console.error('Failed to delete product:', error);
    return NextResponse.json({ error: 'Failed to delete product' }, { status: 500 });
  }
}

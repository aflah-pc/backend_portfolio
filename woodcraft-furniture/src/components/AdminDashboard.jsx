"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  X, Plus, Edit2, Trash2, ShoppingBag, Mail, FolderOpen, Save, RefreshCw, Star 
} from 'lucide-react';
import { useApp } from '@/context/AppContext';

const AdminDashboard = ({ isOpen, onClose }) => {
  const { 
    products, fetchProducts, 
    orders, fetchOrders, 
    inquiries, fetchInquiries,
    addProduct, updateProduct, deleteProduct 
  } = useApp();

  const [activeTab, setActiveTab] = useState('products'); // 'products', 'orders', 'inquiries'
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  
  // Form State
  const [formData, setFormData] = useState({
    name: '',
    category: 'Sofas',
    price: '',
    rating: '5.0',
    image: '',
    description: '',
    badge: '',
    features: '',
    dimensions: ''
  });

  const categories = ["Sofas", "Beds", "Dining Sets", "Office Furniture", "Chairs", "Storage", "Outdoor Furniture"];

  // Fetch orders and inquiries only when Admin Dashboard is opened
  useEffect(() => {
    if (isOpen) {
      fetchProducts();
      fetchOrders();
      fetchInquiries();
    }
  }, [isOpen]);

  const handleOpenCreateForm = () => {
    setEditingProduct(null);
    setFormData({
      name: '',
      category: 'Sofas',
      price: '',
      rating: '5.0',
      image: '',
      description: '',
      badge: '',
      features: '',
      dimensions: ''
    });
    setIsFormOpen(true);
  };

  const handleOpenEditForm = (product) => {
    setEditingProduct(product);
    setFormData({
      name: product.name || '',
      category: product.category || 'Sofas',
      price: product.price || '',
      rating: product.rating || '5.0',
      image: product.image || '',
      description: product.description || '',
      badge: product.badge || '',
      features: Array.isArray(product.features) ? product.features.join(', ') : '',
      dimensions: product.dimensions || ''
    });
    setIsFormOpen(true);
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.price) return;

    const formattedFeatures = formData.features 
      ? formData.features.split(',').map(f => f.trim()).filter(Boolean) 
      : [];

    const productPayload = {
      ...formData,
      price: parseFloat(formData.price),
      rating: parseFloat(formData.rating || 5),
      features: formattedFeatures
    };

    if (editingProduct) {
      await updateProduct(editingProduct.id, productPayload);
    } else {
      await addProduct(productPayload);
    }

    setIsFormOpen(false);
  };

  const handleDelete = async (id) => {
    if (confirm('Are you sure you want to delete this design?')) {
      await deleteProduct(id);
    }
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        {/* Backdrop */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.6 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/80 cursor-pointer"
        />

        {/* Modal Main Frame */}
        <motion.div 
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          className="relative w-full max-w-6xl h-[85vh] bg-brand-cream dark:bg-brand-walnut-dark rounded-3xl shadow-2xl flex flex-col overflow-hidden border border-brand-accent/20"
        >
          {/* Header */}
          <div className="p-6 border-b border-brand-accent/20 flex justify-between items-center bg-brand-walnut-dark text-white">
            <div>
              <h2 className="text-xl font-serif font-black tracking-wide uppercase">
                PC RUBCO & <span className="text-brand-accent">INTERIORS Admin Control</span>
              </h2>
              <p className="text-[10px] tracking-widest text-brand-beige/75 uppercase">Showroom Inventory, Checkout Orders & Consultation Logs</p>
            </div>
            <button 
              onClick={onClose}
              className="p-2 rounded-full hover:bg-white/10 text-brand-beige"
            >
              <X size={20} />
            </button>
          </div>

          {/* Sub Navigation Tabs */}
          <div className="flex bg-white/40 dark:bg-black/20 border-b border-brand-accent/10 px-6 py-2 gap-4">
            <button
              onClick={() => setActiveTab('products')}
              className={`px-4 py-2.5 rounded-xl text-xs font-bold flex items-center gap-2 ${
                activeTab === 'products' 
                  ? 'bg-brand-walnut text-white dark:bg-brand-accent dark:text-brand-walnut-dark shadow-md' 
                  : 'text-brand-walnut hover:bg-brand-accent/10 dark:text-brand-beige-light'
              }`}
            >
              <FolderOpen size={14} /> Showcase Catalog ({products.length})
            </button>
            <button
              onClick={() => setActiveTab('orders')}
              className={`px-4 py-2.5 rounded-xl text-xs font-bold flex items-center gap-2 ${
                activeTab === 'orders' 
                  ? 'bg-brand-walnut text-white dark:bg-brand-accent dark:text-brand-walnut-dark shadow-md' 
                  : 'text-brand-walnut hover:bg-brand-accent/10 dark:text-brand-beige-light'
              }`}
            >
              <ShoppingBag size={14} /> Checkout Orders ({orders.length})
            </button>
            <button
              onClick={() => setActiveTab('inquiries')}
              className={`px-4 py-2.5 rounded-xl text-xs font-bold flex items-center gap-2 ${
                activeTab === 'inquiries' 
                  ? 'bg-brand-walnut text-white dark:bg-brand-accent dark:text-brand-walnut-dark shadow-md' 
                  : 'text-brand-walnut hover:bg-brand-accent/10 dark:text-brand-beige-light'
              }`}
            >
              <Mail size={14} /> Consultations ({inquiries.length})
            </button>
          </div>

          {/* Core Panel Content */}
          <div className="flex-grow overflow-y-auto p-6">
            
            {/* 1. Products Tab Panel */}
            {activeTab === 'products' && (
              <div className="space-y-6">
                <div className="flex justify-between items-center">
                  <h3 className="text-base font-serif font-bold text-brand-walnut dark:text-brand-beige">Showroom Catalog</h3>
                  <button 
                    onClick={handleOpenCreateForm}
                    className="bg-brand-walnut dark:bg-brand-accent text-white dark:text-brand-walnut-dark text-xs font-bold px-4 py-2 rounded-xl flex items-center gap-1.5 shadow-md hover:opacity-90"
                  >
                    <Plus size={14} /> Add New Design
                  </button>
                </div>

                {products.length === 0 ? (
                  <div className="py-20 text-center text-gray-500">No furniture designs found in the catalog database.</div>
                ) : (
                  <div className="overflow-x-auto rounded-xl border border-brand-accent/15 bg-white/40 dark:bg-white/5">
                    <table className="w-full text-left border-collapse">
                      <thead>
                        <tr className="bg-brand-walnut/5 dark:bg-white/5 text-[10px] uppercase font-bold tracking-wider text-brand-accent border-b border-brand-accent/15">
                          <th className="p-4">Image</th>
                          <th className="p-4">Design Name</th>
                          <th className="p-4">Category</th>
                          <th className="p-4">Price</th>
                          <th className="p-4">Rating</th>
                          <th className="p-4 text-right">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-brand-accent/10 text-xs sm:text-sm">
                        {products.map((product) => (
                          <tr key={product.id} className="hover:bg-white/20 dark:hover:bg-white/5">
                            <td className="p-4">
                              <div className="w-12 h-12 rounded-lg overflow-hidden border border-brand-accent/25 bg-brand-cream flex-shrink-0">
                                <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
                              </div>
                            </td>
                            <td className="p-4 font-serif font-bold text-brand-walnut dark:text-white">{product.name}</td>
                            <td className="p-4 text-brand-accent font-semibold">{product.category}</td>
                            <td className="p-4 font-bold text-brand-walnut dark:text-brand-beige">${product.price}</td>
                            <td className="p-4">
                              <span className="flex items-center gap-1">
                                <Star size={12} className="fill-amber-500 text-amber-500" /> {product.rating}
                              </span>
                            </td>
                            <td className="p-4 text-right space-x-2">
                              <button 
                                onClick={() => handleOpenEditForm(product)}
                                className="p-2 rounded bg-amber-500/10 text-amber-600 dark:text-amber-400 hover:bg-amber-500/25"
                                title="Edit Product"
                              >
                                <Edit2 size={12} />
                              </button>
                              <button 
                                onClick={() => handleDelete(product.id)}
                                className="p-2 rounded bg-red-500/10 text-red-600 dark:text-red-400 hover:bg-red-500/25"
                                title="Delete Product"
                              >
                                <Trash2 size={12} />
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            )}

            {/* 2. Orders Tab Panel */}
            {activeTab === 'orders' && (
              <div className="space-y-6">
                <h3 className="text-base font-serif font-bold text-brand-walnut dark:text-brand-beige">Placed Checkout Orders</h3>
                
                {orders.length === 0 ? (
                  <div className="py-20 text-center text-gray-500">No checkout orders have been placed yet.</div>
                ) : (
                  <div className="space-y-4">
                    {orders.map((order) => (
                      <div key={order.id} className="p-6 rounded-2xl border border-brand-accent/15 bg-white/40 dark:bg-white/5 space-y-4 hover:shadow-lg transition-shadow">
                        {/* Summary Row */}
                        <div className="flex flex-col sm:flex-row justify-between sm:items-center border-b border-brand-accent/10 pb-3 gap-2">
                          <div>
                            <span className="text-[10px] text-brand-accent font-bold font-mono uppercase">Order #{order.id}</span>
                            <h4 className="text-sm font-serif font-bold text-brand-walnut dark:text-white mt-1">Customer: {order.customer_name}</h4>
                            <p className="text-xs text-gray-500">{order.customer_email} | Address: {order.address}</p>
                          </div>
                          <div className="text-left sm:text-right">
                            <span className="text-[10px] text-gray-400 block">{new Date(order.created_at).toLocaleString()}</span>
                            <span className="text-base font-bold text-brand-gold mt-1 block">Total Balance: ${order.total}</span>
                          </div>
                        </div>

                        {/* Items Itemization */}
                        <div className="space-y-2">
                          <h5 className="text-[10px] text-brand-accent uppercase font-bold tracking-wider">Items Purchased:</h5>
                          <div className="flex flex-wrap gap-3">
                            {Array.isArray(order.items) && order.items.map((item, index) => (
                              <div key={index} className="flex items-center gap-2 text-xs bg-white/60 dark:bg-white/5 border border-brand-accent/10 rounded-lg p-2">
                                <div className="w-8 h-8 rounded overflow-hidden">
                                  <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                                </div>
                                <div>
                                  <p className="font-semibold text-brand-walnut dark:text-white line-clamp-1">{item.name}</p>
                                  <p className="text-[10px] text-gray-400">{item.quantity} x ${item.price}</p>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* Cost details */}
                        <div className="flex justify-end gap-6 text-[10px] text-gray-500 font-medium">
                          <span>Subtotal: ${order.subtotal}</span>
                          <span>Shipping: ${order.shipping}</span>
                          <span>Tax: ${order.tax}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* 3. Inquiries Tab Panel */}
            {activeTab === 'inquiries' && (
              <div className="space-y-6">
                <h3 className="text-base font-serif font-bold text-brand-walnut dark:text-brand-beige">Consultation Inquiries</h3>
                
                {inquiries.length === 0 ? (
                  <div className="py-20 text-center text-gray-500">No client consultation inquiries recorded.</div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {inquiries.map((inq) => (
                      <div key={inq.id} className="p-6 rounded-2xl border border-brand-accent/15 bg-white/40 dark:bg-white/5 space-y-4 hover:shadow-lg transition-shadow relative">
                        <span className="absolute top-4 right-4 text-[10px] text-gray-400">{new Date(inq.created_at).toLocaleDateString()}</span>
                        <div>
                          <span className="text-[10px] text-brand-accent font-bold font-mono uppercase">Inquiry ID: #{inq.id}</span>
                          <h4 className="text-sm font-serif font-bold text-brand-walnut dark:text-white mt-1">From: {inq.name}</h4>
                          <p className="text-xs text-brand-accent">{inq.email}</p>
                        </div>
                        <div className="border-t border-brand-accent/10 pt-3">
                          <h5 className="text-xs font-semibold text-brand-walnut dark:text-white uppercase tracking-wider mb-2">Subject: {inq.subject}</h5>
                          <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 leading-relaxed font-light">{inq.message}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

          </div>
        </motion.div>
      </div>

      {/* Slide Form Panel Overlay */}
      {isFormOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="fixed inset-0 bg-black/60 cursor-pointer" onClick={() => setIsFormOpen(false)} />
          <motion.div 
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="relative w-full max-w-lg bg-brand-cream dark:bg-brand-walnut-dark p-6 rounded-2xl shadow-2xl border border-brand-accent/20"
          >
            <div className="flex justify-between items-center mb-6 border-b border-brand-accent/10 pb-3">
              <h4 className="text-lg font-serif font-bold text-brand-walnut dark:text-brand-beige">
                {editingProduct ? 'Edit Furniture Design' : 'Add New Furniture Design'}
              </h4>
              <button onClick={() => setIsFormOpen(false)} className="p-1 text-gray-400 hover:text-white"><X size={18} /></button>
            </div>

            <form onSubmit={handleFormSubmit} className="space-y-4 text-xs sm:text-sm">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1.5">Furniture Name *</label>
                  <input 
                    type="text" required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full bg-white dark:bg-brand-walnut-dark/50 border border-brand-accent/15 focus:border-brand-accent rounded-lg p-2.5 text-brand-walnut dark:text-white focus:outline-none"
                    placeholder="Heritage Oak Desk"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1.5">Category *</label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full bg-white dark:bg-brand-walnut-dark/50 border border-brand-accent/15 focus:border-brand-accent rounded-lg p-2.5 text-brand-walnut dark:text-white focus:outline-none"
                  >
                    {categories.map(c => <option key={c} value={c}>{c}</option>)}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1.5">Price ($) *</label>
                  <input 
                    type="number" required min="1"
                    value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                    className="w-full bg-white dark:bg-brand-walnut-dark/50 border border-brand-accent/15 focus:border-brand-accent rounded-lg p-2.5 text-brand-walnut dark:text-white focus:outline-none"
                    placeholder="1299"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1.5">Rating (1.0 to 5.0)</label>
                  <input 
                    type="number" step="0.1" min="1" max="5"
                    value={formData.rating}
                    onChange={(e) => setFormData({ ...formData, rating: e.target.value })}
                    className="w-full bg-white dark:bg-brand-walnut-dark/50 border border-brand-accent/15 focus:border-brand-accent rounded-lg p-2.5 text-brand-walnut dark:text-white focus:outline-none"
                    placeholder="4.9"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1.5">Image URL</label>
                <input 
                  type="text"
                  value={formData.image}
                  onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                  className="w-full bg-white dark:bg-brand-walnut-dark/50 border border-brand-accent/15 focus:border-brand-accent rounded-lg p-2.5 text-brand-walnut dark:text-white focus:outline-none"
                  placeholder="https://images.unsplash.com/photo-..."
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1.5">Badge (e.g. Trending, 15% OFF)</label>
                  <input 
                    type="text"
                    value={formData.badge}
                    onChange={(e) => setFormData({ ...formData, badge: e.target.value })}
                    className="w-full bg-white dark:bg-brand-walnut-dark/50 border border-brand-accent/15 focus:border-brand-accent rounded-lg p-2.5 text-brand-walnut dark:text-white focus:outline-none"
                    placeholder="Trending"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1.5">Dimensions</label>
                  <input 
                    type="text"
                    value={formData.dimensions}
                    onChange={(e) => setFormData({ ...formData, dimensions: e.target.value })}
                    className="w-full bg-white dark:bg-brand-walnut-dark/50 border border-brand-accent/15 focus:border-brand-accent rounded-lg p-2.5 text-brand-walnut dark:text-white focus:outline-none"
                    placeholder='60"W x 30"D x 30"H'
                  />
                </div>
              </div>

              <div>
                <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1.5">Features (comma separated list)</label>
                <input 
                  type="text"
                  value={formData.features}
                  onChange={(e) => setFormData({ ...formData, features: e.target.value })}
                  className="w-full bg-white dark:bg-brand-walnut-dark/50 border border-brand-accent/15 focus:border-brand-accent rounded-lg p-2.5 text-brand-walnut dark:text-white focus:outline-none"
                  placeholder="Solid wood frame, custom velvet, brass details"
                />
              </div>

              <div>
                <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1.5">Description details</label>
                <textarea 
                  rows={3}
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full bg-white dark:bg-brand-walnut-dark/50 border border-brand-accent/15 focus:border-brand-accent rounded-lg p-2.5 text-brand-walnut dark:text-white focus:outline-none resize-none"
                  placeholder="Describe details, upholstery, wood finishing, structure style..."
                />
              </div>

              <button
                type="submit"
                className="w-full bg-brand-walnut dark:bg-brand-accent text-white dark:text-brand-walnut-dark font-bold py-3 rounded-xl flex items-center justify-center gap-2 hover:opacity-90 mt-4 shadow-md"
              >
                <Save size={16} /> Save Furniture Design
              </button>
            </form>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default AdminDashboard;

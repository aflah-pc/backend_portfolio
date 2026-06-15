"use client";

import React, { createContext, useContext, useState, useEffect } from 'react';

const AppContext = createContext();

export const productsData = [
  {
    id: 1,
    name: "Heritage Chesterfield Sofa",
    category: "Sofas",
    price: 1899,
    rating: 4.9,
    image: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    description: "Indulge in absolute luxury with our Heritage Chesterfield. Handcrafted with deep-tufted velvet upholstery, hand-applied brass nailhead trim, and dark walnut finished legs. Stately elegance for any living room.",
    badge: "Trending",
    features: ["Deep button tufting", "Hardwood frame", "High density foam support"],
    dimensions: "89\"W x 38\"D x 31\"H"
  },
  {
    id: 2,
    name: "Nordic Oak Dining Table",
    category: "Dining Sets",
    price: 1499,
    rating: 4.8,
    image: "https://images.unsplash.com/photo-1615066390971-03e4e1c36ddf?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    description: "Bring minimalist Scandinavian design to your dining room. Crafted entirely from premium, solid European white oak with a oil finish highlighting the raw wood grain. Comfortably seats up to 8 guests.",
    badge: "New",
    features: ["Solid European white oak", "Matte protective finish", "Tapered legs structure"],
    dimensions: "78\"L x 36\"W x 30\"H"
  },
  {
    id: 3,
    name: "Mid-Century Lounge Chair",
    category: "Chairs",
    price: 649,
    rating: 4.7,
    image: "https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    description: "An iconic design staple. Features bent plywood walnut veneers matching with top-grain black Italian leather cushions. Built on a cast aluminum swivel base for comfort and timeless style.",
    badge: "Best Seller",
    features: ["Real walnut veneer shell", "Top-grain Italian leather", "360-degree swivel mechanism"],
    dimensions: "33\"W x 33\"D x 32\"H"
  },
  {
    id: 4,
    name: "Minimalist Platform Bed",
    category: "Beds",
    price: 1199,
    rating: 4.9,
    image: "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    description: "Streamlined elegance for the master suite. This low-profile platform bed features a solid walnut frame and an architectural wood-paneled headboard. Wooden slat support eliminates the need for a box spring.",
    badge: "Exclusive",
    features: ["Solid American walnut", "Eco-friendly wood seal", "No box spring required"],
    dimensions: "84\"L x 63\"W x 41\"H (Queen)"
  },
  {
    id: 5,
    name: "Classic Roll-Top Oak Desk",
    category: "Office Furniture",
    price: 1599,
    rating: 4.6,
    image: "https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    description: "Organize your study with old-world luxury. This double-pedestal desk is built of selected red oak, boasting a tambour roll-top hood that slides open to reveal custom letter organizers, cubby drawers, and secret slots.",
    badge: "",
    features: ["Tambour roll-top slide", "Felt-lined organizer drawers", "Solid brass hardware lock"],
    dimensions: "54\"W x 30\"D x 45\"H"
  },
  {
    id: 6,
    name: "Japanese Zen Credenza",
    category: "Storage",
    price: 899,
    rating: 4.7,
    image: "https://images.unsplash.com/photo-1595428774223-ef52624120d2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    description: "A harmonious blend of storage and minimalist art. Slatted sliding doors provide ventilation, revealing spacious adjustable shelving. Crafted in solid wild cherry wood with soft-closing hinges.",
    badge: "Popular",
    features: ["Slatted sliding ventilation doors", "Adjustable inner shelving", "Hidden cable pass-throughs"],
    dimensions: "60\"W x 18\"D x 28\"H"
  },
  {
    id: 7,
    name: "Adirondack Lounger Set",
    category: "Outdoor Furniture",
    price: 499,
    rating: 4.5,
    image: "https://images.unsplash.com/photo-1560185007-c5ca9d2c014d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    description: "Enjoy outdoor relaxation. Crafted from harvested teak wood naturally rich in oils that repel moisture and resist decay. Built with ergonomic contoured seat boards and wide flat armrests.",
    badge: "15% OFF",
    features: ["Solid premium plantation teak", "Naturally weather-proof", "Stainless steel screws"],
    dimensions: "30\"W x 36\"D x 38\"H"
  },
  {
    id: 8,
    name: "Tufted Walnut Ottoman",
    category: "Storage",
    price: 349,
    rating: 4.6,
    image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    description: "Practicality meets high design. This multi-functional bench features a tufted bouclé cream top that opens up to store blankets, pillows, and remotes. Built on solid walnut stilted legs.",
    badge: "",
    features: ["Soft bouclé fabric wrap", "Deep hidden interior chest", "Walnut wood frames"],
    dimensions: "36\"W x 20\"D x 18\"H"
  },
  {
    id: 9,
    name: "Monolith Velvet Armchair",
    category: "Chairs",
    price: 749,
    rating: 4.8,
    image: "https://images.unsplash.com/photo-1580481072645-022f9a6dbf27?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    description: "Elegant contours make this armchair a luxurious lounge centerpiece. Upholstered in dense, non-crush forest green velvet and supported by custom polished brass tapered legs.",
    badge: "Best Seller",
    features: ["Stain-resistant velvet", "Polished brass metal frame", "Curved ergonomic back"],
    dimensions: "34\"W x 32\"D x 34\"H"
  },
  {
    id: 10,
    name: "Bespoke Bookshelf Tower",
    category: "Storage",
    price: 1049,
    rating: 4.9,
    image: "https://images.unsplash.com/photo-1544644181-1484b3fdfc62?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    description: "Showcase your home library. Built of solid smoked oak, this sturdy display cabinet features architectural asymmetrical cubes for books, sculptures, and small plants.",
    badge: "New",
    features: ["Solid smoked oak wood", "Wall mounting hardware included", "Finished backing panel"],
    dimensions: "40\"W x 12\"D x 72\"H"
  }
];

export const AppProvider = ({ children }) => {
  const [darkMode, setDarkMode] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [filters, setFilters] = useState({
    category: "All",
    maxPrice: 2000,
    rating: 0,
    sortBy: "featured"
  });
  
  const [cart, setCart] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const [quickViewProduct, setQuickViewProduct] = useState(null);

  // Initialize from LocalStorage
  useEffect(() => {
    const savedTheme = localStorage.getItem('pcrubco_theme');
    if (savedTheme === 'dark') {
      setDarkMode(true);
      document.documentElement.classList.add('dark');
    } else {
      setDarkMode(false);
      document.documentElement.classList.remove('dark');
    }

    const savedCart = localStorage.getItem('pcrubco_cart');
    if (savedCart) setCart(JSON.parse(savedCart));

    const savedWishlist = localStorage.getItem('pcrubco_wishlist');
    if (savedWishlist) setWishlist(JSON.parse(savedWishlist));
  }, []);

  // Update classes when theme changes
  const toggleTheme = () => {
    const nextDark = !darkMode;
    setDarkMode(nextDark);
    if (nextDark) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('pcrubco_theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('pcrubco_theme', 'light');
    }
  };

  // Cart helper actions
  const addToCart = (product, quantity = 1) => {
    setCart((prev) => {
      const existing = prev.find(item => item.id === product.id);
      let updated;
      if (existing) {
        updated = prev.map(item =>
          item.id === product.id ? { ...item, quantity: item.quantity + quantity } : item
        );
      } else {
        updated = [...prev, { ...product, quantity }];
      }
      localStorage.setItem('pcrubco_cart', JSON.stringify(updated));
      return updated;
    });
  };

  const removeFromCart = (productId) => {
    setCart((prev) => {
      const updated = prev.filter(item => item.id !== productId);
      localStorage.setItem('pcrubco_cart', JSON.stringify(updated));
      return updated;
    });
  };

  const updateCartQuantity = (productId, count) => {
    if (count <= 0) {
      removeFromCart(productId);
      return;
    }
    setCart((prev) => {
      const updated = prev.map(item =>
        item.id === productId ? { ...item, quantity: count } : item
      );
      localStorage.setItem('pcrubco_cart', JSON.stringify(updated));
      return updated;
    });
  };

  // Wishlist actions
  const toggleWishlist = (productId) => {
    setWishlist((prev) => {
      const updated = prev.includes(productId)
        ? prev.filter(id => id !== productId)
        : [...prev, productId];
      localStorage.setItem('pcrubco_wishlist', JSON.stringify(updated));
      return updated;
    });
  };

  // Filter actions
  const resetFilters = () => {
    setFilters({
      category: "All",
      maxPrice: 2000,
      rating: 0,
      sortBy: "featured"
    });
    setSearchQuery("");
  };

  return (
    <AppContext.Provider value={{
      darkMode,
      toggleTheme,
      searchQuery,
      setSearchQuery,
      filters,
      setFilters,
      resetFilters,
      cart,
      addToCart,
      removeFromCart,
      updateCartQuantity,
      wishlist,
      toggleWishlist,
      quickViewProduct,
      setQuickViewProduct
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};

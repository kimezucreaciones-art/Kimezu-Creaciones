import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Product } from '../types';
import { useAuth } from './AuthContext';
import { supabase } from '../services/supabase';

interface CartItem extends Product {
  quantity: number;
}

interface CartContextType {
  items: CartItem[];
  isOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
  addToCart: (product: Product) => void;
  removeFromCart: (id: string) => void;
  updateQuantity: (id: string, delta: number) => void;
  clearCart: () => void;
  cartTotal: number;
  cartCount: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const { user } = useAuth(); // We need user to key the cart

  // Load from LocalStorage on mount (for guest users)
  // OR fetch from Supabase if user is logged in
  useEffect(() => {
    if (user) {
      fetchRemoteCart();
    } else {
      const saved = localStorage.getItem('kimezu_cart');
      if (saved) setItems(JSON.parse(saved));
    }
  }, [user]);

  // Save to LocalStorage whenever items change (as backup / guest mode)
  useEffect(() => {
    if (!user) {
      localStorage.setItem('kimezu_cart', JSON.stringify(items));
    }
  }, [items, user]);

  const fetchRemoteCart = async () => {
    if (!user) return;
    const { data, error } = await supabase
      .from('cart_items')
      .select('*, product:products(*)') // Join with products
      .eq('user_id', user.id);

    if (error) {
      console.error('Error fetching cart:', error);
      return;
    }

    if (data) {
      // Map Joined Data
      const cloudItems: CartItem[] = data.map((item: any) => {
        // Handle case where product might have been deleted but is in cart
        if (!item.product) return null;

        // Map product structure
        const p = item.product;
        return {
          id: p.id,
          name: p.name,
          price: p.price,
          description: p.description,
          longDescription: p.long_description,
          images: p.images || [],
          category: p.category,
          specs: p.specs || {},
          bestseller: p.is_bestseller,
          new: p.is_new,
          availableForBundle: p.available_for_bundle,
          quantity: item.quantity
        };
      }).filter(Boolean); // Remove nulls

      setItems(cloudItems);
    }
  };

  const openCart = () => setIsOpen(true);
  const closeCart = () => setIsOpen(false);

  const addToCart = async (product: Product) => {
    // 1. Optimistic Update
    let newItems = [...items];
    const existingIdx = newItems.findIndex(i => i.id === product.id);

    if (existingIdx >= 0) {
      newItems[existingIdx].quantity += 1;
    } else {
      newItems.push({ ...product, quantity: 1 });
    }
    setItems(newItems);
    setIsOpen(true);

    // 2. Sync with Supabase if logged in
    if (user) {
      if (existingIdx >= 0) {
        // Update quantity
        await supabase.from('cart_items')
          .update({ quantity: newItems[existingIdx].quantity })
          .eq('user_id', user.id)
          .eq('product_id', product.id);
      } else {
        // Insert new
        await supabase.from('cart_items').insert({
          user_id: user.id,
          product_id: product.id,
          quantity: 1
        });
      }
    }
  };

  const removeFromCart = async (id: string) => {
    setItems(prev => prev.filter(item => item.id !== id));
    if (user) {
      await supabase.from('cart_items').delete().eq('user_id', user.id).eq('product_id', id);
    }
  };

  const updateQuantity = async (id: string, delta: number) => {
    let newQty = 0;

    setItems(prev => prev.map(item => {
      if (item.id === id) {
        newQty = Math.max(1, item.quantity + delta);
        return { ...item, quantity: newQty };
      }
      return item;
    }));

    if (user) {
      await supabase.from('cart_items')
        .update({ quantity: newQty })
        .eq('user_id', user.id)
        .eq('product_id', id);
    }
  };

  const clearCart = async () => {
    setItems([]);
    if (user) {
      await supabase.from('cart_items').delete().eq('user_id', user.id);
    } else {
      localStorage.removeItem('kimezu_cart');
    }
  };

  const cartTotal = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const cartCount = items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <CartContext.Provider value={{ items, isOpen, openCart, closeCart, addToCart, removeFromCart, updateQuantity, clearCart, cartTotal, cartCount }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
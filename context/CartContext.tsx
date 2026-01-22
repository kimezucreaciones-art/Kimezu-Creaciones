import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Product } from '../types';

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
  cartTotal: number;
  cartCount: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [items, setItems] = useState<CartItem[]>([
    // Mock initial data for visualization
    {
      id: '1',
      name: 'Lavanda & Vainilla',
      price: 85000,
      description: 'Calma y dulzura.',
      longDescription: 'Una sinfonía olfativa diseñada para reducir el estrés. La lavanda francesa aporta notas herbáceas y frescas, mientras que la vainilla de Madagascar envuelve el ambiente con una calidez dulce y reconfortante.',
      images: [
        'https://images.unsplash.com/photo-1603006905003-be475563bc59?auto=format&fit=crop&q=80&w=800',
        'https://images.unsplash.com/photo-1602825266988-75001771d276?auto=format&fit=crop&q=80&w=800'
      ],
      category: 'vela',
      specs: { 
        burnTime: '40-50 Horas', 
        wax: 'Soja 100% Natural', 
        wick: 'Algodón Trenzado', 
        notes: 'Floral, Dulce', 
        weight: '220g' 
      },
      quantity: 1
    },
     {
      id: '6',
      name: 'Set de Regalo',
      price: 210000,
      description: '',
      longDescription: 'Una caja curada con nuestros best-sellers. Incluye 2 velas de 200g (aromas a elección), 1 apagavelas dorado y una caja de cerillas largas.',
      images: ['https://images.unsplash.com/photo-1608502570188-466d3a860731?auto=format&fit=crop&q=80&w=800'],
      category: 'accesorio',
      specs: { 
        burnTime: 'N/A', 
        wax: 'Soja 100% Natural', 
        wick: 'Mixto', 
        notes: 'Varios', 
        weight: '800g (Total)' 
      },
      quantity: 1
    }
  ]);
  const [isOpen, setIsOpen] = useState(false);

  const openCart = () => setIsOpen(true);
  const closeCart = () => setIsOpen(false);

  const addToCart = (product: Product) => {
    setItems(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item => item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item);
      }
      return [...prev, { ...product, quantity: 1 }];
    });
    setIsOpen(true);
  };

  const removeFromCart = (id: string) => {
    setItems(prev => prev.filter(item => item.id !== id));
  };

  const updateQuantity = (id: string, delta: number) => {
    setItems(prev => prev.map(item => {
      if (item.id === id) {
        const newQty = Math.max(1, item.quantity + delta);
        return { ...item, quantity: newQty };
      }
      return item;
    }));
  };

  const cartTotal = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const cartCount = items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <CartContext.Provider value={{ items, isOpen, openCart, closeCart, addToCart, removeFromCart, updateQuantity, cartTotal, cartCount }}>
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
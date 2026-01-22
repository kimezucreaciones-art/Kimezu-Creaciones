import React from 'react';
import { useCart } from '../context/CartContext';
import { X, Plus, Minus, Trash2, ShoppingBag, ArrowRight } from 'lucide-react';
import { Button } from './Button';
import { Link } from 'react-router-dom';
import { formatCOP } from '../utils/currency';

export const CartDrawer: React.FC = () => {
  const { isOpen, closeCart, items, updateQuantity, removeFromCart, cartTotal } = useCart();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[60] flex justify-end">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-kimezu-title/40 backdrop-blur-sm animate-fade-in"
        onClick={closeCart}
      ></div>

      {/* Drawer */}
      <div className="relative w-[85vw] md:w-full max-w-md bg-kimezu-bg h-full shadow-2xl flex flex-col animate-slide-in-right border-l border-kimezu-card">
        
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-kimezu-card bg-white/50 backdrop-blur-sm">
          <h2 className="font-serif text-xl md:text-2xl text-kimezu-title flex items-center gap-2">
            Tu Carrito <span className="text-sm font-sans text-kimezu-green font-bold">({items.length})</span>
          </h2>
          <button onClick={closeCart} className="text-kimezu-text hover:text-kimezu-primary transition-colors">
            <X size={24} />
          </button>
        </div>

        {/* Items List */}
        <div className="flex-1 overflow-y-auto p-4 md:p-6 space-y-4 md:space-y-6">
          {items.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center space-y-4 opacity-60">
              <ShoppingBag size={48} className="text-kimezu-card" />
              <p className="font-serif text-xl text-kimezu-title">Tu carrito está vacío</p>
              <Button variant="outline" onClick={closeCart}>Explorar Tienda</Button>
            </div>
          ) : (
            items.map(item => (
              <div key={item.id} className="flex gap-3 md:gap-4 group bg-white md:bg-transparent p-2 md:p-0 rounded md:rounded-none shadow-sm md:shadow-none">
                <div className="w-20 h-20 md:w-24 md:h-24 bg-kimezu-card overflow-hidden flex-shrink-0 relative rounded-sm">
                   {/* Use images[0] */}
                   <img src={item.images[0]} alt={item.name} className="w-full h-full object-cover" />
                </div>
                
                <div className="flex-1 flex flex-col justify-between py-1">
                  <div>
                    <div className="flex justify-between items-start">
                      <h3 className="font-serif text-base md:text-lg text-kimezu-title leading-tight line-clamp-1">{item.name}</h3>
                      <button 
                        onClick={() => removeFromCart(item.id)}
                        className="text-stone-300 hover:text-kimezu-pink transition-colors p-1"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                    <p className="text-sm text-kimezu-green font-bold mt-1">{formatCOP(item.price)}</p>
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="flex items-center border border-kimezu-card bg-white">
                      <button 
                        onClick={() => updateQuantity(item.id, -1)}
                        className="p-1 hover:bg-stone-100 text-kimezu-title"
                      >
                        <Minus size={14} />
                      </button>
                      <span className="w-8 text-center text-xs font-bold text-kimezu-title">{item.quantity}</span>
                      <button 
                        onClick={() => updateQuantity(item.id, 1)}
                        className="p-1 hover:bg-stone-100 text-kimezu-title"
                      >
                        <Plus size={14} />
                      </button>
                    </div>
                    <p className="text-xs text-kimezu-text ml-auto font-bold">
                      {formatCOP(item.price * item.quantity)}
                    </p>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="p-4 md:p-6 bg-white border-t border-kimezu-card space-y-4">
            
            {/* Promo Code Input - Styled with Green Focus */}
            <div className="flex gap-2">
               <input 
                 type="text" 
                 placeholder="Código" 
                 className="flex-1 bg-kimezu-bg border border-kimezu-card px-4 py-2 text-sm placeholder-kimezu-text/50"
               />
               <Button variant="outline" className="px-3 py-2 text-xs">Aplicar</Button>
            </div>

            <div className="space-y-2 py-3 border-b border-dashed border-kimezu-card">
              <div className="flex justify-between text-sm text-kimezu-text">
                <span>Subtotal</span>
                <span>{formatCOP(cartTotal)}</span>
              </div>
              <div className="flex justify-between text-sm text-kimezu-text">
                <span>Envío</span>
                <span className="text-kimezu-green text-xs font-bold uppercase">Calculado en el pago</span>
              </div>
            </div>

            <div className="flex justify-between items-end mb-2">
              <span className="font-serif text-lg text-kimezu-title">Total</span>
              <span className="font-serif text-2xl text-kimezu-title font-bold">{formatCOP(cartTotal)}</span>
            </div>

            <Link to="/checkout" onClick={closeCart}>
              <Button variant="secondary" fullWidth className="group">
                Finalizar <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform ml-2" />
              </Button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};
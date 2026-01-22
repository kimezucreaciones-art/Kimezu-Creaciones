import React, { useState } from 'react';
import { Button } from '../components/Button';
import { SectionSeparator } from '../components/SectionSeparator';
import { Product } from '../types';
import { Check, Plus, Trash2, Gift, ShoppingBag } from 'lucide-react';
import { formatCOP } from '../utils/currency';
import { useCart } from '../context/CartContext';
import { useProducts } from '../context/ProductContext'; // Import Context

export const Bundles: React.FC = () => {
  const [bundleItems, setBundleItems] = useState<Product[]>([]);
  const { addToCart } = useCart();
  const { products, packs } = useProducts(); // Get packs from context

  // Filter products available for bundles
  const comboProducts = products.filter(p => p.availableForBundle);

  const addBundleItem = (product: Product) => {
    // We create a unique ID to allow adding the same product multiple times
    setBundleItems([...bundleItems, { ...product, id: `${product.id}-${Date.now()}` }]);
  };

  const removeBundleItem = (index: number) => {
    const newItems = [...bundleItems];
    newItems.splice(index, 1);
    setBundleItems(newItems);
  };

  // Discount Logic: 5% for the 2nd product, +5% for each subsequent product.
  // 1 item = 0%
  // 2 items = 5%
  // 3 items = 10%
  // 4 items = 15%
  // 5 items = 20%
  // 6+ items = 25% (Max cap)
  const calculateDiscountRate = () => {
    if (bundleItems.length < 2) return 0;
    const itemsContributingToDiscount = bundleItems.length - 1;
    const rawDiscount = itemsContributingToDiscount * 0.05;
    return Math.min(rawDiscount, 0.25); // Cap at 25%
  };

  const subtotal = bundleItems.reduce((acc, item) => acc + item.price, 0);
  const discountRate = calculateDiscountRate();
  const discountAmount = subtotal * discountRate;
  const total = subtotal - discountAmount;

  const handleAddBundleToCart = () => {
    // In a real scenario, this would create a grouped item or apply a coupon.
    // Here we will simulate adding all items to the cart.
    // Note: The cart context in this demo doesn't support custom bundle prices yet, 
    // so this is a visual simulation of the flow.
    bundleItems.forEach(item => {
        // We strip the unique ID suffix to match the catalog ID logic if needed, 
        // or just add them as is.
        addToCart(item);
    });
    alert(`¡Combo añadido! Ahorraste ${formatCOP(discountAmount)}`);
    setBundleItems([]);
  };

  return (
    <div className="bg-kimezu-bg min-h-screen pb-24">
       {/* Header Banner - Increased bottom padding for separation */}
       <div className="bg-kimezu-title text-white py-6 pb-12 md:py-20 px-4 text-center">
          {/* Removed SectionSeparator above title to bring it closer to banner */}
          <h1 className="font-serif text-3xl md:text-6xl mb-4 pt-2">Arma tu Combo</h1>
          <p className="text-sm md:text-xl text-stone-300 max-w-2xl mx-auto font-light mb-6">
             Diseña tu experiencia Kimezu. Cuantos más productos elijas, mayor será tu descuento.
          </p>
          
          {/* Improved Discount Info - Grid Layout for clarity */}
          <div className="grid grid-cols-3 gap-2 max-w-lg mx-auto md:flex md:justify-center md:gap-4 md:mt-8">
             <div className="bg-white/10 backdrop-blur-sm px-2 py-2 md:px-4 md:py-2 rounded-sm border border-white/10 flex flex-col items-center justify-center">
               <span className="text-lg font-serif font-bold text-kimezu-primary">5% OFF</span>
               <span className="text-[10px] md:text-xs uppercase tracking-widest text-stone-300">2 Productos</span>
             </div>
             <div className="bg-white/10 backdrop-blur-sm px-2 py-2 md:px-4 md:py-2 rounded-sm border border-white/10 flex flex-col items-center justify-center">
               <span className="text-lg font-serif font-bold text-kimezu-primary">10% OFF</span>
               <span className="text-[10px] md:text-xs uppercase tracking-widest text-stone-300">3 Productos</span>
             </div>
             <div className="bg-white/10 backdrop-blur-sm px-2 py-2 md:px-4 md:py-2 rounded-sm border border-white/10 flex flex-col items-center justify-center">
               <span className="text-lg font-serif font-bold text-kimezu-primary">15%+ OFF</span>
               <span className="text-[10px] md:text-xs uppercase tracking-widest text-stone-300">4+ Productos</span>
             </div>
          </div>
       </div>

       {/* Reduced negative margin slightly on mobile for better separation from discount info */}
       <div className="container mx-auto px-4 md:px-8 -mt-4 md:-mt-10">
          <div className="bg-white rounded-sm shadow-xl border border-kimezu-card p-6 md:p-10 flex flex-col lg:flex-row gap-8 md:gap-12 relative z-10">
             
             {/* Left: Product Selection */}
             <div className="lg:w-2/3">
                <h3 className="font-serif text-xl md:text-2xl text-kimezu-title mb-6 flex items-center justify-center lg:justify-start gap-2">
                   <ShoppingBag size={24} className="text-kimezu-primary" />
                   1. Selecciona tus productos
                </h3>
                
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
                   {comboProducts.map(prod => (
                      <div 
                        key={prod.id} 
                        onClick={() => addBundleItem(prod)}
                        className="group cursor-pointer border border-transparent hover:border-kimezu-primary/30 p-3 md:p-4 rounded-lg hover:bg-stone-50 transition-all duration-300 relative"
                      >
                         <div className="aspect-square overflow-hidden mb-3 bg-stone-100 rounded-sm">
                            <img src={prod.images[0]} alt={prod.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                         </div>
                         <h4 className="font-serif text-sm md:text-lg text-kimezu-title leading-tight mb-1">{prod.name}</h4>
                         <p className="text-[10px] md:text-xs text-stone-500 mb-2 line-clamp-1">{prod.description}</p>
                         <div className="flex justify-between items-center">
                            <span className="font-bold text-xs md:text-base text-kimezu-primary">{formatCOP(prod.price)}</span>
                            <div className="w-6 h-6 md:w-8 md:h-8 rounded-full bg-kimezu-bg flex items-center justify-center text-kimezu-title group-hover:bg-kimezu-primary group-hover:text-white transition-colors">
                               <Plus size={14} />
                            </div>
                         </div>
                      </div>
                   ))}
                </div>
             </div>

             {/* Right: Bundle Summary (Sticky) */}
             <div className="lg:w-1/3">
                <div className="sticky top-24 bg-kimezu-bg p-6 md:p-8 border border-kimezu-card rounded-sm">
                   <h3 className="font-serif text-xl md:text-2xl text-kimezu-title mb-6 flex items-center justify-center lg:justify-start gap-2">
                      <Gift size={24} className="text-kimezu-pink" />
                      2. Tu Resumen
                   </h3>

                   {bundleItems.length === 0 ? (
                      <div className="text-center py-12 border-2 border-dashed border-stone-300 rounded-lg text-stone-400">
                         <p>Tu caja está vacía.</p>
                         <p className="text-sm">Selecciona productos de la izquierda.</p>
                      </div>
                   ) : (
                      <div className="space-y-4 mb-8 max-h-[300px] md:max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
                         {bundleItems.map((item, idx) => (
                            <div key={`${item.id}-${idx}`} className="flex justify-between items-center bg-white p-3 rounded shadow-sm animate-fade-in-up">
                               <div>
                                  <p className="font-bold text-kimezu-title text-sm">{item.name}</p>
                                  <p className="text-xs text-stone-500">{formatCOP(item.price)}</p>
                               </div>
                               <button 
                                  onClick={() => removeBundleItem(idx)}
                                  className="text-stone-300 hover:text-red-400 p-2 transition-colors"
                               >
                                  <Trash2 size={16} />
                               </button>
                            </div>
                         ))}
                      </div>
                   )}

                   {/* Calculation Section */}
                   <div className="border-t border-stone-200 pt-6 space-y-3">
                      <div className="flex justify-between text-stone-600 text-sm md:text-base">
                         <span>Subtotal ({bundleItems.length} items)</span>
                         <span>{formatCOP(subtotal)}</span>
                      </div>
                      
                      <div className={`flex justify-between font-bold text-sm md:text-base ${discountRate > 0 ? 'text-kimezu-green' : 'text-stone-400'}`}>
                         <span>Descuento ({(discountRate * 100).toFixed(0)}%)</span>
                         <span>- {formatCOP(discountAmount)}</span>
                      </div>

                      {bundleItems.length > 0 && bundleItems.length < 2 && (
                         <p className="text-xs text-center text-kimezu-primary bg-kimezu-primary/10 p-2 rounded">
                            ¡Agrega 1 producto más para desbloquear 5% OFF!
                         </p>
                      )}

                      <div className="flex justify-between text-xl md:text-2xl font-serif text-kimezu-title font-bold border-t border-stone-200 pt-4 mt-2">
                         <span>Total</span>
                         <span>{formatCOP(total)}</span>
                      </div>
                   </div>

                   <Button 
                      fullWidth 
                      className="mt-8"
                      disabled={bundleItems.length === 0}
                      onClick={handleAddBundleToCart}
                   >
                      Agregar Combo al Carrito
                   </Button>
                </div>
             </div>
          </div>
       </div>

       {/* Pre-made Section */}
       <section className="container mx-auto px-4 md:px-8 py-24">
          <div className="text-center mb-12">
             <h2 className="font-serif text-3xl md:text-4xl text-kimezu-title mb-4">O elige nuestros Favoritos</h2>
             <p className="text-kimezu-text">Combinaciones probadas que enamoran.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
               {packs.map((pack) => (
                   <div key={pack.id} className="bg-white p-8 border border-stone-100 hover:shadow-2xl transition-all duration-300 group">
                      <div className="h-56 overflow-hidden mb-6 -mx-8 -mt-8 relative">
                         <img src={pack.image} alt={pack.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                         {pack.tagText && (
                            <div className={`absolute top-4 left-4 text-white text-xs font-bold px-3 py-1 uppercase tracking-widest ${pack.tagColor === 'primary' ? 'bg-kimezu-primary' : 'bg-kimezu-green'}`}>
                                {pack.tagText}
                            </div>
                         )}
                      </div>
                      <h3 className="font-serif text-2xl text-kimezu-title mb-2">{pack.name}</h3>
                      <p className="text-sm text-stone-500 mb-6 line-clamp-2">{pack.description}</p>
                      
                      {pack.items && pack.items.length > 0 && (
                          <ul className="text-sm text-kimezu-text space-y-3 mb-8 bg-stone-50 p-4 rounded">
                             {pack.items.map((item, idx) => (
                                <li key={idx} className="flex items-center gap-2"><Check size={16} className="text-kimezu-primary"/> {item}</li>
                             ))}
                          </ul>
                      )}
                      
                      <div className="flex items-center justify-between mt-auto">
                         <div>
                            {pack.originalPrice > pack.price && (
                                <span className="text-stone-400 line-through text-sm block">{formatCOP(pack.originalPrice)}</span>
                            )}
                            <span className="text-xl font-bold text-kimezu-title">{formatCOP(pack.price)}</span>
                         </div>
                         <Button variant="outline">Añadir</Button>
                      </div>
                   </div>
               ))}
          </div>
       </section>
    </div>
  );
};
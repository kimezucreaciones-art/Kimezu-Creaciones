import React from 'react';
import { Link } from 'react-router-dom';
import { Product } from '../types';
import { useCart } from '../context/CartContext';
import { formatCOP } from '../utils/currency';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addToCart } = useCart();
  const mainImage = product.images[0];
  const secondaryImage = product.images.length > 1 ? product.images[1] : mainImage;

  return (
    <div className="group flex flex-col animate-fade-in-up">
      <div className="relative overflow-hidden bg-kimezu-card aspect-[4/5] mb-4">
        {/* Badge: Use Green for New to add variety */}
        {product.new && (
          <span className="absolute top-2 left-2 bg-kimezu-green text-white px-3 py-1 text-[10px] uppercase tracking-widest font-bold z-10 shadow-sm">
            Nuevo
          </span>
        )}
        {product.bestseller && (
          <span className="absolute top-2 left-2 bg-kimezu-primary text-white px-3 py-1 text-[10px] uppercase tracking-widest font-bold z-10 shadow-sm">
            Best Seller
          </span>
        )}
        
        <Link to={`/product/${product.id}`} className="block w-full h-full relative">
            {/* Main Image */}
            <img 
            src={mainImage} 
            alt={product.name} 
            className={`w-full h-full object-cover transition-opacity duration-700 ${product.images.length > 1 ? 'group-hover:opacity-0' : 'group-hover:scale-110'}`}
            />
            
            {/* Secondary Image (on Hover) */}
            {product.images.length > 1 && (
               <img 
                src={secondaryImage} 
                alt={product.name}
                className="absolute inset-0 w-full h-full object-cover opacity-0 group-hover:opacity-100 transition-opacity duration-700 scale-105"
               />
            )}
        </Link>
        
        {/* Quick Add Overlay */}
        <div className="absolute bottom-0 left-0 w-full p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300 z-20">
          <button 
            onClick={() => addToCart(product)}
            className="w-full bg-white/95 text-kimezu-title uppercase text-xs font-bold py-3 tracking-widest shadow-md hover:bg-kimezu-green hover:text-white transition-colors duration-300"
          >
            Añadir rápida
          </button>
        </div>
      </div>

      <div className="text-center">
        <Link to={`/product/${product.id}`}>
          <h3 className="font-serif text-lg text-kimezu-title group-hover:text-kimezu-primary transition-colors duration-300">
            {product.name}
          </h3>
        </Link>
        <p className="text-sm text-kimezu-text mt-1 font-medium">{formatCOP(product.price)}</p>
      </div>
    </div>
  );
};
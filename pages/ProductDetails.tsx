import React, { useState, useMemo } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useProducts } from '../context/ProductContext'; // Import Context
import { formatCOP } from '../utils/currency';
import { Button } from '../components/Button';
import { 
  Star, 
  Minus, 
  Plus, 
  ShoppingBag, 
  ChevronLeft, 
  ChevronRight, 
  X, 
  ThumbsUp, 
  ThumbsDown,
  Clock,
  Flame,
  Scale,
  Maximize2
} from 'lucide-react';

interface Review {
  id: number;
  user: string;
  rating: number;
  date: string;
  comment: string;
  likes: number;
  dislikes: number;
  userAction?: 'like' | 'dislike' | null;
}

export const ProductDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { products } = useProducts(); 
  
  const [quantity, setQuantity] = useState(1);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  
  // Slider State
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Initialize reviews state
  const [reviews, setReviews] = useState<Review[]>([
    { id: 1, user: 'Ana María G.', rating: 5, date: 'Hace 2 semanas', comment: 'El aroma es increíble, llena toda la sala sin ser abrumador. El empaque es precioso.', likes: 12, dislikes: 0, userAction: null },
    { id: 2, user: 'Carlos D.', rating: 4, date: 'Hace 1 mes', comment: 'Muy buena calidad, aunque me gustaría que durara un poco más. Aún así, repetiré.', likes: 5, dislikes: 1, userAction: null },
    { id: 3, user: 'Sofía L.', rating: 5, date: 'Hace 3 días', comment: 'Llegó súper rápido a Bogotá. La mecha de madera suena como una chimenea real.', likes: 8, dislikes: 0, userAction: null },
  ]);

  // Find Product from Context
  const productIndex = products.findIndex(p => p.id === id);
  const product = products[productIndex];
  
  // Navigation Logic
  const prevProduct = productIndex > 0 ? products[productIndex - 1] : null;
  const nextProduct = productIndex < products.length - 1 ? products[productIndex + 1] : null;

  if (!product) {
    return <div className="pt-32 text-center">Producto no encontrado</div>;
  }

  // Calculate Average Rating
  const averageRating = useMemo(() => {
    if (reviews.length === 0) return 0;
    const total = reviews.reduce((acc, r) => acc + r.rating, 0);
    return (total / reviews.length).toFixed(1);
  }, [reviews]);

  const handleAddToCart = () => {
    // Add product 'quantity' times
    for(let i = 0; i < quantity; i++) {
      addToCart(product);
    }
  };

  const handleVote = (reviewId: number, type: 'like' | 'dislike') => {
    setReviews(prevReviews => prevReviews.map(review => {
      if (review.id !== reviewId) return review;
      const newReview = { ...review };
      if (newReview.userAction === type) {
        newReview[type] -= 1;
        newReview.userAction = null;
      } else if (newReview.userAction && newReview.userAction !== type) {
        newReview[newReview.userAction] -= 1;
        newReview[type] += 1;
        newReview.userAction = type;
      } else {
        newReview[type] += 1;
        newReview.userAction = type;
      }
      return newReview;
    }));
  };

  // Slider controls
  const nextImage = (e?: React.MouseEvent) => {
    e?.preventDefault();
    setCurrentImageIndex((prev) => (prev === product.images.length - 1 ? 0 : prev + 1));
  };

  const prevImage = (e?: React.MouseEvent) => {
    e?.preventDefault();
    setCurrentImageIndex((prev) => (prev === 0 ? product.images.length - 1 : prev - 1));
  };

  return (
    <div className="pt-20 md:pt-28 pb-24 bg-kimezu-bg">
      
      {/* Lightbox */}
      {isLightboxOpen && (
        <div 
          className="fixed inset-0 z-[100] bg-black/90 flex items-center justify-center p-4 animate-fade-in"
          onClick={() => setIsLightboxOpen(false)}
        >
          <button className="absolute top-6 right-6 text-white hover:text-kimezu-primary transition-colors">
            <X size={40} />
          </button>
          <img 
            src={product.images[currentImageIndex]} 
            alt={product.name} 
            className="max-w-full max-h-[90vh] object-contain shadow-2xl rounded-sm"
            onClick={(e) => e.stopPropagation()} 
          />
        </div>
      )}

      <div className="container mx-auto px-4 md:px-8">
        
        {/* Breadcrumb */}
        <div className="text-xs text-kimezu-text mb-8 uppercase tracking-widest text-center md:text-left">
           <Link to="/" className="hover:text-kimezu-primary">Inicio</Link> / <Link to="/shop" className="hover:text-kimezu-primary">Tienda</Link> / <span className="text-kimezu-title font-bold">{product.name}</span>
        </div>

        {/* Product Layout */}
        <div className="flex flex-col lg:flex-row gap-12 mb-20">
          
          {/* Image Section - Carousel */}
          <div className="lg:w-1/2 relative group">
             
             {/* Product Nav Arrows (External) */}
             {prevProduct && (
                <Link to={`/product/${prevProduct.id}`} className="absolute -left-12 lg:-left-16 top-1/2 -translate-y-1/2 z-20 hover:text-kimezu-primary text-stone-300 transition-all hidden lg:block" title={`Anterior: ${prevProduct.name}`}>
                   <ChevronLeft size={40} strokeWidth={1} />
                </Link>
             )}
             {nextProduct && (
                <Link to={`/product/${nextProduct.id}`} className="absolute -right-12 lg:-right-16 top-1/2 -translate-y-1/2 z-20 hover:text-kimezu-primary text-stone-300 transition-all hidden lg:block" title={`Siguiente: ${nextProduct.name}`}>
                   <ChevronRight size={40} strokeWidth={1} />
                </Link>
             )}

             <div className="relative overflow-hidden aspect-[4/5] bg-white p-2 shadow-sm border border-kimezu-card">
               <img 
                 src={product.images[currentImageIndex]} 
                 alt={product.name} 
                 className="w-full h-full object-cover cursor-zoom-in transition-transform duration-500"
                 onClick={() => setIsLightboxOpen(true)}
               />
               
               {/* Image Slider Controls (Internal) */}
               {product.images.length > 1 && (
                 <>
                   <button 
                     onClick={prevImage}
                     className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/50 hover:bg-white text-kimezu-title p-2 rounded-full transition-all backdrop-blur-sm opacity-0 group-hover:opacity-100"
                   >
                     <ChevronLeft size={24} />
                   </button>
                   <button 
                     onClick={nextImage}
                     className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/50 hover:bg-white text-kimezu-title p-2 rounded-full transition-all backdrop-blur-sm opacity-0 group-hover:opacity-100"
                   >
                     <ChevronRight size={24} />
                   </button>

                   {/* Dots Indicators */}
                   <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-10">
                     {product.images.map((_, idx) => (
                       <button
                         key={idx}
                         onClick={(e) => { e.stopPropagation(); setCurrentImageIndex(idx); }}
                         className={`w-2 h-2 rounded-full transition-all ${currentImageIndex === idx ? 'bg-kimezu-primary scale-125' : 'bg-white/70 hover:bg-white'}`}
                       />
                     ))}
                   </div>
                 </>
               )}

               <div className="absolute bottom-4 right-4 bg-white/90 p-2 rounded-full text-kimezu-title shadow-md pointer-events-none group-hover:scale-110 transition-transform">
                 <Maximize2 size={20} />
               </div>
               {product.new && <span className="absolute top-4 left-4 bg-kimezu-green text-white px-3 py-1 text-xs font-bold uppercase tracking-widest">Nuevo</span>}
             </div>
          </div>

          {/* Details Section - Centered on Mobile */}
          <div className="lg:w-1/2 flex flex-col justify-center text-center lg:text-left">
             <h1 className="font-serif text-4xl md:text-5xl text-kimezu-title mb-4">{product.name}</h1>
             
             {/* Rating Summary */}
             <div className="flex items-center justify-center lg:justify-start gap-4 mb-6">
                <div className="flex text-kimezu-primary">
                   {[...Array(5)].map((_, i) => (
                      <Star key={i} size={18} fill={i < Math.round(Number(averageRating)) ? "currentColor" : "none"} strokeWidth={1.5} />
                   ))}
                </div>
                <span className="text-sm text-kimezu-text border-b border-kimezu-primary cursor-pointer hover:text-kimezu-primary" onClick={() => document.getElementById('reviews')?.scrollIntoView({behavior: 'smooth'})}>
                  {reviews.length} Calificaciones ({averageRating}/5.0)
                </span>
             </div>

             <p className="text-3xl font-light text-kimezu-title mb-8">{formatCOP(product.price)}</p>

             <p className="text-lg text-kimezu-text leading-relaxed mb-10 font-light">
               {product.longDescription}
             </p>

             {/* Characteristics Grid - Centered Items on Mobile */}
             <div className="grid grid-cols-2 gap-y-6 gap-x-4 mb-10 p-6 bg-white border border-kimezu-card/50 rounded-sm">
                <div className="flex flex-col sm:flex-row items-center sm:items-start gap-2 sm:gap-3">
                   <Clock className="text-kimezu-primary shrink-0" size={20} />
                   <div>
                      <h4 className="text-xs font-bold uppercase text-kimezu-title mb-1">Duración</h4>
                      <p className="text-sm text-kimezu-text">{product.specs.burnTime}</p>
                   </div>
                </div>
                <div className="flex flex-col sm:flex-row items-center sm:items-start gap-2 sm:gap-3">
                   <Flame className="text-kimezu-pink shrink-0" size={20} />
                   <div>
                      <h4 className="text-xs font-bold uppercase text-kimezu-title mb-1">Cera</h4>
                      <p className="text-sm text-kimezu-text">{product.specs.wax}</p>
                   </div>
                </div>
                <div className="flex flex-col sm:flex-row items-center sm:items-start gap-2 sm:gap-3">
                   <Scale className="text-kimezu-green shrink-0" size={20} />
                   <div>
                      <h4 className="text-xs font-bold uppercase text-kimezu-title mb-1">Peso</h4>
                      <p className="text-sm text-kimezu-text">{product.specs.weight}</p>
                   </div>
                </div>
                <div className="flex flex-col sm:flex-row items-center sm:items-start gap-2 sm:gap-3">
                   <Star className="text-kimezu-primary shrink-0" size={20} />
                   <div>
                      <h4 className="text-xs font-bold uppercase text-kimezu-title mb-1">Notas</h4>
                      <p className="text-sm text-kimezu-text">{product.specs.notes}</p>
                   </div>
                </div>
             </div>

             {/* Add to Cart Actions */}
             <div className="flex flex-col sm:flex-row gap-4 border-t border-kimezu-card pt-8 justify-center lg:justify-start">
                <div className="flex items-center border border-kimezu-title h-12 w-fit bg-white mx-auto sm:mx-0">
                   <button 
                     onClick={() => setQuantity(Math.max(1, quantity - 1))}
                     className="px-4 hover:bg-stone-100 h-full transition-colors"
                   >
                     <Minus size={16} />
                   </button>
                   <span className="w-12 text-center font-bold text-kimezu-title">{quantity}</span>
                   <button 
                     onClick={() => setQuantity(quantity + 1)}
                     className="px-4 hover:bg-stone-100 h-full transition-colors"
                   >
                     <Plus size={16} />
                   </button>
                </div>
                
                <Button 
                  onClick={handleAddToCart} 
                  className="h-12 flex-1 text-sm md:text-base bg-kimezu-title hover:bg-kimezu-primary text-white"
                >
                   <ShoppingBag size={20} className="mr-2" /> Agregar al Carrito - {formatCOP(product.price * quantity)}
                </Button>
             </div>
          </div>
        </div>

        {/* Reviews Section */}
        <div id="reviews" className="border-t border-kimezu-card pt-16 md:pt-24 max-w-4xl mx-auto">
           <h2 className="font-serif text-3xl text-center text-kimezu-title mb-12">Opiniones de Clientes</h2>
           
           {/* Reviews List */}
           <div className="space-y-8">
              {reviews.map((review) => (
                <div key={review.id} className="bg-white p-6 md:p-8 border border-stone-100 shadow-sm rounded-sm animate-fade-in-up">
                   <div className="flex justify-between items-start mb-4">
                      <div>
                         <div className="flex items-center gap-2 mb-2">
                            <span className="font-bold text-kimezu-title text-lg">{review.user}</span>
                            <span className="bg-green-100 text-green-700 text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider">Compra Verificada</span>
                         </div>
                         <div className="flex text-kimezu-primary mb-1">
                            {[...Array(5)].map((_, i) => (
                               <Star key={i} size={14} fill={i < review.rating ? "currentColor" : "none"} />
                            ))}
                         </div>
                      </div>
                      <span className="text-xs text-stone-400">{review.date}</span>
                   </div>
                   
                   <p className="text-kimezu-text leading-relaxed mb-6">{review.comment}</p>
                   
                   <div className="flex gap-4 border-t border-stone-100 pt-4">
                      <button 
                        onClick={() => handleVote(review.id, 'like')}
                        className={`flex items-center gap-2 text-xs font-bold uppercase tracking-wider transition-colors ${review.userAction === 'like' ? 'text-kimezu-primary' : 'text-stone-400 hover:text-kimezu-title'}`}
                      >
                         <ThumbsUp size={16} fill={review.userAction === 'like' ? "currentColor" : "none"} /> 
                         Útil ({review.likes})
                      </button>
                      <button 
                        onClick={() => handleVote(review.id, 'dislike')}
                        className={`flex items-center gap-2 text-xs font-bold uppercase tracking-wider transition-colors ${review.userAction === 'dislike' ? 'text-red-400' : 'text-stone-400 hover:text-kimezu-title'}`}
                      >
                         <ThumbsDown size={16} fill={review.userAction === 'dislike' ? "currentColor" : "none"} /> 
                         No útil ({review.dislikes})
                      </button>
                   </div>
                </div>
              ))}
           </div>

           {/* Add Review Mockup CTA */}
           <div className="mt-12 text-center">
              <p className="text-kimezu-text mb-4">¿Ya probaste este producto? Cuéntanos tu experiencia.</p>
              <Button variant="outline">Escribir una reseña</Button>
           </div>
        </div>

      </div>
    </div>
  );
};
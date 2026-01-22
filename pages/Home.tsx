import React from 'react';
import { Button } from '../components/Button';
import { ProductCard } from '../components/ProductCard';
import { SectionSeparator } from '../components/SectionSeparator';
import { Product } from '../types';
import { ArrowRight, Star, Leaf, Sparkles, Gift, ShieldCheck, Flame, Heart } from 'lucide-react';
import { Link } from 'react-router-dom';
import { formatCOP } from '../utils/currency';
import { useProducts } from '../context/ProductContext'; // Import Context

export const Home: React.FC = () => {
  const { products, getAssetUrl } = useProducts();

  // Get only 4 bestsellers or fallback to first 4
  const featuredProducts = products.filter(p => p.bestseller).slice(0, 4);
  const displayProducts = featuredProducts.length > 0 ? featuredProducts : products.slice(0, 4);

  return (
    <main className="bg-kimezu-bg">
      {/* Hero Section */}
      {/* DESKTOP CHANGE: Reduced height to lg:h-[60vh] and min-h to 500px to allow compact view */}
      <section className="relative w-full h-auto lg:h-[60vh] min-h-[500px] flex flex-col lg:flex-row bg-kimezu-bg">
        
        {/* Left Side: Text */}
        {/* DESKTOP CHANGE: Width lg:w-[40%] | Adjusted padding to lg:p-10 to fit content in 60vh */}
        <div className="w-full lg:w-[40%] flex items-center justify-center px-6 py-12 lg:p-10 order-1 relative overflow-hidden">
          {/* Subtle Background Pattern */}
          <div className="absolute top-0 left-0 w-full h-full opacity-[0.05] pointer-events-none">
             <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
                <pattern id="pattern" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
                   <circle cx="2" cy="2" r="1" className="fill-kimezu-title" />
                </pattern>
                <rect width="100%" height="100%" fill="url(#pattern)" />
             </svg>
          </div>

          {/* Content Wrapper */}
          <div className="max-w-md text-center lg:text-left animate-fade-in-up relative z-10">
             <div className="inline-flex items-center gap-2 border border-kimezu-green/50 bg-white/50 px-3 py-1 rounded-full mb-4 md:mb-6">
               <span className="w-1.5 h-1.5 rounded-full bg-kimezu-green animate-pulse"></span>
               <span className="text-[9px] font-bold uppercase tracking-[0.2em] text-kimezu-title">
                 Nueva Colección 2026
               </span>
             </div>
             
             {/* Adjusted font sizes and margins for 60vh height */}
             <h1 className="text-4xl md:text-5xl lg:text-5xl xl:text-6xl font-serif text-kimezu-title mb-4 md:mb-6 leading-[1.05]">
               Aromas que <br/>
               <span className="italic text-kimezu-pink relative inline-block">
                 Transforman
                 <svg className="absolute w-full h-3 -bottom-1 left-0 text-kimezu-pink opacity-30" viewBox="0 0 100 10" preserveAspectRatio="none">
                    <path d="M0 5 Q 50 10 100 5" stroke="currentColor" strokeWidth="2" fill="none" />
                 </svg>
               </span>
             </h1>
             <p className="text-kimezu-text text-base md:text-lg mb-6 md:mb-8 leading-relaxed mx-auto lg:mx-0">
               Velas de soja vertidas a mano que convierten tu hogar en un santuario. Diseñadas para pausar el tiempo y despertar los sentidos.
             </p>
             
             {/* MOBILE FIX: Added 'items-center' to ensure buttons are centered in flex-col on mobile */}
             <div className="flex flex-col sm:flex-row gap-4 justify-center items-center lg:justify-start lg:items-start">
                <Link to="/shop">
                  <Button className="min-w-[160px] shadow-xl shadow-kimezu-primary/20">
                    Ver Tienda
                  </Button>
                </Link>
                <Link to="/aromatherapy">
                   <Button variant="outline" className="min-w-[160px]">
                     Descubrir Aromas
                   </Button>
                </Link>
             </div>
          </div>
        </div>

        {/* Right Side: Image */}
        {/* DESKTOP CHANGE: Width lg:w-[60%] */}
        <div className="w-full lg:w-[60%] h-[50vh] md:h-[60vh] lg:h-full relative order-2 overflow-hidden group">
          <div className="absolute inset-0 bg-kimezu-title/5 z-10 group-hover:bg-transparent transition-colors duration-700"></div>
          {/* REMOVED ZOOM ANIMATION: Removed 'transition-transform duration-[3000ms] group-hover:scale-110' */}
          <img 
            src={getAssetUrl('home_hero_fg')}
            alt="Kimezu Vela Artesanal" 
            className="w-full h-full object-cover"
          />
        </div>
      </section>

      {/* Intro Quote */}
      <div className="pt-16 pb-24 text-center bg-white px-4 relative border-b border-kimezu-title/5">
        <div className="max-w-4xl mx-auto animate-fade-in-up">
          <h3 className="font-serif text-3xl md:text-5xl italic text-kimezu-title leading-snug">
            "No vendemos solo velas, diseñamos atmósferas. Cada llama es una invitación a pausar el tiempo."
          </h3>
          <div className="mt-12">
             <Link to="/about" className="text-xs font-bold uppercase tracking-[0.2em] text-kimezu-primary border-b border-kimezu-primary pb-1 hover:text-kimezu-title hover:border-kimezu-title transition-all">
                Conoce nuestra filosofía
             </Link>
          </div>
        </div>
      </div>

      {/* QUALITY & ADVANTAGES SECTION (Replaces Process) */}
      <section className="py-24 bg-kimezu-bg">
        <div className="container mx-auto px-4 md:px-8">
           <div className="text-center mb-16">
             <span className="text-kimezu-pink text-xs font-bold uppercase tracking-widest mb-3 block">¿Por qué Kimezu?</span>
             <h2 className="font-serif text-4xl md:text-5xl text-kimezu-title">Calidad que se Siente</h2>
             <p className="text-kimezu-text mt-4 max-w-2xl mx-auto text-lg">
               Hemos perfeccionado el arte de la cerería para ofrecerte un producto seguro, duradero y respetuoso con el medio ambiente.
             </p>
           </div>

           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {/* Feature 1 */}
              <div className="bg-white p-8 border border-white hover:border-kimezu-primary transition-all duration-300 group hover:shadow-xl">
                 <div className="w-14 h-14 bg-kimezu-green/10 rounded-full flex items-center justify-center mb-6 text-kimezu-green group-hover:bg-kimezu-green group-hover:text-white transition-colors">
                    <Leaf size={28} />
                 </div>
                 <h3 className="font-serif text-xl text-kimezu-title mb-3">100% Cera de Soja</h3>
                 <p className="text-sm text-kimezu-text leading-relaxed">
                    Origen vegetal y renovable. A diferencia de la parafina, no emite toxinas al quemarse y dura hasta un 50% más.
                 </p>
              </div>

              {/* Feature 2 */}
              <div className="bg-white p-8 border border-white hover:border-kimezu-primary transition-all duration-300 group hover:shadow-xl">
                 <div className="w-14 h-14 bg-kimezu-pink/10 rounded-full flex items-center justify-center mb-6 text-kimezu-pink group-hover:bg-kimezu-pink group-hover:text-white transition-colors">
                    <ShieldCheck size={28} />
                 </div>
                 <h3 className="font-serif text-xl text-kimezu-title mb-3">Aromas Seguros</h3>
                 <p className="text-sm text-kimezu-text leading-relaxed">
                    Utilizamos aceites esenciales y fragancias premium libres de ftalatos y parabenos. Seguros para ti y tus mascotas.
                 </p>
              </div>

              {/* Feature 3 */}
              <div className="bg-white p-8 border border-white hover:border-kimezu-primary transition-all duration-300 group hover:shadow-xl">
                 <div className="w-14 h-14 bg-kimezu-primary/10 rounded-full flex items-center justify-center mb-6 text-kimezu-primary group-hover:bg-kimezu-primary group-hover:text-white transition-colors">
                    <Flame size={28} />
                 </div>
                 <h3 className="font-serif text-xl text-kimezu-title mb-3">Mecha Ecológica</h3>
                 <p className="text-sm text-kimezu-text leading-relaxed">
                    Pabilos de algodón trenzado o madera certificada que garantizan un quemado limpio, uniforme y sin humo negro.
                 </p>
              </div>

              {/* Feature 4 */}
              <div className="bg-white p-8 border border-white hover:border-kimezu-primary transition-all duration-300 group hover:shadow-xl">
                 <div className="w-14 h-14 bg-stone-100 rounded-full flex items-center justify-center mb-6 text-stone-600 group-hover:bg-kimezu-title group-hover:text-white transition-colors">
                    <Heart size={28} />
                 </div>
                 <h3 className="font-serif text-xl text-kimezu-title mb-3">Hecho en Colombia</h3>
                 <p className="text-sm text-kimezu-text leading-relaxed">
                    Cada vela es vertida a mano en pequeños lotes, apoyando el comercio local y garantizando la máxima atención al detalle.
                 </p>
              </div>
           </div>
        </div>
      </section>

      {/* CTA to Bundles */}
      <section className="py-24 bg-kimezu-title relative overflow-hidden text-white">
          {/* Decorative background */}
          <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
          
          <div className="container mx-auto px-4 relative z-10 text-center">
             <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <Gift size={32} className="text-kimezu-primary" />
             </div>
             <h2 className="font-serif text-4xl md:text-6xl mb-6">Crea tu Combo Ideal</h2>
             <p className="text-xl text-stone-300 max-w-2xl mx-auto mb-10 font-light">
                Diseña tu propio ritual de aromas. Cuantos más productos agregues, mayor será tu descuento. 
                <br/><span className="text-kimezu-primary font-bold">Hasta un 25% OFF.</span>
             </p>
             <div className="flex justify-center">
                <Link to="/bundles">
                    <Button variant="primary" className="bg-kimezu-primary text-white hover:bg-white hover:text-kimezu-title border-transparent">
                    Armar mi Combo Ahora
                    </Button>
                </Link>
             </div>
          </div>
      </section>

      {/* Bestsellers */}
      <section className="py-24 bg-kimezu-bg relative overflow-hidden">
        {/* Background Text */}
        <div className="absolute top-10 left-0 w-full text-[15rem] font-serif text-white opacity-40 leading-none whitespace-nowrap select-none pointer-events-none -z-10">
           FAVORITOS
        </div>

        <div className="container mx-auto px-4 md:px-8 relative">
          <div className="flex justify-between items-end mb-16">
            <div>
               <span className="text-kimezu-pink text-xs font-bold uppercase tracking-widest mb-2 block">Curaduría Kimezu</span>
               <h2 className="font-serif text-4xl text-kimezu-title">Más Deseados</h2>
            </div>
            <div className="hidden md:flex gap-2">
               <button className="p-3 border border-kimezu-title/20 hover:bg-white transition-colors rounded-full"><ArrowRight className="rotate-180" size={20}/></button>
               <button className="p-3 border border-kimezu-title/20 hover:bg-white transition-colors rounded-full"><ArrowRight size={20}/></button>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {displayProducts.map((product, idx) => (
              <div key={product.id} className={`${idx % 2 !== 0 ? 'md:mt-12' : ''} transition-all duration-500`}>
                 <ProductCard product={product} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Collage Section (About) */}
      <section className="py-32 bg-white">
         <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row gap-8 items-center justify-center">
               
               {/* Left Collage Images */}
               <div className="w-full md:w-1/2 relative h-[500px] md:h-[600px]">
                  {/* Main Image */}
                  <div className="absolute top-0 left-0 w-4/5 h-4/5 z-10">
                     <img src={getAssetUrl('about_collage_1')} className="w-full h-full object-cover" alt="Workshop" />
                  </div>
                  {/* Secondary Image */}
                  <div className="absolute bottom-0 right-0 w-3/5 h-3/5 z-20 border-8 border-white shadow-xl">
                     <img src={getAssetUrl('about_collage_2')} className="w-full h-full object-cover" alt="Ingredients" />
                  </div>
               </div>

               {/* Right Text - Centered on Mobile */}
               <div className="w-full md:w-1/2 md:pl-16 mt-12 md:mt-0 text-center md:text-left">
                  <div className="max-w-md mx-auto md:mx-0">
                     <SectionSeparator icon="flower" className="justify-center md:justify-start mb-6" />
                     <h2 className="font-serif text-4xl md:text-5xl text-kimezu-title mb-6">Artesanía Pura</h2>
                     <p className="text-kimezu-text text-lg leading-relaxed mb-8">
                        Cada vela es un proceso lento y deliberado. Utilizamos cera de soja 100% biodegradable y pabilos de algodón sin plomo. Sin atajos, sin plásticos, solo ingredientes que respetan tu hogar y el planeta.
                     </p>
                     
                     <div className="grid grid-cols-2 gap-8 mb-8 border-t border-kimezu-bg pt-8">
                        <div>
                           <Leaf className="text-kimezu-green mb-3 mx-auto md:mx-0" size={24} />
                           <h4 className="font-bold text-kimezu-title text-sm uppercase">Eco-Friendly</h4>
                        </div>
                        <div>
                           <Sparkles className="text-kimezu-pink mb-3 mx-auto md:mx-0" size={24} />
                           <h4 className="font-bold text-kimezu-title text-sm uppercase">Hecho a Mano</h4>
                        </div>
                     </div>

                     <div className="flex justify-center md:justify-start">
                        <Link to="/aromatherapy">
                            <Button variant="secondary">Descubre el Proceso</Button>
                        </Link>
                     </div>
                  </div>
               </div>

            </div>
         </div>
      </section>
    </main>
  );
};
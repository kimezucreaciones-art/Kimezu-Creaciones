import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../components/Button';
import { SectionSeparator } from '../components/SectionSeparator';
import { Wind, Moon, Sun, ArrowRight, Heart, Droplets, Clock, Smartphone, Coffee } from 'lucide-react';
import { useProducts } from '../context/ProductContext';

export const Aromatherapy: React.FC = () => {
   const { getAssetUrl } = useProducts();

  return (
    <div className="bg-kimezu-bg">
      {/* Hero Section - Reduced height on mobile */}
      <div className="relative h-[50vh] md:h-[80vh] overflow-hidden">
        <img 
           src={getAssetUrl('aromatherapy_hero')}
           alt="Aromatherapy Mood" 
           className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="absolute inset-0 flex items-center justify-center">
           <div className="bg-white/90 backdrop-blur-sm p-6 md:p-12 max-w-3xl text-center mx-4 border-2 border-white/50">
              <span className="text-[10px] md:text-xs font-bold uppercase tracking-[0.3em] text-kimezu-primary mb-3 md:mb-6 block">Ciencia & Alma</span>
              <h1 className="text-3xl md:text-7xl font-serif text-kimezu-title mb-3 md:mb-6">
                 Aromaterapia
              </h1>
              <p className="text-sm md:text-lg text-kimezu-text leading-relaxed">
                 Restaurando el equilibrio entre mente y cuerpo a través de la esencia pura de la naturaleza.
              </p>
           </div>
        </div>
      </div>

      {/* Intro Text - Reduced padding on mobile */}
      <section className="py-12 md:py-24 bg-white">
         <div className="container mx-auto px-4 max-w-3xl text-center">
            <SectionSeparator icon="flower" />
            <h2 className="font-serif text-2xl md:text-4xl text-kimezu-title mb-6 md:mb-8 leading-relaxed">
               "El olfato es el sentido más directo a la emoción. Un aroma puede cambiar un día entero."
            </h2>
            <p className="text-kimezu-text text-base md:text-lg">
               Utilizamos aceites esenciales extraídos de flores, hojas, raíces y maderas. 
               Sin fragancias sintéticas que enmascaran, solo botánica pura que transforma.
            </p>
         </div>
      </section>

      {/* Benefits - Editorial Grid */}
      <section className="py-12 md:py-24 bg-kimezu-bg">
         <div className="container mx-auto px-4 md:px-8">
            <div className="text-center mb-10 md:mb-16">
               <h2 className="text-3xl md:text-4xl font-serif text-kimezu-title">Beneficios Esenciales</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
               {/* Card 1 */}
               <div className="bg-white p-10 relative overflow-hidden group hover:-translate-y-2 transition-transform duration-500">
                  <span className="absolute -top-4 -right-4 text-9xl font-serif text-kimezu-bg text-opacity-50 group-hover:text-kimezu-pink/20 transition-colors">1</span>
                  <div className="relative z-10 text-center">
                     <div className="w-12 h-12 bg-kimezu-pink/20 rounded-full flex items-center justify-center mb-6 text-kimezu-title mx-auto">
                        <Moon size={24} />
                     </div>
                     <h3 className="text-2xl font-serif text-kimezu-title mb-4">Sueño Profundo</h3>
                     <p className="text-kimezu-text leading-relaxed mb-6">
                        La Lavanda y la Manzanilla reducen el cortisol, preparando tu sistema nervioso para un descanso reparador y sin interrupciones.
                     </p>
                     <div className="w-full h-[1px] bg-kimezu-bg mb-4"></div>
                     <span className="text-xs font-bold uppercase tracking-widest text-kimezu-primary">Recomendado: Vela Noche</span>
                  </div>
               </div>

               {/* Card 2 */}
               <div className="bg-white p-10 relative overflow-hidden group hover:-translate-y-2 transition-transform duration-500 mt-0 md:-mt-8 shadow-xl border-t-4 border-kimezu-primary">
                  <span className="absolute -top-4 -right-4 text-9xl font-serif text-kimezu-bg text-opacity-50 group-hover:text-kimezu-primary/20 transition-colors">2</span>
                  <div className="relative z-10 text-center">
                     <div className="w-12 h-12 bg-kimezu-green/20 rounded-full flex items-center justify-center mb-6 text-kimezu-title mx-auto">
                        <Wind size={24} />
                     </div>
                     <h3 className="text-2xl font-serif text-kimezu-title mb-4">Claridad Mental</h3>
                     <p className="text-kimezu-text leading-relaxed mb-6">
                        El Eucalipto y el Romero oxigenan la mente. Perfectos para momentos de trabajo creativo o cuando necesitas disipar la niebla mental.
                     </p>
                     <div className="w-full h-[1px] bg-kimezu-bg mb-4"></div>
                     <span className="text-xs font-bold uppercase tracking-widest text-kimezu-primary">Recomendado: Vela Enfoque</span>
                  </div>
               </div>

               {/* Card 3 */}
               <div className="bg-white p-10 relative overflow-hidden group hover:-translate-y-2 transition-transform duration-500">
                  <span className="absolute -top-4 -right-4 text-9xl font-serif text-kimezu-bg text-opacity-50 group-hover:text-kimezu-green/20 transition-colors">3</span>
                  <div className="relative z-10 text-center">
                     <div className="w-12 h-12 bg-kimezu-primary/20 rounded-full flex items-center justify-center mb-6 text-kimezu-title mx-auto">
                        <Sun size={24} />
                     </div>
                     <h3 className="text-2xl font-serif text-kimezu-title mb-4">Energía Vital</h3>
                     <p className="text-kimezu-text leading-relaxed mb-6">
                        Los cítricos vibrantes como la Bergamota elevan el ánimo instantáneamente, combatiendo la fatiga y aportando luz a días grises.
                     </p>
                     <div className="w-full h-[1px] bg-kimezu-bg mb-4"></div>
                     <span className="text-xs font-bold uppercase tracking-widest text-kimezu-primary">Recomendado: Vela Solar</span>
                  </div>
               </div>
            </div>
         </div>
      </section>

      {/* NEW SECTION: SLEEP ROUTINE (Night Aesthetics) */}
      <section className="py-24 bg-kimezu-title text-stone-200">
         <div className="container mx-auto px-4 md:px-8">
             <div className="flex flex-col lg:flex-row gap-16 items-center">
                 
                 {/* Text Content - Centered on Mobile */}
                 <div className="lg:w-1/2 text-center lg:text-left">
                    <span className="text-kimezu-pink text-xs font-bold uppercase tracking-widest mb-4 block">Ritual Nocturno</span>
                    <h2 className="text-4xl md:text-5xl font-serif text-white mb-8">
                       Rutina para un <br/><span className="italic text-kimezu-primary">Sueño Reparador</span>
                    </h2>
                    {/* Updated font weight for consistency */}
                    <p className="text-lg opacity-90 mb-10 leading-relaxed font-sans">
                       En un mundo que nunca se apaga, crear una transición hacia el sueño es vital. 
                       La luz de las velas imita el atardecer, indicando a tu cerebro que es hora de producir melatonina.
                    </p>

                    <div className="space-y-8">
                       {/* Step 1 */}
                       <div className="flex flex-col lg:flex-row items-center lg:items-start gap-6">
                          <div className="flex-shrink-0 w-12 h-12 bg-white/10 rounded-full flex items-center justify-center">
                             <Clock className="text-kimezu-primary" size={24} />
                          </div>
                          <div>
                             <h4 className="text-xl font-serif text-white mb-2">30 Minutos Antes</h4>
                             <p className="text-sm opacity-80">Enciende tu vela "Noche Profunda" media hora antes de ir a la cama. Esto permite que los aceites esenciales (Lavanda, Cedro) saturen el ambiente.</p>
                          </div>
                       </div>

                       {/* Step 2 */}
                       <div className="flex flex-col lg:flex-row items-center lg:items-start gap-6">
                          <div className="flex-shrink-0 w-12 h-12 bg-white/10 rounded-full flex items-center justify-center">
                             <Smartphone className="text-kimezu-pink" size={24} />
                          </div>
                          <div>
                             <h4 className="text-xl font-serif text-white mb-2">Desconexión Digital</h4>
                             <p className="text-sm opacity-80">Apaga pantallas. La luz azul inhibe el sueño. Deja que la luz tenue de la vela sea tu única iluminación mientras lees o meditas.</p>
                          </div>
                       </div>

                       {/* Step 3 */}
                       <div className="flex flex-col lg:flex-row items-center lg:items-start gap-6">
                          <div className="flex-shrink-0 w-12 h-12 bg-white/10 rounded-full flex items-center justify-center">
                             <Coffee className="text-kimezu-green" size={24} />
                          </div>
                          <div>
                             <h4 className="text-xl font-serif text-white mb-2">Respiración Consciente</h4>
                             <p className="text-sm opacity-80">Siéntate cerca de la vela (sin tocarla). Inhala contando hasta 4, retén 4, exhala 6. Visualiza el aroma calmando cada músculo.</p>
                          </div>
                       </div>
                    </div>
                    
                    <div className="mt-12 p-4 border border-kimezu-primary/30 rounded bg-kimezu-primary/5 text-sm text-center italic">
                       "Recuerda siempre apagar la vela antes de dormirte. El aroma permanecerá."
                    </div>
                 </div>

                 {/* Image Content - Using Dynamic Asset */}
                 <div className="lg:w-1/2 relative">
                    <div className="absolute top-0 right-0 w-full h-full border border-white/10 translate-x-4 -translate-y-4"></div>
                    <img 
                       src={getAssetUrl('aromatherapy_night')}
                       alt="Night routine candle" 
                       className="w-full h-[600px] object-cover shadow-2xl grayscale-[30%] hover:grayscale-0 transition-all duration-700" 
                    />
                    <div className="absolute bottom-10 -left-10 bg-kimezu-bg text-kimezu-title p-6 shadow-xl max-w-xs hidden md:block">
                       <p className="font-serif text-lg italic">"El descanso no es un lujo, es una necesidad biológica que honramos."</p>
                    </div>
                 </div>
             </div>
         </div>
      </section>

      {/* Ingredient Spotlight */}
      <section className="py-24 bg-white">
         <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row items-center gap-12">
               {/* Using Dynamic Asset */}
               <div className="w-full md:w-1/2">
                  <img src={getAssetUrl('aromatherapy_ingredient')} alt="Ingredients" className="w-full h-auto shadow-2xl border border-kimezu-bg p-2" />
               </div>
               
               {/* Centered on Mobile */}
               <div className="w-full md:w-1/2 text-center md:text-left">
                  <span className="text-kimezu-primary text-xs font-bold uppercase tracking-widest mb-4 block">Ingrediente Destacado</span>
                  <h2 className="text-4xl md:text-5xl font-serif text-kimezu-title mb-6">Eucalipto Azul</h2>
                  {/* Updated font weight for consistency */}
                  <p className="text-lg text-kimezu-text mb-8 leading-relaxed font-sans">
                     Recolectado de manera sostenible. Su perfil aromático es fresco, alcanforado y ligeramente dulce. 
                     Es conocido por sus propiedades purificadoras del aire y su capacidad para facilitar la respiración profunda.
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                     <div className="flex items-center justify-center md:justify-start gap-3">
                        <Droplets className="text-kimezu-primary" />
                        <span className="text-sm font-bold uppercase tracking-wider text-kimezu-title">Destilación al vapor</span>
                     </div>
                     <div className="flex items-center justify-center md:justify-start gap-3">
                        <Heart className="text-kimezu-primary" />
                        <span className="text-sm font-bold uppercase tracking-wider text-kimezu-title">Origen Ético</span>
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </section>

      {/* Final CTA - Button Centered Fix */}
      <div className="py-24 bg-kimezu-bg px-4">
         <div className="max-w-2xl mx-auto text-center">
            <SectionSeparator icon="diamond" />
            <h2 className="text-4xl md:text-5xl font-serif text-kimezu-title mb-6">
               ¿Listo para transformar tu espacio?
            </h2>
            <p className="text-lg text-kimezu-text mb-10">
               Explora nuestra colección de aromaterapia y encuentra tu ritual perfecto.
            </p>
            
            {/* Centering Wrapper Fix */}
            <div className="flex justify-center w-full">
               <Link to="/shop">
                  <Button variant="secondary" className="shadow-xl shadow-kimezu-green/20 px-12 py-4 text-sm">
                     Conócenos y Compra Ahora <ArrowRight size={18} className="ml-2" />
                  </Button>
               </Link>
            </div>
         </div>
      </div>
    </div>
  );
};
import React from 'react';
import { Sparkles, Flame, Droplets, Heart, Leaf, Wind } from 'lucide-react';
import { SectionSeparator } from '../components/SectionSeparator';
import { Button } from '../components/Button';
import { Link } from 'react-router-dom';
import { useProducts } from '../context/ProductContext';

export const About: React.FC = () => {
  const { getAssetUrl } = useProducts();

  return (
    <div className="bg-kimezu-bg overflow-x-hidden">

      {/* Hero Section - Compact & Closer to Banner */}
      <section className="relative h-[50vh] md:h-[60vh] flex items-center justify-center overflow-hidden">
        {/* Background Overlay with Gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-kimezu-bg via-white/50 to-kimezu-bg z-0"></div>
        {/* Animated Orbs */}
        <div className="absolute top-10 left-10 w-64 h-64 bg-kimezu-pink/20 rounded-full blur-3xl animate-pulse-slow"></div>
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-kimezu-green/20 rounded-full blur-3xl animate-pulse-slow delay-1000"></div>

        <div className="relative z-10 text-center max-w-4xl px-6 animate-fade-in-up mt-8">
          <div className="inline-flex items-center gap-2 border border-kimezu-primary/30 bg-white/40 backdrop-blur-sm px-4 py-1.5 rounded-full mb-6 shadow-sm">
            <Sparkles size={14} className="text-kimezu-primary" />
            <span className="text-kimezu-title text-[10px] font-bold uppercase tracking-[0.3em]">Filosofía Kimezu</span>
          </div>

          <h1 className="font-serif text-5xl md:text-7xl text-kimezu-title mb-6 leading-none">
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-kimezu-title via-kimezu-primary to-kimezu-title">Alquimia</span>
            <span className="italic block font-light mt-2 text-4xl md:text-6xl text-kimezu-text">de Luz & Energía</span>
          </h1>

          <p className="text-lg md:text-xl text-kimezu-text/90 max-w-2xl mx-auto leading-relaxed">
            Donde la artesanía se encuentra con el espíritu.
          </p>
        </div>
      </section>

      {/* 1. Bento Grid - Redesigned to be less text-heavy on the left */}
      <section className="py-12 px-4 container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-6xl mx-auto">

          {/* Main Card: Fire/Transmutation - Reduced width to 50% (md:col-span-1) */}
          <div className="bg-white p-8 md:p-12 rounded-sm shadow-xl shadow-kimezu-title/5 border-l-4 border-kimezu-pink relative overflow-hidden group hover:-translate-y-1 transition-transform duration-500">
            <div className="absolute top-0 right-0 w-64 h-64 bg-kimezu-pink/5 rounded-full -translate-y-1/2 translate-x-1/2"></div>
            <div className="relative z-10">
              <Flame className="w-12 h-12 text-kimezu-pink mb-6" strokeWidth={1} />
              <h2 className="font-serif text-3xl md:text-4xl text-kimezu-title mb-4">El Fuego Transmuta</h2>
              <p className="text-kimezu-text text-lg leading-relaxed">
                Encender una vela es un acto sagrado de limpieza. El fuego consume las densidades del ambiente y las transforma en luz.
              </p>
            </div>
          </div>

          {/* Side Card: Aromatherapy */}
          <div className="bg-kimezu-green/10 p-8 md:p-10 rounded-sm border border-kimezu-green/20 flex flex-col justify-center relative overflow-hidden group hover:-translate-y-1 transition-transform duration-500">
            <Wind className="w-10 h-10 text-kimezu-green mb-4" strokeWidth={1.5} />
            <h3 className="font-serif text-2xl text-kimezu-title mb-2">Aire Puro</h3>
            <p className="text-sm text-kimezu-text leading-relaxed">
              Aceites esenciales botánicos que entran directamente al sistema límbico, calmando la ansiedad y elevando el espíritu instantáneamente.
            </p>
            <Leaf className="absolute -bottom-4 -right-4 w-32 h-32 text-kimezu-green/10" />
          </div>

          {/* Artisanal Card */}
          <div className="bg-kimezu-primary/5 p-8 md:p-10 rounded-sm border-t-4 border-kimezu-primary relative group hover:-translate-y-1 transition-transform duration-500">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-sm">
                <Heart className="w-6 h-6 text-kimezu-primary" fill="currentColor" />
              </div>
              <h3 className="font-serif text-xl text-kimezu-title">Intención Artesanal</h3>
            </div>
            <p className="text-sm text-kimezu-text">
              Las máquinas crean objetos; las manos transfieren energía. Cada vela es vertida intencionando paz.
            </p>
          </div>

          {/* Image Tile */}
          <div className="h-64 md:h-auto relative rounded-sm overflow-hidden group shadow-lg">
            <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-700 z-10"></div>
            <img
              src={getAssetUrl('about_collage_1')}
              alt="Ritual"
              className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-[2s]"
            />
            <div className="absolute bottom-6 left-6 z-20 text-white">
              <span className="text-xs font-bold uppercase tracking-widest bg-kimezu-primary px-3 py-1 rounded-full">Rituales</span>
            </div>
          </div>

        </div>
      </section>

      {/* 2. Interactive "Values" Strip - No Emojis, Elegant Icons */}
      <section className="py-16 bg-white border-y border-kimezu-primary/10">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center max-w-5xl mx-auto">
            {[
              { label: "100% Vegano", Icon: Leaf },
              { label: "Hecho a Mano", Icon: Heart },
              { label: "Sin Tóxicos", Icon: Droplets },
              { label: "Energía Limpia", Icon: Sparkles }
            ].map((item, idx) => (
              <div key={idx} className="flex flex-col items-center gap-4 group cursor-default">
                <div className="w-16 h-16 rounded-full bg-stone-50 group-hover:bg-kimezu-primary/10 flex items-center justify-center transition-colors duration-500">
                  <item.Icon className="w-8 h-8 text-kimezu-primary group-hover:scale-110 transition-transform duration-500" strokeWidth={1} />
                </div>
                <span className="font-serif text-kimezu-title text-sm uppercase tracking-widest border-b border-transparent group-hover:border-kimezu-primary transition-all pb-1">
                  {item.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. The Invitation (CTA) - Fixed Button Visibility */}
      <section className="py-20 md:py-32 relative overflow-hidden">
        <div className="absolute inset-0 bg-kimezu-title"></div>
        {/* Gold accent */}
        <div className="absolute top-0 right-0 w-full h-full bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-kimezu-primary/20 via-transparent to-transparent"></div>

        <div className="container mx-auto px-6 relative z-10 text-center text-white flex flex-col items-center">
          <h2 className="font-serif text-4xl md:text-6xl mb-8 leading-tight">
            Tu hogar es tu templo. <br />
            <span className="italic text-kimezu-primary">Hónralo.</span>
          </h2>
          <p className="text-lg text-white/70 mb-12 max-w-xl mx-auto font-light">
            Descubre qué vela resuena con tu energía actual y comienza tu ritual de restauración.
          </p>

          <Link to="/shop">
            <Button className="bg-kimezu-primary text-white hover:bg-white hover:text-kimezu-title border-2 border-transparent px-10 py-4 shadow-xl text-sm tracking-widest uppercase">
              Ver Colección Completa
            </Button>
          </Link>
        </div>
      </section>

    </div>
  );
};
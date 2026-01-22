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

      {/* 1. Triangular Layout & Deep Narrative */}
      <section className="py-16 px-4 container mx-auto">

        {/* The Triangle: Fire & Air Top, Hand Bottom */}
        <div className="max-w-5xl mx-auto mb-20 space-y-6">

          {/* Top Row: Fire & Air */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Fire Card (Red/Pink) */}
            <div className="bg-white p-8 md:p-10 rounded-sm shadow-lg shadow-kimezu-pink/5 border-l-4 border-kimezu-pink relative overflow-hidden group hover:-translate-y-1 transition-transform duration-500">
              <Flame className="w-10 h-10 text-kimezu-pink mb-4" strokeWidth={1} />
              <h2 className="font-serif text-2xl text-kimezu-title mb-3">El Fuego Transmuta</h2>
              <p className="text-kimezu-text text-sm leading-relaxed">
                Encender una vela es un acto sagrado. El fuego consume las densidades y transforma la pesadez en luz, limpiando tu espacio vibracional.
              </p>
            </div>

            {/* Air Card (Green) */}
            <div className="bg-kimezu-green/10 p-8 md:p-10 rounded-sm border-t-4 border-kimezu-green relative overflow-hidden group hover:-translate-y-1 transition-transform duration-500">
              <Wind className="w-10 h-10 text-kimezu-green mb-4" strokeWidth={1.5} />
              <h3 className="font-serif text-2xl text-kimezu-title mb-3">Aire Puro</h3>
              <p className="text-sm text-kimezu-text leading-relaxed">
                Aceites que calman el sistema límbico, disipando la ansiedad y elevando tu frecuencia espiritual al instante.
              </p>
            </div>
          </div>

          {/* Bottom Point: Artisanal (Yellow/Gold) */}
          <div className="max-w-2xl mx-auto">
            <div className="bg-[#FDFBF7] p-8 rounded-sm border-b-4 border-kimezu-primary shadow-lg shadow-kimezu-primary/5 text-center group hover:-translate-y-1 transition-transform duration-500">
              <div className="inline-flex p-3 bg-white rounded-full shadow-sm mb-4">
                <Heart className="w-6 h-6 text-kimezu-primary" fill="currentColor" />
              </div>
              <h3 className="font-serif text-xl text-kimezu-title mb-2">Intención Artesanal</h3>
              <p className="text-sm text-kimezu-text max-w-lg mx-auto">
                Las manos transfieren energía. Cada vela es vertida intencionando paz, creando un objeto con alma propia.
              </p>
            </div>
          </div>
        </div>

        {/* 2. New Section: Restoration & Prosperity */}
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-12 items-center">

          {/* Left: Deep Text */}
          <div className="md:col-span-7 text-left pl-4 md:pl-12 border-l-2 border-kimezu-primary/20">
            <span className="text-kimezu-pink text-xs font-bold uppercase tracking-widest mb-4 block">Renacimiento Interior</span>
            <h2 className="font-serif text-3xl md:text-5xl text-kimezu-title mb-6 leading-tight">
              Restauración para el <br />
              <span className="italic text-kimezu-primary">Alma Agotada</span>
            </h2>
            <div className="space-y-6 text-kimezu-text text-lg font-light leading-relaxed">
              <p>
                Vivimos tiempos de alto estrés y desconexión. Cuando has pasado por una situación emocional fuerte o sientes que el peso del mundo te apaga, tu hogar debe convertirse en tu santuario de recarga.
              </p>
              <p>
                Nuestros aromas no son casualidad; son herramientas vibracionales. Al encenderlos, invocas la <strong>Prosperidad</strong> que nace de la claridad mental y el merecimiento. Restaurar tu energía no es un lujo, es el primer paso para manifestar la vida que deseas.
              </p>
            </div>
          </div>

          {/* Right: Smaller Photo */}
          <div className="md:col-span-5 flex justify-center md:justify-end">
            <div className="relative w-72 h-80 rounded-t-full overflow-hidden border-4 border-white shadow-2xl rotate-2 hover:rotate-0 transition-all duration-700">
              <img
                src={getAssetUrl('about_collage_1')}
                alt="Restauración Energética"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-kimezu-primary/20 to-transparent"></div>
            </div>
          </div>

        </div>
      </section>

      {/* 3. Interactive "Values" Strip */}
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

      {/* 4. The Invitation (CTA) */}
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
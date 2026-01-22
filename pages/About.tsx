import React from 'react';
import { Sparkles, Flame, Droplets, Heart } from 'lucide-react';
import { SectionSeparator } from '../components/SectionSeparator';
import { Button } from '../components/Button';
import { Link } from 'react-router-dom';
import { useProducts } from '../context/ProductContext';

export const About: React.FC = () => {
  const { getAssetUrl } = useProducts();

  return (
    <div className="bg-stone-50 overflow-hidden">

      {/* Hero Section - Mystical Entrance */}
      <section className="relative h-[90vh] flex items-center justify-center overflow-hidden">
        {/* Background Overlay */}
        <div className="absolute inset-0 bg-kimezu-bg opacity-90 z-0"></div>
        {/* Subtle Background Pattern */}
        <div className="absolute inset-0 opacity-[0.03] z-0 pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle, #D4AF37 1px, transparent 1px)', backgroundSize: '40px 40px' }}></div>

        <div className="relative z-10 text-center max-w-4xl px-6 animate-fade-in-up">
          <span className="text-kimezu-primary/80 text-xs md:text-sm font-bold uppercase tracking-[0.4em] mb-6 block animate-pulse-slow">
            Filosofía Kimezu
          </span>
          <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl text-kimezu-title mb-8 leading-tight">
            Alquimia de <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-kimezu-primary via-[#D4AF37] to-kimezu-primary italic">Luz & Energía</span>
          </h1>
          <p className="text-lg md:text-2xl text-stone-600 font-light max-w-2xl mx-auto leading-relaxed">
            No solo iluminamos espacios. Restauramos el equilibrio invisible que habita en ellos.
          </p>

          <div className="mt-12 opacity-50 animate-bounce">
            <span className="text-kimezu-primary text-xl">↓</span>
          </div>
        </div>
      </section>

      {/* 1. The Fire Element: Limpieza Energética */}
      <section className="py-24 md:py-40 relative">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row items-center gap-16 md:gap-24">
            {/* Left: Visual Concept */}
            <div className="w-full md:w-1/2 relative group">
              <div className="absolute inset-0 bg-kimezu-primary/10 -rotate-3 rounded-full blur-3xl opacity-40 group-hover:opacity-60 transition-opacity duration-1000"></div>
              <img
                src={getAssetUrl('about_collage_1')}
                alt="Candle Flame"
                className="relative w-full h-[600px] object-cover rounded-sm shadow-2xl grayscale-[20%] group-hover:grayscale-0 transition-all duration-700"
              />
              <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-white p-4 flex items-center justify-center rounded-full shadow-lg animate-spin-slow">
                <svg viewBox="0 0 100 100" className="w-full h-full fill-kimezu-title text-[10px] uppercase font-bold tracking-widest">
                  <path id="circlePath" d="M 50, 50 m -37, 0 a 37,37 0 1,1 74,0 a 37,37 0 1,1 -74,0" fill="transparent" />
                  <text>
                    <textPath xlinkHref="#circlePath">
                      Transmutar • Renovar • Purificar •
                    </textPath>
                  </text>
                </svg>
                <Flame className="absolute text-kimezu-primary w-8 h-8" fill="currentColor" />
              </div>
            </div>

            {/* Right: Narrative */}
            <div className="w-full md:w-1/2">
              <SectionSeparator icon="diamond" className="justify-start mb-8 opacity-40" />
              <h2 className="font-serif text-4xl md:text-6xl text-kimezu-title mb-8 leading-tight">
                El Fuego Como <br /><span className="italic text-stone-400">Transmutador</span>
              </h2>
              <p className="text-lg text-stone-600 mb-8 leading-relaxed font-light">
                Desde tiempos ancestrales, el fuego ha sido el centro de todo ritual sagrado. No es solo calor o luz; es el elemento capaz de transformar la materia en energía.
              </p>
              <p className="text-lg text-stone-600 mb-8 leading-relaxed font-light">
                Al encender una vela Kimezu, no solo estás decorando. Estás activando un pequeño vórtice de limpieza. La llama quema las energías estancadas, las pesadeces del día a día, y las devuelve al universo transformadas en luz.
              </p>
              <div className="flex items-center gap-4 text-kimezu-title/80 font-serif italic text-xl border-l-4 border-kimezu-primary pl-6 py-2">
                "Donde hay luz consciente, la sombra no permanece."
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Aromaterapia: Restauración del Alma */}
      <section className="py-24 bg-kimezu-title text-stone-300 relative overflow-hidden">
        {/* Background accent */}
        <div className="absolute top-0 right-0 w-1/2 h-full bg-white/5 skew-x-12 transform origin-top-right"></div>

        <div className="container mx-auto px-6 relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-20 animate-fade-in">
            <span className="text-kimezu-green text-xs font-bold uppercase tracking-widest mb-4 block">Medicina Invisible</span>
            <h2 className="font-serif text-4xl md:text-6xl text-white mb-6">Restauración Emocional</h2>
            <p className="text-lg opacity-80 font-light">
              El olfato es el único sentido conectado directamente al sistema límbico, el hogar de nuestras emociones y memorias. Un aroma no se piensa, se siente.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { icon: Droplets, title: "Calma Mental", desc: "Notas como la Lavanda y el Sándalo bajan las revoluciones cerebrales, permitiendo que el silencio interior emerja." },
              { icon: Sparkles, title: "Elevación Vibracional", desc: "Cítricos y mentas que disipan la niebla mental y elevan tu frecuencia energética instantáneamente." },
              { icon: Heart, title: "Conexión Interior", desc: "Aromas terrosos y maderas que te enraízan, recordándote tu conexión inquebrantable con la tierra." }
            ].map((item, idx) => (
              <div key={idx} className="bg-white/5 backdrop-blur-sm p-10 border border-white/10 hover:bg-white/10 transition-all duration-500 group">
                <item.icon className="w-12 h-12 text-kimezu-primary mb-6 group-hover:scale-110 transition-transform duration-500" strokeWidth={1} />
                <h3 className="font-serif text-2xl text-white mb-4">{item.title}</h3>
                <p className="opacity-70 leading-relaxed font-light">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. The Hands: Artisanal Intention */}
      <section className="py-24 md:py-40 bg-[#Fdfbf7]">
        <div className="container mx-auto px-6">
          <div className="flex flex-col-reverse md:flex-row items-center gap-16 md:gap-24">

            {/* Content */}
            <div className="w-full md:w-1/2">
              <SectionSeparator icon="flower" className="justify-start mb-8 opacity-40" />
              <h2 className="font-serif text-4xl md:text-6xl text-kimezu-title mb-8 leading-tight">
                La Intención <br /><span className="italic text-kimezu-primary">del Artesano</span>
              </h2>
              <p className="text-lg text-stone-600 mb-6 leading-relaxed font-light">
                En un mundo industrializado, creemos que la energía de las manos creadoras permanece en el objeto. Una máquina puede hacer mil velas por minuto, pero ninguna tendrá alma.
              </p>
              <p className="text-lg text-stone-600 mb-10 leading-relaxed font-light">
                Cada vela Kimezu es vertida a mano en un estado de presencia y calma. Intencionamos cada lote para que, al llegar a tu hogar, no solo lleve cera y pabilo, sino una vibración de paz y cuidado genuino.
              </p>

              <div className="grid grid-cols-2 gap-8">
                <div>
                  <span className="block text-4xl font-serif text-kimezu-title mb-2">100%</span>
                  <span className="text-xs font-bold uppercase tracking-widest text-stone-500">Cera de Soja</span>
                </div>
                <div>
                  <span className="block text-4xl font-serif text-kimezu-title mb-2">0%</span>
                  <span className="text-xs font-bold uppercase tracking-widest text-stone-500">Tóxicos</span>
                </div>
              </div>
            </div>

            {/* Image Grid */}
            <div className="w-full md:w-1/2 grid grid-cols-2 gap-4">
              <div className="space-y-4 mt-8">
                <img src="https://images.unsplash.com/photo-1602825484826-b333a921d017?auto=format&fit=crop&q=80&w=600" className="w-full h-64 object-cover rounded-sm grayscale hover:grayscale-0 transition-all duration-700" alt="Process 1" />
                <img src="https://images.unsplash.com/photo-1603006905003-be475563bc59?auto=format&fit=crop&q=80&w=600" className="w-full h-40 object-cover rounded-sm grayscale hover:grayscale-0 transition-all duration-700" alt="Process 2" />
              </div>
              <div className="space-y-4">
                <img src="https://images.unsplash.com/photo-1596436662444-233c09f872d8?auto=format&fit=crop&q=80&w=600" className="w-full h-40 object-cover rounded-sm grayscale hover:grayscale-0 transition-all duration-700" alt="Process 3" />
                <img src="https://images.unsplash.com/photo-1608146797743-398b188c0394?auto=format&fit=crop&q=80&w=600" className="w-full h-64 object-cover rounded-sm grayscale hover:grayscale-0 transition-all duration-700" alt="Process 4" />
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Footer CTA */}
      <section className="py-32 text-center bg-white relative">
        <div className="container mx-auto px-6 relative z-10">
          <h2 className="font-serif text-4xl md:text-5xl text-kimezu-title mb-8">
            Empieza tu Ritual
          </h2>
          <p className="text-xl text-stone-500 font-light mb-12 max-w-xl mx-auto">
            Permite que la luz transforme tu espacio y tu energía hoy mismo.
          </p>
          <Link to="/shop">
            <Button className="px-12 py-5 text-sm shadow-xl shadow-kimezu-primary/20 hover:shadow-2xl transition-all hover:-translate-y-1">
              Explorar Colección <Sparkles className="inline-block ml-2 w-4 h-4" />
            </Button>
          </Link>
        </div>
      </section>

    </div>
  );
};
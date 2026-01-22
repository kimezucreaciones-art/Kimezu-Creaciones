import React from 'react';

export const About: React.FC = () => {
  return (
    <div className="pt-20 md:pt-32 pb-24 bg-kimezu-bg">
      <div className="container mx-auto px-4 md:px-8">
        <div className="max-w-4xl mx-auto text-center mb-20">
          <span className="text-xs font-bold uppercase tracking-widest text-kimezu-green mb-4 block">Nuestra Esencia</span>
          <h1 className="text-4xl md:text-6xl font-serif text-kimezu-title mb-8">Artesanía y Pasión</h1>
          <p className="text-lg text-kimezu-text leading-relaxed font-light">
            Kimezu Creaciones nació del deseo de conectar con la naturaleza y crear momentos de pausa en un mundo acelerado.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-24">
           <img 
            src="https://images.unsplash.com/photo-1545638423-2895249f056d?auto=format&fit=crop&q=80&w=1200" 
            alt="Founder making candles" 
            className="w-full h-[500px] object-cover rounded-sm"
           />
           <div className="md:pl-12 text-center md:text-left">
             <h3 className="font-serif text-3xl text-kimezu-title mb-6">Hecho a mano en pequeños lotes</h3>
             <p className="text-kimezu-text mb-6 leading-relaxed">
               Cada vela Kimezu es una obra de amor. No utilizamos maquinaria industrial; en su lugar, vertemos, etiquetamos y empaquetamos cada producto a mano en nuestro taller.
             </p>
             <p className="text-kimezu-text leading-relaxed">
               Utilizamos exclusivamente cera de soja vegetal, que es biodegradable y quema de forma más limpia que la parafina. Nuestras mechas son de algodón puro o madera sostenible, asegurando una experiencia segura y libre de tóxicos.
             </p>
           </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center bg-kimezu-card p-12 rounded-sm">
           <div>
             <h4 className="font-serif text-xl mb-3 text-kimezu-title">Sostenible</h4>
             <p className="text-sm text-kimezu-text">Materiales eco-friendly y envases reciclables.</p>
           </div>
           <div>
             <h4 className="font-serif text-xl mb-3 text-kimezu-title">Natural</h4>
             <p className="text-sm text-kimezu-text">Sin parabenos, ftalatos ni aditivos sintéticos.</p>
           </div>
           <div>
             <h4 className="font-serif text-xl mb-3 text-kimezu-title">Artesanal</h4>
             <p className="text-sm text-kimezu-text">Creado con dedicación y detalle en cada paso.</p>
           </div>
        </div>
      </div>
    </div>
  );
};
import React from 'react';
import { Facebook, Instagram } from 'lucide-react';

// TikTok Icon Component (consistent with Header)
const TikTokIcon = ({ size = 20, className = "" }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5" />
  </svg>
);

// X (Twitter) Icon Component
const XIcon = ({ size = 20, className = "" }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="currentColor"
    className={className}
  >
    <path d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932ZM17.61 20.644h2.039L6.486 3.24H4.298Z" />
  </svg>
);

export const Footer: React.FC = () => {
  return (
    // Background using the "Titles" color (Dark Brown) #3A2F2B
    <footer className="bg-kimezu-title text-kimezu-card pt-12 md:pt-16 pb-8 border-t-4 border-kimezu-primary">
      <div className="container mx-auto px-4 md:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12 md:mb-16 text-center md:text-left">

          {/* Brand */}
          <div className="md:col-span-1 flex flex-col items-center md:items-start">
            <div className="flex flex-col items-center md:items-start mb-6">
              <span className="font-serif text-2xl font-bold tracking-widest text-white">
                KIMEZU
              </span>
              <span className="text-[0.6rem] uppercase tracking-[0.3em] text-kimezu-primary">
                Creaciones
              </span>
            </div>
            <p className="text-stone-300 text-sm leading-relaxed mb-4 max-w-xs mx-auto md:mx-0">
              Velas artesanales y detalles hechos a mano que combinan estética, aroma y simbolismo para crear ambientes cálidos.
            </p>
            <div className="mb-6 flex items-center gap-2 text-kimezu-primary font-bold text-sm">
              <span className="bg-green-600/20 p-1.5 rounded-full"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg></span>
              <a href="https://wa.me/573117107008" target="_blank" rel="noopener noreferrer" className="hover:underline">WhatsApp: 311 710 7008</a>
            </div>
            <div className="flex space-x-4 justify-center md:justify-start items-center">
              <a href="https://www.instagram.com/kimezucreaciones" target="_blank" rel="noopener noreferrer" className="hover:text-kimezu-primary transition-colors"><Instagram size={20} /></a>
              <a href="https://www.facebook.com/creacioneskimezu" target="_blank" rel="noopener noreferrer" className="hover:text-kimezu-primary transition-colors"><Facebook size={20} /></a>
              <a href="https://www.tiktok.com/@kimezucreaciones" target="_blank" rel="noopener noreferrer" className="hover:text-kimezu-primary transition-colors"><TikTokIcon size={20} /></a>
              <a href="https://x.com/kimezucreacion" target="_blank" rel="noopener noreferrer" className="hover:text-kimezu-primary transition-colors"><XIcon size={18} /></a>
            </div>
          </div>

          {/* Quick Links - Hidden on Mobile */}
          <div className="hidden md:block">
            <h4 className="font-serif text-white text-lg mb-6">Explorar</h4>
            <ul className="space-y-3 text-sm text-stone-300">
              <li><a href="#" className="hover:text-kimezu-primary transition-colors">Tienda</a></li>
              <li><a href="#" className="hover:text-kimezu-primary transition-colors">Nuestra Historia</a></li>
              <li><a href="#" className="hover:text-kimezu-primary transition-colors">Blog</a></li>
              <li><a href="#" className="hover:text-kimezu-primary transition-colors">Contacto</a></li>
            </ul>
          </div>

          {/* Help - Hidden on Mobile */}
          <div className="hidden md:block">
            <h4 className="font-serif text-white text-lg mb-6">Ayuda</h4>
            <ul className="space-y-3 text-sm text-stone-300">
              <li><a href="#" className="hover:text-kimezu-primary transition-colors">FAQ</a></li>
              <li><a href="#" className="hover:text-kimezu-primary transition-colors">Envíos y Devoluciones</a></li>
              <li><a href="#" className="hover:text-kimezu-primary transition-colors">Términos y Condiciones</a></li>
              <li><a href="#" className="hover:text-kimezu-primary transition-colors">Política de Privacidad</a></li>
            </ul>
          </div>

          {/* Newsletter */}
          <div className="flex flex-col items-center md:items-start">
            <h4 className="font-serif text-white text-lg mb-6">Boletín</h4>
            <p className="text-stone-300 text-sm mb-4">Suscríbete para recibir novedades y ofertas exclusivas.</p>
            <form className="flex flex-col space-y-2 w-full max-w-xs mx-auto md:mx-0">
              <input
                type="email"
                placeholder="Tu correo electrónico"
                className="bg-[#2a221f] border border-stone-700 text-white px-4 py-3 text-sm focus:outline-none focus:border-kimezu-primary placeholder-stone-500 text-center md:text-left"
              />
              <button className="bg-kimezu-primary text-white px-4 py-3 text-xs uppercase font-bold tracking-widest hover:bg-kimezu-primaryHover transition-colors">
                Suscribirse
              </button>
            </form>
          </div>
        </div>

        <div className="border-t border-stone-800 pt-8 flex flex-col md:flex-row justify-between items-center text-xs text-stone-400 uppercase tracking-wider">
          <p className="text-center md:text-left">&copy; {new Date().getFullYear()} Kimezu Creaciones. Todos los derechos reservados.</p>
          <div className="mt-4 md:mt-0 space-x-4 flex flex-wrap justify-center gap-y-2">
            <span>Visa</span>
            <span>Mastercard</span>
            <span className="font-bold text-white/80">Nequi</span>
            <span className="font-bold text-white/80">Bancolombia</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
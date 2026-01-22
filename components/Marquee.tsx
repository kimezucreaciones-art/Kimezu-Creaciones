import React from 'react';

interface MarqueeProps {
  className?: string;
}

export const Marquee: React.FC<MarqueeProps> = ({ className = '' }) => {
  const items = [
    "ENVÍO GRATIS EN PEDIDOS SUPERIORES A 60€",
    "HECHO A MANO CON AMOR",
    "CERA DE SOJA 100% NATURAL",
    "ESENCIAS PREMIUM",
    "ENVÍO GRATIS EN PEDIDOS SUPERIORES A 60€",
    "HECHO A MANO CON AMOR",
    "CERA DE SOJA 100% NATURAL",
    "ESENCIAS PREMIUM",
  ];

  return (
    <div className={`relative z-40 flex flex-col ${className}`}>
      {/* Marquee Content - Reverted padding to py-2 */}
      <div className="bg-kimezu-pink/30 py-2 overflow-hidden whitespace-nowrap border-y border-kimezu-pink/40">
        <div className="inline-block animate-marquee">
          {items.map((text, idx) => (
            <span key={idx} className="mx-10 text-xs font-serif uppercase tracking-widest text-kimezu-title font-bold">
              ✦ {text}
            </span>
          ))}
        </div>
        <div className="inline-block animate-marquee" aria-hidden="true">
          {items.map((text, idx) => (
            <span key={`dup-${idx}`} className="mx-10 text-xs font-serif uppercase tracking-widest text-kimezu-title font-bold">
              ✦ {text}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};
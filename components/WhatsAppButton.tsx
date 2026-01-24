import React from 'react';
import { MessageCircle } from 'lucide-react';

export const WhatsAppButton: React.FC = () => {
  const phoneNumber = "573117107008"; // Kimezu Official WhatsApp
  const message = "Hola Kimezu! Estoy interesado en conocer más sobre sus velas.";
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 bg-kimezu-green hover:bg-kimezu-greenHover text-white p-4 rounded-full shadow-lg transition-all duration-300 hover:scale-110 hover:rotate-3 flex items-center justify-center animate-fade-in-up"
      aria-label="Contactar por WhatsApp"
      title="Chatea con nosotros"
    >
      <MessageCircle size={32} fill="white" className="text-white" strokeWidth={1.5} />
    </a>
  );
};
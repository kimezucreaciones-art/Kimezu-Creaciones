import React, { useState } from 'react';

const FAQ_DATA = [
  {
    question: "¿De qué están hechas las velas?",
    answer: "Todas nuestras velas están hechas con cera de soja 100% natural, mechas de algodón sin plomo o madera, y aceites esenciales de primera calidad sin ftalatos."
  },
  {
    question: "¿Cuánto tiempo duran las velas?",
    answer: "Nuestras velas estándar de 200g tienen un tiempo de combustión aproximado de 40-50 horas. Recomendamos no dejarlas encendidas más de 4 horas seguidas."
  },
  {
    question: "¿Hacen envíos a todo el país?",
    answer: "Sí, realizamos envíos a toda España peninsular e islas. El tiempo de entrega estándar es de 2-4 días laborables."
  },
  {
    question: "¿Puedo devolver un producto?",
    answer: "Aceptamos devoluciones de productos sin usar y en su embalaje original dentro de los 14 días posteriores a la recepción. Los gastos de envío de la devolución corren a cargo del cliente, salvo defecto."
  },
  {
    question: "¿Ofrecen precios al por mayor?",
    answer: "Sí, trabajamos con tiendas y eventos. Contáctanos directamente a través del formulario para recibir nuestro catálogo mayorista."
  }
];

export const FAQ: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="pt-20 md:pt-32 pb-24 min-h-screen bg-kimezu-bg">
      <div className="container mx-auto px-4 max-w-3xl">
        <h1 className="text-4xl md:text-5xl font-serif text-center mb-4 text-kimezu-title">Preguntas Frecuentes</h1>
        <p className="text-center text-kimezu-text mb-16 max-w-md mx-auto">
          Todo lo que necesitas saber sobre nuestros productos, envíos y cuidados.
        </p>

        <div className="space-y-4">
          {FAQ_DATA.map((item, index) => (
            <div key={index} className="border border-kimezu-card bg-white/50 backdrop-blur-sm">
              <button
                className="w-full flex justify-between items-center p-6 text-left focus:outline-none hover:bg-white/80 transition-colors"
                onClick={() => toggleFAQ(index)}
              >
                <span className="font-serif text-lg text-kimezu-title">{item.question}</span>
                <span className={`text-2xl font-light text-kimezu-primary transition-transform duration-300 ${openIndex === index ? 'rotate-45' : ''}`}>
                  +
                </span>
              </button>
              <div
                className={`overflow-hidden transition-all duration-300 ease-in-out ${
                  openIndex === index ? 'max-h-48 opacity-100' : 'max-h-0 opacity-0'
                }`}
              >
                <div className="p-6 pt-0 text-kimezu-text leading-relaxed border-t border-transparent">
                  {item.answer}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
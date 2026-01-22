import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../components/Button';
import { XCircle, HelpCircle } from 'lucide-react';

export const OrderFailed: React.FC = () => {
  return (
    <div className="pt-20 md:pt-32 pb-24 min-h-screen bg-kimezu-bg flex items-center justify-center px-4">
      <div className="max-w-lg w-full text-center">
        <div className="inline-flex items-center justify-center w-24 h-24 bg-red-100 rounded-full mb-8 animate-fade-in-up">
           <XCircle size={48} className="text-red-500" />
        </div>
        
        <h1 className="font-serif text-4xl md:text-5xl text-kimezu-title mb-4">Pago no realizado</h1>
        <p className="text-kimezu-text text-lg mb-8">
          Lo sentimos, hubo un problema al procesar tu transacción. No se ha realizado ningún cargo a tu cuenta.
        </p>

        <div className="bg-white p-6 border border-kimezu-card mb-8 text-left shadow-sm border-l-4 border-l-red-400">
           <h3 className="font-bold text-kimezu-title uppercase tracking-widest text-xs mb-2">Posibles razones:</h3>
           <ul className="text-kimezu-text text-sm list-disc list-inside space-y-1">
             <li>Fondos insuficientes.</li>
             <li>Datos de tarjeta incorrectos.</li>
             <li>Problema de conexión con la pasarela bancaria.</li>
           </ul>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link to="/checkout">
            <Button>Intentar Nuevamente</Button>
          </Link>
          <Link to="/faq">
             <Button variant="ghost"> <HelpCircle size={16} className="mr-2 inline" /> Necesito Ayuda</Button>
          </Link>
        </div>
      </div>
    </div>
  );
};
import React from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { Button } from '../components/Button';
import { CheckCircle, Package } from 'lucide-react';
import { GiftBag } from '../components/GiftBag';

export const OrderSuccess: React.FC = () => {
  const [searchParams] = useSearchParams();
  // Get the REAL order ID from URL, or fallback to a demo one (but GiftBag will check DB if valid)
  const orderId = searchParams.get('orderId') || `DEMO-${Math.floor(Math.random() * 10000)}`;

  return (
    <div className="pt-20 md:pt-32 pb-24 min-h-screen bg-kimezu-bg flex items-center justify-center px-4">
      <div className="max-w-lg w-full text-center">
        <div className="inline-flex items-center justify-center w-24 h-24 bg-kimezu-green/20 rounded-full mb-8 animate-fade-in-up">
          <CheckCircle size={48} className="text-kimezu-green" />
        </div>

        <h1 className="font-serif text-4xl md:text-5xl text-kimezu-title mb-4">¡Gracias por tu compra!</h1>
        <p className="text-kimezu-text text-lg mb-8">
          Tu pedido <span className="font-bold font-mono text-kimezu-title">#{orderId.slice(0, 8)}</span> ha sido procesado exitosamente.
        </p>

        <div className="bg-white p-6 border border-kimezu-card mb-8 text-left shadow-sm">
          <h3 className="font-bold text-kimezu-title uppercase tracking-widest text-xs mb-4">Detalles de envío</h3>
          <p className="text-kimezu-text text-sm">Te hemos enviado un correo de confirmación con los detalles. Tu pedido llegará a tu dirección en Medellín (Antioquia) en los próximos 2-4 días hábiles.</p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link to="/shop">
            <Button>Seguir Comprando</Button>
          </Link>
          <Link to="/profile">
            <Button variant="outline">Ver Mis Pedidos</Button>
          </Link>
        </div>

        {/* Gift Bag Trigger - Pass the unique order ID to key the reward */}
        <GiftBag orderId={orderId} />
      </div>
    </div>
  );
};
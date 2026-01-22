import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/Button';
import { CreditCard, Smartphone, Landmark, Upload, CheckCircle } from 'lucide-react';
import { formatCOP } from '../utils/currency';

type PaymentMethod = 'card' | 'nequi' | 'bancolombia';

export const Checkout: React.FC = () => {
  const navigate = useNavigate();
  const [method, setMethod] = useState<PaymentMethod>('card');
  const [loading, setLoading] = useState(false);

  const handlePayment = () => {
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      // For demo purposes, let's assume success. 
      // In a real app, you'd handle errors here.
      const isSuccess = true; // Toggle this to test fail state manually if needed
      if (isSuccess) {
        navigate('/order-success');
      } else {
        navigate('/order-failed');
      }
    }, 2000);
  };

  return (
    <div className="pt-20 md:pt-32 pb-24 min-h-screen bg-kimezu-bg">
      <div className="container mx-auto px-4 md:px-8 max-w-5xl">
        <h1 className="text-3xl md:text-5xl font-serif text-center mb-12 text-kimezu-title">Finalizar Compra</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Payment Methods */}
          <div className="lg:col-span-2 space-y-6">
            <h2 className="font-serif text-xl text-kimezu-title border-b border-kimezu-card pb-2">Método de Pago</h2>

            {/* Credit Card Option */}
            <div className={`border ${method === 'card' ? 'border-kimezu-primary bg-white' : 'border-kimezu-card bg-white/50'} transition-all duration-300`}>
              <label className="flex items-center gap-4 p-4 cursor-pointer">
                <input type="radio" name="payment" className="accent-kimezu-primary w-5 h-5" checked={method === 'card'} onChange={() => setMethod('card')} />
                <div className="p-2 bg-stone-100 rounded text-stone-600"><CreditCard size={24} /></div>
                <span className="font-bold text-kimezu-title">Tarjeta de Crédito / Débito</span>
              </label>
              
              {method === 'card' && (
                <div className="p-6 pt-0 border-t border-dashed border-stone-200 mt-2 animate-fade-in-up">
                  <div className="space-y-4">
                     <div>
                        <label className="block text-xs font-bold uppercase tracking-widest text-stone-500 mb-1">Número de Tarjeta</label>
                        <input type="text" placeholder="0000 0000 0000 0000" className="w-full bg-stone-50 border border-stone-200 p-3 outline-none focus:border-kimezu-primary" />
                     </div>
                     <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs font-bold uppercase tracking-widest text-stone-500 mb-1">Expiración</label>
                          <input type="text" placeholder="MM/AA" className="w-full bg-stone-50 border border-stone-200 p-3 outline-none focus:border-kimezu-primary" />
                        </div>
                        <div>
                          <label className="block text-xs font-bold uppercase tracking-widest text-stone-500 mb-1">CVC</label>
                          <input type="text" placeholder="123" className="w-full bg-stone-50 border border-stone-200 p-3 outline-none focus:border-kimezu-primary" />
                        </div>
                     </div>
                     <div>
                        <label className="block text-xs font-bold uppercase tracking-widest text-stone-500 mb-1">Nombre del Titular</label>
                        <input type="text" placeholder="Como aparece en la tarjeta" className="w-full bg-stone-50 border border-stone-200 p-3 outline-none focus:border-kimezu-primary" />
                     </div>
                  </div>
                </div>
              )}
            </div>

            {/* Nequi Option */}
            <div className={`border ${method === 'nequi' ? 'border-kimezu-primary bg-white' : 'border-kimezu-card bg-white/50'} transition-all duration-300`}>
              <label className="flex items-center gap-4 p-4 cursor-pointer">
                <input type="radio" name="payment" className="accent-kimezu-primary w-5 h-5" checked={method === 'nequi'} onChange={() => setMethod('nequi')} />
                <div className="p-2 bg-[#2a0e42] rounded text-white"><Smartphone size={24} /></div>
                <span className="font-bold text-[#2a0e42]">Nequi</span>
              </label>

              {method === 'nequi' && (
                <div className="p-6 pt-0 border-t border-dashed border-stone-200 mt-2 animate-fade-in-up">
                   <div className="bg-purple-50 p-4 mb-4 rounded text-sm text-purple-900">
                      <p className="font-bold mb-1">Envía tu pago al número:</p>
                      <p className="text-2xl font-mono">300 123 4567</p>
                      <p className="text-xs mt-1">A nombre de Kimezu Creaciones S.A.S</p>
                   </div>
                   
                   <div className="space-y-4">
                      <div>
                        <label className="block text-xs font-bold uppercase tracking-widest text-stone-500 mb-1">Celular de Origen</label>
                        <input type="tel" placeholder="3XX XXX XXXX" className="w-full bg-stone-50 border border-stone-200 p-3 outline-none focus:border-kimezu-primary" />
                      </div>
                      <div>
                        <label className="block text-xs font-bold uppercase tracking-widest text-stone-500 mb-1">Comprobante de Pago</label>
                        <div className="border-2 border-dashed border-stone-300 rounded-lg p-6 flex flex-col items-center justify-center text-stone-500 hover:bg-stone-50 hover:border-kimezu-primary transition-colors cursor-pointer">
                           <Upload size={32} className="mb-2" />
                           <span className="text-sm">Clic para subir imagen (JPG, PNG)</span>
                           <input type="file" className="hidden" accept="image/*" />
                        </div>
                      </div>
                   </div>
                </div>
              )}
            </div>

            {/* Bancolombia Option */}
            <div className={`border ${method === 'bancolombia' ? 'border-kimezu-primary bg-white' : 'border-kimezu-card bg-white/50'} transition-all duration-300`}>
              <label className="flex items-center gap-4 p-4 cursor-pointer">
                <input type="radio" name="payment" className="accent-kimezu-primary w-5 h-5" checked={method === 'bancolombia'} onChange={() => setMethod('bancolombia')} />
                <div className="p-2 bg-[#FDDA24] rounded text-black"><Landmark size={24} /></div>
                <span className="font-bold text-black">Bancolombia</span>
              </label>

              {method === 'bancolombia' && (
                <div className="p-6 pt-0 border-t border-dashed border-stone-200 mt-2 animate-fade-in-up">
                   <div className="bg-yellow-50 p-4 mb-4 rounded text-sm text-yellow-900">
                      <p className="font-bold mb-1">Transferencia a Cuenta Ahorros:</p>
                      <p className="text-2xl font-mono">123-456789-00</p>
                      <p className="text-xs mt-1">A nombre de Kimezu Creaciones S.A.S</p>
                   </div>
                   
                   <div className="space-y-4">
                      <div>
                        <label className="block text-xs font-bold uppercase tracking-widest text-stone-500 mb-1">Cuenta de Origen</label>
                        <input type="text" placeholder="Número de cuenta" className="w-full bg-stone-50 border border-stone-200 p-3 outline-none focus:border-kimezu-primary" />
                      </div>
                      <div>
                        <label className="block text-xs font-bold uppercase tracking-widest text-stone-500 mb-1">Comprobante de Pago</label>
                        <div className="border-2 border-dashed border-stone-300 rounded-lg p-6 flex flex-col items-center justify-center text-stone-500 hover:bg-stone-50 hover:border-kimezu-primary transition-colors cursor-pointer">
                           <Upload size={32} className="mb-2" />
                           <span className="text-sm">Clic para subir imagen (JPG, PNG)</span>
                           <input type="file" className="hidden" accept="image/*" />
                        </div>
                      </div>
                   </div>
                </div>
              )}
            </div>

          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white p-6 border border-kimezu-card sticky top-24 shadow-sm">
              <h3 className="font-serif text-xl text-kimezu-title mb-6">Resumen del Pedido</h3>
              
              <div className="space-y-4 mb-6 text-sm text-kimezu-text">
                 <div className="flex justify-between">
                   <span>Subtotal</span>
                   <span>{formatCOP(295000)}</span>
                 </div>
                 <div className="flex justify-between">
                   <span>Envío (Nacional)</span>
                   <span>{formatCOP(12000)}</span>
                 </div>
                 <div className="flex justify-between text-kimezu-primary">
                   <span>Descuento (KIMEZU15)</span>
                   <span>-{formatCOP(18000)}</span>
                 </div>
                 <div className="flex justify-between font-bold text-lg text-kimezu-title border-t border-kimezu-card pt-4">
                   <span>Total</span>
                   <span>{formatCOP(289000)}</span>
                 </div>
              </div>

              <Button 
                fullWidth 
                onClick={handlePayment} 
                disabled={loading}
                className="flex justify-center items-center gap-2"
              >
                {loading ? 'Procesando...' : (
                  <>Pagar Ahora <CheckCircle size={18} /></>
                )}
              </Button>
              
              <p className="text-[10px] text-center mt-4 text-stone-400 leading-tight">
                Al procesar el pago aceptas nuestros términos y condiciones de venta. Tus datos están protegidos.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
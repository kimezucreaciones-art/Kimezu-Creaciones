import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/Button';
import { Smartphone, Landmark, Upload, CheckCircle, Ticket, X } from 'lucide-react';
import { formatCOP } from '../utils/currency';
import nequiQr from '../src/assets/nequi-qr.png';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { supabase } from '../services/supabase';

type PaymentMethod = 'nequi' | 'bancolombia';

export const Checkout: React.FC = () => {
  const navigate = useNavigate();
  const { clearCart } = useCart();
  const { user } = useAuth();

  const [method, setMethod] = useState<PaymentMethod>('nequi');
  const [loading, setLoading] = useState(false);
  const [proofFile, setProofFile] = useState<File | null>(null);

  // Coupling Logic
  const [coupons, setCoupons] = useState<any[]>([]);
  const [selectedCoupon, setSelectedCoupon] = useState<any | null>(null);
  const [showCouponModal, setShowCouponModal] = useState(false);

  // Financials
  const subtotal = 295000;
  const shipping = 12000;
  const standardDiscount = 18000; // e.g. from bundles

  // Calculate final total based on user coupon
  const couponDiscountAmount = selectedCoupon
    ? Math.round(subtotal * (selectedCoupon.discount_percentage / 100))
    : 0;

  const total = subtotal + shipping - standardDiscount - couponDiscountAmount;

  useEffect(() => {
    if (user) {
      fetchCoupons();
    }
  }, [user]);

  const fetchCoupons = async () => {
    if (!user) return;
    const { data } = await supabase
      .from('coupons')
      .select('*')
      .eq('user_id', user.id)
      .eq('is_used', false)
      .order('created_at', { ascending: false });

    if (data) setCoupons(data);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setProofFile(e.target.files[0]);
    }
  };

  const handlePayment = async () => {
    if (!proofFile) {
      alert("Por favor sube el comprobante de pago para continuar.");
      return;
    }

    setLoading(true);

    try {
      // 1. If coupon used, mark as used in DB
      if (selectedCoupon && user) {
        await supabase.from('coupons').update({ is_used: true }).eq('id', selectedCoupon.id);
      }

      // 2. Simulate API / Upload
      await new Promise(resolve => setTimeout(resolve, 2000));

      // 3. Success
      clearCart();
      navigate('/order-success');
    } catch (error) {
      console.error(error);
      navigate('/order-failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="pt-20 md:pt-32 pb-24 min-h-screen bg-kimezu-bg">
      <div className="container mx-auto px-4 md:px-8 max-w-5xl">
        <h1 className="text-3xl md:text-5xl font-serif text-center mb-12 text-kimezu-title">Finalizar Compra</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          {/* Payment Methods */}
          <div className="lg:col-span-2 space-y-6">
            <h2 className="font-serif text-xl text-kimezu-title border-b border-kimezu-card pb-2">Método de Pago</h2>

            {/* Nequi Option */}
            <div className={`border ${method === 'nequi' ? 'border-kimezu-primary bg-white' : 'border-kimezu-card bg-white/50'} transition-all duration-300 rounded-lg overflow-hidden`}>
              <label className="flex items-center gap-4 p-4 cursor-pointer">
                <input type="radio" name="payment" className="accent-kimezu-primary w-5 h-5" checked={method === 'nequi'} onChange={() => { setMethod('nequi'); setProofFile(null); }} />
                <div className="p-2 bg-[#2a0e42] rounded text-white"><Smartphone size={24} /></div>
                <span className="font-bold text-[#2a0e42]">Nequi</span>
              </label>

              {method === 'nequi' && (
                <div className="p-6 pt-0 border-t border-dashed border-stone-200 mt-2 animate-fade-in-up bg-purple-50/30">
                  <div className="bg-[#FAFAFA] border border-purple-100 p-8 mb-6 rounded-2xl flex flex-col items-center text-center shadow-sm relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-purple-400 to-pink-400"></div>
                    <p className="font-bold mb-6 text-xl text-[#2a0e42]">Escanea para pagar con Nequi</p>

                    <div className="bg-white p-3 rounded-xl shadow-lg shadow-purple-900/5 mb-6">
                      <img src={nequiQr} alt="Código QR Nequi" className="w-56 h-auto" />
                    </div>

                    <div className="space-y-2">
                      <p className="font-bold text-xs uppercase tracking-[0.2em] text-stone-400">O usa la Llave Bre-B:</p>
                      <p className="text-4xl font-bold tracking-tight text-[#2a0e42] selection:bg-purple-100">0091159998</p>
                      <p className="text-sm text-stone-500 font-medium mt-2">Ananda Vargas</p>
                    </div>
                  </div>

                  <div className="space-y-4 mb-6">
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-widest text-stone-500 mb-1">Comprobante de Pago <span className="text-red-500">*</span></label>
                      <div className={`border-2 border-dashed ${proofFile ? 'border-kimezu-green bg-green-50' : 'border-stone-300 hover:border-kimezu-primary hover:bg-white'} rounded-lg p-6 flex flex-col items-center justify-center text-stone-500 transition-colors cursor-pointer relative`}>
                        {proofFile ? (
                          <>
                            <CheckCircle size={32} className="text-kimezu-green mb-2" />
                            <span className="text-sm font-bold text-kimezu-green">{proofFile.name}</span>
                            <span className="text-xs text-stone-400 mt-1">Clic para cambiar</span>
                          </>
                        ) : (
                          <>
                            <Upload size={32} className="mb-2" />
                            <span className="text-sm">Subir imagen (JPG, PNG)</span>
                          </>
                        )}
                        <input type="file" className="absolute inset-0 opacity-0 cursor-pointer" accept="image/*" onChange={handleFileChange} />
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-between items-center border-t border-purple-100 pt-4">
                    <span className="font-serif text-lg text-kimezu-title font-bold">Total a Pagar:</span>
                    <span className="text-xl font-bold text-kimezu-primary">{formatCOP(total)}</span>
                  </div>

                  <Button
                    fullWidth
                    onClick={handlePayment}
                    disabled={loading || !proofFile}
                    className="mt-4 flex justify-center items-center gap-2"
                  >
                    {loading ? 'Verificando...' : !proofFile ? 'Sube el comprobante' : 'Finalizar Pedido'}
                  </Button>
                </div>
              )}
            </div>

            {/* Bancolombia Option */}
            <div className={`border ${method === 'bancolombia' ? 'border-kimezu-primary bg-white' : 'border-kimezu-card bg-white/50'} transition-all duration-300 rounded-lg overflow-hidden`}>
              <label className="flex items-center gap-4 p-4 cursor-pointer">
                <input type="radio" name="payment" className="accent-kimezu-primary w-5 h-5" checked={method === 'bancolombia'} onChange={() => { setMethod('bancolombia'); setProofFile(null); }} />
                <div className="p-2 bg-[#FDDA24] rounded text-black"><Landmark size={24} /></div>
                <span className="font-bold text-black">Bancolombia</span>
              </label>

              {method === 'bancolombia' && (
                <div className="p-6 pt-0 border-t border-dashed border-stone-200 mt-2 animate-fade-in-up bg-yellow-50/30">
                  <div className="bg-yellow-50 p-6 mb-4 rounded-lg text-sm text-yellow-900 border border-yellow-200 text-center">
                    <p className="font-bold mb-2 uppercase tracking-wide opacity-70">Transferencia a Cuenta Ahorros</p>
                    <p className="text-3xl font-mono font-bold mb-2">123-456789-00</p>
                    <p className="text-xs">A nombre de Kimezu Creaciones S.A.S</p>
                  </div>

                  <div className="space-y-4 mb-6">
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-widest text-stone-500 mb-1">Comprobante de Pago <span className="text-red-500">*</span></label>
                      <div className={`border-2 border-dashed ${proofFile ? 'border-kimezu-green bg-green-50' : 'border-stone-300 hover:border-kimezu-primary hover:bg-white'} rounded-lg p-6 flex flex-col items-center justify-center text-stone-500 transition-colors cursor-pointer relative`}>
                        {proofFile ? (
                          <>
                            <CheckCircle size={32} className="text-kimezu-green mb-2" />
                            <span className="text-sm font-bold text-kimezu-green">{proofFile.name}</span>
                            <span className="text-xs text-stone-400 mt-1">Clic para cambiar</span>
                          </>
                        ) : (
                          <>
                            <Upload size={32} className="mb-2" />
                            <span className="text-sm">Subir imagen (JPG, PNG)</span>
                          </>
                        )}
                        <input type="file" className="absolute inset-0 opacity-0 cursor-pointer" accept="image/*" onChange={handleFileChange} />
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-between items-center border-t border-yellow-200 pt-4">
                    <span className="font-serif text-lg text-kimezu-title font-bold">Total a Pagar:</span>
                    <span className="text-xl font-bold text-kimezu-primary">{formatCOP(total)}</span>
                  </div>

                  <Button
                    fullWidth
                    onClick={handlePayment}
                    disabled={loading || !proofFile}
                    className="mt-4 flex justify-center items-center gap-2"
                  >
                    {loading ? 'Verificando...' : !proofFile ? 'Sube el comprobante' : 'Finalizar Pedido'}
                  </Button>
                </div>
              )}
            </div>

          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 space-y-6">

              <h2 className="font-serif text-xl text-kimezu-title border-b border-kimezu-card pb-2">Resumen del Pedido</h2>

              <div className="bg-white p-6 border border-kimezu-card shadow-sm">

                <div className="space-y-4 mb-6 text-sm text-kimezu-text">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span>{formatCOP(subtotal)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Envío (Nacional)</span>
                    <span>{formatCOP(shipping)}</span>
                  </div>
                  {/* Coupon Display */}
                  {selectedCoupon && (
                    <div className="flex justify-between text-green-600 font-bold bg-green-50 p-2 rounded -mx-2">
                      <div className="flex items-center gap-1">
                        <Ticket size={14} />
                        <span>Cupón ({selectedCoupon.code})</span>
                      </div>
                      <span>-{formatCOP(couponDiscountAmount)}</span>
                    </div>
                  )}

                  <div className="pt-2">
                    <button
                      onClick={() => setShowCouponModal(true)}
                      className="text-xs text-kimezu-primary font-bold underline hover:text-kimezu-title flex items-center gap-1"
                    >
                      <Ticket size={14} />
                      {selectedCoupon ? 'Cambiar Cupón' : 'Aplicar Cupón de Regalo'}
                    </button>
                  </div>

                  <div className="flex justify-between font-bold text-lg text-kimezu-title border-t border-kimezu-card pt-4 mt-2">
                    <span>Total</span>
                    <span>{formatCOP(total)}</span>
                  </div>
                </div>

                <p className="text-[10px] text-center mt-4 text-stone-400 leading-tight">
                  Selecciona un método de pago a la izquierda para finalizar tu compra.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Coupon Modal */}
      {showCouponModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-sm overflow-hidden animate-fade-in-up">
            <div className="flex justify-between items-center p-4 border-b border-stone-100">
              <h3 className="font-serif text-lg text-kimezu-title">Mis Cupones Disponibles</h3>
              <button onClick={() => setShowCouponModal(false)}><X size={20} className="text-stone-400 hover:text-red-500" /></button>
            </div>

            <div className="max-h-80 overflow-y-auto p-4 space-y-3">
              {coupons.length === 0 ? (
                <p className="text-center text-sm text-stone-500 py-4 italic">No tienes cupones disponibles.</p>
              ) : (
                coupons.map(coupon => (
                  <div
                    key={coupon.id}
                    onClick={() => { setSelectedCoupon(coupon); setShowCouponModal(false); }}
                    className={`border-2 rounded-lg p-3 cursor-pointer transition-all hover:scale-[1.02] ${selectedCoupon?.id === coupon.id ? 'border-kimezu-primary bg-purple-50' : 'border-stone-100 hover:border-kimezu-primary/50'}`}
                  >
                    <div className="flex justify-between items-center">
                      <div>
                        <span className="block text-xl font-bold text-kimezu-title">{coupon.discount_percentage}% OFF</span>
                        <span className="text-xs text-stone-500 font-mono">{coupon.code}</span>
                      </div>
                      {selectedCoupon?.id === coupon.id && <CheckCircle size={20} className="text-kimezu-primary" />}
                    </div>
                  </div>
                ))
              )}
            </div>

            {selectedCoupon && (
              <div className="p-4 bg-stone-50 border-t border-stone-100 text-center">
                <button onClick={() => { setSelectedCoupon(null); setShowCouponModal(false); }} className="text-xs text-red-500 font-bold hover:underline">
                  Quitar cupón seleccionado
                </button>
              </div>
            )}
          </div>
        </div>
      )}

    </div>
  );
};
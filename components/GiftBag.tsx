import React, { useState, useEffect } from 'react';
import { Gift, X, Sparkles } from 'lucide-react';
import { Button } from './Button';
import { supabase } from '../services/supabase';
import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom';

interface GiftBagProps {
    orderId: string;
}

export const GiftBag: React.FC<GiftBagProps> = ({ orderId }) => {
    const { user } = useAuth();
    const [isOpen, setIsOpen] = useState(false);
    const [isOpening, setIsOpening] = useState(false);
    const [reward, setReward] = useState<{ discount: number; code: string } | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [hasClaimed, setHasClaimed] = useState(false);

    useEffect(() => {
        // Check local storage to see if this specific order has already claimed a gift
        // This is a client-side check for UX, the DB constraint is the real truth
        const claimed = localStorage.getItem(`gift_claimed_${orderId}`);
        if (claimed) {
            setHasClaimed(true);
        }
    }, [orderId]);

    const handleOpenBag = async () => {
        if (!user) return;

        setIsOpening(true);

        // Simulate "shuffling" delay
        await new Promise(resolve => setTimeout(resolve, 1500));

        try {
            // 80% chance to win, 20% "Better luck next time" logic could go here
            // For this implementation, let's be generous: Always win something between 3-25%

            const discount = Math.floor(Math.random() * (25 - 3 + 1)) + 3;
            const code = `KIMEZU-${Math.random().toString(36).substring(2, 7).toUpperCase()}-${discount}`;

            const { error: dbError } = await supabase
                .from('coupons')
                .insert([
                    {
                        code,
                        discount_percentage: discount,
                        user_id: user.id,
                        is_used: false
                    }
                ]);

            if (dbError) {
                throw dbError;
            }

            setReward({ discount, code });
            localStorage.setItem(`gift_claimed_${orderId}`, 'true');
            setHasClaimed(true);

        } catch (err) {
            console.error('Error claiming gift:', err);
            setError('Hubo un error al reclamar tu regalo. Intenta de nuevo.');
        } finally {
            setIsOpening(false);
        }
    };

    if (hasClaimed && !reward) {
        return null; // Don't show anything if already claimed and closed (unless showing the reward immediately after claim)
    }

    if (!isOpen) {
        if (hasClaimed) return null;

        return (
            <div className="fixed bottom-6 right-6 z-50 animate-bounce-slow">
                <button
                    onClick={() => setIsOpen(true)}
                    className="bg-kimezu-primary text-white p-4 rounded-full shadow-lg hover:scale-110 transition-transform flex items-center gap-2 group"
                >
                    <Gift size={24} className="group-hover:rotate-12 transition-transform" />
                    <span className="font-bold text-sm uppercase tracking-widest hidden group-hover:block whitespace-nowrap overflow-hidden animate-fade-in">
                        Abrir Regalo
                    </span>
                </button>
            </div>
        );
    }

    return (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl p-8 max-w-md w-full relative overflow-hidden shadow-2xl text-center">

                <button
                    onClick={() => setIsOpen(false)}
                    className="absolute top-4 right-4 text-stone-400 hover:text-kimezu-title"
                >
                    <X size={24} />
                </button>

                {!user ? (
                    <div className="py-8">
                        <Gift size={64} className="mx-auto text-kimezu-primary mb-6" />
                        <h3 className="text-2xl font-serif text-kimezu-title mb-4">¡Tienes un Regalo Esperando!</h3>
                        <p className="text-stone-600 mb-8">
                            Hemos preparado una sorpresa para tu próxima compra, pero necesitas una cuenta para guardarla.
                        </p>
                        <div className="flex gap-4 justify-center">
                            <Link to="/register"><Button>Registrarme</Button></Link>
                            <Link to="/login"><Button variant="outline">Iniciar Sesión</Button></Link>
                        </div>
                    </div>
                ) : reward ? (
                    <div className="py-8 animate-fade-in-up">
                        <div className="inline-block p-4 bg-green-50 rounded-full mb-6">
                            <Sparkles size={48} className="text-green-600" />
                        </div>
                        <h3 className="text-3xl font-serif text-kimezu-title mb-2">¡Felicidades!</h3>
                        <p className="text-stone-600 mb-6 font-medium">Has ganado un descuento especial:</p>

                        <div className="bg-kimezu-bg border-dashed border-2 border-kimezu-primary p-6 rounded-lg mb-6 relative">
                            <p className="text-5xl font-bold text-kimezu-primary mb-2">{reward.discount}% OFF</p>
                            <p className="font-mono text-xl tracking-widest text-stone-500 selection:bg-kimezu-primary selection:text-white cursor-text">{reward.code}</p>
                            <p className="text-[10px] text-stone-400 mt-2 uppercase tracking-wide">Válido por única vez</p>
                        </div>

                        <p className="text-xs text-stone-500 mb-8">
                            Este código ha sido guardado en tu perfil. Úsalo en tu próxima compra.
                        </p>

                        <Button onClick={() => setIsOpen(false)} fullWidth>¡Gracias!</Button>
                    </div>
                ) : (
                    <div className="py-12">
                        <div className={`mb-8 transition-transform duration-100 ${isOpening ? 'animate-shake' : ''}`}>
                            <Gift size={80} className="mx-auto text-kimezu-pink" />
                        </div>

                        <h3 className="text-2xl font-serif text-kimezu-title mb-4">
                            {isOpening ? 'Descubriendo tu suerte...' : 'Bolsa de Regalos Kimezu'}
                        </h3>

                        {!isOpening && (
                            <>
                                <p className="text-stone-600 mb-8">
                                    Toca el botón para descubrir tu descuento exclusivo para la próxima compra.
                                    <br /><span className="text-xs text-stone-400">(Puede ser entre 3% y 25%)</span>
                                </p>
                                <Button onClick={handleOpenBag} size="lg" className="w-full text-lg py-4">
                                    ¡Abrir Bolsa!
                                </Button>
                            </>
                        )}

                        {error && <p className="text-red-500 text-sm mt-4">{error}</p>}
                    </div>
                )}

            </div>
        </div>
    );
};

import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Button } from '../components/Button';
import { LogOut, User as UserIcon, Package, Heart, Shield } from 'lucide-react';
import { formatCOP } from '../utils/currency';

export const Profile: React.FC = () => {
  const { session, user, signOut } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!session) {
      navigate('/login');
    }
  }, [session, navigate]);

  const handleLogout = async () => {
    await signOut();
    navigate('/login');
  };

  if (!user) return null;

  return (
    <div className="pt-32 pb-24 min-h-screen bg-kimezu-bg">
      <div className="container mx-auto px-4 md:px-8">

        {/* Header Section */}
        <div className="bg-white p-8 rounded-sm shadow-sm border border-kimezu-card mb-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-6">
            <div className="w-20 h-20 bg-stone-100 rounded-full flex items-center justify-center border-4 border-kimezu-bg text-stone-400">
              <UserIcon size={32} />
            </div>
            <div>
              <h1 className="font-serif text-2xl text-kimezu-title mb-1">
                Hola, {user.user_metadata.full_name || 'Amante de las Velas'}
              </h1>
              <p className="text-kimezu-text text-sm">{user.email}</p>
              <div className="flex items-center gap-2 mt-2">
                <span className="bg-stone-100 text-[10px] uppercase font-bold px-2 py-0.5 rounded text-stone-500">Miembro Gratuito</span>
              </div>
            </div>
          </div>

          <Button variant="outline" onClick={handleLogout} className="flex items-center gap-2 text-red-500 hover:text-red-600 hover:bg-red-50 border-red-100">
            <LogOut size={16} /> Cerrar Sesión
          </Button>
        </div>

        {/* Dashboard Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

          {/* Recent Orders - Placeholder */}
          <div className="md:col-span-2 bg-white p-6 rounded-sm shadow-sm border border-kimezu-card h-full">
            <div className="flex items-center justify-between mb-6 pb-4 border-b border-stone-100">
              <h2 className="font-serif text-lg text-kimezu-title flex items-center gap-2">
                <Package size={20} /> Mis Pedidos
              </h2>
              <Button variant="outline" className="text-xs h-8 px-3">Ver Todos</Button>
            </div>

            <div className="text-center py-12 bg-stone-50 rounded border border-dashed border-stone-200">
              <p className="text-stone-400 mb-2">Aún no has realizado pedidos.</p>
              <Button variant="primary" onClick={() => navigate('/shop')} className="text-sm">
                Ir a la Tienda
              </Button>
            </div>
          </div>

          {/* Sidebar Widgets using Supabase Data Mockup for now */}
          <div className="space-y-6">

            {/* Admin Access Link (Only specific emails) */}
            {user.email === 'kimezucreaciones@gmail.com' && (
              <div className="bg-kimezu-title text-white p-6 rounded-sm shadow-md">
                <h3 className="font-bold mb-2 flex items-center gap-2">
                  <Shield size={18} /> Panel de Administrador
                </h3>
                <p className="text-xs text-stone-300 mb-4">Acceso exclusivo para gestión de tienda.</p>
                <Button onClick={() => navigate('/admin')} className="w-full bg-white text-kimezu-title hover:bg-stone-200 border-none">
                  Ir al Panel
                </Button>
              </div>
            )}

            {/* Wishlist Preview */}
            <div className="bg-white p-6 rounded-sm shadow-sm border border-kimezu-card">
              <h3 className="font-bold text-kimezu-title mb-4 flex items-center gap-2">
                <Heart size={18} /> Favoritos
              </h3>
              <p className="text-xs text-stone-400">Próximamente: Tu lista de deseos guardada en la nube.</p>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
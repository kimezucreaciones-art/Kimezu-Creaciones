import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '../components/Button';

export const Login: React.FC = () => {
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Logic for login would go here
    navigate('/profile');
  };

  return (
    <div className="pt-24 md:pt-28 pb-24 min-h-screen bg-kimezu-bg flex items-start justify-center px-4">
      <div className="bg-white p-8 md:p-12 shadow-lg max-w-md w-full border border-kimezu-card relative overflow-hidden mt-8 md:mt-12">
        <div className="absolute top-0 left-0 w-full h-1 bg-kimezu-primary"></div>
        
        <h2 className="font-serif text-3xl text-kimezu-title mb-2 text-center">Bienvenido</h2>
        <p className="text-kimezu-text text-center text-sm mb-8">Inicia sesión para gestionar tus pedidos</p>

        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label className="block text-xs font-bold uppercase tracking-widest text-kimezu-title mb-2">
              Correo Electrónico
            </label>
            <input 
              type="email" 
              required
              className="w-full bg-kimezu-bg border border-kimezu-card px-4 py-3 text-kimezu-title focus:outline-none focus:border-kimezu-primary transition-colors"
              placeholder="ejemplo@correo.com"
            />
          </div>
          
          <div>
            <div className="flex justify-between items-center mb-2">
              <label className="block text-xs font-bold uppercase tracking-widest text-kimezu-title">
                Contraseña
              </label>
              <a href="#" className="text-xs text-kimezu-primary hover:underline">¿Olvidaste tu contraseña?</a>
            </div>
            <input 
              type="password" 
              required
              className="w-full bg-kimezu-bg border border-kimezu-card px-4 py-3 text-kimezu-title focus:outline-none focus:border-kimezu-primary transition-colors"
              placeholder="••••••••"
            />
          </div>

          <Button type="submit" fullWidth>
            Iniciar Sesión
          </Button>
        </form>

        <div className="mt-8 text-center pt-8 border-t border-kimezu-bg">
          <p className="text-sm text-kimezu-text">
            ¿Aún no tienes cuenta?{' '}
            <Link to="/register" className="text-kimezu-primary font-bold hover:underline">
              Regístrate aquí
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};
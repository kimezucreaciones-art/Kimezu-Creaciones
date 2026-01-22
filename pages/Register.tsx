import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '../components/Button';

export const Register: React.FC = () => {
  const navigate = useNavigate();

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    navigate('/profile');
  };

  return (
    <div className="pt-24 md:pt-28 pb-24 min-h-screen bg-kimezu-bg flex items-start justify-center px-4">
      <div className="bg-white p-8 md:p-12 shadow-lg max-w-md w-full border border-kimezu-card relative mt-8 md:mt-12">
        <div className="absolute top-0 left-0 w-full h-1 bg-kimezu-primary"></div>

        <h2 className="font-serif text-3xl text-kimezu-title mb-2 text-center">Crear Cuenta</h2>
        <p className="text-kimezu-text text-center text-sm mb-8">Únete a nuestra comunidad artesanal</p>

        <form onSubmit={handleRegister} className="space-y-6">
          <div>
            <label className="block text-xs font-bold uppercase tracking-widest text-kimezu-title mb-2">
              Nombre Completo
            </label>
            <input 
              type="text" 
              required
              className="w-full bg-kimezu-bg border border-kimezu-card px-4 py-3 text-kimezu-title focus:outline-none focus:border-kimezu-primary transition-colors"
              placeholder="Tu nombre"
            />
          </div>

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
            <label className="block text-xs font-bold uppercase tracking-widest text-kimezu-title mb-2">
              Contraseña
            </label>
            <input 
              type="password" 
              required
              className="w-full bg-kimezu-bg border border-kimezu-card px-4 py-3 text-kimezu-title focus:outline-none focus:border-kimezu-primary transition-colors"
              placeholder="••••••••"
            />
          </div>

          <Button type="submit" fullWidth>
            Registrarse
          </Button>
        </form>

        <div className="mt-8 text-center pt-8 border-t border-kimezu-bg">
          <p className="text-sm text-kimezu-text">
            ¿Ya tienes cuenta?{' '}
            <Link to="/login" className="text-kimezu-primary font-bold hover:underline">
              Inicia sesión
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};
import React, { useState, useEffect } from 'react';
import { supabase } from '../services/supabase';
import { useNavigate, Link } from 'react-router-dom';
import { Button } from '../components/Button';
import { Lock, Mail } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const { session } = useAuth();

  // Redirect if already logged in
  useEffect(() => {
    if (session) {
      navigate('/profile');
    }
  }, [session, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setError(error.message === 'Invalid login credentials' ? 'Correo o contraseña incorrectos.' : error.message);
    } else {
      navigate('/profile');
    }
    setLoading(false);
  };

  return (
    <div className="pt-28 pb-24 min-h-screen bg-kimezu-bg flex items-start justify-center px-4">
      <div className="bg-white p-8 md:p-12 rounded-sm shadow-xl max-w-md w-full border border-kimezu-card relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-1 bg-kimezu-primary"></div>
        <h2 className="font-serif text-3xl text-center text-kimezu-title mb-2">Bienvenido de nuevo</h2>
        <p className="text-center text-kimezu-text mb-8 text-sm">Ingresa a tu cuenta para gestionar tus pedidos.</p>

        {error && (
          <div className="bg-red-50 text-red-600 p-3 rounded mb-4 text-sm text-center border border-red-100">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="relative group">
            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-stone-400 group-focus-within:text-kimezu-primary transition-colors" size={20} />
            <input
              type="email"
              placeholder="Correo Electrónico"
              className="w-full bg-stone-50 border border-stone-200 pl-10 pr-4 py-3 outline-none focus:border-kimezu-primary transition-all"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="relative group">
            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-stone-400 group-focus-within:text-kimezu-primary transition-colors" size={20} />
            <input
              type="password"
              placeholder="Contraseña"
              className="w-full bg-stone-50 border border-stone-200 pl-10 pr-4 py-3 outline-none focus:border-kimezu-primary transition-all"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <Button type="submit" variant="primary" className="w-full justify-center py-3" disabled={loading}>
            {loading ? 'Iniciando sesión...' : 'Ingresar'}
          </Button>
        </form>

        <div className="mt-6 text-center text-xs text-stone-500">
          ¿No tienes una cuenta? <Link to="/register" className="text-kimezu-primary font-bold hover:underline">Regístrate aquí</Link>
        </div>
      </div>
    </div>
  );
};
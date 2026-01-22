import React, { useState } from 'react';
import { supabase } from '../services/supabase';
import { useNavigate, Link } from 'react-router-dom';
import { Button } from '../components/Button';
import { Lock, Mail, User } from 'lucide-react';

export const Register: React.FC = () => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError('Las contraseñas no coinciden.');
      return;
    }

    setLoading(true);
    setError(null);

    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: fullName,
        },
      },
    });

    if (error) {
      setError(error.message);
    } else {
      alert('Registro exitoso. ¡Bienvenido!');
      navigate('/profile');
    }
    setLoading(false);
  };

  return (
    <div className="pt-32 pb-24 min-h-screen bg-kimezu-bg flex items-center justify-center px-4">
      <div className="bg-white p-8 md:p-12 rounded-sm shadow-xl max-w-md w-full border border-kimezu-card relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-1 bg-kimezu-primary"></div>
        <h2 className="font-serif text-3xl text-center text-kimezu-title mb-2">Crear Cuenta</h2>
        <p className="text-center text-kimezu-text mb-8 text-sm">Únete a Kimezu para guardar tus favoritos y realizar pedidos.</p>

        {error && (
          <div className="bg-red-50 text-red-600 p-3 rounded mb-4 text-sm text-center border border-red-100">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="relative group">
            <User className="absolute left-3 top-1/2 -translate-y-1/2 text-stone-400 group-focus-within:text-kimezu-primary transition-colors" size={20} />
            <input
              type="text"
              placeholder="Nombre Completo"
              className="w-full bg-stone-50 border border-stone-200 pl-10 pr-4 py-3 outline-none focus:border-kimezu-primary transition-all"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              required
            />
          </div>

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
              minLength={6}
            />
          </div>

          <div className="relative group">
            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-stone-400 group-focus-within:text-kimezu-primary transition-colors" size={20} />
            <input
              type="password"
              placeholder="Confirmar Contraseña"
              className="w-full bg-stone-50 border border-stone-200 pl-10 pr-4 py-3 outline-none focus:border-kimezu-primary transition-all"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>

          <Button type="submit" variant="primary" className="w-full justify-center py-3 mt-4" disabled={loading}>
            {loading ? 'Creando cuenta...' : 'Registrarse'}
          </Button>
        </form>

        <div className="mt-6 text-center text-xs text-stone-500">
          ¿Ya tienes cuenta? <Link to="/login" className="text-kimezu-primary font-bold hover:underline">Inicia sesión</Link>
        </div>
      </div>
    </div>
  );
};
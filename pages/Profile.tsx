import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { supabase } from '../services/supabase';
import { Button } from '../components/Button';
import { Camera, MapPin, Ticket, User as UserIcon, LogOut, Loader, Sparkles } from 'lucide-react';
import { COLOMBIA_LOCATIONS } from '../utils/locations';

// Profile Data Interface matching the DB schema
interface ProfileData {
  full_name: string;
  username: string;
  phone: string;
  birth_date: string;
  department: string;
  municipality: string;
  address: string;
  photo_url: string;
}

export const Profile: React.FC = () => {
  const { session, user, signOut } = useAuth();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [profile, setProfile] = useState<ProfileData>({
    full_name: '',
    username: '',
    phone: '',
    birth_date: '',
    department: '',
    municipality: '',
    address: '',
    photo_url: ''
  });

  // Derived state for dropdowns
  const municipalities = profile.department ? COLOMBIA_LOCATIONS[profile.department]?.sort() || [] : [];

  useEffect(() => {
    if (!session) {
      navigate('/login');
    } else if (user) {
      fetchProfile();
    }
  }, [session, user, navigate]);

  const fetchProfile = async () => {
    try {
      setLoading(true);
      if (!user) return;

      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single();

      if (error) {
        console.error('Error fetching profile:', error);
      } else if (data) {
        setProfile({
          full_name: data.full_name || user.user_metadata.full_name || '',
          username: data.username || '',
          phone: data.phone || '',
          birth_date: data.birth_date || '',
          department: data.department || '',
          municipality: data.municipality || '',
          address: data.address || '',
          photo_url: data.photo_url || ''
        });
      }
    } finally {
      setLoading(false);
    }
  };

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    try {
      setSaving(true);
      const { error } = await supabase
        .from('profiles')
        .update({
          username: profile.username,
          phone: profile.phone,
          birth_date: profile.birth_date,
          department: profile.department,
          municipality: profile.municipality,
          address: profile.address,
          photo_url: profile.photo_url,
          updated_at: new Date().toISOString(),
        })
        .eq('id', user.id);

      if (error) throw error;
      alert('Perfil actualizado correctamente');
    } catch (error: any) {
      console.error('Error updating profile:', error);
      alert('Error al guardar: ' + error.message);
    } finally {
      setSaving(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setProfile(prev => ({ ...prev, [name]: value }));
  };

  const handlePhotoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) return;

    // NOTE: This will fail if the 'images' bucket is not created or public policies are not set.
    const file = e.target.files[0];
    const fileExt = file.name.split('.').pop();
    const fileName = `${user?.id}-${Math.random()}.${fileExt}`;
    const filePath = `profiles/${fileName}`; // Folder 'profiles/' inside 'images' bucket

    try {
      setSaving(true);
      const { error: uploadError } = await supabase.storage
        .from('images')
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      // Get Public URL
      const { data: { publicUrl } } = supabase.storage
        .from('images')
        .getPublicUrl(filePath);

      setProfile(prev => ({ ...prev, photo_url: publicUrl }));

      // Auto-save the new URL
      await supabase.from('profiles').update({ photo_url: publicUrl }).eq('id', user?.id);

    } catch (error: any) {
      console.error('Error uploading photo:', error);
      alert('Error al subir foto (asegúrate de haber creado el bucket "images"): ' + error.message);
    } finally {
      setSaving(false);
    }
  };

  const handleLogout = async () => {
    await signOut();
    navigate('/login');
  };

  if (loading) return (
    <div className="min-h-screen bg-kimezu-bg flex items-center justify-center">
      <Loader className="animate-spin text-kimezu-primary" size={32} />
    </div>
  );

  return (
    <div className="pt-20 md:pt-24 pb-24 min-h-screen bg-kimezu-bg">
      <div className="container mx-auto px-4 md:px-8">

        <div className="flex justify-between items-center mb-6 border-b border-kimezu-card pb-4">
          <h1 className="font-serif text-3xl md:text-4xl text-kimezu-title">
            Mi Perfil
          </h1>
          <Button variant="outline" onClick={handleLogout} className="text-red-500 border-red-200 hover:bg-red-50">
            <LogOut size={16} className="mr-2" /> Salir
          </Button>
        </div>

        <div className="flex flex-col lg:flex-row gap-12">

          {/* Main Info Column */}
          <div className="lg:w-2/3 space-y-8">

            <form onSubmit={handleUpdate} className="space-y-8">
              {/* Photo Section */}
              <div className="flex items-center space-x-6">
                <div className="relative group">
                  <div className="w-24 h-24 rounded-full overflow-hidden border-2 border-kimezu-primary bg-stone-200">
                    {profile.photo_url ? (
                      <img src={profile.photo_url} alt="Profile" className="w-full h-full object-cover" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-stone-400">
                        <UserIcon size={40} />
                      </div>
                    )}
                  </div>
                  <label className="absolute inset-0 flex items-center justify-center bg-black/40 text-white opacity-0 group-hover:opacity-100 rounded-full cursor-pointer transition-opacity">
                    <Camera size={24} />
                    <input type="file" className="hidden" accept="image/*" onChange={handlePhotoUpload} />
                  </label>
                </div>
                <div>
                  <h3 className="font-serif text-xl text-kimezu-title">
                    {profile.full_name || 'Usuario'}
                  </h3>
                  <p className="text-xs text-kimezu-text mt-1">{user?.email}</p>
                </div>
              </div>

              {/* Personal Info */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-widest text-kimezu-title mb-2">
                    Nombre de Usuario (Tienda)
                  </label>
                  <input
                    name="username"
                    value={profile.username}
                    onChange={handleChange}
                    type="text"
                    className="w-full bg-white border border-kimezu-card px-4 py-3 focus:border-kimezu-primary outline-none"
                    placeholder="Ej. KimezuLover"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-widest text-kimezu-title mb-2">
                    Teléfono (Colombia)
                  </label>
                  <div className="flex">
                    <span className="bg-kimezu-card text-kimezu-title px-3 py-3 text-sm border border-r-0 border-kimezu-card font-bold flex items-center">
                      +57
                    </span>
                    <input
                      name="phone"
                      value={profile.phone}
                      onChange={handleChange}
                      type="tel"
                      className="w-full bg-white border border-kimezu-card px-4 py-3 focus:border-kimezu-primary outline-none"
                      placeholder="300 123 4567"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-widest text-kimezu-title mb-2">
                    Fecha de Nacimiento
                  </label>
                  <input
                    name="birth_date"
                    value={profile.birth_date}
                    onChange={handleChange}
                    type="date"
                    className="w-full bg-white border border-kimezu-card px-4 py-3 focus:border-kimezu-primary outline-none text-kimezu-text"
                  />
                </div>
              </div>

              {/* Address Section */}
              <div className="bg-white p-6 border border-kimezu-card mt-8 shadow-sm">
                <div className="flex items-center gap-2 mb-6">
                  <MapPin size={20} className="text-kimezu-primary" />
                  <h3 className="font-serif text-xl text-kimezu-title">Dirección de Envío Principal</h3>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-widest text-kimezu-title mb-2">
                      Departamento
                    </label>
                    <select
                      name="department"
                      value={profile.department}
                      onChange={handleChange}
                      className="w-full bg-kimezu-bg border border-kimezu-card px-4 py-3 focus:border-kimezu-primary outline-none text-kimezu-text"
                    >
                      <option value="">Seleccionar...</option>
                      {Object.keys(COLOMBIA_LOCATIONS).sort().map(dept => (
                        <option key={dept} value={dept}>{dept}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-widest text-kimezu-title mb-2">
                      Municipio
                    </label>
                    <select
                      name="municipality"
                      value={profile.municipality}
                      onChange={handleChange}
                      disabled={!profile.department}
                      className="w-full bg-kimezu-bg border border-kimezu-card px-4 py-3 focus:border-kimezu-primary outline-none text-kimezu-text disabled:opacity-50"
                    >
                      <option value="">Seleccionar...</option>
                      {municipalities.map(city => (
                        <option key={city} value={city}>{city}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-widest text-kimezu-title mb-2">
                    Dirección Exacta
                  </label>
                  <input
                    name="address"
                    value={profile.address}
                    onChange={handleChange}
                    type="text"
                    className="w-full bg-kimezu-bg border border-kimezu-card px-4 py-3 focus:border-kimezu-primary outline-none"
                    placeholder="Calle 123 # 45-67, Barrio..."
                  />
                </div>
              </div>

              <div className="pt-4 flex items-center gap-4">
                <Button type="submit" disabled={saving}>
                  {saving ? 'Guardando...' : 'Guardar Cambios'}
                </Button>
                {saving && <span className="text-xs text-kimezu-primary animate-pulse">Sincronizando con la nube...</span>}
              </div>
            </form>
          </div>

          {/* Sidebar / Coupons */}
          <div className="lg:w-1/3">
            <div className="bg-kimezu-card/20 p-6 border border-kimezu-card sticky top-24">

              {/* Admin Access Link (Only for kaieke37@gmail.com) */}
              {user?.email === 'kaieke37@gmail.com' && (
                <div className="bg-kimezu-title text-white p-6 rounded-sm shadow-md mb-8">
                  <h3 className="font-bold mb-2 flex items-center gap-2">
                    <UserIcon size={18} /> Panel de Administrador
                  </h3>
                  <p className="text-xs text-stone-300 mb-4">Acceso exclusivo para gestión de tienda.</p>
                  <Button onClick={() => navigate('/admin')} className="w-full bg-white text-kimezu-title hover:bg-stone-200 border-none justify-center">
                    Ir al Panel
                  </Button>
                </div>
              )}

              <div className="flex items-center gap-2 mb-6 text-kimezu-primary">
                <Ticket size={20} />
                <h3 className="font-serif text-xl text-kimezu-title">Mis Cupones</h3>
              </div>

              <div className="space-y-4">
                {/* Simulated Coupons (Ideally fetched from DB too) */}
                <div className="bg-white border-l-4 border-kimezu-primary p-4 shadow-sm relative overflow-hidden group">
                  <div className="absolute top-0 right-0 w-16 h-16 bg-kimezu-primary/10 rounded-bl-full -mr-8 -mt-8"></div>
                  <span className="text-xs font-bold text-kimezu-primary uppercase tracking-widest">Activo</span>
                  <div className="flex justify-between items-end mt-2">
                    <div>
                      <span className="block text-2xl font-serif text-kimezu-title font-bold">15% OFF</span>
                      <span className="text-xs text-kimezu-text">En velas aromáticas</span>
                    </div>
                    <div className="text-right">
                      <span className="text-[10px] text-stone-400 block uppercase mb-1">Código</span>
                      <span className="bg-kimezu-bg px-2 py-1 text-xs font-mono font-bold text-kimezu-title border border-dashed border-kimezu-title/30">KIMEZU15</span>
                    </div>
                  </div>
                </div>

                <div className="bg-white border-l-4 border-kimezu-green p-4 shadow-sm relative overflow-hidden group">
                  <div className="flex items-center gap-2 mb-1">
                    <Sparkles size={12} className="text-kimezu-green" />
                    <span className="text-xs font-bold text-kimezu-green uppercase tracking-widest">Bienvenida</span>
                  </div>
                  <div className="flex justify-between items-end mt-2">
                    <div>
                      <span className="block text-2xl font-serif text-kimezu-title font-bold">ENVÍO GRATIS</span>
                      <span className="text-xs text-kimezu-text">Primera compra</span>
                    </div>
                    <div className="text-right">
                      <Button variant="outline" className="text-[10px] px-2 h-7 py-0">Copiar</Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};
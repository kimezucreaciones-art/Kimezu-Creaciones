import React, { useState } from 'react';
import { Button } from '../components/Button';
import { Camera, MapPin, Ticket, User as UserIcon } from 'lucide-react';
import { COLOMBIA_LOCATIONS } from '../utils/locations';

export const Profile: React.FC = () => {
  const [selectedDept, setSelectedDept] = useState<string>('');
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setPhotoPreview(URL.createObjectURL(e.target.files[0]));
    }
  };

  const departments = Object.keys(COLOMBIA_LOCATIONS).sort();
  const municipalities = selectedDept ? COLOMBIA_LOCATIONS[selectedDept].sort() : [];

  return (
    <div className="pt-20 md:pt-24 pb-24 min-h-screen bg-kimezu-bg">
      <div className="container mx-auto px-4 md:px-8">
        
        <div className="flex flex-col lg:flex-row gap-12">
          
          {/* Main Info Column */}
          <div className="lg:w-2/3 space-y-8">
            <h1 className="font-serif text-3xl md:text-4xl text-kimezu-title border-b border-kimezu-card pb-4">
              Mi Perfil
            </h1>

            <form className="space-y-8">
              {/* Photo Section */}
              <div className="flex items-center space-x-6">
                <div className="relative group">
                  <div className="w-24 h-24 rounded-full overflow-hidden border-2 border-kimezu-primary bg-stone-200">
                    {photoPreview ? (
                      <img src={photoPreview} alt="Profile" className="w-full h-full object-cover" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-stone-400">
                        <UserIcon size={40} />
                      </div>
                    )}
                  </div>
                  <label className="absolute inset-0 flex items-center justify-center bg-black/40 text-white opacity-0 group-hover:opacity-100 rounded-full cursor-pointer transition-opacity">
                    <Camera size={24} />
                    <input type="file" className="hidden" accept="image/*" onChange={handlePhotoChange} />
                  </label>
                </div>
                <div>
                  <h3 className="font-serif text-xl text-kimezu-title">Tu Foto</h3>
                  <p className="text-xs text-kimezu-text mt-1">Haz clic en la imagen para cambiarla.</p>
                </div>
              </div>

              {/* Personal Info */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-widest text-kimezu-title mb-2">
                    Nombre de Usuario (Tienda)
                  </label>
                  <input type="text" className="w-full bg-white border border-kimezu-card px-4 py-3 focus:border-kimezu-primary outline-none" placeholder="KimezuLover" />
                </div>
                
                <div>
                  <label className="block text-xs font-bold uppercase tracking-widest text-kimezu-title mb-2">
                    Teléfono (Colombia)
                  </label>
                  <div className="flex">
                    <span className="bg-kimezu-card text-kimezu-title px-3 py-3 text-sm border border-r-0 border-kimezu-card font-bold flex items-center">
                      +57
                    </span>
                    <input type="tel" className="w-full bg-white border border-kimezu-card px-4 py-3 focus:border-kimezu-primary outline-none" placeholder="300 123 4567" />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-widest text-kimezu-title mb-2">
                    Fecha de Nacimiento
                  </label>
                  <input type="date" className="w-full bg-white border border-kimezu-card px-4 py-3 focus:border-kimezu-primary outline-none text-kimezu-text" />
                </div>
              </div>

              {/* Address Section */}
              <div className="bg-white p-6 border border-kimezu-card mt-8">
                <div className="flex items-center gap-2 mb-6">
                  <MapPin size={20} className="text-kimezu-primary" />
                  <h3 className="font-serif text-xl text-kimezu-title">Dirección de Envío</h3>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-widest text-kimezu-title mb-2">
                      Departamento
                    </label>
                    <select 
                      value={selectedDept}
                      onChange={(e) => setSelectedDept(e.target.value)}
                      className="w-full bg-kimezu-bg border border-kimezu-card px-4 py-3 focus:border-kimezu-primary outline-none text-kimezu-text"
                    >
                      <option value="">Seleccionar...</option>
                      {departments.map(dept => <option key={dept} value={dept}>{dept}</option>)}
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-widest text-kimezu-title mb-2">
                      Municipio
                    </label>
                    <select 
                      disabled={!selectedDept}
                      className="w-full bg-kimezu-bg border border-kimezu-card px-4 py-3 focus:border-kimezu-primary outline-none text-kimezu-text disabled:opacity-50"
                    >
                      <option value="">Seleccionar...</option>
                      {municipalities.map(city => <option key={city} value={city}>{city}</option>)}
                    </select>
                  </div>
                </div>
                
                <div>
                  <label className="block text-xs font-bold uppercase tracking-widest text-kimezu-title mb-2">
                    Dirección Exacta
                  </label>
                  <input type="text" className="w-full bg-kimezu-bg border border-kimezu-card px-4 py-3 focus:border-kimezu-primary outline-none" placeholder="Calle 123 # 45-67, Barrio..." />
                </div>
              </div>

              <div className="pt-4">
                <Button>Guardar Cambios</Button>
              </div>
            </form>
          </div>

          {/* Sidebar / Coupons */}
          <div className="lg:w-1/3">
            <div className="bg-kimezu-card/20 p-6 border border-kimezu-card sticky top-24">
              <div className="flex items-center gap-2 mb-6 text-kimezu-primary">
                <Ticket size={20} />
                <h3 className="font-serif text-xl text-kimezu-title">Mis Cupones</h3>
              </div>

              <div className="space-y-4">
                {/* Coupon 1 */}
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

                {/* Coupon 2 */}
                <div className="bg-white border-l-4 border-kimezu-green p-4 shadow-sm relative overflow-hidden group">
                  <span className="text-xs font-bold text-kimezu-green uppercase tracking-widest">Bienvenida</span>
                  <div className="flex justify-between items-end mt-2">
                    <div>
                      <span className="block text-2xl font-serif text-kimezu-title font-bold">ENVÍO GRATIS</span>
                      <span className="text-xs text-kimezu-text">Primera compra</span>
                    </div>
                    <div className="text-right">
                      <span className="text-[10px] text-stone-400 block uppercase mb-1">Código</span>
                      <span className="bg-kimezu-bg px-2 py-1 text-xs font-mono font-bold text-kimezu-title border border-dashed border-kimezu-title/30">HOLA2024</span>
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
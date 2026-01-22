import React, { useState } from 'react';
import { Button } from '../components/Button';
import { SectionSeparator } from '../components/SectionSeparator';
import { MessageCircle, PenTool, Gift, Star } from 'lucide-react';
import { useProducts } from '../context/ProductContext';

export const CustomRequest: React.FC = () => {
   const { getAssetUrl } = useProducts();
   const [formData, setFormData] = useState({
      name: '',
      occasion: '',
      scent: '',
      details: ''
   });

   const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
      setFormData({ ...formData, [e.target.name]: e.target.value });
   };

   const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();

      // Format the message for WhatsApp
      const message = `👋 Hola Kimezu! Tengo una idea para una vela personalizada:
    
👤 *Nombre:* ${formData.name}
🎁 *Ocasión:* ${formData.occasion}
🌿 *Aroma Preferido:* ${formData.scent}
✨ *Detalles de la idea:* ${formData.details}`;

      const phoneNumber = "573001234567"; // Replace with real number
      const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

      window.open(whatsappUrl, '_blank');
   };

   return (
      <div className="pt-4 md:pt-12 pb-24 min-h-screen bg-kimezu-bg">
         <div className="container mx-auto px-4 md:px-8">

            <div className="max-w-3xl mx-auto text-center mb-6 md:mb-16 animate-fade-in-up">
               <span className="text-xs font-bold uppercase tracking-widest text-kimezu-pink mb-3 block">Taller Creativo</span>
               <h1 className="text-4xl md:text-6xl font-serif text-kimezu-title mb-6">Diseña tu Vela</h1>
               <p className="text-lg text-kimezu-text leading-relaxed">
                  ¿Tienes una boda, un evento corporativo o simplemente una idea única en mente?
                  Cuéntanos tu visión y nosotros la convertiremos en aroma y luz.
               </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start max-w-6xl mx-auto">

               {/* Form Side - Stationery Card Effect */}
               <div className="bg-white p-10 md:p-14 shadow-2xl relative order-2 lg:order-1 border border-stone-100">
                  {/* Decorative Tape effect */}
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-32 h-8 bg-kimezu-bg/50 rotate-1 shadow-sm backdrop-blur-sm"></div>

                  {/* Inner Border */}
                  <div className="absolute inset-4 border border-kimezu-title/10 pointer-events-none"></div>

                  <div className="relative z-10">
                     <h3 className="font-serif text-2xl text-kimezu-title mb-8 text-center">Hoja de Pedido</h3>

                     <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                           <label className="block text-xs font-bold uppercase tracking-widest text-kimezu-title mb-2">Tu Nombre</label>
                           <input
                              name="name"
                              required
                              value={formData.name}
                              onChange={handleChange}
                              type="text"
                              className="w-full bg-stone-50 border-b border-stone-300 px-4 py-3 focus:bg-white focus:border-kimezu-pink outline-none transition-colors"
                              placeholder="¿Cómo te llamas?"
                           />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                           <div>
                              <label className="block text-xs font-bold uppercase tracking-widest text-kimezu-title mb-2">Ocasión</label>
                              <select
                                 name="occasion"
                                 value={formData.occasion}
                                 onChange={handleChange}
                                 className="w-full bg-stone-50 border-b border-stone-300 px-4 py-3 focus:bg-white focus:border-kimezu-pink outline-none transition-colors text-kimezu-text"
                              >
                                 <option value="">Selecciona...</option>
                                 <option value="Regalo Personal">Regalo Personal</option>
                                 <option value="Boda / Evento">Boda / Evento</option>
                                 <option value="Corporativo">Corporativo</option>
                                 <option value="Decoración Hogar">Decoración Hogar</option>
                                 <option value="Otro">Otro</option>
                              </select>
                           </div>
                           <div>
                              <label className="block text-xs font-bold uppercase tracking-widest text-kimezu-title mb-2">Preferencia Aromática</label>
                              <input
                                 name="scent"
                                 value={formData.scent}
                                 onChange={handleChange}
                                 type="text"
                                 className="w-full bg-stone-50 border-b border-stone-300 px-4 py-3 focus:bg-white focus:border-kimezu-pink outline-none transition-colors"
                                 placeholder="Ej. Cítrico, Amaderado..."
                              />
                           </div>
                        </div>

                        <div>
                           <label className="block text-xs font-bold uppercase tracking-widest text-kimezu-title mb-2">Cuéntanos tu idea</label>
                           <textarea
                              name="details"
                              required
                              value={formData.details}
                              onChange={handleChange}
                              rows={5}
                              className="w-full bg-stone-50 border-b border-stone-300 px-4 py-3 focus:bg-white focus:border-kimezu-pink outline-none transition-colors resize-none"
                              placeholder="Describe los colores, el tipo de envase, la etiqueta o cualquier detalle especial que desees..."
                           ></textarea>
                        </div>

                        <div className="pt-4">
                           <Button type="submit" fullWidth className="group bg-kimezu-pink hover:bg-kimezu-title text-white border-transparent">
                              <MessageCircle size={20} className="mr-2 group-hover:animate-bounce" />
                              Enviar Solicitud
                           </Button>
                        </div>
                        <p className="text-[10px] text-center text-kimezu-text mt-2 italic">
                           Serás redirigido a WhatsApp.
                        </p>
                     </form>
                  </div>
               </div>

               {/* Info/Inspo Side - Centered Items on Mobile */}
               <div className="space-y-12 lg:pt-10 order-1 lg:order-2">
                  <div className="relative h-80 w-full overflow-hidden shadow-xl rotate-2 hover:rotate-0 transition-transform duration-500 border-8 border-white">
                     {/* Changed to use Dynamic Asset */}
                     <img
                        src={getAssetUrl('custom_request_main')}
                        alt="Velas personalizadas"
                        className="w-full h-full object-cover"
                     />
                  </div>

                  <div className="pl-4 border-l-2 border-kimezu-pink space-y-8">
                     <div className="flex flex-col md:flex-row items-center md:items-start text-center md:text-left gap-4">
                        <div className="bg-white p-3 h-fit shadow-md">
                           <PenTool size={24} className="text-kimezu-title" />
                        </div>
                        <div>
                           <h4 className="font-serif text-xl text-kimezu-title mb-1">Diseño a Medida</h4>
                           <p className="text-sm text-kimezu-text leading-relaxed">Etiquetas con tu logo, fechas especiales o mensajes personales impresos en papel texturizado.</p>
                        </div>
                     </div>

                     <div className="flex flex-col md:flex-row items-center md:items-start text-center md:text-left gap-4">
                        <div className="bg-white p-3 h-fit shadow-md">
                           <Gift size={24} className="text-kimezu-title" />
                        </div>
                        <div>
                           <h4 className="font-serif text-xl text-kimezu-title mb-1">Packaging de Lujo</h4>
                           <p className="text-sm text-kimezu-text leading-relaxed">Cajas individuales, lazos de seda y tarjetas de agradecimiento incluidas.</p>
                        </div>
                     </div>

                     <div className="flex flex-col md:flex-row items-center md:items-start text-center md:text-left gap-4">
                        <div className="bg-white p-3 h-fit shadow-md">
                           <Star size={24} className="text-kimezu-title" />
                        </div>
                        <div>
                           <h4 className="font-serif text-xl text-kimezu-title mb-1">Descuentos por Volumen</h4>
                           <p className="text-sm text-kimezu-text leading-relaxed">Precios especiales para pedidos superiores a 12 unidades.</p>
                        </div>
                     </div>
                  </div>
               </div>

            </div>
         </div>
      </div>
   );
};
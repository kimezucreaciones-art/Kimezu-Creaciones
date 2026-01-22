import React, { useState, useRef } from 'react';
import { useProducts } from '../context/ProductContext';
import { Product, Pack } from '../types';
import { Button } from '../components/Button';
import { Plus, Edit, Trash2, X, Save, Search, Upload, Image as ImageIcon, Layout, Box, Gift, Check, Loader } from 'lucide-react';
import { formatCOP } from '../utils/currency';
import { supabase } from '../services/supabase';

const EMPTY_PRODUCT: Product = {
  id: '',
  name: '',
  price: 0,
  description: '',
  longDescription: '',
  images: [],
  category: 'vela',
  availableForBundle: true,
  specs: {
    burnTime: '',
    wax: 'Soja 100% Natural',
    wick: '',
    notes: '',
    weight: ''
  }
};

const EMPTY_PACK: Pack = {
  id: '',
  name: '',
  description: '',
  price: 0,
  originalPrice: 0,
  image: '',
  items: [],
  tagText: '',
  tagColor: 'green'
};

export const AdminDashboard: React.FC = () => {
  const {
    products, addProduct, updateProduct, deleteProduct,
    packs, addPack, updatePack, deletePack,
    siteAssets, updateAsset
  } = useProducts();

  // Tabs: 'products' | 'packs' | 'assets'
  const [activeTab, setActiveTab] = useState<'products' | 'packs' | 'assets'>('products');

  // Product State
  const [isEditing, setIsEditing] = useState(false);
  const [currentProduct, setCurrentProduct] = useState<Product>(EMPTY_PRODUCT);

  // Pack State
  const [isEditingPack, setIsEditingPack] = useState(false);
  const [currentPack, setCurrentPack] = useState<Pack>(EMPTY_PACK);
  const [packItemsString, setPackItemsString] = useState(''); // Helper for textarea

  const [filter, setFilter] = useState('');
  const [uploading, setUploading] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const packFileInputRef = useRef<HTMLInputElement>(null);
  const assetFileInputRef = useRef<HTMLInputElement>(null);
  const [editingAssetKey, setEditingAssetKey] = useState<string | null>(null);

  // Get unique categories for autocomplete
  const existingCategories = Array.from(new Set(products.map(p => p.category)));

  // --- HELPER: UPLOAD IMAGE TO SUPABASE ---
  const uploadImageToSupabase = async (file: File, folder: string = 'products'): Promise<string | null> => {
    try {
      setUploading(true);
      const fileExt = file.name.split('.').pop();
      const fileName = `${folder}/${Math.random()}.${fileExt}`;

      const { error: uploadError } = await supabase.storage
        .from('images') // Ensure bucket "images" exists
        .upload(fileName, file);

      if (uploadError) throw uploadError;

      const { data: { publicUrl } } = supabase.storage
        .from('images')
        .getPublicUrl(fileName);

      return publicUrl;
    } catch (error) {
      console.error("Upload failed", error);
      alert("Error subiendo imagen. Verifica que el bucket 'images' exista y sea público.");
      return null;
    } finally {
      setUploading(false);
    }
  };

  // --- PRODUCT HANDLERS ---
  const handleEdit = (product: Product) => {
    setCurrentProduct(product);
    setIsEditing(true);
  };

  const handleAddNew = () => {
    // Generate ID for new product immediately or let DB handle it?
    // Current flow uses string ID. Let's use timestamp for now or UUID if we changed it.
    // Since SQL uses text ID, timestamp is fine/safe.
    setCurrentProduct({ ...EMPTY_PRODUCT, id: Date.now().toString() });
    setIsEditing(true);
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('¿Estás seguro de que quieres eliminar este producto?')) {
      await deleteProduct(id);
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    const exists = products.find(p => p.id === currentProduct.id);
    if (exists) {
      await updateProduct(currentProduct);
    } else {
      await addProduct(currentProduct);
    }
    setIsEditing(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;

    if (name.startsWith('spec_')) {
      const specField = name.replace('spec_', '');
      setCurrentProduct(prev => ({
        ...prev,
        specs: { ...prev.specs, [specField]: value }
      }));
      return;
    }

    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked;
      setCurrentProduct(prev => ({ ...prev, [name]: checked }));
      return;
    }

    if (type === 'number') {
      setCurrentProduct(prev => ({ ...prev, [name]: parseFloat(value) }));
      return;
    }

    setCurrentProduct(prev => ({ ...prev, [name]: value }));
  };

  const handleProductImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const newFiles = Array.from(e.target.files);
      const uploadedUrls: string[] = [];

      for (const file of newFiles) {
        const url = await uploadImageToSupabase(file, 'products');
        if (url) uploadedUrls.push(url);
      }

      setCurrentProduct(prev => ({
        ...prev,
        images: [...prev.images, ...uploadedUrls]
      }));
    }
  };

  const removeProductImage = (index: number) => {
    setCurrentProduct(prev => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index)
    }));
  };

  // --- PACK HANDLERS ---
  const handleEditPack = (pack: Pack) => {
    setCurrentPack(pack);
    setPackItemsString(pack.items.join('\n'));
    setIsEditingPack(true);
  };

  const handleAddNewPack = () => {
    setCurrentPack({ ...EMPTY_PACK, id: Date.now().toString() });
    setPackItemsString('');
    setIsEditingPack(true);
  };

  const handleDeletePack = (id: string) => {
    if (window.confirm('¿Estás seguro de que quieres eliminar este combo?')) {
      deletePack(id);
    }
  };

  const handleSavePack = (e: React.FormEvent) => {
    e.preventDefault();
    // Convert items string back to array
    const itemsArray = packItemsString.split('\n').filter(item => item.trim() !== '');

    const packToSave = { ...currentPack, items: itemsArray };

    const exists = packs.find(p => p.id === packToSave.id);
    if (exists) {
      updatePack(packToSave);
    } else {
      addPack(packToSave);
    }
    setIsEditingPack(false);
  };

  const handleChangePack = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    if (type === 'number') {
      setCurrentPack(prev => ({ ...prev, [name]: parseFloat(value) }));
      return;
    }
    setCurrentPack(prev => ({ ...prev, [name]: value }));
  };

  const handlePackImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const url = await uploadImageToSupabase(e.target.files[0], 'packs');
      if (url) {
        setCurrentPack(prev => ({ ...prev, image: url }));
      }
    }
  };

  // --- SITE ASSET HANDLERS ---
  const handleAssetUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0] && editingAssetKey) {
      const url = await uploadImageToSupabase(e.target.files[0], 'site');
      if (url) {
        updateAsset(editingAssetKey, url);
        setEditingAssetKey(null); // Close input logic
      }
    }
  };

  const triggerAssetUpload = (key: string) => {
    setEditingAssetKey(key);
    setTimeout(() => assetFileInputRef.current?.click(), 100);
  };

  const filteredProducts = products.filter(p => p.name.toLowerCase().includes(filter.toLowerCase()));

  return (
    <div className="pt-20 md:pt-32 pb-24 min-h-screen bg-kimezu-bg">
      <div className="container mx-auto px-4 md:px-8">

        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-8 border-b border-kimezu-title/10 pb-6 gap-4">
          <div>
            <h1 className="font-serif text-4xl text-kimezu-title mb-2">Panel Maestro</h1>
            <p className="text-kimezu-text">Control total de productos e imagen del sitio.</p>
          </div>
          <div className="flex gap-2 bg-white p-1 rounded-lg border border-kimezu-card shadow-sm overflow-x-auto">
            <button
              onClick={() => setActiveTab('products')}
              className={`px-4 py-2 rounded text-sm font-bold flex items-center gap-2 transition-all whitespace-nowrap ${activeTab === 'products' ? 'bg-kimezu-title text-white shadow-md' : 'text-kimezu-text hover:bg-stone-50'}`}
            >
              <Box size={16} /> Productos
            </button>
            <button
              onClick={() => setActiveTab('packs')}
              className={`px-4 py-2 rounded text-sm font-bold flex items-center gap-2 transition-all whitespace-nowrap ${activeTab === 'packs' ? 'bg-kimezu-title text-white shadow-md' : 'text-kimezu-text hover:bg-stone-50'}`}
            >
              <Gift size={16} /> Combos
            </button>
            <button
              onClick={() => setActiveTab('assets')}
              className={`px-4 py-2 rounded text-sm font-bold flex items-center gap-2 transition-all whitespace-nowrap ${activeTab === 'assets' ? 'bg-kimezu-title text-white shadow-md' : 'text-kimezu-text hover:bg-stone-50'}`}
            >
              <Layout size={16} /> Imágenes del Sitio
            </button>
          </div>
        </div>

        {/* --- PRODUCTS TAB --- */}
        {activeTab === 'products' && (
          <div className="animate-fade-in">
            {/* Toolbar */}
            <div className="flex flex-col sm:flex-row justify-between gap-4 mb-8">
              <div className="relative max-w-md w-full">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-kimezu-text" size={20} />
                <input
                  type="text"
                  placeholder="Buscar producto..."
                  className="w-full pl-10 pr-4 py-3 bg-white border border-kimezu-card focus:border-kimezu-primary outline-none"
                  value={filter}
                  onChange={(e) => setFilter(e.target.value)}
                />
              </div>
              <Button onClick={handleAddNew} className="flex items-center gap-2 whitespace-nowrap">
                <Plus size={18} /> Nuevo Producto
              </Button>
            </div>

            {/* Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProducts.map(product => (
                <div key={product.id} className="bg-white p-4 border border-kimezu-card shadow-sm group hover:shadow-md transition-all">
                  <div className="flex gap-4">
                    <div className="w-20 h-20 bg-stone-100 flex-shrink-0 overflow-hidden rounded-sm relative">
                      {product.images.length > 0 ? (
                        <>
                          <img src={product.images[0]} alt={product.name} className="w-full h-full object-cover" />
                          {product.images.length > 1 && (
                            <div className="absolute bottom-1 right-1 bg-black/50 text-white text-[10px] px-1.5 rounded-sm">
                              +{product.images.length - 1}
                            </div>
                          )}
                        </>
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-stone-300">
                          <ImageIcon size={24} />
                        </div>
                      )}
                    </div>
                    <div className="flex-1">
                      <h3 className="font-serif text-lg text-kimezu-title leading-tight mb-1">{product.name}</h3>
                      <p className="text-sm font-bold text-kimezu-primary mb-2">{formatCOP(product.price)}</p>
                      <div className="flex gap-2 text-[10px] uppercase font-bold tracking-wider text-stone-400">
                        <span className="bg-stone-100 px-2 py-0.5 rounded">{product.category}</span>
                        {product.availableForBundle && <span className="text-kimezu-green">• En Combos</span>}
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-end gap-2 mt-4 pt-4 border-t border-stone-100">
                    <button onClick={() => handleEdit(product)} className="p-2 text-stone-400 hover:text-kimezu-primary hover:bg-stone-50 rounded transition-colors" title="Editar">
                      <Edit size={18} />
                    </button>
                    <button onClick={() => handleDelete(product.id)} className="p-2 text-stone-400 hover:text-red-500 hover:bg-red-50 rounded transition-colors" title="Eliminar">
                      <Trash2 size={18} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* --- PACKS TAB --- */}
        {activeTab === 'packs' && (
          <div className="animate-fade-in">
            <div className="flex justify-end mb-8">
              <Button onClick={handleAddNewPack} className="flex items-center gap-2">
                <Plus size={18} /> Nuevo Combo
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {packs.map(pack => (
                <div key={pack.id} className="bg-white p-4 border border-kimezu-card shadow-sm group hover:shadow-md transition-all">
                  <div className="h-40 bg-stone-100 mb-4 overflow-hidden rounded-sm relative">
                    <img src={pack.image} alt={pack.name} className="w-full h-full object-cover" />
                    {pack.tagText && (
                      <span className={`absolute top-2 left-2 px-2 py-0.5 text-[10px] text-white font-bold uppercase ${pack.tagColor === 'primary' ? 'bg-kimezu-primary' : 'bg-kimezu-green'}`}>
                        {pack.tagText}
                      </span>
                    )}
                  </div>
                  <h3 className="font-serif text-lg text-kimezu-title leading-tight mb-1">{pack.name}</h3>
                  <p className="text-xs text-stone-500 mb-3 line-clamp-2">{pack.description}</p>

                  <div className="flex justify-between items-end border-t border-stone-100 pt-3">
                    <div>
                      <span className="text-xs text-stone-400 line-through block">{formatCOP(pack.originalPrice)}</span>
                      <span className="text-sm font-bold text-kimezu-primary">{formatCOP(pack.price)}</span>
                    </div>
                    <div className="flex gap-2">
                      <button onClick={() => handleEditPack(pack)} className="p-2 text-stone-400 hover:text-kimezu-primary hover:bg-stone-50 rounded transition-colors" title="Editar">
                        <Edit size={18} />
                      </button>
                      <button onClick={() => handleDeletePack(pack.id)} className="p-2 text-stone-400 hover:text-red-500 hover:bg-red-50 rounded transition-colors" title="Eliminar">
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* --- SITE ASSETS TAB --- */}
        {activeTab === 'assets' && (
          <div className="animate-fade-in grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <input
              ref={assetFileInputRef}
              type="file"
              accept="image/*"
              onChange={handleAssetUpload}
              className="hidden"
            />
            {siteAssets.map(asset => (
              <div key={asset.key} className="bg-white p-4 border border-kimezu-card shadow-sm relative">
                {uploading && editingAssetKey === asset.key && (
                  <div className="absolute inset-0 bg-white/80 z-20 flex items-center justify-center">
                    <Loader className="animate-spin text-kimezu-primary" />
                  </div>
                )}
                <div className="aspect-video bg-stone-100 mb-4 overflow-hidden relative group rounded-sm border border-stone-100">
                  <img src={asset.url} alt={asset.label} className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <Button variant="primary" onClick={() => triggerAssetUpload(asset.key)} className="text-xs py-2 px-4 h-auto">
                      <Upload size={14} className="mr-2" /> Cambiar
                    </Button>
                  </div>
                </div>
                <h3 className="font-bold text-kimezu-title">{asset.label}</h3>
                <p className="text-xs text-kimezu-text mt-1">{asset.description}</p>
              </div>
            ))}
          </div>
        )}

        {/* --- PRODUCT MODAL --- */}
        {isEditing && (
          <div className="fixed inset-0 z-[70] bg-kimezu-title/50 backdrop-blur-sm flex items-center justify-center p-4">
            <div className="bg-white w-full max-w-4xl max-h-[90vh] overflow-y-auto shadow-2xl rounded-sm animate-fade-in-up">

              <div className="sticky top-0 bg-white border-b border-stone-100 p-6 flex justify-between items-center z-10">
                <h2 className="font-serif text-2xl text-kimezu-title">
                  {currentProduct.id ? 'Editar Producto' : 'Crear Producto'}
                </h2>
                <button onClick={() => setIsEditing(false)} className="text-stone-400 hover:text-kimezu-primary">
                  <X size={24} />
                </button>
              </div>

              <form onSubmit={handleSave} className="p-6 md:p-8 space-y-8">

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-6">
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-widest text-kimezu-title mb-2">Nombre</label>
                      <input name="name" value={currentProduct.name} onChange={handleChange} required className="w-full bg-stone-50 border border-stone-200 px-4 py-3 outline-none focus:border-kimezu-primary" />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-bold uppercase tracking-widest text-kimezu-title mb-2">Precio</label>
                        <input type="number" name="price" value={currentProduct.price} onChange={handleChange} required className="w-full bg-stone-50 border border-stone-200 px-4 py-3 outline-none focus:border-kimezu-primary" />
                      </div>
                      <div>
                        <label className="block text-xs font-bold uppercase tracking-widest text-kimezu-title mb-2">Categoría</label>
                        <input
                          list="categories-list"
                          name="category"
                          value={currentProduct.category}
                          onChange={handleChange}
                          className="w-full bg-stone-50 border border-stone-200 px-4 py-3 outline-none focus:border-kimezu-primary"
                          placeholder="Selecciona o escribe..."
                        />
                        <datalist id="categories-list">
                          {existingCategories.map(cat => (
                            <option key={cat} value={cat} />
                          ))}
                        </datalist>
                      </div>
                    </div>
                  </div>

                  {/* Multiple Images Upload Area */}
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-widest text-kimezu-title mb-2">Galería de Imágenes</label>
                    <div className="grid grid-cols-3 gap-2 mb-2">
                      {currentProduct.images.map((img, idx) => (
                        <div key={idx} className="relative aspect-square border border-stone-200 rounded-sm overflow-hidden group">
                          <img src={img} className="w-full h-full object-cover" alt="Product" />
                          <button
                            type="button"
                            onClick={() => removeProductImage(idx)}
                            className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                          >
                            <X size={12} />
                          </button>
                          {idx === 0 && <span className="absolute bottom-0 left-0 right-0 bg-kimezu-primary/80 text-white text-[10px] text-center font-bold">Principal</span>}
                        </div>
                      ))}

                      <div
                        className="aspect-square border-2 border-dashed border-kimezu-card bg-stone-50 hover:bg-white hover:border-kimezu-primary transition-colors flex flex-col items-center justify-center cursor-pointer relative"
                        onClick={() => !uploading && fileInputRef.current?.click()}
                      >
                        {uploading ? <Loader className="animate-spin text-kimezu-primary" /> : (
                          <>
                            <Plus className="text-stone-400" />
                            <span className="text-[10px] uppercase font-bold text-stone-400 mt-1">Agregar</span>
                          </>
                        )}
                      </div>
                    </div>
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept="image/*"
                      multiple // Allow multiple selection
                      onChange={handleProductImageUpload}
                      className="hidden"
                    />
                  </div>
                </div>

                <div className="flex gap-6 border-y border-stone-100 py-6">
                  <label className="flex items-center gap-2 cursor-pointer select-none">
                    <input type="checkbox" name="availableForBundle" checked={currentProduct.availableForBundle} onChange={handleChange} className="accent-kimezu-primary w-5 h-5" />
                    <span className="text-sm font-bold text-kimezu-title">Disponible para Combos</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer select-none">
                    <input type="checkbox" name="bestseller" checked={currentProduct.bestseller || false} onChange={handleChange} className="accent-kimezu-primary w-5 h-5" />
                    <span className="text-sm font-bold text-kimezu-title">Best Seller</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer select-none">
                    <input type="checkbox" name="new" checked={currentProduct.new || false} onChange={handleChange} className="accent-kimezu-primary w-5 h-5" />
                    <span className="text-sm font-bold text-kimezu-title">Nuevo</span>
                  </label>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-widest text-kimezu-title mb-2">Descripción Corta</label>
                    <input name="description" value={currentProduct.description} onChange={handleChange} className="w-full bg-stone-50 border border-stone-200 px-4 py-3 outline-none focus:border-kimezu-primary" />
                  </div>
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-widest text-kimezu-title mb-2">Descripción Larga</label>
                    <textarea name="longDescription" value={currentProduct.longDescription} onChange={handleChange} rows={4} className="w-full bg-stone-50 border border-stone-200 px-4 py-3 outline-none focus:border-kimezu-primary resize-none" />
                  </div>
                </div>

                <div>
                  <h3 className="font-serif text-lg text-kimezu-title mb-4 border-b border-stone-100 pb-2">Especificaciones Técnicas</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-widest text-stone-500 mb-2">Duración (Burn Time)</label>
                      <input name="spec_burnTime" value={currentProduct.specs.burnTime} onChange={handleChange} className="w-full bg-stone-50 border border-stone-200 px-3 py-2 outline-none focus:border-kimezu-primary" />
                    </div>
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-widest text-stone-500 mb-2">Tipo de Cera</label>
                      <input name="spec_wax" value={currentProduct.specs.wax} onChange={handleChange} className="w-full bg-stone-50 border border-stone-200 px-3 py-2 outline-none focus:border-kimezu-primary" />
                    </div>
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-widest text-stone-500 mb-2">Mecha (Wick)</label>
                      <input name="spec_wick" value={currentProduct.specs.wick} onChange={handleChange} className="w-full bg-stone-50 border border-stone-200 px-3 py-2 outline-none focus:border-kimezu-primary" />
                    </div>
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-widest text-stone-500 mb-2">Peso</label>
                      <input name="spec_weight" value={currentProduct.specs.weight} onChange={handleChange} className="w-full bg-stone-50 border border-stone-200 px-3 py-2 outline-none focus:border-kimezu-primary" />
                    </div>
                    <div className="md:col-span-2">
                      <label className="block text-xs font-bold uppercase tracking-widest text-stone-500 mb-2">Notas Olfativas</label>
                      <input name="spec_notes" value={currentProduct.specs.notes} onChange={handleChange} className="w-full bg-stone-50 border border-stone-200 px-3 py-2 outline-none focus:border-kimezu-primary" />
                    </div>
                  </div>
                </div>

                <div className="pt-6 border-t border-stone-100 flex justify-end gap-4">
                  <Button type="button" variant="outline" onClick={() => setIsEditing(false)}>Cancelar</Button>
                  <Button type="submit" className="bg-kimezu-green hover:bg-kimezu-greenHover border-transparent text-white">
                    <Save size={18} className="mr-2" /> Guardar Cambios
                  </Button>
                </div>

              </form>
            </div>
          </div>
        )}

        {/* --- PACK MODAL --- */}
        {isEditingPack && (
          <div className="fixed inset-0 z-[70] bg-kimezu-title/50 backdrop-blur-sm flex items-center justify-center p-4">
            <div className="bg-white w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl rounded-sm animate-fade-in-up">
              <div className="sticky top-0 bg-white border-b border-stone-100 p-6 flex justify-between items-center z-10">
                <h2 className="font-serif text-2xl text-kimezu-title">
                  {currentPack.id ? 'Editar Combo' : 'Crear Combo'}
                </h2>
                <button onClick={() => setIsEditingPack(false)} className="text-stone-400 hover:text-kimezu-primary">
                  <X size={24} />
                </button>
              </div>

              <form onSubmit={handleSavePack} className="p-6 md:p-8 space-y-6">

                {/* Image Upload */}
                <div className="flex justify-center mb-6">
                  <div
                    className="relative w-full max-w-sm aspect-video bg-stone-100 border-2 border-dashed border-stone-300 rounded-sm overflow-hidden group cursor-pointer hover:border-kimezu-primary"
                    onClick={() => packFileInputRef.current?.click()}
                  >
                    {uploading ? (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <Loader className="animate-spin text-kimezu-primary" />
                      </div>
                    ) : currentPack.image ? (
                      <img src={currentPack.image} alt="Pack" className="w-full h-full object-cover" />
                    ) : (
                      <div className="absolute inset-0 flex flex-col items-center justify-center text-stone-400">
                        <ImageIcon size={32} />
                        <span className="text-xs font-bold uppercase mt-2">Subir Imagen</span>
                      </div>
                    )}
                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <Upload className="text-white" size={24} />
                    </div>
                  </div>
                  <input
                    ref={packFileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handlePackImageUpload}
                    className="hidden"
                  />
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-widest text-kimezu-title mb-2">Nombre del Combo</label>
                    <input name="name" value={currentPack.name} onChange={handleChangePack} required className="w-full bg-stone-50 border border-stone-200 px-4 py-3 outline-none focus:border-kimezu-primary" />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-widest text-kimezu-title mb-2">Precio Original</label>
                      <input type="number" name="originalPrice" value={currentPack.originalPrice} onChange={handleChangePack} className="w-full bg-stone-50 border border-stone-200 px-4 py-3 outline-none focus:border-kimezu-primary" />
                    </div>
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-widest text-kimezu-title mb-2">Precio Oferta</label>
                      <input type="number" name="price" value={currentPack.price} onChange={handleChangePack} required className="w-full bg-stone-50 border border-stone-200 px-4 py-3 outline-none focus:border-kimezu-primary" />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-widest text-kimezu-title mb-2">Descripción</label>
                    <input name="description" value={currentPack.description} onChange={handleChangePack} className="w-full bg-stone-50 border border-stone-200 px-4 py-3 outline-none focus:border-kimezu-primary" />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-widest text-kimezu-title mb-2">Texto Etiqueta (Ej. Top Ventas)</label>
                      <input name="tagText" value={currentPack.tagText} onChange={handleChangePack} className="w-full bg-stone-50 border border-stone-200 px-4 py-3 outline-none focus:border-kimezu-primary" />
                    </div>
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-widest text-kimezu-title mb-2">Color Etiqueta</label>
                      <select name="tagColor" value={currentPack.tagColor} onChange={handleChangePack} className="w-full bg-stone-50 border border-stone-200 px-4 py-3 outline-none focus:border-kimezu-primary">
                        <option value="green">Verde</option>
                        <option value="primary">Dorado</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-widest text-kimezu-title mb-2">Ítems Incluidos (Uno por línea)</label>
                    <textarea
                      value={packItemsString}
                      onChange={(e) => setPackItemsString(e.target.value)}
                      rows={5}
                      className="w-full bg-stone-50 border border-stone-200 px-4 py-3 outline-none focus:border-kimezu-primary resize-none"
                      placeholder="Vela Lavanda&#10;Difusor&#10;Caja de Fósforos"
                    />
                  </div>
                </div>

                <div className="pt-6 border-t border-stone-100 flex justify-end gap-4">
                  <Button type="button" variant="outline" onClick={() => setIsEditingPack(false)}>Cancelar</Button>
                  <Button type="submit" className="bg-kimezu-green hover:bg-kimezu-greenHover border-transparent text-white">
                    <Save size={18} className="mr-2" /> Guardar Combo
                  </Button>
                </div>
              </form>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
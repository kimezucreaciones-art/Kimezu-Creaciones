import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Product, SiteAsset, Pack } from '../types';

// Initial Mock Data (Centralized)
const INITIAL_PRODUCTS: Product[] = [
  { 
    id: '1', 
    name: 'Lavanda & Vainilla', 
    price: 85000, 
    description: 'Calma y dulzura en un solo aroma.', 
    longDescription: 'Una sinfonía olfativa diseñada para reducir el estrés. La lavanda francesa aporta notas herbáceas y frescas, mientras que la vainilla de Madagascar envuelve el ambiente con una calidez dulce y reconfortante.',
    images: [
      'https://images.unsplash.com/photo-1603006905003-be475563bc59?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1602825266988-75001771d276?auto=format&fit=crop&q=80&w=800'
    ],
    category: 'vela',
    bestseller: true,
    availableForBundle: true,
    specs: { burnTime: '40-50 Horas', wax: 'Soja 100% Natural', wick: 'Algodón Trenzado', notes: 'Floral, Dulce', weight: '220g' }
  },
  { 
    id: '2', 
    name: 'Bosque de Cedro', 
    price: 92000, 
    description: 'El aroma fresco de la naturaleza.', 
    longDescription: 'Transporta tus sentidos a un bosque húmedo y antiguo. Notas profundas de madera de cedro se mezclan con toques de musgo y tierra mojada.',
    images: ['https://images.unsplash.com/photo-1602825266988-75001771d276?auto=format&fit=crop&q=80&w=800'], 
    category: 'vela', 
    new: true,
    availableForBundle: true,
    specs: { burnTime: '45-55 Horas', wax: 'Soja 100% Natural', wick: 'Madera Crepitante', notes: 'Amaderado, Terroso', weight: '230g' }
  },
  { 
    id: '3', 
    name: 'Jazmín Blanco', 
    price: 88000, 
    description: 'Elegancia floral para tu espacio.', 
    longDescription: 'La pureza del jazmín en su máxima expresión. Un aroma embriagador, romántico y lujoso que llena espacios grandes con facilidad.',
    images: ['https://images.unsplash.com/photo-1570823336619-713352075885?auto=format&fit=crop&q=80&w=800'], 
    category: 'vela',
    availableForBundle: false,
    specs: { burnTime: '40-50 Horas', wax: 'Soja 100% Natural', wick: 'Algodón Trenzado', notes: 'Floral Intenso', weight: '220g' }
  },
  { 
    id: '4', 
    name: 'Canela & Naranja', 
    price: 85000, 
    description: 'Calidez especiada para el invierno.', 
    longDescription: 'La combinación clásica que nunca falla. La vibrante cáscara de naranja se equilibra con la calidez picante de la canela en rama.',
    images: ['https://images.unsplash.com/photo-1596436889106-be35e843f974?auto=format&fit=crop&q=80&w=800'], 
    category: 'vela',
    availableForBundle: true,
    specs: { burnTime: '40-50 Horas', wax: 'Soja 100% Natural', wick: 'Algodón Trenzado', notes: 'Especiado, Cítrico', weight: '220g' }
  },
  { 
    id: '5', 
    name: 'Eucalipto & Menta', 
    price: 89500, 
    description: 'Frescura que renueva el aire.', 
    longDescription: 'Un soplo de aire fresco. El eucalipto medicinal abre las vías respiratorias mientras la menta piperita estimula la concentración.',
    images: ['https://images.unsplash.com/photo-1601669431422-9a3d4d42b10a?auto=format&fit=crop&q=80&w=800'], 
    category: 'vela',
    availableForBundle: true,
    specs: { burnTime: '40-50 Horas', wax: 'Soja 100% Natural', wick: 'Madera Crepitante', notes: 'Herbal, Fresco', weight: '220g' }
  },
  { 
    id: '6', 
    name: 'Set de Regalo', 
    price: 210000, 
    description: 'La experiencia completa Kimezu.', 
    longDescription: 'Una caja curada con nuestros best-sellers. Incluye 2 velas de 200g (aromas a elección), 1 apagavelas dorado y una caja de cerillas largas.',
    images: ['https://images.unsplash.com/photo-1608502570188-466d3a860731?auto=format&fit=crop&q=80&w=800'], 
    category: 'accesorio',
    availableForBundle: false,
    specs: { burnTime: 'N/A', wax: 'Soja 100% Natural', wick: 'Mixto', notes: 'Varios', weight: '800g (Total)' }
  },
];

const INITIAL_PACKS: Pack[] = [
  {
    id: 'p1',
    name: 'Ritual Relax',
    description: 'Perfecto para terminar el día. Incluye todo lo necesario para un baño de inmersión y lectura.',
    price: 185000,
    originalPrice: 220000,
    image: 'https://images.unsplash.com/photo-1603006905003-be475563bc59?auto=format&fit=crop&q=80&w=800',
    tagText: 'Ahorra $35.000',
    tagColor: 'green',
    items: ['Vela Lavanda (200g)', 'Difusor Eucalipto', 'Sales de Baño (Regalo)']
  },
  {
    id: 'p2',
    name: 'Pack Energía',
    description: 'Ideal para mañanas productivas o espacios de trabajo.',
    price: 210000,
    originalPrice: 245000,
    image: 'https://images.unsplash.com/photo-1596436889106-be35e843f974?auto=format&fit=crop&q=80&w=800',
    tagText: 'Top Ventas',
    tagColor: 'primary',
    items: ['Vela Cítrica (200g)', 'Vela Café & Vainilla (100g)', 'Apagavelas Dorado']
  },
  {
    id: 'p3',
    name: 'Pack Hogar',
    description: 'Un aroma para cada habitación de la casa.',
    price: 255000,
    originalPrice: 300000,
    image: 'https://images.unsplash.com/photo-1608502570188-466d3a860731?auto=format&fit=crop&q=80&w=800',
    items: ['3x Velas Clásicas (Surtidas)', 'Bandeja de Cerámica', 'Fósforos Largos']
  }
];

const INITIAL_ASSETS: SiteAsset[] = [
  { key: 'home_hero_fg', label: 'Inicio: Imagen Principal', url: 'https://images.unsplash.com/photo-1602825266988-75001771d276?auto=format&fit=crop&q=80&w=1500', description: 'La imagen grande a la derecha en la página de inicio.' },
  { key: 'shop_banner', label: 'Tienda: Banner Superior', url: 'https://images.unsplash.com/photo-1602825266988-75001771d276?auto=format&fit=crop&q=80&w=1500', description: 'Fondo del título "La Tienda".' },
  { key: 'aromatherapy_hero', label: 'Aromaterapia: Hero', url: 'https://images.unsplash.com/photo-1616401784845-180886ba9ca1?auto=format&fit=crop&q=80&w=1500', description: 'Imagen principal de la sección Aromaterapia.' },
  { key: 'aromatherapy_night', label: 'Aromaterapia: Rutina Noche', url: 'https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&q=80&w=800', description: 'Imagen para la sección de Rutina Nocturna.' },
  { key: 'aromatherapy_ingredient', label: 'Aromaterapia: Ingrediente', url: 'https://images.unsplash.com/photo-1601669431422-9a3d4d42b10a?auto=format&fit=crop&q=80&w=800', description: 'Imagen destacada del ingrediente (Eucalipto).' },
  { key: 'about_collage_1', label: 'Inicio: Collage (Arriba)', url: 'https://images.unsplash.com/photo-1545638423-2895249f056d?auto=format&fit=crop&q=80&w=800', description: 'Imagen superior del collage "Artesanía Pura".' },
  { key: 'about_collage_2', label: 'Inicio: Collage (Abajo)', url: 'https://images.unsplash.com/photo-1608502570188-466d3a860731?auto=format&fit=crop&q=80&w=800', description: 'Imagen superpuesta del collage "Artesanía Pura".' },
  { key: 'custom_request_main', label: 'Personalizar: Imagen Principal', url: 'https://images.unsplash.com/photo-1608502570188-466d3a860731?auto=format&fit=crop&q=80&w=1000', description: 'Imagen lateral en la página de solicitud personalizada.' },
];

interface ProductContextType {
  products: Product[];
  packs: Pack[];
  siteAssets: SiteAsset[];
  addProduct: (product: Product) => void;
  updateProduct: (product: Product) => void;
  deleteProduct: (id: string) => void;
  addPack: (pack: Pack) => void;
  updatePack: (pack: Pack) => void;
  deletePack: (id: string) => void;
  updateAsset: (key: string, newUrl: string) => void;
  getAssetUrl: (key: string) => string;
}

const ProductContext = createContext<ProductContextType | undefined>(undefined);

// Storage Keys
const PRODUCTS_STORAGE_KEY = 'kimezu_products_v1';
const PACKS_STORAGE_KEY = 'kimezu_packs_v1';
const ASSETS_STORAGE_KEY = 'kimezu_assets_v1';

export const ProductProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  // Initialize state from LocalStorage if available, otherwise use defaults
  const [products, setProducts] = useState<Product[]>(() => {
    try {
      const saved = localStorage.getItem(PRODUCTS_STORAGE_KEY);
      return saved ? JSON.parse(saved) : INITIAL_PRODUCTS;
    } catch (e) {
      console.error("Error loading products from storage", e);
      return INITIAL_PRODUCTS;
    }
  });

  const [packs, setPacks] = useState<Pack[]>(() => {
    try {
      const saved = localStorage.getItem(PACKS_STORAGE_KEY);
      return saved ? JSON.parse(saved) : INITIAL_PACKS;
    } catch (e) {
      console.error("Error loading packs from storage", e);
      return INITIAL_PACKS;
    }
  });

  const [siteAssets, setSiteAssets] = useState<SiteAsset[]>(() => {
    try {
      const saved = localStorage.getItem(ASSETS_STORAGE_KEY);
      return saved ? JSON.parse(saved) : INITIAL_ASSETS;
    } catch (e) {
       console.error("Error loading assets from storage", e);
      return INITIAL_ASSETS;
    }
  });

  // Persist to LocalStorage whenever state changes
  useEffect(() => {
    localStorage.setItem(PRODUCTS_STORAGE_KEY, JSON.stringify(products));
  }, [products]);

  useEffect(() => {
    localStorage.setItem(PACKS_STORAGE_KEY, JSON.stringify(packs));
  }, [packs]);

  useEffect(() => {
    localStorage.setItem(ASSETS_STORAGE_KEY, JSON.stringify(siteAssets));
  }, [siteAssets]);

  // Products CRUD
  const addProduct = (product: Product) => {
    setProducts(prev => [...prev, product]);
  };

  const updateProduct = (updatedProduct: Product) => {
    setProducts(prev => prev.map(p => p.id === updatedProduct.id ? updatedProduct : p));
  };

  const deleteProduct = (id: string) => {
    setProducts(prev => prev.filter(p => p.id !== id));
  };

  // Packs CRUD
  const addPack = (pack: Pack) => {
    setPacks(prev => [...prev, pack]);
  };

  const updatePack = (updatedPack: Pack) => {
    setPacks(prev => prev.map(p => p.id === updatedPack.id ? updatedPack : p));
  };

  const deletePack = (id: string) => {
    setPacks(prev => prev.filter(p => p.id !== id));
  };

  // Assets CRUD
  const updateAsset = (key: string, newUrl: string) => {
    setSiteAssets(prev => prev.map(asset => asset.key === key ? { ...asset, url: newUrl } : asset));
  };

  const getAssetUrl = (key: string) => {
    return siteAssets.find(a => a.key === key)?.url || '';
  };

  return (
    <ProductContext.Provider value={{ 
      products, packs, siteAssets, 
      addProduct, updateProduct, deleteProduct, 
      addPack, updatePack, deletePack,
      updateAsset, getAssetUrl 
    }}>
      {children}
    </ProductContext.Provider>
  );
};

export const useProducts = () => {
  const context = useContext(ProductContext);
  if (context === undefined) {
    throw new Error('useProducts must be used within a ProductProvider');
  }
  return context;
};
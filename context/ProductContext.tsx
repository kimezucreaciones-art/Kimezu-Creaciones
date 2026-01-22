import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { supabase } from '../services/supabase';
import { Product, SiteAsset, Pack } from '../types';

// Fallback Mock Data (only used if DB is empty/fails)
const MOCK_PACKS: Pack[] = [
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

const MOCK_ASSETS: SiteAsset[] = [
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
  loading: boolean;
  addProduct: (product: Product) => Promise<void>;
  updateProduct: (product: Product) => Promise<void>;
  deleteProduct: (id: string) => Promise<void>;
  addPack: (pack: Pack) => void;
  updatePack: (pack: Pack) => void;
  deletePack: (id: string) => void;
  updateAsset: (key: string, newUrl: string) => void;
  getAssetUrl: (key: string) => string;
}

const ProductContext = createContext<ProductContextType | undefined>(undefined);

export const ProductProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [packs, setPacks] = useState<Pack[]>(MOCK_PACKS);
  const [siteAssets, setSiteAssets] = useState<SiteAsset[]>(MOCK_ASSETS);
  const [loading, setLoading] = useState(true);

  // Fetch Products from Supabase on Mount
  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .order('name');

      if (error) throw error;

      if (data) {
        // Map database columns to app types (snake_case to camelCase mapping needed if auto-map fails, but current types match well except for some booleans which might need casing check if DB is camelCase, but SQL was underscores)
        // Wait, my SQL created columns like 'is_bestseller', 'available_for_bundle'. 
        // My Product type expects 'bestseller', 'availableForBundle'.
        // I need to map these manually.
        const mappedProducts: Product[] = data.map((p: any) => ({
          id: p.id,
          name: p.name,
          price: p.price,
          description: p.description,
          longDescription: p.long_description,
          category: p.category,
          images: p.images || [],
          specs: p.specs || {},
          bestseller: p.is_bestseller,
          new: p.is_new,
          availableForBundle: p.available_for_bundle
        }));
        setProducts(mappedProducts);
      }
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setLoading(false);
    }
  };

  // Products CRUD
  const addProduct = async (product: Product) => {
    // Optimistic update
    setProducts(prev => [...prev, product]);

    const { error } = await supabase.from('products').insert({
      id: product.id,
      name: product.name,
      price: product.price,
      description: product.description,
      long_description: product.longDescription,
      category: product.category,
      images: product.images,
      specs: product.specs,
      available_for_bundle: product.availableForBundle,
      is_bestseller: product.bestseller,
      is_new: product.new
    });

    if (error) {
      console.error('Error adding product:', error);
      fetchProducts(); // Revert/Refresh on error
    }
  };

  const updateProduct = async (updatedProduct: Product) => {
    setProducts(prev => prev.map(p => p.id === updatedProduct.id ? updatedProduct : p));

    const { error } = await supabase.from('products').update({
      name: updatedProduct.name,
      price: updatedProduct.price,
      description: updatedProduct.description,
      long_description: updatedProduct.longDescription,
      category: updatedProduct.category,
      images: updatedProduct.images,
      specs: updatedProduct.specs,
      available_for_bundle: updatedProduct.availableForBundle,
      is_bestseller: updatedProduct.bestseller,
      is_new: updatedProduct.new
    }).eq('id', updatedProduct.id);

    if (error) {
      console.error('Error updating product:', error);
      fetchProducts();
    }
  };

  const deleteProduct = async (id: string) => {
    setProducts(prev => prev.filter(p => p.id !== id));

    const { error } = await supabase.from('products').delete().eq('id', id);

    if (error) {
      console.error('Error deleting product:', error);
      fetchProducts();
    }
  };

  // Packs CRUD (Keep local/mock for now unless User explicitly asked for Packs DB too, which I haven't set up yet)
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
      products, packs, siteAssets, loading,
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
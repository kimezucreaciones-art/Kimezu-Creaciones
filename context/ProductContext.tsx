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

// Fallback Assets
const MOCK_ASSETS: SiteAsset[] = [
  { key: 'home_hero_fg', label: 'Inicio: Imagen Principal', url: 'https://images.unsplash.com/photo-1602825266988-75001771d276?auto=format&fit=crop&q=80&w=1500', description: 'La imagen grande a la derecha en la página de inicio.' },
  { key: 'shop_banner', label: 'Tienda: Banner Superior', url: 'https://images.unsplash.com/photo-1602825266988-75001771d276?auto=format&fit=crop&q=80&w=1500', description: 'Fondo del título "La Tienda".' },
  { key: 'aromatherapy_hero', label: 'Aromaterapia: Hero', url: 'https://images.unsplash.com/photo-1616401784845-180886ba9ca1?auto=format&fit=crop&q=80&w=1500', description: 'Imagen principal de la sección Aromaterapia.' },
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
  updateAsset: (key: string, newUrl: string) => Promise<void>;
  getAssetUrl: (key: string) => string;
}

const ProductContext = createContext<ProductContextType | undefined>(undefined);

export const ProductProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [packs, setPacks] = useState<Pack[]>(MOCK_PACKS);
  const [siteAssets, setSiteAssets] = useState<SiteAsset[]>(MOCK_ASSETS);
  const [loading, setLoading] = useState(true);

  // Fetch Data from Supabase on Mount
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);

      // 1. Fetch Products
      const { data: productsData, error: productError } = await supabase
        .from('products')
        .select('*')
        .order('name');

      if (productError) throw productError;

      if (productsData) {
        const mappedProducts: Product[] = productsData.map((p: any) => ({
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



      // 3. Fetch Packs
      const { data: packsData, error: packsError } = await supabase
        .from('packs')
        .select('*');

      if (packsError) {
        console.warn("Could not fetch packs", packsError);
      } else if (packsData) {
        const mappedPacks: Pack[] = packsData.map((p: any) => ({
          id: p.id,
          name: p.name,
          description: p.description,
          price: p.price,
          originalPrice: p.original_price,
          image: p.image,
          items: p.items || [],
          tagText: p.tag_text,
          tagColor: p.tag_color
        }));
        setPacks(mappedPacks);
      } else {
        // Fallback if empty DB (optional, but keep mock for now if needed, or clear)
        // setPacks([]); 
      }

      // 2. Fetch Site Assets (Logic kept)
      const { data: assetsData, error: assetsError } = await supabase
        .from('site_assets')
        .select('*');

      if (assetsError) {
        console.warn("Could not fetch assets, using fallback.", assetsError);
      } else if (assetsData && assetsData.length > 0) {
        setSiteAssets(assetsData);
      }

    } catch (error) {
      console.error('Error fetching data:', error);
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
      fetchData(); // Revert/Refresh on error
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
      fetchData();
    }
  };

  const deleteProduct = async (id: string) => {
    setProducts(prev => prev.filter(p => p.id !== id));

    const { error } = await supabase.from('products').delete().eq('id', id);

    if (error) {
      console.error('Error deleting product:', error);
      fetchData();
    }
  };

  // Packs CRUD (Keep local/mock for now unless User explicitly asked for Packs DB too)
  // Packs CRUD - Persisted to Supabase
  const addPack = async (pack: Pack) => {
    // Optimistic
    setPacks(prev => [...prev, pack]);

    const { error } = await supabase.from('packs').insert({
      id: pack.id || undefined, // Allow DB to generate if empty, though we usually gen one
      name: pack.name,
      description: pack.description,
      price: pack.price,
      original_price: pack.originalPrice,
      image: pack.image,
      items: pack.items,
      tag_text: pack.tagText,
      tag_color: pack.tagColor
    });

    if (error) {
      console.error('Error adding pack:', error);
      fetchData();
    }
  };

  const updatePack = async (updatedPack: Pack) => {
    // Optimistic
    setPacks(prev => prev.map(p => p.id === updatedPack.id ? updatedPack : p));

    const { error } = await supabase.from('packs').update({
      name: updatedPack.name,
      description: updatedPack.description,
      price: updatedPack.price,
      original_price: updatedPack.originalPrice,
      image: updatedPack.image,
      items: updatedPack.items,
      tag_text: updatedPack.tagText,
      tag_color: updatedPack.tagColor
    }).eq('id', updatedPack.id);

    if (error) {
      console.error('Error updating pack:', error);
      fetchData();
    }
  };

  const deletePack = async (id: string) => {
    setPacks(prev => prev.filter(p => p.id !== id));

    const { error } = await supabase.from('packs').delete().eq('id', id);

    if (error) {
      console.error('Error deleting pack:', error);
      fetchData();
    }
  };

  // Assets CRUD - Updated for Persistence
  const updateAsset = async (key: string, newUrl: string) => {
    // 1. Optimistic Update
    setSiteAssets(prev => prev.map(asset => asset.key === key ? { ...asset, url: newUrl } : asset));

    // 2. Persist to DB
    const { error } = await supabase
      .from('site_assets')
      .update({ url: newUrl })
      .eq('key', key);

    if (error) {
      console.error('Error updating asset:', error);
      // Optional: Revert via fetch or show toast
    }
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
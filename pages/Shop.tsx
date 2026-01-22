import React, { useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { ProductCard } from '../components/ProductCard';
import { SectionSeparator } from '../components/SectionSeparator';
import { Button } from '../components/Button';
import { useProducts } from '../context/ProductContext'; // Import Context

export const Shop: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const searchQuery = searchParams.get('q');
  const categoryFilter = searchParams.get('category');
  
  // Use products from context
  const { products, getAssetUrl } = useProducts();

  // Dynamically get unique categories from products
  const uniqueCategories = useMemo(() => {
    const cats = Array.from(new Set(products.map(p => p.category)));
    // Add 'Todos' at the beginning and capitalize categories for display
    return ['Todos', ...cats];
  }, [products]);

  // Filter products based on search query and category
  const filteredProducts = useMemo(() => {
    return products.filter(product => {
      // Search Logic
      const matchesSearch = searchQuery 
        ? product.name.toLowerCase().includes(searchQuery.toLowerCase()) 
        : true;
      
      // Category Logic
      const matchesCategory = categoryFilter && categoryFilter !== 'Todos'
        ? product.category === categoryFilter
        : true;

      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, categoryFilter, products]);

  const handleCategoryChange = (cat: string) => {
    if (cat === 'Todos') {
      searchParams.delete('category');
    } else {
      searchParams.set('category', cat);
    }
    // Keep search query if it exists
    setSearchParams(searchParams);
  };

  const clearSearch = () => {
    setSearchParams({});
  };

  return (
    <div className="bg-kimezu-bg pb-24">
      {/* Shop Banner - Reduced height on desktop from 40vh to 30vh */}
      <div className="relative h-[20vh] md:h-[30vh] bg-kimezu-title overflow-hidden mb-8 md:mb-12">
         <img src={getAssetUrl('shop_banner')} className="w-full h-full object-cover opacity-60" alt="Shop Banner" />
         <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4">
            <h1 className="text-3xl md:text-5xl font-serif text-white mb-2">La Tienda</h1>
            <p className="text-stone-300 max-w-lg text-sm md:text-lg font-light">Colección 2026 de aromas artesanales.</p>
         </div>
      </div>

      <div className="container mx-auto px-4 md:px-8">
        
        {/* Search Results Indicator */}
        {searchQuery && (
          <div className="text-center mb-8 animate-fade-in-up">
            <p className="text-kimezu-text text-lg">
              Resultados de búsqueda para: <span className="font-serif text-2xl text-kimezu-title italic">"{searchQuery}"</span>
            </p>
            <button 
              onClick={clearSearch} 
              className="text-xs text-kimezu-pink uppercase tracking-widest font-bold mt-2 hover:underline"
            >
              Limpiar búsqueda
            </button>
          </div>
        )}

        {/* Filters Bar - Reduced margin on mobile */}
        <div className="flex flex-wrap justify-center gap-4 md:gap-6 mb-8 md:mb-16 border-y border-kimezu-title/10 py-4 md:py-6">
          {uniqueCategories.map((filter) => {
             // Handle display name capitalization for UI, but keep value lowercase for logic if needed (though we're using raw value)
             const displayName = filter.charAt(0).toUpperCase() + filter.slice(1);
             const isActive = categoryFilter === filter || (!categoryFilter && filter === 'Todos');
             
             return (
              <button 
                key={filter} 
                onClick={() => handleCategoryChange(filter)}
                className={`text-xs md:text-sm font-bold uppercase tracking-widest transition-colors ${isActive ? 'text-kimezu-primary border-b border-kimezu-primary' : 'text-kimezu-text hover:text-kimezu-title'}`}
              >
                {displayName}
              </button>
             );
          })}
        </div>

        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-4 md:gap-x-8 gap-y-8 md:gap-y-16">
            {filteredProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16 animate-fade-in">
             <SectionSeparator icon="diamond" className="mb-6"/>
             <h3 className="text-2xl font-serif text-kimezu-title mb-4">No encontramos productos</h3>
             <p className="text-kimezu-text mb-8">Intenta con otro término o categoría.</p>
             <Button onClick={clearSearch}>Ver Todos los Productos</Button>
          </div>
        )}
      </div>
    </div>
  );
};
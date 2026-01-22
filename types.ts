
export interface ProductSpecs {
  burnTime: string;
  wax: string;
  wick: string;
  notes: string;
  weight: string;
}

export interface Product {
  id: string;
  name: string;
  price: number;
  description: string;
  longDescription: string;
  images: string[]; // Changed from single 'image' to array 'images'
  category: string;
  bestseller?: boolean;
  new?: boolean;
  availableForBundle?: boolean;
  specs: ProductSpecs;
}

export interface Pack {
  id: string;
  name: string;
  description: string;
  price: number;
  originalPrice: number;
  image: string;
  items: string[]; // List of items included strings
  tagText?: string; // e.g. "Ahorra $35.000"
  tagColor?: 'green' | 'primary'; // Determines badge color
}

export interface SiteAsset {
  key: string;
  label: string;
  url: string;
  description?: string;
}

export interface NavItem {
  label: string;
  path: string;
}

export const NAV_ITEMS: NavItem[] = [
  { label: 'Inicio', path: '/' },
  { label: 'Tienda', path: '/shop' },
  { label: 'Combos', path: '/bundles' }, 
  { label: 'Aromaterapia', path: '/aromatherapy' },
  { label: 'Personalizar', path: '/custom-request' },
];

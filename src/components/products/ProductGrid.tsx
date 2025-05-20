
"use client";

import type { Product } from '@/lib/types';
import ProductCard from './ProductCard';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useAppContext } from '@/contexts/AppContext';
import { SORT_OPTIONS } from '@/lib/constants';
import { SlidersHorizontal } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import ProductFilters from './ProductFilters'; // Import for mobile filters

export default function ProductGrid() {
  const { products, productState, dispatch } = useAppContext();
  const { category, sortBy, filters } = productState;

  const sortProducts = (productsToSort: Product[], sortKey: string): Product[] => {
    switch (sortKey) {
      case 'priceLow':
        return [...productsToSort].sort((a, b) => a.price - b.price);
      case 'priceHigh':
        return [...productsToSort].sort((a, b) => b.price - a.price);
      case 'newest':
        return [...productsToSort].sort((a, b) => b.id - a.id); // Assuming higher ID is newer
      case 'rating':
        return [...productsToSort].sort((a, b) => b.rating - a.rating);
      case 'featured':
      default:
        // Add featured logic if available, e.g., sort by rating then by name or a specific flag
        return [...productsToSort].sort((a, b) => b.rating - a.rating || a.name.localeCompare(b.name));
    }
  };

  const filteredProducts = products.filter(product => {
    const categoryMatch = category === "All" || product.category === category.toLowerCase();
    const scentMatch = filters.scentFamily === "All" || product.scentFamily === filters.scentFamily.toLowerCase();
    const priceMatch = product.price >= filters.priceRange[0] && product.price <= filters.priceRange[1];
    return categoryMatch && scentMatch && priceMatch;
  });

  const sortedProducts = sortProducts(filteredProducts, sortBy);

  const handleSortChange = (value: string) => {
    dispatch({ type: 'SET_SORT', payload: value });
  };
  
  const currentCategoryTitle = category === "All" ? "All Products" : category;

  return (
    <div className="lg:w-3/4">
      <div className="flex flex-col sm:flex-row justify-between items-center mb-6 md:mb-8 gap-4">
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">
          {currentCategoryTitle} ({sortedProducts.length})
        </h1>
        <div className="flex items-center space-x-2 sm:space-x-4 w-full sm:w-auto">
           <div className="lg:hidden">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" className="w-full sm:w-auto">
                  <SlidersHorizontal className="mr-2 h-4 w-4" /> Filters
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-[300px] overflow-y-auto p-6 bg-background">
                 <ProductFilters />
              </SheetContent>
            </Sheet>
          </div>
          <Select value={sortBy} onValueChange={handleSortChange}>
            <SelectTrigger className="w-full sm:w-[180px]" aria-label="Sort products by">
              <SelectValue placeholder="Sort by..." />
            </SelectTrigger>
            <SelectContent>
              {SORT_OPTIONS.map(option => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {sortedProducts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6 md:gap-8">
          {sortedProducts.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <p className="text-xl text-muted-foreground">No products found matching your filters.</p>
          <p className="text-sm text-muted-foreground mt-2">Try adjusting your filters or checking back later.</p>
        </div>
      )}
    </div>
  );
}

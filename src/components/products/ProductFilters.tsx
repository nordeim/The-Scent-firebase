
"use client";

import { useAppContext } from '@/contexts/AppContext';
import { CATEGORIES, SCENT_FAMILIES } from '@/lib/constants';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Slider } from '@/components/ui/slider';
import { Button } from '@/components/ui/button';
import { X } from 'lucide-react';

export default function ProductFilters() {
  const { productState, dispatch } = useAppContext();
  const { category, filters } = productState;

  const handleCategoryChange = (value: string) => {
    dispatch({ type: 'SET_CATEGORY', payload: value });
  };

  const handleScentFamilyChange = (value: string) => {
    dispatch({ type: 'SET_FILTER', payload: { scentFamily: value } });
  };

  const handlePriceChange = (value: number[]) => {
    dispatch({ type: 'SET_FILTER', payload: { priceRange: [value[0], value[1]] } });
  };
  
  const handleResetFilters = () => {
    dispatch({ type: 'RESET_FILTERS' });
  };

  const maxPrice = 50; // Can be dynamic based on products

  return (
    <aside className="lg:w-1/4 space-y-8 p-1">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-semibold tracking-tight">Filters</h2>
        <Button variant="ghost" size="sm" onClick={handleResetFilters} className="text-muted-foreground hover:text-foreground">
          <X className="w-4 h-4 mr-1" /> Reset
        </Button>
      </div>
      
      <div>
        <h3 className="text-lg font-medium mb-3">Category</h3>
        <RadioGroup value={category} onValueChange={handleCategoryChange} className="space-y-2">
          {CATEGORIES.map((cat) => (
            <div key={cat} className="flex items-center space-x-2">
              <RadioGroupItem value={cat} id={`category-${cat.toLowerCase()}`} />
              <Label htmlFor={`category-${cat.toLowerCase()}`} className="cursor-pointer hover:text-accent transition-colors">{cat}</Label>
            </div>
          ))}
        </RadioGroup>
      </div>

      <div>
        <h3 className="text-lg font-medium mb-3">Scent Family</h3>
        <RadioGroup value={filters.scentFamily} onValueChange={handleScentFamilyChange} className="space-y-2">
          {SCENT_FAMILIES.map((family) => (
            <div key={family} className="flex items-center space-x-2">
              <RadioGroupItem value={family} id={`scent-${family.toLowerCase()}`} />
              <Label htmlFor={`scent-${family.toLowerCase()}`} className="cursor-pointer hover:text-accent transition-colors">{family}</Label>
            </div>
          ))}
        </RadioGroup>
      </div>

      <div>
        <h3 className="text-lg font-medium mb-3">Price Range</h3>
        <div className="flex justify-between text-sm text-muted-foreground mb-2">
          <span>${filters.priceRange[0]}</span>
          <span>${filters.priceRange[1]}</span>
        </div>
        <Slider
          min={0}
          max={maxPrice}
          step={5}
          value={[filters.priceRange[0], filters.priceRange[1]]}
          onValueChange={handlePriceChange}
          className="w-full"
          aria-label="Price range slider"
        />
      </div>
    </aside>
  );
}


"use client";

import { useAppContext } from '@/contexts/AppContext';
import ProductCard from '@/components/products/ProductCard';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ChevronRight } from 'lucide-react';

export default function BestSellersSection() {
  const { products } = useAppContext();
  
  // Simple logic for best sellers: take first 3-4 rated highly, or just first few
  const bestSellers = products
    .sort((a, b) => b.rating - a.rating) // Sort by rating
    .slice(0, 3); // Take top 3

  return (
    <section className="py-16 md:py-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">Our Best Sellers</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Discover the most loved scents by our community, perfect for enhancing any mood or space.
          </p>
        </div>
        {bestSellers.length > 0 ? (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {bestSellers.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <p className="text-center text-muted-foreground">No best sellers to display currently.</p>
        )}
        <div className="mt-12 text-center">
          <Button asChild variant="outline" size="lg" className="group">
            <Link href="/products">
              View All Products
              <ChevronRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}

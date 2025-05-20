
"use client";

import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import type { Product } from '@/lib/types';
import { useAppContext } from '@/contexts/AppContext';
import { Star, ShoppingCart } from 'lucide-react';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const { dispatch } = useAppContext();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent Link navigation when clicking button
    e.preventDefault(); // Also prevent default link behavior
    dispatch({ type: 'ADD_ITEM', payload: product });
  };

  return (
    <Link href={`/products/${product.id}`} className="block group">
      <Card className="overflow-hidden h-full flex flex-col transition-all duration-300 ease-in-out hover:shadow-xl dark:hover:shadow-primary/20 transform hover:-translate-y-1">
        <CardHeader className="p-0">
          <div className="aspect-[4/3] relative overflow-hidden">
            <Image
              src={product.image}
              alt={product.name}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="object-cover transition-transform duration-300 group-hover:scale-105"
              data-ai-hint={product.dataAiHint || "aromatherapy product"}
            />
          </div>
        </CardHeader>
        <CardContent className="p-4 sm:p-6 flex-grow">
          <CardTitle className="text-lg font-semibold leading-tight mb-1 truncate group-hover:text-accent transition-colors">
            {product.name}
          </CardTitle>
          <CardDescription className="text-sm text-muted-foreground line-clamp-2 mb-2">
            {product.description}
          </CardDescription>
          <div className="flex items-center text-sm text-muted-foreground">
            <Star className="w-4 h-4 mr-1 fill-yellow-400 text-yellow-400" />
            <span>{product.rating}</span>
            <span className="mx-2">|</span>
            <span className="capitalize">{product.scentFamily}</span>
          </div>
        </CardContent>
        <CardFooter className="p-4 sm:p-6 flex justify-between items-center">
          <p className="text-xl font-bold text-foreground">${product.price.toFixed(2)}</p>
          <Button
            variant="outline"
            size="sm"
            onClick={handleAddToCart}
            aria-label={`Add ${product.name} to cart`}
            className="group-hover:bg-accent group-hover:text-accent-foreground transition-colors"
          >
            <ShoppingCart className="mr-2 h-4 w-4" />
            Add to Cart
          </Button>
        </CardFooter>
      </Card>
    </Link>
  );
}

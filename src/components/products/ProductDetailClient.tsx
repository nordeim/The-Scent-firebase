
"use client";

import type { Product } from '@/lib/types';
import { useAppContext } from '@/contexts/AppContext';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Star, Minus, Plus, ShoppingCart, Info, CheckCircle, XCircle } from 'lucide-react';
import { useState } from 'react';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

interface ProductDetailClientProps {
  product: Product;
}

export default function ProductDetailClient({ product }: ProductDetailClientProps) {
  const { dispatch } = useAppContext();
  const [quantity, setQuantity] = useState(1);

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      dispatch({ type: 'ADD_ITEM', payload: product });
    }
  };

  return (
    <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-start">
      <div className="aspect-square relative rounded-lg overflow-hidden shadow-lg bg-muted">
        <Image
          src={product.image}
          alt={product.name}
          fill
          sizes="(max-width: 768px) 100vw, 50vw"
          className="object-cover"
          data-ai-hint={product.dataAiHint || "aromatherapy product detail"}
          priority
        />
      </div>

      <div className="space-y-6">
        <div className="space-y-2">
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight">{product.name}</h1>
          <div className="flex items-center space-x-2 text-sm">
            <Badge variant="outline" className="capitalize">{product.category}</Badge>
            <Badge variant="secondary" className="capitalize">{product.scentFamily}</Badge>
          </div>
          <div className="flex items-center">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`w-5 h-5 ${i < Math.floor(product.rating) ? 'text-yellow-400 fill-yellow-400' : 'text-muted-foreground/50'}`}
              />
            ))}
            <span className="ml-2 text-sm text-muted-foreground">({product.rating.toFixed(1)} out of 5 stars)</span>
          </div>
        </div>

        <p className="text-3xl font-semibold">${product.price.toFixed(2)}</p>
        
        <p className="text-base text-muted-foreground leading-relaxed">
          {product.description}
        </p>

        <Separator />

        <div className="flex items-center space-x-4">
          <div className="flex items-center border rounded-md">
            <Button variant="ghost" size="icon" onClick={() => setQuantity(Math.max(1, quantity - 1))} aria-label="Decrease quantity">
              <Minus className="h-4 w-4" />
            </Button>
            <span className="w-10 text-center font-medium">{quantity}</span>
            <Button variant="ghost" size="icon" onClick={() => setQuantity(quantity + 1)} aria-label="Increase quantity">
              <Plus className="h-4 w-4" />
            </Button>
          </div>
          <Button size="lg" onClick={handleAddToCart} className="flex-1">
            <ShoppingCart className="mr-2 h-5 w-5" /> Add to Cart
          </Button>
        </div>

        <Accordion type="single" collapsible className="w-full">
          {product.longDescription && (
            <AccordionItem value="description">
              <AccordionTrigger>Detailed Description</AccordionTrigger>
              <AccordionContent className="text-muted-foreground text-sm leading-relaxed">
                {product.longDescription}
              </AccordionContent>
            </AccordionItem>
          )}
          {product.ingredients && product.ingredients.length > 0 && (
             <AccordionItem value="ingredients">
              <AccordionTrigger>Ingredients</AccordionTrigger>
              <AccordionContent className="text-muted-foreground text-sm">
                <ul className="list-disc list-inside space-y-1">
                  {product.ingredients.map((ing, idx) => <li key={idx}>{ing}</li>)}
                </ul>
              </AccordionContent>
            </AccordionItem>
          )}
          <AccordionItem value="shipping">
            <AccordionTrigger>Shipping & Returns</AccordionTrigger>
            <AccordionContent className="text-muted-foreground text-sm space-y-2">
              <p><CheckCircle className="inline h-4 w-4 mr-1 text-green-500" /> Free standard shipping on orders over $50.</p>
              <p><Info className="inline h-4 w-4 mr-1 text-blue-500" /> Ships within 2-3 business days.</p>
              <p><XCircle className="inline h-4 w-4 mr-1 text-red-500" /> Easy 30-day returns. See our return policy for details.</p>
            </AccordionContent>
          </AccordionItem>
        </Accordion>

      </div>
    </div>
  );
}

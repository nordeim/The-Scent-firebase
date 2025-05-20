
"use client";

import type { CartItem as CartItemType } from '@/lib/types';
import { useAppContext } from '@/contexts/AppContext';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Minus, Plus, X } from 'lucide-react';

interface CartItemProps {
  item: CartItemType;
}

export default function CartItem({ item }: CartItemProps) {
  const { dispatch } = useAppContext();

  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 p-4 border-b">
      <Link href={`/products/${item.id}`} className="shrink-0">
        <Image
          src={item.image}
          alt={item.name}
          width={100}
          height={100}
          className="rounded-md object-cover aspect-square"
          data-ai-hint={item.dataAiHint || "cart product"}
        />
      </Link>
      <div className="flex-grow space-y-1">
        <Link href={`/products/${item.id}`}>
          <h3 className="text-lg font-medium hover:text-accent transition-colors">{item.name}</h3>
        </Link>
        <p className="text-sm text-muted-foreground">Unit Price: ${item.price.toFixed(2)}</p>
      </div>
      <div className="flex items-center space-x-2 sm:space-x-3 shrink-0">
        <div className="flex items-center border rounded-md">
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8"
            onClick={() => dispatch({ type: 'UPDATE_QUANTITY', payload: { id: item.id, quantity: item.quantity - 1 } })}
            aria-label="Decrease quantity"
          >
            <Minus className="h-4 w-4" />
          </Button>
          <span className="w-8 text-center text-sm font-medium">{item.quantity}</span>
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8"
            onClick={() => dispatch({ type: 'UPDATE_QUANTITY', payload: { id: item.id, quantity: item.quantity + 1 } })}
            aria-label="Increase quantity"
          >
            <Plus className="h-4 w-4" />
          </Button>
        </div>
        <p className="text-md font-semibold w-20 text-right">${(item.price * item.quantity).toFixed(2)}</p>
        <Button
          variant="ghost"
          size="icon"
          className="text-muted-foreground hover:text-destructive h-8 w-8"
          onClick={() => dispatch({ type: 'REMOVE_ITEM', payload: item.id })}
          aria-label="Remove item"
        >
          <X className="h-5 w-5" />
        </Button>
      </div>
    </div>
  );
}

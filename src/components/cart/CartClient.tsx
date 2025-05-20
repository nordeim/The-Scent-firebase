
"use client";

import { useAppContext } from '@/contexts/AppContext';
import CartItem from './CartItem';
import CartSummary from './CartSummary';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ShoppingBag, ArrowLeft } from 'lucide-react';

export default function CartClient() {
  const { cartState, dispatch } = useAppContext();

  if (cartState.items.length === 0) {
    return (
      <div className="text-center py-20">
        <ShoppingBag className="mx-auto h-20 w-20 text-muted-foreground mb-6" />
        <h2 className="text-2xl font-semibold mb-3">Your Cart is Empty</h2>
        <p className="text-muted-foreground mb-8">Looks like you haven't added anything to your cart yet.</p>
        <Button asChild size="lg" className="group">
          <Link href="/products">
            <ArrowLeft className="mr-2 h-5 w-5 transition-transform group-hover:-translate-x-1" />
            Continue Shopping
          </Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="grid lg:grid-cols-3 gap-8 md:gap-12 items-start">
      <div className="lg:col-span-2 bg-card p-4 sm:p-6 rounded-lg shadow-lg">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">Your Cart</h1>
          {cartState.items.length > 0 && (
            <Button variant="outline" size="sm" onClick={() => dispatch({ type: 'CLEAR_CART' })}>
              Clear Cart
            </Button>
          )}
        </div>
        <div className="space-y-4">
          {cartState.items.map(item => (
            <CartItem key={item.id} item={item} />
          ))}
        </div>
      </div>
      <div className="lg:col-span-1">
        <CartSummary items={cartState.items} />
      </div>
    </div>
  );
}

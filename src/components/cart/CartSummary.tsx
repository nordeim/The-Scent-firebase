
"use client";

import type { CartItem } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { ArrowRight, Tag } from 'lucide-react';
import { Input } from '../ui/input';
import { Label } from '../ui/label';

interface CartSummaryProps {
  items: CartItem[];
}

export default function CartSummary({ items }: CartSummaryProps) {
  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const shipping = 0; // Example: Free shipping
  const taxRate = 0.08; // Example: 8% tax
  const tax = subtotal * taxRate;
  const total = subtotal + shipping + tax;

  // In a real app, checkout would navigate to a checkout page or trigger a payment modal
  const handleCheckout = () => {
    alert('Proceeding to checkout (Not Implemented)');
  };

  return (
    <div className="bg-card p-6 rounded-lg shadow-lg space-y-4 sticky top-24">
      <h2 className="text-2xl font-semibold mb-4">Order Summary</h2>
      
      <div className="space-y-2 text-sm">
        <div className="flex justify-between">
          <span className="text-muted-foreground">Subtotal</span>
          <span>${subtotal.toFixed(2)}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-muted-foreground">Shipping</span>
          <span>{shipping > 0 ? `$${shipping.toFixed(2)}` : 'Free'}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-muted-foreground">Estimated Tax</span>
          <span>${tax.toFixed(2)}</span>
        </div>
      </div>
      
      <Separator />
      
      <div className="flex justify-between text-xl font-bold">
        <span>Total</span>
        <span>${total.toFixed(2)}</span>
      </div>

      <div className="space-y-2 pt-2">
        <Label htmlFor="promo-code">Promo Code</Label>
        <div className="flex space-x-2">
          <Input id="promo-code" placeholder="Enter promo code" className="flex-grow" />
          <Button variant="outline">Apply</Button>
        </div>
        <p className="text-xs text-muted-foreground flex items-center"><Tag className="w-3 h-3 mr-1"/> Have a gift card? Apply it at the payment step.</p>
      </div>
      
      <Button size="lg" className="w-full group mt-4" onClick={handleCheckout}>
        Proceed to Checkout <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
      </Button>
    </div>
  );
}

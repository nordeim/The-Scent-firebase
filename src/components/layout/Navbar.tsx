
"use client";

import Link from 'next/link';
import { Menu, ShoppingBag, BotMessageSquare, Home, Sparkles, UserCog, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger, SheetClose } from '@/components/ui/sheet';
import { ThemeToggle } from '@/components/ThemeToggle';
import { useAppContext } from '@/contexts/AppContext';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import React from 'react';

const navLinks = [
  { href: '/', label: 'Home', icon: <Home className="w-4 h-4" /> },
  { href: '/products', label: 'Shop', icon: <Sparkles className="w-4 h-4" /> },
  { href: '/quiz', label: 'Scent Quiz', icon: <Search className="w-4 h-4" /> },
  { href: '/ar', label: 'AR View', icon: <BotMessageSquare className="w-4 h-4" /> },
  { href: '/admin', label: 'Admin', icon: <UserCog className="w-4 h-4" /> },
];

export default function Navbar() {
  const { cartState } = useAppContext();
  const pathname = usePathname();
  const totalItems = cartState.items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 max-w-screen-2xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center space-x-2">
          <Sparkles className="h-7 w-7 text-primary-foreground_on_primary_bg dark:text-accent" /> 
          <span className="text-2xl font-bold tracking-tight">AromaGenius</span>
        </Link>

        <nav className="hidden md:flex items-center space-x-6 text-sm font-medium">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "transition-colors hover:text-foreground/80",
                pathname === link.href ? "text-foreground" : "text-foreground/60"
              )}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center space-x-2 sm:space-x-4">
          <ThemeToggle />
          <Link href="/cart" passHref>
            <Button variant="ghost" size="icon" className="relative w-9 h-9" aria-label="Shopping Cart">
              <ShoppingBag className="h-5 w-5" />
              {totalItems > 0 && (
                <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-accent text-accent-foreground text-xs font-bold">
                  {totalItems}
                </span>
              )}
            </Button>
          </Link>

          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden w-9 h-9" aria-label="Open menu">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] sm:w-[400px] bg-background p-6">
              <div className="flex flex-col space-y-4">
                <Link href="/" className="flex items-center space-x-2 mb-4">
                   <Sparkles className="h-7 w-7 text-primary-foreground_on_primary_bg dark:text-accent" />
                  <span className="text-xl font-bold">AromaGenius</span>
                </Link>
                {navLinks.map((link) => (
                  <SheetClose asChild key={link.href}>
                    <Link
                      href={link.href}
                      className={cn(
                        "flex items-center space-x-2 rounded-md p-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground",
                        pathname === link.href ? "bg-accent text-accent-foreground" : "text-foreground/80"
                      )}
                    >
                      {link.icon}
                      <span>{link.label}</span>
                    </Link>
                  </SheetClose>
                ))}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}

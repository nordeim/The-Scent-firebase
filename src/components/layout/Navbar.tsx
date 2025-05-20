
"use client";

import Link from 'next/link';
import { Menu, ShoppingBag, Home, Info, FlaskConical, Star, Mail, Feather, Sun, Moon } from 'lucide-react'; // Added Feather, Mail, Star, FlaskConical, Info
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger, SheetClose } from '@/components/ui/sheet';
import { ThemeToggle } from '@/components/ThemeToggle';
import { useAppContext } from '@/contexts/AppContext';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import React from 'react';

const navLinks = [
  { href: '/', label: 'HOME', icon: <Home className="w-4 h-4" /> },
  { href: '/about', label: 'ABOUT', icon: <Info className="w-4 h-4" /> }, // Placeholder, can create /about page
  { href: '/products', label: 'SHOP', icon: <ShoppingBag className="w-4 h-4" /> },
  { href: '/quiz', label: 'QUIZ', icon: <FlaskConical className="w-4 h-4" /> },
  { href: '/reviews', label: 'REVIEWS', icon: <Star className="w-4 h-4" /> }, // Placeholder, can create /reviews page
  { href: '/contact', label: 'CONTACT', icon: <Mail className="w-4 h-4" /> }, // Placeholder, can create /contact page
];

export default function Navbar() {
  const { cartState } = useAppContext();
  const pathname = usePathname();
  const totalItems = cartState.items.reduce((sum, item) => sum + item.quantity, 0);

  // Define dark background and light text for navbar explicitly
  const navbarBg = "bg-[#4A4441]"; // Dark brown/charcoal from screenshot
  const navbarText = "text-stone-200";
  const navbarHoverText = "hover:text-white";
  const navbarActiveText = "text-white font-semibold";
  const logoColor = "text-teal-400"; // Teal color for logo icon and text

  return (
    <header className={cn("sticky top-0 z-50 w-full border-b border-black/20", navbarBg)}>
      <div className="container flex h-16 max-w-screen-xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center space-x-2">
          <Feather className={cn("h-7 w-7", logoColor)} /> 
          <span className={cn("text-2xl font-bold tracking-tight font-serif", logoColor)}>The Scent</span>
        </Link>

        <nav className="hidden md:flex items-center space-x-6 text-sm font-medium">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "transition-colors flex items-center gap-1",
                navbarText,
                navbarHoverText,
                pathname === link.href ? navbarActiveText : "opacity-80"
              )}
            >
              {link.icon}
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center space-x-2 sm:space-x-3">
          <ThemeToggle /> {/* Uses its own styling for light/dark svgs */}
          <Link href="/cart" passHref>
            <Button variant="ghost" size="icon" className={cn("relative w-9 h-9", navbarText, navbarHoverText)} aria-label="Shopping Cart">
              <ShoppingBag className="h-5 w-5" />
              {totalItems > 0 && (
                <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-primary-foreground text-xs font-bold">
                  {totalItems}
                </span>
              )}
            </Button>
          </Link>

          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className={cn("md:hidden w-9 h-9", navbarText, navbarHoverText)} aria-label="Open menu">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className={cn("w-[300px] sm:w-[350px] p-6", navbarBg, navbarText)}>
              <div className="flex flex-col space-y-1">
                <Link href="/" className="flex items-center space-x-2 mb-6">
                   <Feather className={cn("h-7 w-7", logoColor)} />
                  <span className={cn("text-xl font-bold font-serif", logoColor)}>The Scent</span>
                </Link>
                {navLinks.map((link) => (
                  <SheetClose asChild key={link.href}>
                    <Link
                      href={link.href}
                      className={cn(
                        "flex items-center space-x-3 rounded-md p-3 text-base font-medium transition-colors",
                        navbarText,
                        "hover:bg-white/10 hover:text-white",
                        pathname === link.href ? cn("bg-white/20", navbarActiveText) : "opacity-90"
                      )}
                    >
                      {React.cloneElement(link.icon, { className: "w-5 h-5" })}
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

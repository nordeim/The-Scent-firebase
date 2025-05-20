
"use client";

import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { ChevronRight, Search } from 'lucide-react';

export default function HeroSection() {
  return (
    <section className="relative min-h-[calc(100vh-4rem)] flex items-center justify-center overflow-hidden py-16 md:py-24">
      <div className="absolute inset-0 z-0">
        <Image
          src="https://placehold.co/1920x1080"
          alt="Abstract aromatherapy background"
          data-ai-hint="aromatherapy abstract"
          fill
          priority
          className="object-cover opacity-20 dark:opacity-10"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-background via-transparent to-background"></div>
      </div>
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tighter mb-6 leading-tight">
          Discover Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-foreground_on_primary_bg to-accent dark:from-accent dark:to-primary-foreground_on_primary_bg_dark">Signature Scent</span>
        </h1>
        <p className="text-lg sm:text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto mb-10">
          Experience the transformative power of premium, AI-curated aromatherapy products designed for your well-being.
        </p>
        <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
          <Button asChild size="lg" className="group shadow-lg hover:shadow-xl transition-shadow transform hover:scale-105 bg-primary text-primary-foreground hover:bg-primary/90 dark:bg-accent dark:text-accent-foreground dark:hover:bg-accent/90">
            <Link href="/products">
              Shop All Products
              <ChevronRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
            </Link>
          </Button>
          <Button asChild variant="outline" size="lg" className="group shadow-lg hover:shadow-xl transition-shadow transform hover:scale-105">
            <Link href="/quiz">
              Take Scent Quiz
              <Search className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </div>
      </div>
      <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-background to-transparent z-5"></div>
    </section>
  );
}

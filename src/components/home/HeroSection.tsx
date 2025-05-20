
"use client";

import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { ShoppingBag } from 'lucide-react'; // Changed from ChevronRight, Search

export default function HeroSection() {
  return (
    <section className="relative min-h-[70vh] md:min-h-[calc(80vh-4rem)] flex items-center justify-center overflow-hidden py-16 md:py-24 bg-gray-700"> {/* Added bg-gray-700 for fallback */}
      <div className="absolute inset-0 z-0">
        <Image
          src="https://placehold.co/1920x1080" // Placeholder, actual image should be of blurred botanicals
          alt="Blurred aromatherapy background with herbs and flowers"
          data-ai-hint="blurred botanicals herbs"
          fill
          priority
          className="object-cover opacity-30 dark:opacity-20" // Adjusted opacity
        />
        {/* Overlay to darken the image a bit, making text more readable */}
        <div className="absolute inset-0 bg-black/30"></div> 
        {/* Optional: Gradient from page background if needed, but screenshot implies direct image */}
        {/* <div className="absolute inset-0 bg-gradient-to-br from-background/30 via-transparent to-background/30"></div> */}
      </div>
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight mb-4 leading-tight text-white">
          The <span className="text-teal-300">Scent</span>
        </h1>
        <p className="text-lg sm:text-xl md:text-2xl text-stone-200 max-w-2xl mx-auto mb-10">
          globally and formulated with passion.
        </p>
        <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
          <Button asChild size="lg" className="group shadow-lg hover:shadow-xl transition-shadow transform hover:scale-105 bg-primary text-primary-foreground hover:bg-primary/90 dark:hover:bg-primary/90 text-base px-10 py-6 rounded-full">
            <Link href="/products">
              <ShoppingBag className="mr-2 h-5 w-5" />
              Explore Collections
            </Link>
          </Button>
        </div>
      </div>
      {/* Optional: wave/curve divider like in screenshot - complex, omitting for now */}
      {/* <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-background to-transparent z-5"></div> */}
    </section>
  );
}

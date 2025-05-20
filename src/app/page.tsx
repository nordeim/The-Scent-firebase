
import HeroSection from '@/components/home/HeroSection';
import FeaturesSection from '@/components/home/FeaturesSection';
import BestSellersSection from '@/components/home/BestSellersSection';
import { Suspense } from 'react';
import { Skeleton } from '@/components/ui/skeleton';

// Loading skeleton for sections
const SectionSkeleton = () => (
  <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
    <Skeleton className="h-8 w-1/2 mx-auto mb-4" />
    <Skeleton className="h-6 w-3/4 mx-auto mb-12" />
    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
      {[1,2,3].map(i => <Skeleton key={i} className="h-96 w-full" />)}
    </div>
  </div>
);


export default function HomePage() {
  return (
    <div className="flex flex-col">
      <Suspense fallback={<Skeleton className="min-h-[calc(100vh-4rem)] w-full" />}>
        <HeroSection />
      </Suspense>
      <Suspense fallback={<SectionSkeleton />}>
        <FeaturesSection />
      </Suspense>
      <Suspense fallback={<SectionSkeleton />}>
        <BestSellersSection />
      </Suspense>
      {/* TODO: Add Testimonials, Blog Preview, Newsletter Signup sections for a full experience */}
    </div>
  );
}

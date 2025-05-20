
import { MOCK_PRODUCTS } from '@/lib/constants'; // For finding product by ID
import ProductDetailClient from '@/components/products/ProductDetailClient';
import type { Product } from '@/lib/types';
import { notFound } from 'next/navigation';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { Suspense } from 'react';
import { Skeleton } from '@/components/ui/skeleton';
import BestSellersSection from '@/components/home/BestSellersSection'; // Or a related products section

// Simulate fetching a product by ID
async function getProductById(id: string): Promise<Product | undefined> {
  // In a real app, this would be an API call
  const productId = parseInt(id, 10);
  return MOCK_PRODUCTS.find(p => p.id === productId);
}

export async function generateMetadata({ params }: { params: { id: string } }) {
  const product = await getProductById(params.id);
  if (!product) {
    return {
      title: 'Product Not Found | AromaGenius',
    };
  }
  return {
    title: `${product.name} | AromaGenius`,
    description: product.description,
  };
}

const ProductDetailSkeleton = () => (
  <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-start">
    <Skeleton className="aspect-square w-full rounded-lg" />
    <div className="space-y-6">
      <Skeleton className="h-10 w-3/4" />
      <Skeleton className="h-6 w-1/2" />
      <Skeleton className="h-8 w-1/4" />
      <Skeleton className="h-20 w-full" />
      <div className="flex space-x-4">
        <Skeleton className="h-12 w-24" />
        <Skeleton className="h-12 flex-1" />
      </div>
    </div>
  </div>
);

export default async function ProductDetailPage({ params }: { params: { id: string } }) {
  const product = await getProductById(params.id);

  if (!product) {
    notFound();
  }

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
      <Breadcrumb className="mb-6 md:mb-8">
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/">Home</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink href="/products">Shop</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>{product.name}</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      
      <Suspense fallback={<ProductDetailSkeleton />}>
        <ProductDetailClient product={product} />
      </Suspense>

      <div className="mt-16 md:mt-24">
        <BestSellersSection /> 
        {/* Could be RelatedProductsSection if logic is implemented */}
      </div>
    </div>
  );
}

// Optional: To pre-render these pages at build time if using static generation
// export async function generateStaticParams() {
//   return MOCK_PRODUCTS.map(product => ({
//     id: product.id.toString(),
//   }));
// }

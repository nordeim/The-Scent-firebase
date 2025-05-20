
import ProductFilters from '@/components/products/ProductFilters';
import ProductGrid from '@/components/products/ProductGrid';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";

export const metadata = {
  title: 'Shop Aromatherapy Products | AromaGenius',
  description: 'Explore our collection of premium aromatherapy products. Filter by category, scent, and price to find your perfect match.',
};

export default function ProductsPage() {
  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
      <Breadcrumb className="mb-6 md:mb-8">
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/">Home</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Shop</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <div className="flex flex-col lg:flex-row gap-8 md:gap-12">
        <div className="hidden lg:block">
          <ProductFilters />
        </div>
        <ProductGrid />
      </div>
    </div>
  );
}

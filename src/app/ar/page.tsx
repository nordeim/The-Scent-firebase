
import { Camera, Smartphone } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import Image from 'next/image';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";


export const metadata = {
  title: 'AR Product Visualization | AromaGenius',
  description: 'Visualize our aromatherapy products in your space using Augmented Reality.',
};

export default function ARPage() {
  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
      <Breadcrumb className="mb-6 md:mb-8">
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/">Home</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>AR Product Visualization</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <Card className="max-w-3xl mx-auto shadow-xl overflow-hidden">
        <CardHeader className="p-0">
          <div className="relative aspect-video bg-muted">
            <Image 
              src="https://placehold.co/1280x720" 
              alt="AR preview placeholder" 
              layout="fill" 
              objectFit="cover"
              data-ai-hint="modern living room"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent flex flex-col items-center justify-center text-center p-8">
              <Smartphone className="w-20 h-20 text-white/80 mb-4 opacity-50" />
               <h2 className="text-3xl md:text-4xl font-bold text-white mb-3 tracking-tight">AR Visualization Coming Soon!</h2>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-6 md:p-8 text-center">
          <CardTitle className="text-2xl font-semibold mb-2">Experience Products in Your Space</CardTitle>
          <CardDescription className="text-muted-foreground mb-6 max-w-xl mx-auto">
            Our Augmented Reality feature is currently under development. Soon, you'll be able to use your smartphone to see how our diffusers and other products will look in your home or office before you buy. Stay tuned for this exciting update!
          </CardDescription>
          <p className="text-sm text-muted-foreground mb-2">Imagine placing your chosen diffuser on your coffee table or bedside stand, all through your phone's camera.</p>
          <ul className="text-sm text-muted-foreground list-disc list-inside inline-block text-left mb-6">
            <li>Realistic 3D models of our products.</li>
            <li>Accurate sizing and placement.</li>
            <li>Works on most modern smartphones.</li>
          </ul>
        </CardContent>
        <CardFooter className="p-6 md:p-8 bg-muted/30 flex flex-col items-center">
          <Button size="lg" disabled>
            <Camera className="mr-2 h-5 w-5" /> Start AR Experience (Coming Soon)
          </Button>
          <p className="text-xs text-muted-foreground mt-3">No app download will be required.</p>
        </CardFooter>
      </Card>
    </div>
  );
}


import { Button } from "@/components/ui/button";
import { Globe2, Leaf, FlaskConical, ShoppingCart } from "lucide-react"; // Updated icons
import Image from "next/image";
import Link from "next/link";

const features = [
  {
    icon: <Globe2 className="h-7 w-7 text-accent" />,
    title: "Globally Sourced",
    dataAiHint: "globe world"
  },
  {
    icon: <Leaf className="h-7 w-7 text-accent" />,
    title: "Eco-Conscious",
    dataAiHint: "leaf recycle"
  },
  {
    icon: <FlaskConical className="h-7 w-7 text-accent" />,
    title: "Expert Formulated",
    dataAiHint: "science beaker"
  },
];

export default function FeaturesSection() {
  return (
    <section className="py-16 md:py-24 bg-secondary"> {/* Use --secondary for light teal background */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-12 md:gap-16 items-center">
          <div className="relative aspect-square md:aspect-[4/3] rounded-lg overflow-hidden shadow-xl">
            <Image
              src=\"https://source.unsplash.com/featured/?aromatherapy,products,ingredients\"
              alt="Aromatherapy products and natural ingredients"
              data-ai-hint="aromatherapy natural ingredients"
              fill
              className="object-cover"
            />
          </div>
          <div className="space-y-8">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight font-serif text-foreground">Nature's Wisdom, Bottled with Care</h2>
            <p className="text-lg text-muted-foreground">
              At The Scent, we believe in the restorative power of nature. We meticulously source the world's finest botanicals, blending ancient wisdom with modern expertise to create harmonious aromatherapy oils and soaps that nurture your mind, body, and spirit.
            </p>
            <div className="space-y-5">
              {features.map((feature) => (
                <div key={feature.title} className="flex items-center space-x-4">
                  <div className="flex-shrink-0 p-2 bg-background/50 rounded-full shadow-sm">
                    {feature.icon}
                  </div>
                  <p className="text-md font-medium text-secondary-foreground">{feature.title}</p>
                </div>
              ))}
            </div>
            <div className="text-left md:text-left pt-4"> {/* Changed from text-right */}
              <Button asChild size="lg" className="group bg-primary text-primary-foreground hover:bg-primary/90 dark:hover:bg-primary/90 px-8 py-3 rounded-full text-base">
                <Link href="/products">
                  <ShoppingCart className="mr-2 h-5 w-5" />
                  Shop Now
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

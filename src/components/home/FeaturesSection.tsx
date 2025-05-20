
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Zap, Bot, Camera, Home } from "lucide-react";

const features = [
  {
    icon: <Bot className="h-8 w-8 mb-4 text-accent" />,
    title: "AI-Powered Recommendations",
    description: "Discover scents tailored to your preferences with our intelligent scent quiz and personalized suggestions.",
    dataAiHint: "artificial intelligence brain"
  },
  {
    icon: <Camera className="h-8 w-8 mb-4 text-accent" />,
    title: "AR Product Visualization",
    description: "See how our diffusers and products look in your space before you buy, using augmented reality.",
    dataAiHint: "augmented reality mobile"
  },
  {
    icon: <Zap className="h-8 w-8 mb-4 text-accent" />,
    title: "Premium Quality Ingredients",
    description: "Experience the purest aromas with our ethically sourced, high-quality essential oils and natural blends.",
    dataAiHint: "essential oil vial"
  },
  {
    icon: <Home className="h-8 w-8 mb-4 text-accent" />,
    title: "Smart Home Integration",
    description: "Connect with your smart home devices for seamless aromatherapy experiences, automated to your lifestyle. (Coming Soon)",
    dataAiHint: "smart home hub"
  },
];

export default function FeaturesSection() {
  return (
    <section className="py-16 md:py-24 bg-secondary/50 dark:bg-secondary/20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">Why Choose AromaGenius?</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            We blend ancient wisdom with modern technology to elevate your sensory experience.
          </p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {features.map((feature, index) => (
            <Card key={index} className="text-center p-6 transition-all duration-300 hover:shadow-lg dark:hover:shadow-primary/20 transform hover:-translate-y-1 bg-card">
              <CardHeader className="flex flex-col items-center justify-center p-0 mb-4">
                {feature.icon}
                <CardTitle className="text-xl font-semibold">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <p className="text-sm text-muted-foreground">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}

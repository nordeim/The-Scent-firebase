
import QuizClient from '@/components/quiz/QuizClient';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";

export const metadata = {
  title: 'Find Your Perfect Scent | AromaGenius Scent Quiz',
  description: 'Take our interactive quiz to discover personalized aromatherapy recommendations tailored to your needs and preferences.',
};

export default function QuizPage() {
  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
       <Breadcrumb className="mb-6 md:mb-8">
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/">Home</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Scent Quiz</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <div className="text-center mb-8 md:mb-12">
        <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-3">AI Scent Discovery Quiz</h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Answer a few simple questions, and our AI will curate the perfect scents for your mood and goals.
        </p>
      </div>
      <QuizClient />
    </div>
  );
}

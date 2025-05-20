
"use client"; // This page needs client-side logic to access context and router

import { useAppContext } from '@/contexts/AppContext';
import ProductCard from '@/components/products/ProductCard';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect } from 'react';
import { Loader2, AlertTriangle, Search, RotateCcw } from 'lucide-react';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";

// This component is wrapped in Suspense by Next.js by default for searchParams
function QuizResultsContent() {
  const { quizResults, isLoadingQuizResults, quizAnswers, dispatch } = useAppContext();
  const router = useRouter();
  const searchParams = useSearchParams(); // To potentially show reasoning or passed params

  useEffect(() => {
    // If results are empty and not loading (e.g., direct navigation without quiz completion)
    // redirect to quiz page or show an appropriate message.
    if (!isLoadingQuizResults && quizResults.length === 0) {
      // Check if quiz answers are present to determine if quiz was attempted
      const attemptedQuiz = Object.keys(quizAnswers).length > 0;
      if (!attemptedQuiz) {
        // If no quiz attempt, redirect to start quiz
        router.replace('/quiz');
      }
      // If quiz was attempted but no results, it might be an error or empty result set
      // The UI below will handle this state.
    }
  }, [quizResults, isLoadingQuizResults, quizAnswers, router]);
  
  const handleRetakeQuiz = () => {
    dispatch({ type: 'RESET_QUIZ' });
    router.push('/quiz');
  };

  if (isLoadingQuizResults) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center p-8">
        <Loader2 className="h-16 w-16 animate-spin text-primary mb-6" />
        <h2 className="text-2xl font-semibold">Loading Your Recommendations...</h2>
      </div>
    );
  }

  // Get reasoning from searchParams if passed, or use a default message.
  // Example: const reasoning = searchParams.get('reasoning') || "Based on your preferences...";
  // For this example, we'll use a generic message.
  const reasoningMessage = "Here are some scents our AI picked just for you based on your quiz responses! These selections aim to match your desired mood, effects, and scent preferences.";


  if (quizResults.length === 0) {
    return (
      <div className="text-center py-12">
        <AlertTriangle className="mx-auto h-16 w-16 text-destructive mb-6" />
        <h2 className="text-2xl font-semibold mb-3">No Specific Matches Found</h2>
        <p className="text-muted-foreground mb-8 max-w-md mx-auto">
          We couldn't find direct matches for your specific preferences this time. 
          However, you can explore our full collection or try the quiz again with different options.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Button asChild size="lg">
            <Link href="/products">
              <Search className="mr-2 h-4 w-4" /> Explore All Products
            </Link>
          </Button>
          <Button onClick={handleRetakeQuiz} variant="outline" size="lg">
             <RotateCcw className="mr-2 h-4 w-4"/> Retake Quiz
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="text-center p-6 bg-gradient-to-r from-primary/10 to-accent/10 dark:from-primary/5 dark:to-accent/5 rounded-lg border border-border">
        <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-3">Your Personalized Scent Profile</h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          {reasoningMessage}
        </p>
      </div>
      
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
        {quizResults.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      <div className="mt-12 text-center space-y-4">
        <p className="text-muted-foreground">Not quite right? Or curious for more?</p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
           <Button onClick={handleRetakeQuiz} variant="outline" size="lg">
             <RotateCcw className="mr-2 h-4 w-4"/> Retake Quiz
          </Button>
          <Button asChild size="lg">
            <Link href="/products">
              <Search className="mr-2 h-4 w-4" /> Explore Full Collection
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}


export default function QuizResultsPage() {
  // Wrap with Suspense if this page itself needs to suspend for data (e.g. if searchParams were used in a server component)
  // Since QuizResultsContent is a client component using hooks, direct usage is fine here.
  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
      <Breadcrumb className="mb-6 md:mb-8">
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/">Home</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink href="/quiz">Scent Quiz</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Your Recommendations</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <QuizResultsContent />
    </div>
  );
}


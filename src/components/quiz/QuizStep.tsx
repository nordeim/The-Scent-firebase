
"use client";

import type { QuizQuestion, QuizQuestionOption } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../ui/card';

interface QuizStepProps {
  questionData: QuizQuestion;
  onAnswer: (answer: { key: string; value: string }) => void;
  isLastStep: boolean;
}

export default function QuizStep({ questionData, onAnswer, isLastStep }: QuizStepProps) {
  const [selectedValue, setSelectedValue] = useState<string | null>(null);

  const handleOptionSelect = (value: string) => {
    setSelectedValue(value);
  };

  const handleSubmit = () => {
    if (selectedValue) {
      onAnswer({ key: questionData.key, value: selectedValue });
    }
  };

  return (
    <Card className="w-full max-w-2xl mx-auto shadow-xl">
      <CardHeader>
        <CardTitle className="text-2xl text-center">{questionData.question}</CardTitle>
        <CardDescription className="text-center">Choose the option that best fits you.</CardDescription>
      </CardHeader>
      <CardContent>
        <RadioGroup 
          value={selectedValue || ""} 
          onValueChange={handleOptionSelect} 
          className="space-y-3"
        >
          {questionData.options.map((option) => (
            <Label
              key={option.id}
              htmlFor={option.id.toString()}
              className={`flex items-center p-4 border rounded-lg cursor-pointer transition-all duration-200 ease-in-out
                          ${selectedValue === option.value ? 'bg-primary border-primary/80 text-primary-foreground shadow-md ring-2 ring-primary/50' : 'hover:bg-muted/50 dark:hover:bg-muted/20'}`}
            >
              <RadioGroupItem value={option.value} id={option.id.toString()} className="mr-3" />
              <span className="text-base">{option.label}</span>
            </Label>
          ))}
        </RadioGroup>
      </CardContent>
      <CardFooter>
        <Button 
          onClick={handleSubmit} 
          disabled={!selectedValue} 
          size="lg"
          className="w-full"
        >
          {isLastStep ? 'Get My Recommendations' : 'Next Question'}
        </Button>
      </CardFooter>
    </Card>
  );
}

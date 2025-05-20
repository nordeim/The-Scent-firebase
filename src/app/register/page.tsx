// src/app/register/page.tsx

"use client";

import { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/card';
import { Label } from '@/components/ui/label';

export default function RegisterPage() {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
   const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
   const [success, setSuccess] = useState('');


  const handleRegister = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(''); // Clear previous errors
     setSuccess(''); // Clear previous success messages
    setLoading(true);

     // Basic client-side validation
     if (password !== confirmPassword) {
         setError('Passwords do not match.');
         setLoading(false);
         return;
     }
     // Add more validation (e.g., email format, password strength) here

    // --- Conceptual Backend Integration ---
    // This is where you would make an API call to your backend
    // to register a new user.
    console.log('Attempting to register user:', { fullName, email });

    try {
      // Example API call (replace with your actual endpoint and logic)
      // const response = await fetch('/api/auth/register', {
      //   method: 'POST',
      //   headers: {
      //     'Content-Type': 'application/json',
      //   },
      //   body: JSON.stringify({ fullName, email, password }),
      // });

      // const data = await response.json();

      // if (!response.ok) {
      //   // Handle registration errors (e.g., email already exists)
      //   setError(data.error || 'Registration failed');
      //   console.error('Registration failed:', data);
      // } else {
      //   // Handle successful registration (e.g., show success message, prompt for login)
      //   console.log('Registration successful:', data);
      //    setSuccess('Registration successful! You can now log in.');
      //   // Optionally clear the form or redirect to login
      //    setFullName('');
      //    setEmail('');
      //    setPassword('');
      //    setConfirmPassword('');
      // }

        // --- Placeholder Simulation ---
       // Simulate an asynchronous API call
       await new Promise(resolve => setTimeout(resolve, 1000));

       // Simulate a successful registration
       console.log('Simulated registration successful');
        setSuccess('Registration successful! You can now log in.');
         setFullName('');
         setEmail('');
         setPassword('');
         setConfirmPassword('');


    } catch (err: any) {
      console.error('Registration process error:', err);
      setError(err.message || 'An unexpected error occurred during registration.');
    } finally {
      setLoading(false);
    }
     // --- End Conceptual Backend Integration ---
  };


  return (
    <div className="flex items-center justify-center min-h-screen py-12 px-4 sm:px-6 lg:px-8 bg-gray-50">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1 text-center">
          <CardTitle className="text-2xl font-bold">Create an account</CardTitle>
          <p className="text-muted-foreground">Enter your details below to create your account</p>
        </CardHeader>
        <CardContent>
           <form onSubmit={handleRegister} className="grid gap-4">
             <div className="grid gap-2">
               <Label htmlFor="fullName">Full Name</Label>
               <Input
                 id="fullName"
                 type="text"
                 placeholder="John Doe"
                 required
                  value={fullName}
                 onChange={(e) => setFullName(e.target.value)}
               />
             </div>
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="m@example.com"
                required
                 value={email}
                 onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                required
                 value={password}
                 onChange={(e) => setPassword(e.target.value)}
              />
            </div>
             <div className="grid gap-2">
              <Label htmlFor="confirmPassword">Confirm Password</Label>
              <Input
                id="confirmPassword"
                type="password"
                required
                 value={confirmPassword}
                 onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>
             {error && <p className="text-red-500 text-sm text-center">{error}</p>}
             {success && <p className="text-green-500 text-sm text-center">{success}</p>}
            <Button type="submit" className="w-full" disabled={loading}>
               {loading ? 'Registering...' : 'Register'}
            </Button>
          </form>
        </CardContent>
         <CardFooter className="text-sm justify-center">
            Already have an account?{' '}
             <Link href="/login" className="underline ml-1">
               Login
             </Link>
         </CardFooter>
      </Card>
    </div>
  );
}

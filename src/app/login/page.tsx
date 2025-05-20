// src/app/login/page.tsx

"use client";

import { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/card';
import { Label } from '@/components/ui/label';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(''); // Clear previous errors
    setLoading(true);

    // --- Conceptual Backend Integration ---
    // This is where you would make an API call to your backend
    // for user authentication.
    console.log('Attempting to log in with:', { email, password });

    try {
      // Example API call (replace with your actual endpoint and logic)
      // const response = await fetch('/api/auth/login', {
      //   method: 'POST',
      //   headers: {
      //     'Content-Type': 'application/json',
      //   },
      //   body: JSON.stringify({ email, password }),
      // });

      // const data = await response.json();

      // if (!response.ok) {
      //   // Handle login errors (e.g., invalid credentials)
      //   setError(data.error || 'Login failed');
      //   console.error('Login failed:', data);
      // } else {
      //   // Handle successful login (e.g., save authentication token/session)
      //   console.log('Login successful:', data);
      //   // Redirect to dashboard or intended page
      //   // window.location.href = '/dashboard'; // Or use Next.js router
      //    alert('Login Successful (Placeholder)'); // Placeholder success
      // }

       // --- Placeholder Simulation ---
       // Simulate an asynchronous API call
       await new Promise(resolve => setTimeout(resolve, 1000));

       // Simulate a successful login
       console.log('Simulated login successful');
       alert('Login Successful (Placeholder)');
       // In a real app, you'd redirect here after saving auth state
       // router.push('/dashboard');


    } catch (err: any) {
      console.error('Login process error:', err);
      setError(err.message || 'An unexpected error occurred during login.');
    } finally {
      setLoading(false);
    }
     // --- End Conceptual Backend Integration ---
  };

  return (
    <div className="flex items-center justify-center min-h-screen py-12 px-4 sm:px-6 lg:px-8 bg-gray-50">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1 text-center">
          <CardTitle className="text-2xl font-bold">Login to your account</CardTitle>
          <p className="text-muted-foreground">Enter your email and password below</p>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleLogin} className="grid gap-4">
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
             {error && <p className="text-red-500 text-sm text-center">{error}</p>}
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? 'Logging In...' : 'Login'}
            </Button>
          </form>
        </CardContent>
         <CardFooter className="text-sm justify-center">
             Don't have an account?{' '}
             <Link href="/register" className="underline ml-1">
                Register
            </Link>
         </CardFooter>
      </Card>
    </div>
  );
}

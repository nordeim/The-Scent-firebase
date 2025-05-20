// src/app/dashboard/page.tsx

"use client";

import { useEffect, useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { useAppContext } from '@/contexts/AppContext'; // Assuming user data might be stored in context or fetched here
// import { useRouter } from 'next/navigation'; // Uncomment if using Next.js router for redirects

export default function DashboardPage() {
   const { userState } = useAppContext(); // Assuming user state might be available here
   const [userData, setUserData] = useState(null);
   const [loading, setLoading] = useState(true);
   const [error, setError] = useState('');
   // const router = useRouter();

   useEffect(() => {
       // --- Conceptual Authentication Check and Data Fetching ---
       // In a real app, you would check if the user is authenticated here.
       // If not authenticated, redirect them to the login page.
       console.log("Checking authentication and fetching user data...");

        // Example: Check authentication state (replace with your actual method)
       // if (!userState || !userState.isAuthenticated) {
       //     // Redirect to login if not authenticated
       //     router.push('/login');
       //     return; // Stop further execution
       // }

       // If authenticated, fetch user data from your backend
       const fetchUserData = async () => {
           try {
               // Example API call to fetch user profile data (replace with your actual endpoint)
               // const response = await fetch('/api/user/profile', {
               //     headers: {
               //         // Include authentication token in headers
               //         'Authorization': `Bearer ${userState.token}`,
               //     },
               // });

               // if (!response.ok) {
               //     // Handle errors (e.g., token expired, user not found)
               //     const errorData = await response.json();
               //     throw new Error(errorData.error || 'Failed to fetch user data');
               // }

               // const data = await response.json();
               // setUserData(data);
               // console.log("User data fetched:", data);

                // --- Placeholder Simulation ---
                await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate delay
                setUserData({ // Simulate fetched user data
                    fullName: userState?.fullName || 'Luxury Brand Customer',
                    email: userState?.email || 'customer@example.com',
                    memberSince: '2023-01-01', // Example static data
                    orderHistory: [ // Example static order history
                        { id: 'ORD123', date: '2023-10-26', total: 150.00, status: 'Delivered' },
                        { id: 'ORD456', date: '2023-11-10', total: 220.50, status: 'Shipped' },
                    ]
                });
                 console.log("Simulated user data loaded.");


           } catch (err: any) {
               console.error('Failed to fetch user data:', err);
               setError(err.message || 'Could not load user data.');
           } finally {
               setLoading(false);
           }
       };

        // Call the fetch function if conceptually authenticated or in placeholder mode
       // if (userState?.isAuthenticated) { // Check if user is authenticated
           fetchUserData();
       // } else {
           // If no user state or not authenticated, stop loading and show message or redirect
        //    setLoading(false);
        //    setError('You must be logged in to view this page.'); // Or handle redirect
       // }


   }, [ /* Add userState.isAuthenticated or userState.token as dependency if fetching depends on it */ ]); // Rerun effect if auth state changes


   if (loading) {
       return <div className="container mx-auto px-4 py-8 text-center">Loading dashboard...</div>;
   }

   if (error) {
       return <div className="container mx-auto px-4 py-8 text-center text-red-500">Error: {error}</div>;
   }

   // if (!userData) { // Handle case where user is not authenticated and no redirect happens
   //      return <div className="container mx-auto px-4 py-8 text-center text-muted-foreground">Please log in to view your dashboard.</div>;
   // }


  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
      <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-8">Your Dashboard</h1>

      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {/* Account Details Card */}
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle>Account Details</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-4 text-sm">
            <div>
              <p className="text-muted-foreground">Full Name</p>
              <p className="font-medium">{userData?.fullName || 'N/A'}</p>
            </div>
            <div>
              <p className="text-muted-foreground">Email Address</p>
              <p className="font-medium">{userData?.email || 'N/A'}</p>
            </div>
            <div>
                <p className="text-muted-foreground">Member Since</p>
                <p className="font-medium">{userData?.memberSince || 'N/A'}</p>
            </div>
            {/* Add other profile details */}
          </CardContent>
        </Card>

        {/* Order History Card */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Order History</CardTitle>
          </CardHeader>
          <CardContent>
            {userData?.orderHistory && userData.orderHistory.length > 0 ? (
              <div className="grid gap-4">
                {userData.orderHistory.map(order => (
                  <div key={order.id} className="flex justify-between items-center border-b pb-2 last:border-b-0 last:pb-0">
                    <div>
                      <p className="font-medium">Order #{order.id}</p>
                      <p className="text-sm text-muted-foreground">{new Date(order.date).toLocaleDateString()}</p>
                    </div>
                    <div className="text-right">
                        <p className="font-semibold">${order.total.toFixed(2)}</p>
                        <p className={`text-sm ${order.status === 'Delivered' ? 'text-green-600' : 'text-orange-600'}`}>
                            {order.status}
                        </p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-muted-foreground text-center">You haven't placed any orders yet.</p>
            )}
          </CardContent>
        </Card>

        {/* Could add more cards: Addresses, Payment Methods, etc. */}
      </div>
    </div>
  );
}

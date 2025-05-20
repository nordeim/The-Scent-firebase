// src/app/checkout/page.tsx

"use client";

import { useState, useMemo } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { CheckCircle2 } from 'lucide-react';
import { useAppContext } from '@/contexts/AppContext';
import CartSummary from '@/components/cart/CartSummary'; // Reusing the CartSummary component
// import { Elements, useStripe, useElements, PaymentElement } from '@stripe/react-stripe-js'; // Import Stripe components
// import { loadStripe } from '@stripe/stripe-js'; // Import loadStripe

// // Replace with your actual Stripe publishable key
// // const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);

// // Component to wrap the payment form for Stripe Elements
// const InjectedCheckoutForm = ({ onSuccessfulPayment }) => {
//   const stripe = useStripe();
//   const elements = useElements();

//   const handleSubmit = async (event) => {
//     event.preventDefault();

//     if (!stripe || !elements) {
//       // Stripe.js has not yet loaded.
//       return;
//     }

//     // Example: Create a PaymentIntent on your backend
//     // const { clientSecret } = await fetch('/api/create-payment-intent', {
//     //   method: 'POST',
//     //   headers: { 'Content-Type': 'application/json' },
//     //   body: JSON.stringify({ amount: /* calculate total amount */ * 100 }), // Amount in cents
//     // }).then((res) => res.json());

//      const clientSecret = 'test_client_secret'; // Placeholder - replace with actual client secret from your backend

//     const { error, paymentIntent } = await stripe.confirmPayment({
//       elements,
//       clientSecret,
//       confirmParams: {
//         // Make sure to change the return_url to your page that displays a payment success message
//         return_url: `${window.location.origin}/order-confirmation`,
//       },
//     });

//     if (error) {
//       console.error('[Stripe error]', error);
//       // Show error to your customer
//       alert(error.message);
//     } else {
//       if (paymentIntent.status === 'succeeded') {
//          console.log('[Stripe success]', paymentIntent);
//         // Payment succeeded, handle order fulfillment
//         // onSuccessfulPayment(paymentIntent);
//          alert('Payment Successful!'); // Basic alert for now
//          // Redirect to order confirmation page
//         // router.push('/order-confirmation');
//       } else {
//         // Handle other statuses like 'processing', 'requires_action'
//         console.log('[Stripe status]', paymentIntent.status);
//          alert(`Payment status: ${paymentIntent.status}`);
//       }
//     }
//   };

//   return (
//     <form onSubmit={handleSubmit} className="grid gap-4">
//       {/* The PaymentElement will render the appropriate payment methods */}
//       <PaymentElement />
//       {/* Add billing address fields if required by your Stripe setup and not collected by PaymentElement */}

//       <Button type="submit" className="w-full mt-4" disabled={!stripe || !elements}>
//         Place Order
//       </Button>
//     </form>
//   );
// };


export default function CheckoutPage() {
  const [step, setStep] = useState(1);
  const { cartState } = useAppContext();

  // State for Shipping Address Form
  const [shippingAddress, setShippingAddress] = useState({
    fullName: '',
    address1: '',
    address2: '',
    city: '',
    state: '',
    zip: '',
    country: '',
    phone: '',
  });

  // State for Shipping Address Validation Errors
  const [shippingAddressErrors, setShippingAddressErrors] = useState({
    fullName: '',
    address1: '',
    city: '',
    state: '',
    zip: '',
    country: '',
    phone: '',
  });

  // State for Selected Shipping Method (Placeholder)
  const [selectedShippingMethod, setSelectedShippingMethod] = useState<string | null>(null);
  const [shippingCost, setShippingCost] = useState(0); // Placeholder

  const subtotal = useMemo(() =>
    cartState.items.reduce((sum, item) => sum + item.price * item.quantity, 0),
    [cartState.items]
  );

  // Placeholder for tax rate and calculation (ideally from backend)
  const taxRate = 0.08;
  const estimatedTax = subtotal * taxRate;

  const total = subtotal + shippingCost + estimatedTax;

  const totalSteps = 3; // Shipping Address, Shipping Method, Payment

  // Basic Validation for Shipping Address
  const validateShippingAddress = () => {
    const errors: any = {};
    if (!shippingAddress.fullName.trim()) errors.fullName = 'Full Name is required';
    if (!shippingAddress.address1.trim()) errors.address1 = 'Address Line 1 is required';
    if (!shippingAddress.city.trim()) errors.city = 'City is required';
    if (!shippingAddress.state.trim()) errors.state = 'State/Province is required';
    if (!shippingAddress.zip.trim()) errors.zip = 'Zip/Postal Code is required';
    if (!shippingAddress.country.trim()) errors.country = 'Country is required';
     if (!shippingAddress.phone.trim()) errors.phone = 'Phone Number is required';
    setShippingAddressErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleShippingAddressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setShippingAddress(prevAddress => ({ ...prevAddress, [id]: value }));
     // Clear error on change
    setShippingAddressErrors(prevErrors => ({ ...prevErrors, [id]: '' }));
  };

    const handleShippingAddressBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    const errors: any = { ...shippingAddressErrors };
     if (id === 'fullName' && !value.trim()) errors.fullName = 'Full Name is required';
    if (id === 'address1' && !value.trim()) errors.address1 = 'Address Line 1 is required';
    if (id === 'city' && !value.trim()) errors.city = 'City is required';
    if (id === 'state' && !value.trim()) errors.state = 'State/Province is required';
    if (id === 'zip' && !value.trim()) errors.zip = 'Zip/Postal Code is required';
    if (id === 'country' && !value.trim()) errors.country = 'Country is required';
     if (id === 'phone' && !value.trim()) errors.phone = 'Phone Number is required';
    setShippingAddressErrors(errors);
  };

  // Handle Shipping Method Selection (Placeholder)
  const handleShippingMethodSelect = (method: string) => {
    setSelectedShippingMethod(method);
    // Update shipping cost based on selected method (placeholder logic)
    if (method === 'standard') setShippingCost(5.00);
    else if (method === 'express') setShippingCost(25.00);
    else setShippingCost(0); // Assuming 0 if none selected or other method
  };


  const handleNext = () => {
    if (step === 1) {
      if (validateShippingAddress()) {
        setStep((prevStep) => Math.min(prevStep + 1, totalSteps));
      }
    } else if (step === 2) {
         // Add validation for shipping method selection if needed
         if (selectedShippingMethod) {
             setStep((prevStep) => Math.min(prevStep + 1, totalSteps));
         } else {
             alert('Please select a shipping method.'); // Basic alert for now
         }
    }
     else {
      setStep((prevStep) => Math.min(prevStep + 1, totalSteps));
    }
  };

  const handleBack = () => {
    setStep((prevStep) => Math.max(prevStep - 1, 1));
  };

  const handleSubmitOrder = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    // This is where Stripe payment confirmation would happen
    // Requires @stripe/react-stripe-js and @stripe/stripe-js to be installed
    // Requires a backend endpoint to create a PaymentIntent

    console.log('Attempting to submit order and process payment...');

    // --- Conceptual Stripe Integration Flow ---
    // 1. Ensure Stripe and Elements are loaded (if using the hooks approach)
    // const stripe = useStripe();
    // const elements = useElements();
    // if (!stripe || !elements) {
    //   console.error("Stripe.js has not loaded.");
    //   return;
    // }

    // 2. Collect any additional data needed for the order/payment (e.g., shipping address, selected shipping method)
    const orderData = {
        items: cartState.items,
        shippingAddress: shippingAddress,
        shippingMethod: selectedShippingMethod,
        totalAmount: total * 100, // Amount in cents
        // Add any other relevant data
    };

    try {
        // 3. Call your backend API to create a PaymentIntent
        // This API call should calculate the final amount on the server to prevent manipulation
        console.log("Calling backend to create PaymentIntent...");
        // const response = await fetch('/api/create-payment-intent', {
        //   method: 'POST',
        //   headers: { 'Content-Type': 'application/json' },
        //   body: JSON.stringify(orderData), // Send necessary order data to backend
        // });

        // if (!response.ok) {
        //     const errorData = await response.json();
        //     throw new Error(errorData.error || 'Failed to create PaymentIntent on backend.');
        // }

        // const { clientSecret } = await response.json();
        const clientSecret = 'test_client_secret'; // Placeholder - Replace with actual client secret from backend

        console.log("Received client secret. Confirming payment...");

        // 4. Confirm the payment on the client-side using the client secret
        // const { error: stripeError, paymentIntent } = await stripe.confirmPayment({
        //   elements, // Use the elements instance from the provider
        //   clientSecret,
        //   confirmParams: {
        //     // Make sure to change the return_url to your page that displays a payment success message
        //     return_url: `${window.location.origin}/order-confirmation`,
        //      // Add shipping details here if your Stripe setup requires it for fraud prevention
        //      shipping: {
        //          name: shippingAddress.fullName,
        //          address: {
        //              line1: shippingAddress.address1,
        //              line2: shippingAddress.address2,
        //              city: shippingAddress.city,
        //              state: shippingAddress.state,
        //              postal_code: shippingAddress.zip,
        //              country: shippingAddress.country,
        //          },
        //          phone: shippingAddress.phone,
        //      },
        //   },
        //    // __private__: { // Optional: Add private metadata for your reference }
        // });

        // 5. Handle the result (success or failure)
        // if (stripeError) {
        //   console.error('[Stripe error]', stripeError);
        //   alert(stripeError.message); // Show error to the user
        // } else if (paymentIntent.status === 'succeeded') {
        //   console.log('[Stripe success]', paymentIntent);
        //   // Payment succeeded! Handle order fulfillment on your backend (e.g., finalize order status, send emails)
        //   // It's best to use Stripe webhooks for reliable order fulfillment after payment success.
        //   alert('Payment Successful!');
        //   // Redirect to order confirmation page
        //   // router.push('/order-confirmation');
        // } else {
        //    // Handle other paymentIntent statuses that require action or are processing
        //    console.log('[Stripe status]', paymentIntent.status);
        //    alert(`Payment status: ${paymentIntent.status}`);
        // }

        // --- End Conceptual Stripe Integration Flow ---


        // Placeholder for successful order placement without actual payment
        alert('Order Submitted (Payment Integration Placeholder)');
         // In a real app, after successful payment confirmation via Stripe (ideally handled by a webhook),
         // your backend would finalize the order and then the frontend would redirect.
         // For this placeholder, simulate redirect:
        // router.push('/order-confirmation');


    } catch (error: any) {
        console.error('Order submission error:', error);
        alert(`Order submission failed: ${error.message}`);
    }
  };

  // // Wrap the component tree that includes the PaymentElement with Elements provider
  // const renderPaymentStep = () => (
  //    <Elements stripe={stripePromise}>
  //       <InjectedCheckoutForm onSuccessfulPayment={(paymentIntent) => {
  //           // Handle post-payment success logic if needed on the client side
  //           console.log("Payment Successful in parent component:", paymentIntent);
  //           alert("Payment and Order Submitted!"); // Final confirmation message
  //           // Redirect to order confirmation
  //           // router.push('/order-confirmation');
  //       }} />
  //    </Elements>
  // );


  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
      <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-8">Checkout</h1>

      {/* Progress Indicator */}
      <div className="flex items-center justify-between mb-8">
        <div className={`flex-1 text-center ${step >= 1 ? 'text-primary' : 'text-muted-foreground'}`}>
          <CheckCircle2 className={`mx-auto h-6 w-6 mb-1 ${step >= 1 ? 'fill-primary/20' : ''}`} />
          <p className="text-sm font-medium">Shipping Address</p>
        </div>
        <div className="flex-1 border-t-2 mx-2 md:mx-4"></div>
         <div className={`flex-1 text-center ${step >= 2 ? 'text-primary' : 'text-muted-foreground'}`}>
          <CheckCircle2 className={`mx-auto h-6 w-6 mb-1 ${step >= 2 ? 'fill-primary/20' : ''}`} />
          <p className="text-sm font-medium">Shipping Method</p>
        </div>
         <div className="flex-1 border-t-2 mx-2 md:mx-4"></div>
        <div className={`flex-1 text-center ${step >= 3 ? 'text-primary' : 'text-muted-foreground'}`}>
           <CheckCircle2 className={`mx-auto h-6 w-6 mb-1 ${step >= 3 ? 'fill-primary/20' : ''}`} />
          <p className="text-sm font-medium">Payment</p>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-8 md:gap-12 items-start">
        <div className="lg:col-span-2">
          {step === 1 && (
            <Card>
              <CardHeader>
                <CardTitle>Shipping Address</CardTitle>
              </CardHeader>
              <CardContent>
                <form className="grid gap-4">
                  {/* Address Form Fields */}
                  <div className="grid gap-2">
                    <label htmlFor="fullName">Full Name</label>
                    <Input
                      id="fullName"
                      type="text"
                      value={shippingAddress.fullName}
                      onChange={handleShippingAddressChange}
                       onBlur={handleShippingAddressBlur}
                      required
                    />
                     {shippingAddressErrors.fullName && <p className="text-red-500 text-sm">{shippingAddressErrors.fullName}</p>}\
                  </div>
                  <div className="grid gap-2">
                    <label htmlFor="address1">Address Line 1</label>
                    <Input
                      id="address1"
                      type="text"
                      value={shippingAddress.address1}
                      onChange={handleShippingAddressChange}
                      onBlur={handleShippingAddressBlur}
                      required
                    />
                     {shippingAddressErrors.address1 && <p className="text-red-500 text-sm">{shippingAddressErrors.address1}</p>}\
                  </div>
                   <div className="grid gap-2">
                    <label htmlFor="address2">Address Line 2 (Optional)</label>
                    <Input
                      id="address2"
                      type="text"
                      value={shippingAddress.address2}
                      onChange={handleShippingAddressChange}
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="grid gap-2">
                      <label htmlFor="city">City</label>
                      <Input
                        id="city"
                        type="text"
                        value={shippingAddress.city}
                        onChange={handleShippingAddressChange}
                        onBlur={handleShippingAddressBlur}
                        required
                      />
                       {shippingAddressErrors.city && <p className="text-red-500 text-sm">{shippingAddressErrors.city}</p>}\
                    </div>
                    <div className="grid gap-2">
                      <label htmlFor="state">State/Province</label>
                       {/* This could be a Select component */}\
                       <Input
                          id="state"
                          type="text"
                           value={shippingAddress.state}
                           onChange={handleShippingAddressChange}
                           onBlur={handleShippingAddressBlur}
                          required
                        />
                        {shippingAddressErrors.state && <p className="text-red-500 text-sm">{shippingAddressErrors.state}</p>}\
                    </div>
                  </div>
                   <div className="grid grid-cols-2 gap-4">
                    <div className="grid gap-2">
                      <label htmlFor="zip">Zip/Postal Code</label>
                      <Input
                         id="zip"
                         type="text"
                          value={shippingAddress.zip}
                          onChange={handleShippingAddressChange}
                           onBlur={handleShippingAddressBlur}
                         required
                       />
                       {shippingAddressErrors.zip && <p className="text-red-500 text-sm">{shippingAddressErrors.zip}</p>}\
                    </div>
                     <div className="grid gap-2">
                      <label htmlFor="country">Country</label>
                       {/* This should be a Select component */}\
                      <Input
                         id="country"
                         type="text"
                          value={shippingAddress.country}
                           onChange={handleShippingAddressChange}
                           onBlur={handleShippingAddressBlur}
                         required
                       />
                       {shippingAddressErrors.country && <p className="text-red-500 text-sm">{shippingAddressErrors.country}</p>}\
                    </div>
                  </div>
                   <div className="grid gap-2">
                      <label htmlFor="phone">Phone Number</label>
                      <Input
                         id="phone"
                         type="tel"
                          value={shippingAddress.phone}
                           onChange={handleShippingAddressChange}
                           onBlur={handleShippingAddressBlur}
                         required
                       />
                        {shippingAddressErrors.phone && <p className="text-red-500 text-sm">{shippingAddressErrors.phone}</p>}\
                    </div>
                </form>
              </CardContent>
            </Card>
          )}

          {step === 2 && (
            <Card>
              <CardHeader>
                <CardTitle>Shipping Method</CardTitle>
              </CardHeader>
              <CardContent>
                {/* Shipping Method Options (Radio Buttons or Select) */}
                <div className="grid gap-4">
                   <div
                      className={`flex items-center justify-between p-4 border rounded-md cursor-pointer ${selectedShippingMethod === 'standard' ? 'border-primary ring-2 ring-primary/50' : ''}`}\
                       onClick={() => handleShippingMethodSelect('standard')}\
                   >
                    <div>
                      <p className="font-medium">Standard Shipping</p>
                      <p className="text-sm text-muted-foreground">Estimated Delivery: 5-7 business days</p>
                    </div>
                    <p className="font-semibold">$5.00</p>
                  </div>
                   <div
                       className={`flex items-center justify-between p-4 border rounded-md cursor-pointer ${selectedShippingMethod === 'express' ? 'border-primary ring-2 ring-primary/50' : ''}`}\
                       onClick={() => handleShippingMethodSelect('express')}\
                   >
                    <div>
                      <p className="font-medium">Express Shipping</p>
                      <p className="text-sm text-muted-foreground">Estimated Delivery: 1-2 business days</p>
                    </div>
                    <p className="font-semibold">$25.00</p>
                  </div>
                   {/* More options fetched from backend */}
                </div>
                 {!selectedShippingMethod && step === 2 && (
                     <p className="text-red-500 text-sm mt-2">Please select a shipping method to continue.</p>
                 )}
              </CardContent>
            </Card>
          )}

          {step === 3 && (
             <Card>
              <CardHeader>
                <CardTitle>Payment Information</CardTitle>
              </CardHeader>
              <CardContent>
                 {/*
                    Stripe Payment Elements Integration:
                    1. Wrap this section or the entire form with the `<Elements>` provider from @stripe/react-stripe-js.
                       The provider needs the `stripePromise` loaded with your publishable key.
                    2. Use the `<PaymentElement />` component from @stripe/react-stripe-js to render the dynamic payment methods UI.
                    3. The form submission will use `stripe.confirmPayment` from the `useStripe` hook, likely within the `handleSubmitOrder` function or a dedicated payment form component.
                 */}\
                 <div className="grid gap-4">
                    <p className="text-muted-foreground">Please enter your payment details below. Payment processing is handled securely by Stripe.</p>

                    {/* Placeholder for Stripe PaymentElement */}
                    {/*
                        You would typically render the <PaymentElement /> component here
                        within a component wrapped by the <Elements> provider.
                        Example: <PaymentElement options={paymentElementOptions} />
                        The `options` object can configure the PaymentElement appearance and behavior.
                    */}\
                    <div className="border p-4 rounded-md bg-muted/20 h-32 flex items-center justify-center">
                        <p className="text-muted-foreground">[ Stripe Payment Element UI goes here ]</p>
                    </div>

                    {/* Add terms and conditions checkbox if required */}\

                     {/* The actual submit button */}
                     {/*
                        This form wraps the conceptual payment section.
                        The onSubmit handler should trigger the Stripe payment confirmation process.
                        The button might be disabled until Stripe Elements are loaded and valid.
                     */}\
                     <form onSubmit={handleSubmitOrder} id="payment-form">
                          <Button type="submit" className="w-full mt-4">\
                               Place Order\
                           </Button>\
                     </form>\
                 </div>
              </CardContent>\
            </Card>\
          )}\

          {/* Navigation Buttons */}\
          <div className="flex justify-between mt-8">\
            {step > 1 && (\
              <Button variant="outline" onClick={handleBack}>\
                Back\
              </Button>\
            )}\
            {step < totalSteps && ( /* Hide continue button on the last step */\
              <Button onClick={handleNext} className="ml-auto">\
                Continue\
              </Button>\
            )}\
             {/* On the last step, the "Place Order" button is inside the form */}
          </div>\
        </div>\

        {/* Order Summary */}\
        <div className="lg:col-span-1">\
          {/* Reusing CartSummary for item breakdown - Note: CartSummary calculates its own total, but we use the 'total' state in CheckoutPage for the final order total calculation including shipping/tax */}\
          <CartSummary items={cartState.items} />\

           <Card className="mt-6">\
               <CardHeader>\
                   <CardTitle>Order Summary</CardTitle>\
               </CardHeader>\
               <CardContent>\
                    <div className="space-y-2 text-sm">\
                        <div className="flex justify-between">\
                          <span className="text-muted-foreground">Subtotal</span>\
                          <span>${subtotal.toFixed(2)}</span>\
                        </div>\
                         <div className="flex justify-between">\
                          <span className="text-muted-foreground">Shipping Cost</span>\
                          <span>{shippingCost > 0 ? `$${shippingCost.toFixed(2)}` : (selectedShippingMethod ? 'Calculated' : 'Select Method')}</span>{/* Updated */} \
                        </div>\
                         <div className="flex justify-between">\
                          <span className="text-muted-foreground">Estimated Tax</span>\
                          <span>${estimatedTax.toFixed(2)}</span> {/* Still an estimate */} \
                        </div>\
                    </div>\

                   <Separator className="my-4" />\

                   <div className="flex justify-between text-xl font-bold">\
                        <span>Order Total</span> {/* Changed text for clarity */} \
                        <span>${total.toFixed(2)}</span>\
                   </div>\
                    {step < totalSteps && (\
                         <p className="text-sm text-muted-foreground mt-2">Shipping and final tax calculated in the following steps.</p>\
                    )}\
                     {step === totalSteps && (\
                         <p className="text-sm text-muted-foreground mt-2">Final total including selected shipping and estimated tax.</p>\
                    )}\
               </CardContent>\
           </Card>\
        </div>\
      </div>\
    </div>\
  );\
}\

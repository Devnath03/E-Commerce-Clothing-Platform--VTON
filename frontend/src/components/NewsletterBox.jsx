import React, { useState } from 'react';
import { Toaster, toaster } from "../components/ui/toaster";

const NewsletterBox = () => {
  const [email, setEmail] = useState(''); // State to store the email input

  const onSubmitHandler = async (event) => {
    event.preventDefault();

    try {
      // Send the email to your backend API
      const response = await fetch('http://localhost:4000/api/newsletter/subscribe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }), // Send the email in the request body
      });

      if (response.ok) {
        // Show success message
        toaster.success({
          title: "Subscribe Successful!",
          description: "You have been subscribed to our newsletter.",
          type: "success",
        });
      } else {
        // Handle errors from the backend
        const errorData = await response.json();
        toaster.error({
          title: "Subscription Failed",
          description: errorData.message || "Something went wrong. Please try again.",
          type: "error",
        });
      }
    } catch (error) {
      // Handle network or other errors
      toaster.error({
        title: "Subscription Failed",
        description: "An error occurred. Please try again later.",
        type: "error",
      });
    }
  };

  return (
    <div className='text-center mt-8'>
      <Toaster /> {/* Toaster container for rendering notifications */}
      <p className='text-2xl font-medium text-gray-800'>Subscribe now & get 20% off</p>
      <p className='text-gray-400 mt-3'>
        Get the latest news, updates and offers straight to your inbox.
      </p>
      <form
        onSubmit={onSubmitHandler}
        className='w-full sm:w-1/2 flex items-center gap-3 mx-auto my-6 border pl-3'
      >
        <input
          className='w-full sm:flex-1 outline-none'
          type='email'
          placeholder='Enter your email'
          value={email}
          onChange={(e) => setEmail(e.target.value)} // Update the email state
          required
        />
        <button
          type='submit'
          className='bg-black text-white text-xs px-10 py-4'
        >
          SUBSCRIBE
        </button>
      </form>
    </div>
  );
};

export default NewsletterBox;
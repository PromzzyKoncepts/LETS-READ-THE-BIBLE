"use client";
import { useEffect, useState } from 'react';

const Page = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Ensure this code runs only on the client side
    if (typeof window !== 'undefined') {
      const userData = localStorage.getItem('user');
      if (userData) {
        setUser(JSON.parse(userData)); // Parse the JSON string into an object
      }
    }
  }, []);

  console.log(user); 

  return (
    <div className="flex items-center justify-center h-screen">
      <div>
        <h1 className="m-auto text-center text-2xl md:text-3xl font-lucky ">
          Thank you <span className="text-pinkbg">{user?.fullName}</span> for registering successfully!
        </h1>
        <p className="text-center">You have successfully registered for the Lovetoon's Bible Reading Fiesta</p>
      </div>
    </div>
  );
};

export default Page;
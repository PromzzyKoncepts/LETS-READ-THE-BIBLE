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
    <div className="bg-[#c6c6be] md:pt-24 min-h-screen">
      <div style={{ backgroundImage: `url(/images/congrats.jpg)`, backgroundRepeat: "no-repeat" }} className="md:w-[60%] flex items-center justify-center flex-col md:rounded-2xl mx-auto h-44 md:h-64 text-white p-5 md:p-10">
        <div>
          {user?.fullName && (<small className="text-pinkbg text-center  md:text-left md:text-sm">Dear {user?.fullName}</small>)}
          <h1 className="m-auto text-center text-2xl md:text-5xl font-lucky ">
          Thank you  for registering!
        </h1>
          <p className="text-center font-schoolbell ">You have successfully registered for the Lovetoons Bible Reading Fiesta</p>
        </div>
      </div>
    </div>
  );
};

export default Page;
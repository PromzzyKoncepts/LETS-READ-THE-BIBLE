"use client"
import Image from 'next/image'
import React, { useState } from 'react'
import kingsChatWebSdk from 'kingschat-web-sdk';
import 'kingschat-web-sdk/dist/stylesheets/style.min.css';
import {useRouter} from "next/navigation"
import { Toaster, toast  } from "react-hot-toast";

const clientId = "31414fbe-48d9-4806-9acf-4ed4bf58679b"
const loginOptions = {
    scopes: ["send_chat_message"],
    clientId: clientId
}

const baseUrl = "https://lets-read-the-bible.vercel.app"

const Page = () => {
    const router = useRouter()
    const [success, setSuccess] = useState(false);
    const [email, setEmail] = useState('');
    const [fullName, setFullName] = useState('');
    const [kingsChatHandle, setKingsChatHandle] = useState(null);
    
    const handleRegister = async (e) => {
        e.preventDefault();
        await registerUser({ email, fullName, kingsChatHandle });
    };
    
    async function registerUser(userData) {
        console.log(userData)
        try {
            const response = await fetch(`${baseUrl}/api/register-fiesta`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(userData),
            });
            const result = await response.json();
            if(result?.error){
                console.error("Registeration failed!", result.message)
                toast.error(result.message);
            }
             
            else if(result?.result){
                localStorage.setItem("user", JSON.stringify(userData))
                toast.success('You successfully registered!');
                router.push("/fiesta")

            }
            else console.error(result)
        } catch (error) {
            console.error('Error registering user:', error);
        }
    }
    async function registerKCUser(userData) {
        console.log(userData)
        try {
            const response = await fetch(`/api/kc-register-fiesta`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(userData),
            });
            const result = await response.json();
            if(result?.error){
                console.error("Registeration failed!", result.message)
                toast.error(result.message);
            }
             
            else if(result?.result){
                localStorage.setItem("user", JSON.stringify(userData))
                toast.success('You successfully registered!');
                router.push("/fiesta")

            }
            else console.error(result)
        } catch (error) {
            console.error('Error registering user:', error);
        }
    }
    function loginWithKingsChat() {
        kingsChatWebSdk.login(loginOptions)
        .then(authenticationTokenResponse => {
            console.log(authenticationTokenResponse.accessToken);
            fetchUserProfile(authenticationTokenResponse.accessToken);
        })
        .catch(error => console.error(error));
    }
    
    async function fetchUserProfile(accessToken) {
        console.log(accessToken)
        try {
            const response = await fetch('https://connect.kingsch.at/developer/api/profile', {
                headers: {
                    'Authorization': `Bearer ${accessToken}`
                }
            });
            const data = await response.json();
            console.log(data.profile)
            const { username, name, email } = data?.profile;
    
            // Send data to MongoDB
            await registerKCUser({ email, fullName: name, kingsChatHandle: username });
        } catch (error) {
            console.error('Error fetching user profile:', error);
        }
    }

  return (
    <div className="grid md:grid-cols-2 items-start max-h-screen font-sniglet">
        <Toaster position="top-right" />
      <div className="hidden md:block col-span-1">
        <Image src="/images/banner2.png" className="w-full h-screen object-cover" alt="banner" width={500} height={500}/>
      </div>
      <div className="flex flex-col items-center pt-4 md:pt-14 bg-[#dddcef] h-screen">
        <Image src="/images/logo_fiesta.png" className="w-36 md:w-52" alt="banner" width={500} height={500}/>
      <div className="">
      <a onClick={loginWithKingsChat} className="bg-gradient-to-t from-blue-800 to-[#2F92E5] font-lucky tracking-wider cursor-pointer px-7 py-4 rounded-xl text-white mt-10 border-2 border-white hover:shadow-md hover:shadow-slate-400" target="_blank"> Register with KingsChat</a>

      </div>
      <div className="flex items-center py-7  gap-3 opacity-60 mx-auto"><div  className="h-0.5 w-36 md:w-44 rounded-xl bg-darkbg"/> or <div className="h-0.5 w-36 md:w-44 rounded-xl bg-darkbg"/></div>
        <div className="flex  flex-col gap-5 w-full px-8 md:px-20 lg:px-36">
        <div className="flex flex-col gap-2 w-full">
            <label>Email address</label>
            <input name="email" className="border-0 outline-0 py-2 focus:border-b-2 border-b focus:border-darkbg border-slate-500 bg-transparent  text-darkbg" required type="email" placeholder="Enter Email address" value={email} onChange={(e) => setEmail(e.target.value)}/>
        </div>
        <div className="flex flex-col gap-2">
            <label>Full name</label>
            <input name="name" className="border-0 outline-0 focus:border-b-2 border-b py-2 focus:border-darkbg border-slate-500 bg-transparent  text-darkbg" required type="text" placeholder="Enter your full-name" value={fullName} onChange={(e) => setFullName(e.target.value)}/>
        </div>
        <div className="flex flex-col gap-2 w-full">
            <label>KingsChat(Optional)</label>
            <div className="flex items-center gap-3 py-2 border-b border-slate-500">@<input name="name" type="text" className="border-0 outline-0  bg-transparent text-darkbg w-full" placeholder="Enter your kingsChat username" value={kingsChatHandle} onChange={(e) => setKingsChatHandle(e.target.value)}/></div>
        </div>
        <button onClick={handleRegister} className="bg-gradient-to-t from-[#F82F00] to-[#F89108] hover:border-white hover:border-2 hover:shadow-lg hover:shadow-slate-400 px-5 py-2 rounded-lg text-white " >Register Now!</button>
        </div>

      </div>
    </div>
  )
}

export default Page
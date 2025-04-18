"use client"
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import kingsChatWebSdk from 'kingschat-web-sdk';
import 'kingschat-web-sdk/dist/stylesheets/style.min.css';
import { useRouter } from "next/navigation"
import { Toaster, toast } from "react-hot-toast";
import Link from 'next/link';

const clientId = "31414fbe-48d9-4806-9acf-4ed4bf58679b"
const loginOptions = {
	scopes: ["send_chat_message"],
	clientId: clientId
}

const baseUrl = "https://letsreadthebible.club"
// const baseUrl = "https://lets-read-the-bible.vercel.app"

const Page = () => {
	const router = useRouter()
	const [success, setSuccess] = useState(false);
	const [email, setEmail] = useState('');
	const [fullName, setFullName] = useState('');
	const [kingsChatHandle, setKingsChatHandle] = useState(null);
	const [viewAvatar, setViewAvatar] = useState(false);


	useEffect(() => {
		// Ensure this code runs only on the client side
		if (typeof window !== 'undefined') {
			// Check if the popup has already been shown using session storage
			const hasPopupBeenShown = sessionStorage.getItem('hasPopupBeenShown');
			if (!hasPopupBeenShown) {
				setViewAvatar(true); // Show the popup
				sessionStorage.setItem('hasPopupBeenShown', 'true'); // Mark the popup as shown
			}
		}
	}, []);

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
			if (result?.error) {
				console.error("Registeration failed!", result.message)
				toast.error(result.message);
			}

			else if (result?.result) {
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
			const response = await fetch(`${baseUrl}/api/kc-register-fiesta`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(userData),
			});
			const result = await response.json();
			if (result?.error) {
				console.error("Registeration failed!", result.message)
				toast.error(result.message);
			}

			else if (result?.result) {
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
			{viewAvatar && (
				<div className="font-sniglet z-[99] fixed top-0 h-screen w-full bg-darkbg bg-opacity-30 backdrop-blur-sm flex items-center justify-center">
					<div className="bg-white rounded-2xl shadow-lg py-10 mx-5 px-4 md:px-10 flex items-center gap-2 flex-col">
						<h2 className="text-3xl text-center md:text-5xl font-lucky text-[#d1942b]">WELCOME TO LBRF</h2>
						{/* <p>Show us your participation</p> */}
						<p className="text-lg text-center md:max-w-3xl">Kindly take a picture of you reading the scripture or participating in the fiesta and share with us</p>
						<div className="flex items-center gap-2 mt-3">
							<button onClick={() => {
								setViewAvatar(false)
								// setViewPicture(true)
							}} className="border-2 border-darkbg rounded-full px-4 py-2">Register instead</button>
							<Link href="/lbrf/picture" className="bg-darkbg rounded-full text-white px-4 py-2 border-2 hover:shadow-md hover:shadow-slate-500 border-white shadow-lg">Upload my picture</Link>
						</div>
					</div>
				</div>
			)}
			<div className=" col-span-1">
				<Image src="/images/banner2.png" className="md:w-full h-[10rem] md:h-screen object-cover" alt="banner" width={500} height={500} />
			</div>
			<div className="flex flex-col items-center  md:pt-14 bg-[#dddcef] h-screen">
				<Image src="/images/logo_fiesta.png" className="w-36 md:w-40" alt="banner" width={500} height={500} />
				
				<div className="flex gap-4 flex-col items-center ">
						<Link href="/lbrf/picture" className="bg-gradient-to-t from-lime-800 to-lime-500 hover:border-white hover:border-2 hover:shadow-lg hover:shadow-slate-400 px-5 py-4 font-lucky rounded-lg text-white  text-lg" >Upload your Bible reading picture</Link>
					<a onClick={loginWithKingsChat} className="bg-gradient-to-t from-blue-800 to-[#2F92E5] font-lucky tracking-wider cursor-pointer px-7 py-4 rounded-xl text-white  border-2 border-white hover:shadow-md hover:shadow-slate-400" target="_blank"> Register with KingsChat</a>

				</div>
				<div className="flex items-center pt-6  gap-3 opacity-60 mx-auto"><div className="h-0.5 w-36 md:w-44 rounded-xl bg-darkbg" /> or <div className="h-0.5 w-36 md:w-44 rounded-xl bg-darkbg" /></div>
				<div className="flex  flex-col gap-4 w-full px-8 md:px-20 lg:px-36">
					<div className="flex flex-col gap-1 w-full">
						<label>Email address</label>
						<input name="email" className="border-0 outline-0 py-2 focus:border-b-2 border-b focus:border-darkbg border-slate-500 bg-transparent  text-darkbg" required type="email" placeholder="Enter Email address" value={email} onChange={(e) => setEmail(e.target.value)} />
					</div>
					<div className="flex flex-col gap-1">
						<label>Full name</label>
						<input name="name" className="border-0 outline-0 focus:border-b-2 border-b py-2 focus:border-darkbg border-slate-500 bg-transparent  text-darkbg" required type="text" placeholder="Enter your full-name" value={fullName} onChange={(e) => setFullName(e.target.value)} />
					</div>
					<div className="flex flex-col gap-1 w-full">
						<label>KingsChat(Optional)</label>
						<div className="flex items-center gap-3 py-2 border-b border-slate-500">@<input name="name" type="text" className="border-0 outline-0  bg-transparent text-darkbg w-full" placeholder="Enter your kingsChat username" value={kingsChatHandle} onChange={(e) => setKingsChatHandle(e.target.value)} /></div>
					</div>
					<button onClick={handleRegister} className="bg-gradient-to-t from-[#F82F00] to-[#F89108] hover:border-white hover:border-2 hover:shadow-lg hover:shadow-slate-400 px-5 py-2 rounded-lg text-white " >Register Now!</button>
					
				</div>

			</div>
		</div >
	)
}

export default Page
"use client"
import React, { useState, useEffect } from 'react';
const baseUrl = "https://letsreadthebible.club"
const InfluencersPage = () => {
	const [influencerId, setInfluencerId] = useState('');
	const [users, setUsers] = useState([]);
	const [totals, setTotals] = useState({
		totalUsersThroughInfluencers: 0,
		totalUsersThroughUsualRoutes: 0,
		totalAllUsers: 0,
	});
	const [loading, setLoading] = useState(false);
	const [viewResult, setViewResult] = useState(false);
	const [error, setError] = useState('');

	// Fetch users for a specific influencer
	const fetchUsersByInfluencer = async () => {
		if (!influencerId) {
			setError('Please enter an influencer ID.');
			return;
		}

		setLoading(true);
		setError('');

		try {
			const response = await fetch(`${baseUrl}/api/GET_totalUsers?influencerId=${influencerId}`);
			const data = await response.json();

			if (response.ok) {
				setUsers(data.users || []);
			} else {
				setError(data.message || 'Failed to fetch users.');
			}
		} catch (err) {
			setError('Something went wrong. Please try again.');
		} finally {
			setLoading(false);
		}
	};

	// Fetch totals for all routes
	const fetchTotals = async () => {
		setLoading(true);
		setError('');

		try {
			const response = await fetch(`${baseUrl}/api/GET_totalUsers`);
			const data = await response.json();

			if (response.ok) {
				setTotals(data);
			} else {
				setError(data.message || 'Failed to fetch totals.');
			}
		} catch (err) {
			setError('Something went wrong. Please try again.');
		} finally {
			setLoading(false);
		}
	};

	return (
		<div className="md:pt-24 md:px-28">
			<h1 className="font-lucky text-5xl text-center">Influencer Registration Dashboard</h1>
			<div className=" grid grid-cols-2 items-start gap-3 mt-5">
				<div>

					{/* Input for fetching users by influencerId */}
					<div style={{ marginBottom: '7px' }} className="bg-slate-400 rounded-2xl px-10 py-5 flex flex-col items-start  font-sniglet">
						<h2 className="font-sniglet text-2xl" >View live Registration from each Influencer</h2>
						<small>Please be case sensitive when typing...</small>
						<input
							type="text"
							className="border border-darkbg rounded-2xl focus:outline-0"
							placeholder="Enter Influencer ID (e.g., PLEROO)"
							value={influencerId}
							onChange={(e) => setInfluencerId(e.target.value)}
							style={{ padding: '8px', width: '300px', marginRight: '10px' }}
						/>
						<button className="bg-darkbg border-2 text-white rounded-full shadow-lg shadow-slate-500 px-8 py-2" onClick={fetchUsersByInfluencer} disabled={loading}>
							{loading ? 'Loading...' : 'Fetch Users'}
						</button>
						{error && <p style={{ color: 'red' }}>{error}</p>}

						{!error && users.length > 0 && (<div>
							<p>Total registered by {influencerId}: <strong>{users?.length}</strong></p>
							<button onClick={() => setViewResult(!viewResult)}>{viewResult ? "Shrink result" : "View Result"}</button></div>)}
					</div>



					{/* Display users for the specified influencer */}
					{users?.length > 0 && viewResult && (
						<div style={{ marginBottom: '7px' }} className="h-[50vh] overflow-y-auto bg-slate-200 rounded-2xl px-8 py-5">
							<h3 className="font-lucky text-pinkbg text-2xl">Users for Influencer: {influencerId}</h3>
							<ul>
								{users.map((user, index) => (
									<li key={index} style={{ marginBottom: '10px' }}>
										<p><strong>Name:</strong> {user.fullName}</p>
										<p><strong>Email:</strong> {user.email}</p>
										<p><strong>KingsChat:</strong> {user.kingsChatHandle ? user.kingsChatHandle.replace(influencerId, '') : 'N/A'}</p>
										<p><strong>Registered At:</strong> {new Date(user.createdAt).toLocaleString()}</p>
									</li>
								))}
							</ul>
						</div>
					)}

				</div>
				<div>            {/* Button to fetch totals */}
					<div className="font-sniglet flex flex-col gap-4 text-white bg-darkbg px-10 py-5 rounded-2xl"  style={{ marginBottom: '7px' }}>
						<h2 className="font-sniglet text-2xl text-center text-white" >Fetch live Registeration</h2>
						<button className="bg-pinkbg w-fit mx-auto border-2 text-white rounded-full shadow-lg shadow-slate-900 px-8 py-2" onClick={fetchTotals} disabled={loading}>
							{loading ? 'Loading...' : 'Fetch Totals'}
						</button>
					</div>

					{/* Display totals */}
					{totals.totalAllUsers > 0 && (
						<div className="bg-slate-200 font-sniglet rounded-2xl px-5 py-5 md:grid grid-cols-3 gap-3">
							<p className="font-lucky uppercase bg-pinkbg text-white px-5 py-5 rounded-2xl flex flex-col gap-2 items-center border-2 shadow-slate-500 border-white shadow-lg  text-5xl "><strong className="text-lg font-jua text-slate-700">Influencers</strong> {totals.totalUsersThroughInfluencers}</p>
							<p className="font-lucky uppercase bg-green-500 text-white px-5 py-5 rounded-2xl flex flex-col gap-2 items-center border-2 shadow-slate-500 border-white shadow-lg  text-6xl "><strong className="text-2xl font-jua text-slate-700">Total</strong> {totals.totalAllUsers}</p>
							<p className="font-lucky uppercase bg-blue-500 text-white px-5 py-5 rounded-2xl flex flex-col gap-2 items-center border-2 shadow-slate-500 border-white shadow-lg  text-5xl "><strong className="text-lg font-jua text-slate-700">regular</strong> {totals.totalUsersThroughUsualRoutes}</p>
						</div>
					)}
				</div>
			</div>
		</div>
	);
};

export default InfluencersPage;
"use client"
import axios from "axios";
import React, { useEffect, useState } from "react";
const baseUrl = "https://lets-read-the-bible.vercel.app"
const Page = () => {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);


  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const response = await axios.get(`${baseUrl}/api/videos`);
        if (response.status !== 200) {
          throw new Error("Failed to fetch videos");
        }

        console.log(response)
        const {data } = response;
        setVideos(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchVideos();
  }, []);

  if (loading) {
    return <div>Loading videos...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Videos from Google Cloud Storage</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {videos.map((video, index) => (
          <div key={index} className="bg-white shadow-md rounded-lg overflow-hidden">
            <video controls className="w-full h-48 object-cover">
              <source src={video.url} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
            <div className="p-4">
              <h2 className="text-lg font-semibold">{video.name}</h2>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Page;
"use client"
import axios from 'axios';
import Image from 'next/image';
import Link from 'next/link';
import {useEffect, useState, useRef} from 'react';
import { IoCheckmarkCircleSharp } from "react-icons/io5";
import { MdDelete } from "react-icons/md";
import toast, { Toaster } from "react-hot-toast";

const baseUrl = "https://letsreadthebible.club"

const Page = () => {
    const [videos, setVideos] = useState([]);
      const [loading, setLoading] = useState(null);
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

      const handleApprove = async (videoId) => {

        try {
            setLoading(videoId)
            const response = await axios.put(`${baseUrl}/api/approve-video`, {videoId});
            console.log(response)

            if (response.status !== 200) {
            setLoading(null)

              throw new Error("Failed to fetch videos");
            }
            else{setLoading(null)
            toast.success("video has been approved!")
            setVideos(videos.filter(video => video.id !== videoId));
            }
            console.log(response)
        } catch (error) {
            setLoading(null)
            console.error(error)
            
        }
      }
      const handleDelete = async (videoId) => {
				console.log(videoId)
        try {
            setLoading(videoId)
            const response = await axios.delete(`${baseUrl}/api/delete-video/${videoId}`);
            if (response.status !== 200) {
                setLoading(null)
                throw new Error("Failed to delete video");
                toast.error("Failed to delete!");
            }
            else{
                setLoading(null)
                toast.success("Video has been deleted!");
                setVideos(videos.filter(video => video.id !== videoId));
            }
        }catch (error) {
					toast.error("Failed to delete!");
            setLoading(null)
            console.error(error);
        }
    };



  return (
    <div className="px-5 md:px-24 pt-5 md:pt-20">
        <Toaster position="top-right" />
      <div className="grid md:grid-cols-3 gap-3 pt-4">
              {videos.map((item, index) => (
                <div 
                key={item.id} 
                href={`/videos/${item.id}`} 
                className={`relative hover:group hover: cursor-pointer hover:border-2 border-white bg-slate-500 rounded-2xl hover:shadow-md hover:shadow-slate-600 ${loading == item.id && "bg-white"}`}>
                  <div
                  className="w-full h-[20rem] hover:group"
                    onMouseEnter={(e) => {
                      const video = e.currentTarget.querySelector('video');
                      if (video) {
                        video.play();
                      }
                    }}
                    onMouseLeave={(e) => {
                      const video = e.currentTarget.querySelector('video');
                      if (video) {
                        video.pause();
                        video.currentTime = 0; 
                      }
                    }}
                  >
                    <video
                      src={item.url}
                      width={300}
                      height={300}
                      className={`w-full object-cover h-full rounded-2xl ${loading == item.id && "animate-pulse"}`}
                      muted={false} 
                      controls={true}
                      loop={true}
                    />
                    <div className="absolute bottom-4 group-bg-opacity-100 right-4 backdrop-blur-sm rounded-full text-lg px-5 py-3 text-white hover:bg-opacity-100 bg-opacity-50 bg-darkbg">
                      <h3 className="">
                        {item.book} {item.chapter_start} {item.chapter_end && item.chapter_end !== item.chapter_start && ` - ${item.chapter_end}`}
                      </h3>
                    </div>
                    <div onClick={() =>  handleApprove(item.id)} className="absolute top-4 right-4 text-green-600"><IoCheckmarkCircleSharp size={35} color="green"/></div>
                    <div  onClick={() =>  handleDelete(item.id)}  className="absolute top-4 left-4 text-red-600"><MdDelete  size={35} color="red"/></div>
                  </div>
                </div>
              ))}
            </div>
    </div>
  )
}

export default Page

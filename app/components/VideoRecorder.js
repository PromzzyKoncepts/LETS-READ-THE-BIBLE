"use client";
import { useState, useRef, useEffect } from "react";
import { CgMediaLive } from "react-icons/cg";

const mimeType = "video/webm";

const VideoRecorder = () => {
  const [permission, setPermission] = useState(false);
  const [devices, setDevices] = useState({ audio: [], video: [] });
  const [selectedAudioDevice, setSelectedAudioDevice] = useState(null);
  const [selectedVideoDevice, setSelectedVideoDevice] = useState(null);
  const mediaRecorder = useRef(null);
  const liveVideoFeed = useRef(null);
  const [recordingStatus, setRecordingStatus] = useState("inactive");
  const [stream, setStream] = useState(null);
  const [videoChunks, setVideoChunks] = useState([]);
  const [recordedVideo, setRecordedVideo] = useState(null);
  const [countdown, setCountdown] = useState(null);

  const getAvailableDevices = async () => {
    try {
      const allDevices = await navigator.mediaDevices.enumerateDevices();
      const audioDevices = allDevices.filter((device) => device.kind === "audioinput");
      const videoDevices = allDevices.filter((device) => device.kind === "videoinput");
      setDevices({ audio: audioDevices, video: videoDevices });
      if (audioDevices.length) setSelectedAudioDevice(audioDevices[0].deviceId);
      if (videoDevices.length) setSelectedVideoDevice(videoDevices[0].deviceId);
    } catch (err) {
      alert("Error fetching devices: " + err.message);
    }
  };

  useEffect(() => {
    getAvailableDevices();
  }, []);

  const getCameraPermission = async () => {
    setRecordedVideo(null);
    if ("MediaRecorder" in window) {
      try {
        const videoConstraints = {
          deviceId: selectedVideoDevice ? { exact: selectedVideoDevice } : undefined,
        };
        const audioConstraints = {
          deviceId: selectedAudioDevice ? { exact: selectedAudioDevice } : undefined,
        };

        const audioStream = await navigator.mediaDevices.getUserMedia({ audio: audioConstraints });
        const videoStream = await navigator.mediaDevices.getUserMedia({ video: videoConstraints });

        setPermission(true);

        const combinedStream = new MediaStream([
          ...videoStream.getVideoTracks(),
          ...audioStream.getAudioTracks(),
        ]);
        setStream(combinedStream);
        liveVideoFeed.current.srcObject = videoStream;
      } catch (err) {
        alert(err.message);
      }
    } else {
      alert("The MediaRecorder API is not supported in your browser.");
    }
  };

  const startRecording = async () => {
    setCountdown(5); // Start countdown from 5
  };

  useEffect(() => {
    if (countdown === null) return;

    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown((prev) => prev - 1), 1000);
      return () => clearTimeout(timer);
    } else if (countdown === 0) {
      setRecordingStatus("recording");
      const media = new MediaRecorder(stream, { mimeType });
      mediaRecorder.current = media;
      mediaRecorder.current.start();
      let localVideoChunks = [];
      mediaRecorder.current.ondataavailable = (event) => {
        if (event.data.size > 0) {
          localVideoChunks.push(event.data);
        }
      };
      setVideoChunks(localVideoChunks);
    }
  }, [countdown]);

  const stopRecording = () => {
    setPermission(false);
    setRecordingStatus("inactive");
    mediaRecorder.current.stop();
    mediaRecorder.current.onstop = () => {
      const videoBlob = new Blob(videoChunks, { type: mimeType });
      const videoUrl = URL.createObjectURL(videoBlob);
      setRecordedVideo(videoUrl);
      setVideoChunks([]);
    };
  };

  return (
    <div className="font-sniglet">
      <div className="video-player flex items-center flex-col justify-center">
        {!recordedVideo && (
          <div className="relative">
            {countdown === 0 && recordingStatus === "recording" && (
              <div className="absolute z-[8] right-5 animate-pulse top-5">
                <CgMediaLive size={22} color="#EE8327" />
              </div>
            )}
            <video
              ref={liveVideoFeed}
              autoPlay
              className="colors rounded-xl border-white border-4 shadow-lg shadow-gray-400 md:w-[60rem] w-full h-screen md:h-[25rem] object-cover transform scale-x-[-1]"
            ></video>
          </div>
        )}
        {countdown !== null && countdown !== 0 && (
          <div className="flex justify-center items-center absolute">
            <p className="text-7xl font-bold text-[#282828]  stroke   animate-ping">{countdown}</p>
          </div>
        )}
        {recordedVideo && (
          <div className="recorded-player">
            <video
              className="bg-[#333] rounded-xl container w-[60rem] h-[25rem] object-cover border-white border-4"
              src={recordedVideo}
              controls
            ></video>
          </div>
        )}
      </div>
      <main>
        <div className="md:flex  mt-5 gap-3 items-center justify-center">
          {!recordedVideo && (<div className="flex flex-col items-start">
            <select
              id="audioSelect"
              value={selectedAudioDevice}
              onChange={(e) => setSelectedAudioDevice(e.target.value)}
              className="rounded p-2 w-[15rem] md:w-full"
            >
              {devices.audio.map((device) => (
                <option key={device.deviceId} value={device.deviceId}>
                  {device.label || `Microphone ${device.deviceId}`}
                </option>
              ))}
            </select>
          </div>)}
          {!recordedVideo && (<div className="flex flex-col items-start">
            
            <select
              id="videoSelect"
              value={selectedVideoDevice}
              onChange={(e) => setSelectedVideoDevice(e.target.value)}
              className="rounded p-2"
            >
              {devices.video.map((device) => (
                <option key={device.deviceId} value={device.deviceId}>
                  {device.label || `Camera ${device.deviceId}`}
                </option>
              ))}
            </select>
          </div>)}
          {!permission && (
            <button
              onClick={getCameraPermission}
              className="bg-gradie nt-to-tr colors from-[#EE7822] text-slate-100 to-[#EFB741] font-bold rounded-full px-7 py-2 shadow-md"
            >
              {recordedVideo ? "Try Again" : "Preview Camera"}
            </button>
          )}
          {permission && recordingStatus === "inactive" && (
            <button
              onClick={startRecording}
              className="bg-gradie nt-to-tr colors from-[#EE7822] text-slate-100 to-[#EFB741] font-bold  rounded-full px-7 py-2 shadow-md"
            >
              Start Recording
            </button>
          )}
          {recordingStatus === "recording" && (
            <button
              onClick={stopRecording}
              className="bg-gradient-to-b from-red-600 to-red-900 hover:from-red-900 hover:to-red-600 text-white rounded-full px-7 py-2 shadow-md"
            >
              Stop Recording
            </button>
          )}
          
          {recordedVideo && (
            <a
              download
              href={recordedVideo}
              className="bg-gradient-to-t from-darkbg to-[#ef419b] text-white rounded-full px-7 py-2 shadow-md"
            >
              Download
            </a>
          )}

{recordedVideo  && (
            <button
              onClick={stopRecording}
              className="bg-gradient-to-b from-green-600 to-green-900 hover:shadow-md hover:shadow-black text-white rounded-full px-7 py-2 shadow-md"
            >
              Upload
            </button>
          )}
        </div>
      </main>
    </div>
  );
};

export default VideoRecorder;

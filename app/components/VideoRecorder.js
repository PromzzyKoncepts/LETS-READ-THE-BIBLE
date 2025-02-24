"use client";
import { useState, useRef, useEffect } from "react";
import Link from "next/link"
import { CgMediaLive } from "react-icons/cg";
import { FaMicrophone, FaCamera } from "react-icons/fa6";
import { useFileUpload } from "../utils/useFileUpload";

const mimeType = "video/mp4";

const VideoRecorder = () => {
  const { uploadFile, uploadProgress } = useFileUpload();
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
  const [audioContext, setAudioContext] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [uploaded, setUploaded] = useState(false);

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
          noiseSuppression: true,
          echoCancellation: true,
        };

        const audioStream = await navigator.mediaDevices.getUserMedia({ audio: audioConstraints });
        const videoStream = await navigator.mediaDevices.getUserMedia({ video: videoConstraints });

        setPermission(true);

        const audioContext = new AudioContext();
        setAudioContext(audioContext);

        const source = audioContext.createMediaStreamSource(audioStream);
        const destination = audioContext.createMediaStreamDestination();
        source.connect(destination);

        const combinedStream = new MediaStream([
          ...videoStream.getVideoTracks(),
          ...destination.stream.getAudioTracks(),
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
    setCountdown(5);
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

      if (audioContext) {
        audioContext.close();
      }
    };
  };

  useEffect(() => {
    return () => {
      if (audioContext) {
        audioContext.close();
      }
    };
  }, [audioContext]);

  const handleUpload = async () => {
    if (!recordedVideo) {
      console.error("No recorded video available for upload.");
      return;
    }

    setIsUploading(true);

    const response = await fetch(recordedVideo);
    const videoBlob = await response.blob();

    const videoFile = new File([videoBlob], `recorded-video-${Date.now()}.mp4`, {
      type: mimeType,
    });

    const uploadOk = await uploadFile({ filename: videoFile.name, file: videoFile });

    if (uploadOk) {
      console.log("Upload successful!");
      setUploaded(true)
    } else {
      console.error("Upload failed.");
      setUploaded(false)
    }

    setIsUploading(false);
  };

  return (
    <div className="font-sniglet">
      {isUploading && (
        <div className="fixed inset-0 bg-darkbg bg-opacity-50 flex items-center justify-center">
          <div className="bg-white py-6 px-10 rounded-lg shadow-lg">
            <h2 className="text-xl font-bold mb-4">Uploading...</h2>
            <div className="w-64 h-4 bg-gray-200 rounded-full overflow-hidden">
              <div
                className="h-full bg-darkbg transition-all ease-in-out duration-300"
                style={{ width: `${uploadProgress}%` }}
              ></div>
            </div>
            <p className="mt-2 text-center">{uploadProgress}%</p>
          </div>
        </div>
      )}

      {!isUploading && recordedVideo  && uploaded &&  (
        <div className="absolute inset-0 bg-darkbg bg-opacity-50 flex items-center justify-center">
          <div className="bg-white py-8 px-16 z-[9999] rounded-lg shadow-lg flex flex-col items-center justify-center gap-1">
            <h3 className="text-2xl md:text-7xl text-center font-modak text-pinkbg">Gloraaay!</h3>
            <p className="text-center font-lucky font-light text-darkbg text-lg">Great Job! Your video has been successfully uploaded</p>
            <p className="text-center text-darkbg text-lg">Thank you for being a part of this Glorious campaign</p>
            <small className="text-center">Due to our <Link href="/t&c" className="hover:underline text-blue-600">Guidelines and conditions</Link>, your video is currently being reviewed. <br/> Please Wait... </small>

            <button onClick={
              () => {
                setUploaded(false)
                setRecordedVideo(null)
              }
            } className="bg-darkbg  px-5 py-2 rounded-xl text-white mt-5">Record again</button>
            <Link href="/upload" className="underline mt-3">Upload Instead</Link>
          </div>
        </div>
      )}
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
            <p className="text-7xl font-bold text-[#282828] stroke animate-ping">{countdown}</p>
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
        <div className="md:flex mt-5 gap-3 items-center justify-center">
          {!recordedVideo && (
            <div className="flex flex-row items-center">
              <div className="bg-darkbg p-2.5"><FaMicrophone color="white" /></div>
              <select
                id="audioSelect"
                value={selectedAudioDevice || "Microphone Device"}
                onChange={(e) => setSelectedAudioDevice(e.target.value)}
                className="rounded-r p-2 w-[10rem] md:w-[25rem]"
              >
                {devices.audio.map((device) => (
                  <option key={device.deviceId} value={device.deviceId}>
                    {device.label || `Microphone ${device.deviceId}`}
                  </option>
                ))}
              </select>
            </div>
          )}
          {!recordedVideo && (
            <div className="flex flex-row items-start">
              <div className="bg-darkbg p-2.5"><FaCamera color="white" /></div>
              <select
                id="videoSelect"
                value={selectedVideoDevice || "Camera Device"}
                onChange={(e) => setSelectedVideoDevice(e.target.value)}
                className="rounded p-2"
              >
                {devices.video.map((device) => (
                  <option key={device.deviceId} value={device.deviceId}>
                    {device.label || `Camera ${device.deviceId}`}
                  </option>
                ))}
              </select>
            </div>
          )}
          {!permission && (
            <button
              onClick={getCameraPermission}
              className="bg-gradient-to-tr shadow-slate-600 from-[#ac6430] text-white to-[#f4b120] font-bold rounded-full px-7 py-2 shadow-md"
            >
              {recordedVideo ? "Try Again" : "Preview Camera"}
            </button>
          )}
          {permission && recordingStatus === "inactive" && (
            <button
              onClick={startRecording}
              className="bg-gradient-to-tr colors from-[#EE7822] text-slate-100 to-[#EFB741] font-bold rounded-full px-7 py-2 shadow-md"
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
          {recordedVideo && (
            <button
              onClick={handleUpload}
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
"use client";
import { useState, useRef, useEffect } from "react";
import Link from "next/link"
import { CgMediaLive } from "react-icons/cg";
import { FaMicrophone, FaCamera } from "react-icons/fa6";
import { useFileUpload } from "../utils/useFileUpload";
import axios from "axios";
import { getBooks, getChapters } from './read/readApi';
import { MdCloudDownload, MdCloudUpload } from "react-icons/md";
import { IoVideocam } from "react-icons/io5";


const mimeType = "video/mp4";
// const baseUrl = "http://localhost:3000"
const baseUrl = "https://lets-read-the-bible.vercel.app"

const VideoRecorder = () => {
  // const { uploadFile, uploadProgress } = useFileUpload();
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

  const [books, setBooks] = useState([]);
  const [selectedBook, setSelectedBook] = useState('');
  const [chapters, setChapters] = useState([]);
  const [selectedChapterStart, setSelectedChapterStart] = useState('');
  const [selectedChapterEnd, setSelectedChapterEnd] = useState('');
  const [isSingleChapter, setIsSingleChapter] = useState(false);
  const [kidFullname, setKidFullname] = useState('');
  const [parentFullname, setParentFullname] = useState('');
  const [uploadProgress, setUploadProgress] = useState(0);
  const [showModal, setShowModal] = useState(false);


  const getAvailableDevices = async () => {
    try {
      const allDevices = await navigator.mediaDevices.enumerateDevices();
      const audioDevices = allDevices.filter((device) => device.kind === "audioinput");
      const videoDevices = allDevices.filter((device) => device.kind === "videoinput");
      setDevices({ audio: audioDevices, video: videoDevices });
      if (audioDevices.length) setSelectedAudioDevice(audioDevices[0].deviceId);
      if (videoDevices.length) setSelectedVideoDevice(videoDevices[0].deviceId);
    } catch (err) {
      console.log("Error fetching devices: " + err.message);
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
        console.log(err.message);
      }
    } else {
      console.log("The MediaRecorder API is not supported in your browser.");
    }
  };

  const startRecording = async () => {
    setCountdown(5);
  };

  const restartRecording = async () => {
    getCameraPermission()
    setCountdown(5);
    setVideoChunks([])
    setRecordedVideo(null)

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



  useEffect(() => {
    const fetchedBooks = getBooks();
    setBooks(fetchedBooks);
  }, []);

  useEffect(() => {
    if (selectedBook) {
      const fetchedChapters = getChapters(selectedBook);
      setChapters(fetchedChapters);
    }
  }, [selectedBook]);

  const handleUpload2 = async () => {
    if (!recordedVideo) {
      console.log('No video file selected.');
      return;
    }

    // Create a Blob from the recorded video URL
  const response = await fetch(recordedVideo);
  const blob = await response.blob();
  const videoName = `${selectedBook} ${selectedChapterStart} ${selectedChapterEnd && " - "} ${selectedChapterEnd && selectedChapterEnd}`;

    const formData = new FormData();
    formData.append('file', blob, videoName);
    formData.append('kid_fullname', kidFullname);
    formData.append('parent_fullname', parentFullname);
    formData.append('book', selectedBook);
    formData.append('chapter_start', selectedChapterStart);
    formData.append('chapter_end', selectedChapterEnd);

    setIsUploading(true);
    setShowModal(true);

    try {
      const response = await axios.post(`${baseUrl}/api/upload`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        onUploadProgress: (progressEvent) => {
          const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
          setUploadProgress(percentCompleted);
        },
      });

      if (response.status === 200) {
        console.log('Video uploaded successfully!');
        setUploaded(true)
      } else {
        setUploaded(false);
      }
    } catch (error) {
      console.error('Error uploading video:', error);
      console.log('Failed to upload video.');
    } finally {
      setIsUploading(false);
      setShowModal(false);
    }
  };

  const handleBookChange = (event) => {
    setSelectedBook(event.target.value);
    setSelectedChapterStart('');
    setSelectedChapterEnd('');
  };

  const handleChapterStartChange = (event) => {
    setSelectedChapterStart(event.target.value);
  };

  const handleChapterEndChange = (event) => {
    setSelectedChapterEnd(event.target.value);
  };

  const handleCheckboxChange = () => {
    setIsSingleChapter(!isSingleChapter);
    if (!isSingleChapter) {
      setSelectedChapterEnd('');
    }
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

      {!isUploading && recordedVideo && uploaded && (
        <div className="absolute inset-0 bg-darkbg bg-opacity-50 flex items-center justify-center">
          <div className="bg-white py-8 px-16 z-[9999] rounded-lg shadow-lg flex flex-col items-center justify-center gap-1">
            <h3 className="text-2xl md:text-7xl text-center font-modak text-pinkbg">Gloraaay!</h3>
            <p className="text-center font-lucky font-light text-darkbg text-lg">Great Job! Your video has been successfully uploaded</p>
            <p className="text-center text-darkbg text-lg">Thank you for being a part of this Glorious campaign</p>
            <small className="text-center">Due to our <Link href="/t&c" className="hover:underline text-blue-600">Guidelines and conditions</Link>, your video is currently being reviewed. <br /> Please Wait... </small>

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
          <div className="recorded-player flex items-start gap-5 ">
            <div className=" flex flex-col items-center justify-center gap-3 bg-gradient-to-t from-[#f8f8f8] to-white rounded-2xl ">

              <video
                className="bg-[#333] rounded-2xl container w-[60rem] h-[25rem] object-cover border-[#f8f8f8] border-4"
                src={recordedVideo}
                controls
              />

              <div className="w-full flex items-center justify-between  font-lucky px-10 pb-5">
                <div className="">
                  {kidFullname && (<p className="text-pinkbg"><span className="text-slate-500">Read By:</span> {kidFullname} </p>)}
                  <div className="text-3xl text-darkbg">
                    {selectedBook} {selectedChapterStart} {selectedChapterEnd && ` - ${selectedChapterEnd}`}
                  </div>
                </div>
                <div className=" flex items-center justify-center  gap-6 "><button
                  onClick={restartRecording}
                  className="bg-gradient-to-tr colors from-[#EE7822] to-[#EFB741] font-bold rounded-full px-10 py-2.5 text-lg shadow-md flex items-center text-slate-900 gap-3 tracking-wider"
                >
                  <IoVideocam  size={30} /> Try Again
                </button>

                <a
                  download
                  href={recordedVideo}
                  className="bg-gradient-to-t from-darkbg to-[#ef419b] text-white rounded-full px-7 py-2.5 shadow-md flex items-center text-lg gap-3 w-fit"
                >
                  <MdCloudDownload  size={30} /> Download
                </a></div>
                
              </div>
            </div>

            <div className="col-span-2 flex flex-col gap-1.5 bg-[#f8f8f8] p-5 text-left">
              <h2 className="font-lucky text-3xl text-center text-darkbg">Bible Reading Details</h2>
              <div className="flex flex-col gap-2">
                <label htmlFor='fullname'>Kids Full name</label>
                <input type="text" name="fullname" placeholder="Enter full name" className='p-3 focus:outline-pinkbg focus:outline-1' value={kidFullname} onChange={(e) => setKidFullname(e.target.value)} />
              </div>

              <div className="flex flex-col gap-2">
                <label htmlFor='fullname'>Parent or Guardians Full name</label>
                <input type="text" placeholder="Parent(s) or Guardian's Name(optional)" className='p-3 focus:outline-pinkbg focus:outline-1' value={parentFullname} onChange={(e) => setParentFullname(e.target.value)} />
              </div>

              <label htmlFor='fullname'>Which Book of the bible did you read?</label>
              <select value={selectedBook} className='p-3' onChange={handleBookChange}>
                <option value="">Select a Book</option>
                {books.map((book) => (
                  <option key={book.book_id} value={book.book_name}>
                    {book.book_name}
                  </option>
                ))}
              </select>

              <label htmlFor='fullname'>What chapter(s) did you read?</label>
              <div className="flex items-center gap-3">
                <select className='p-3 w-20 disabled:opacity-50 disabled:bg-slate-200' value={selectedChapterStart} onChange={handleChapterStartChange} disabled={!selectedBook}>
                  <option value="">Select a Chapter</option>
                  {chapters.map((chapter, index) => (
                    <option key={index} value={chapter}>
                      {chapter}
                    </option>
                  ))}
                </select>
                -
                <select
                  className="p-3 w-16 disabled:opacity-50 disabled:bg-slate-200"
                  value={selectedChapterEnd}
                  onChange={handleChapterEndChange}
                  disabled={!selectedBook || isSingleChapter}
                >
                  <option value="">Select a Chapter</option>
                  {chapters.filter((chapter) => chapter > selectedChapterStart).map((chapter, index) => (
                    <option key={index} value={chapter}>
                      {chapter}
                    </option>
                  ))}
                </select>

                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={isSingleChapter}
                    onChange={handleCheckboxChange}
                  />
                  <label className="text-sm">Only one chapter</label>
                </div>

              </div>
              <button
                onClick={handleUpload2}
                className=" text-slate-900 rounded-md px-5 py-2 text-xl font-lucky  bg-gradient-to-tr from-[#EE7822] to-[#EFB741] active:bg-gradient-to-bl hover:rounded-2xl disabled:opacity-20 flex items-center justify-center gap-2"
              >
                <MdCloudUpload size={30} />
                Upload
              </button>
              {/* <button onClick={handleUpload} disabled={!selectedBook && !selectedChapterStart } className=" text-black rounded-md px-5 py-2.5 text-xl font-lucky  bg-gradient-to-tr from-[#EE7822] to-[#EFB741] active:bg-gradient-to-bl hover:rounded disabled:opacity-20">Upload Video</button> */}
            </div>

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
          {!permission && !recordedVideo && (
            <button
              onClick={getCameraPermission}
              className="bg-gradient-to-tr shadow-slate-600 from-[#ac6430] text-white to-[#f4b120] font-bold rounded-full px-7 py-2 shadow-md"
            >
              {"Preview Camera"}
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
          
        </div>
      </main>
    </div>
  );
};

export default VideoRecorder;
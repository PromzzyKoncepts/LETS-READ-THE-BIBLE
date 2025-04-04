"use client"
import { useState, useEffect, useRef } from 'react';
import { BiLoaderCircle, BiSolidCloudUpload } from 'react-icons/bi';
import Link from 'next/link';
import { getBooks, getNewTestamentBooks, getChapters } from '@/app/components/read/readApi';
import axios from 'axios';
import toast from 'react-hot-toast';

// const baseUrl = "http://localhost:3000"
const baseUrl = "https://letsreadthebible.club"

const UploadVideo = () => {
  const [videoSrc, setVideoSrc] = useState('');
  const [videoFile, setVideoFile] = useState('');
  const [dragging, setDragging] = useState(false);
  const videoRef = useRef(null);
  const fileInputRef = useRef(null);

  const [books, setBooks] = useState([]);
  const [selectedBook, setSelectedBook] = useState('');
  const [chapters, setChapters] = useState([]);
  const [selectedChapterStart, setSelectedChapterStart] = useState('');
  const [selectedChapterEnd, setSelectedChapterEnd] = useState('');
  const [isSingleChapter, setIsSingleChapter] = useState(false);
  const [kidFullname, setKidFullname] = useState('');
  const [parentFullname, setParentFullname] = useState('');

  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
  const [uploaded, setUploaded] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchedBooks = getNewTestamentBooks();
    setBooks(fetchedBooks);
  }, []);

  useEffect(() => {
    if (selectedBook) {
      const fetchedChapters = getChapters(selectedBook);
      setChapters(fetchedChapters);
    }
  }, [selectedBook]);

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

  const handleFile = (file) => {
    if (!file) return;

    const validTypes = ['video/mp4', 'video/mov', 'video/webm'];
    if (!validTypes.includes(file.type)) {
      console.log('Invalid file type. Only MP4, MOV, and WEBM are allowed.');
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      setVideoSrc(e.target.result);
      if (videoRef.current) {
        videoRef.current.load();
        videoRef.current.play();
      }
    };
    reader.readAsDataURL(file);
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setVideoFile(file);
    handleFile(file);
  };

  const handleDragOver = (event) => {
    event.preventDefault();
    setDragging(true);
  };

  const handleDragLeave = () => {
    setDragging(false);
  };

  const handleDrop = (event) => {
    event.preventDefault();
    setDragging(false);
    const file = event.dataTransfer.files[0];
    handleFile(file);
  };

  const handleUpload = async () => {
    if (!videoFile) {
      console.log('No video file selected.');
      return;
    }

    // const formData = new FormData();
    // formData.append('file', videoFile);
    // formData.append('kid_fullname', kidFullname || user?.fullName);
    // formData.append('parent_fullname', parentFullname);
    // formData.append('book', selectedBook);
    // formData.append('chapter_start', selectedChapterStart);
    // formData.append('chapter_end', selectedChapterEnd);

    const apiFormData = new FormData();
    apiFormData.append('file', videoFile);

    setIsUploading(true);
    setShowModal(true);

    try {
      const res = await axios.post(`https://lovetoons.org/api/datafile/fileupload.php`, apiFormData, {
        headers: {
        'Content-Type': 'multipart/form-data',
        'Accept': '*/*',
      },
      onUploadProgress: (progressEvent) => {
        const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
        setUploadProgress(percentCompleted);
      },})
      console.log(res)
      if(!res?.data?.success) return
      const file_path = res.data.file_path.replace(/^(\.\.\/)+/, '')
      .replace(/\\/g, '/')
      .replace(/\/+/g, '/');
      console.log(file_path)

      const body = {
        kid_fullname: kidFullname  || user?.fullName,
        parent_fullname: parentFullname,
        book: selectedBook,
        chapter_start: selectedChapterStart,
        chapter_end: selectedChapterEnd,
        video_url: "https://lovetoons.org/" + file_path,
      }
      const response = await axios.post(`${baseUrl}/api/upload-fiesta`, body, {
        headers: {
          // 'Content-Type': 'multipart/form-data',
          'Accept': '*/*',
        },
        // onUploadProgress: (progressEvent) => {
        //   const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
        //   setUploadProgress(percentCompleted);
        // },
      });

      console.log(response)

      if (response.status == 200) {
        console.log('Video uploaded successfully!');
        toast.success('Video uploaded successfully!')
        setUploaded(true)
      } else {
        setUploaded(false);
      }
    } catch (error) {
      console.error('Error uploading video:', error);
      console.log('Failed to upload video.');
    } finally {
      setIsUploading(null);
      setShowModal(false);
    }
  };
const [fiesta, setFiesta] = useState(true)


const [usedChapterRanges, setUsedChapterRanges] = useState([]);

useEffect(() => {
  const fetchUsedChapterRanges = async () => {
    try {
      const response = await fetch(`${baseUrl}/api/videos`);
      const videos = await response.json();
      const ranges = videos.map(video => ({
        book: video.book,
        start: video.chapter_start,
        end: video.chapter_end,
      }));
			console.log(ranges)
      setUsedChapterRanges(ranges);
    } catch (error) {
      console.error("Error fetching used chapter ranges:", error);
    }
  };

  fetchUsedChapterRanges();
}, []);

// Helper function to check if a chapter is in use for the selected book
const isChapterInUse = (chapter) => {
  return usedChapterRanges.some(range => 
    range.book === selectedBook && 
    chapter == range.start
  );
};



	useEffect(() => {
		// Ensure this code runs only on the client side
		if (typeof window !== 'undefined') {
			const userData = localStorage.getItem('user');
			if (userData) {
				setUser(JSON.parse(userData)); // Parse the JSON string into an object
			}
		}
	}, []);

  return (
    <div style={{ backgroundImage: `url(/images/ava3.jpg)`, backgroundOpacity: '50', objectFit: "fill", backgroundRepeat: "no-repeat", backgroundSize: "cover" }} className="m-auto w-full object-contain brightness-10  min-h-screen flex flex-col gap-2 text-center   md:px-28 items-center bg-gradient-to-b from-amber-300 to-[#c9822c] font-sniglet  md:pt-20">
        
        {uploaded && (
         <div className="fixed z-[10000] inset-0 bg-darkbg bg-opacity-50 flex items-center justify-center px-5">
         <div className="bg-white py-8 px-5 md:px-16  rounded-lg shadow-lg flex flex-col items-center justify-center gap-1">
           <h3 className="text-4xl md:text-7xl text-center font-modak text-[#0081EE]">Gloraaay!</h3>
           <p className="text-center font-lucky font-light text-pinkbg text-lg">Great Job! Your video has been successfully uploaded</p>
           <p className="text-center text-darkbg text-lg">Thank you for being a part of this Glorious campaign</p>
           <small className="text-center">Due to our <Link href="/t&c" className="hover:underline text-blue-600">Guidelines and conditions</Link>, your video is currently being reviewed. <br/> Please Wait... </small>

           <button onClick={
             () => {
               setUploaded(false)
               setVideoSrc(null)
               setFiesta(false)
             }
           } className="bg-gradient-to-tr from-[#0081EE] to-[#88CEDF]  px-5 py-2 rounded-xl text-black font-bold mt-5  border-2 shadow-lg shadow-slate-500 text-lg">Upload another chapter</button>
           <Link href="/record" className=" mt-3 border-2 border-darkbg px-5 py-2 rounded-xl hover:bg-slate-200">Record Instead</Link>
         </div>
       </div>
      )}
        
        {fiesta ?  (
					<div className="col-span-2 flex flex-col gap-3 md:w-[40rem] bg-[#f8f8f8] md:mt-10 h-screen md:h-auto p-10 text-left">
					<h2 className="font-lucky md:text-4xl text-3xl text-center text-darkbg">SELECT A CHAPTER TO UPLOAD</h2>
					<div className="flex flex-col gap-2">
						<label htmlFor='fullname'>Full name</label>
						<input type="text" name="fullname" placeholder="Enter full name" className='p-3 capitalize focus:outline-pinkbg focus:outline-1' disabled={user?.fullName} value={kidFullname || user?.fullName} onChange={(e) => setKidFullname(e.target.value)} />
					</div>


					<label htmlFor='fullname'>Which Book in the New testament did you read?</label>
					<select value={selectedBook} className='p-3' onChange={handleBookChange}>
						<option value="">Select a Book</option>
						{books.map((book) => (
							<option key={book.book_id} value={book.book_name}>
								{book.book_name}
							</option>
						))}
					</select>

					<label htmlFor='fullname'>What chapter did you read?</label>
					<div className="flex items-center gap-4">
            <select className='p-3 w-full disabled:opacity-50 ' value={selectedChapterStart} onChange={handleChapterStartChange} disabled={!selectedBook}>
              <option value="">Select a Chapter</option>
              {chapters.map((chapter, index) => (
                <option className="disabled:line-through disabled:cursor-not-allowed disabled:bg-slate-200" key={index} value={chapter} disabled={isChapterInUse(chapter)}>
                  chapter {chapter} {isChapterInUse(chapter) && "has been selected already"}
                </option>
              ))}
            </select>

					</div>
					<button onClick={() => setFiesta(false)} disabled={!selectedBook && !selectedChapterStart } className=" text-black rounded-md px-5 py-2.5 text-xl font-lucky  bg-gradient-to-tr from-[#EE7822] to-[#EFB741] active:bg-gradient-to-bl hover:rounded disabled:opacity-20">Next</button>
				</div>
        ) : (
        <div className="bg-white w-full h-[90vh] md:h-full bg-opacity-60 rounded-3xl md:py-7">	
						<h2 className="text-3xl bg-slate-500 md:bg-transparent w-full md:w-auto md:text-6xl py-5 md:py-0 font-lucky text-white md:text-slate-900">Upload your video</h2>
            {!videoSrc && (<h3 className="md:text-2xl my-1.5 md:font-lucky text-darkbg flex flex-col items-center gap-4 md:flex-row mx-auto w-fit">Or you can choose to <Link href="/record" className="font-bold text-white tracking-wider bg-pinkbg px-5 py-2 rounded-2xl">Record your video</Link></h3>)}
            {!videoSrc ? (
              <label
                htmlFor="fileInput"
                className={` mx-auto mt-5 md:mt-5 px-5 py-5 flex flex-col items-center justify-center w-[95%] md:w-[70%]  md:h-[450px] shadow-lg shadow-gray-800 bg-amber-200  text-center  border-2 border-dashed rounded-lg cursor-pointer ${dragging ? 'border-red-500 bg-amber-100' : 'border-gray-300 hover:bg-amber-100'
                  }`}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
              >
                <BiSolidCloudUpload size={50} color={dragging ? '#EE9F35' : '#333'} />
                <p className="mt-4 text-2xl text-slate-800 font-bold">Select Video to Upload</p>
                <p className="mt-1.5 text-gray-800 text-[13px]">Or Drag and Drop a File</p>
                <p className="mt-8 text-gray-500 text-sm">MP4, WEBM videos only</p>
                <p className="mt-8 text-gray-500 text-sm">720x1280 resolution or higher</p>
                <p className="mt-2 text-[#FE2C55] text-[13px] font-medium">Up to 10 minutes</p>
                <p className="mt-2 text-gray-500 text-[13px]">Less than 100MB</p>

                <label
                  htmlFor="fileInput"
                  className="px-2 py-4 mt-8 text-black font-bold text-[15px] w-[80%] rounded-full colors"
                >
                  Select the File
                </label>
                <input
                  type="file"
                  id="fileInput"
                  onChange={handleFileChange}
                  hidden
                  ref={fileInputRef}
                  accept=".mp4,.mov,.webm"
                />
              </label>
            ) : (
              <div className="md:mx-0  mx-auto  mt-7 md:mt-5 items-stretch gap-7 p-3 cursor-pointer rounded-2xl relative h-full  ">
                <div className="w-full col-span-3  ">
                  <video
                    ref={videoRef}
                    src={videoSrc}
                    className="w-fit mx-auto  md:h-[25rem]"
                    autoPlay
                    loop
                    controls
                    muted
                  ></video>
                </div>
                <button onClick={handleUpload} className="bg-gradient-to-bl from-[#0081EE] to-[#88CEDF] px-10 py-2 rounded-full text-slate-800m font-bold mt-5 border-2 shadow-lg shadow-slate-400 text-lg">Upload Now</button>
              </div>
            )}

				</div> 
        )}
        
      

      

      
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white py-6 px-10 rounded-lg shadow-lg">
            <h2 className="text-4xl font-bold mb-4 font-lucky text-pinkbg">Uploading Video...</h2>
            <div className="w-72 h-6 mx-auto bg-gray-200 rounded-full overflow-hidden">
              <div
                className="h-full bg-blue-500"
                style={{ width: `${uploadProgress}%` }}
              ></div>
            </div>
            <p className="mt-2">{uploadProgress}%</p>
            <small>Please wait...</small>
            {/* {isUploading && <BiLoaderCircle className="animate-spin mt-4" size={24} />} */}
          </div>
        </div>
      )}
    </div>
  );
};

export default UploadVideo;
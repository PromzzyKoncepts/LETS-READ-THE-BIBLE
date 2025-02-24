'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { BiLoaderCircle, BiSolidCloudUpload } from 'react-icons/bi';
import Link from 'next/link'
import { getBooks, getChapters } from '../components/read/readApi';

const Page = () => {


  const [videoSrc, setVideoSrc] = useState('');
  const [dragging, setDragging] = useState(false);
  const videoRef = useRef(null);


  const [books, setBooks] = useState([]);
  const [selectedBook, setSelectedBook] = useState('');
  const [chapters, setChapters] = useState([]);
  const [selectedChapterStart, setSelectedChapterStart] = useState('');
  const [selectedChapterEnd, setSelectedChapterEnd] = useState('');
  const [isSingleChapter, setIsSingleChapter] = useState(false);

  // const [books, setBooks] = useState([]);
  // const [selectedBook, setSelectedBook] = useState('');
  // const [chapters, setChapters] = useState([]);
  const [selectedChapter, setSelectedChapter] = useState('');


  useEffect(() => {
    // Fetch the list of books when the component mounts
    const fetchedBooks = getBooks();
    setBooks(fetchedBooks);
  }, []);

  useEffect(() => {
    // Fetch the chapters for the selected book
    if (selectedBook) {
      const fetchedChapters = getChapters(selectedBook);
      setChapters(fetchedChapters);
    }
  }, [selectedBook]);

  const handleBookChange = (event) => {
    setSelectedBook(event.target.value);
    setSelectedChapterStart(''); // Reset the selected chapters when the book changes
    setSelectedChapterEnd('');
  };

  const handleChapterStartChange = (event) => {
    setSelectedChapterStart(event.target.value);
  };

  const handleChapterEndChange = (event) => {
    setSelectedChapterEnd(event.target.value);
  };

  const handleCheckboxChange = () => {
    setIsSingleChapter(!isSingleChapter); // Toggle the checkbox state
    if (!isSingleChapter) {
      setSelectedChapterEnd(''); // Clear the second chapter if switching to single chapter mode
    }
  };




  // another side

  const handleFile = (file) => {
    if (!file) return;

    const validTypes = ['video/mp4', 'video/mov', 'video/webm'];
    if (!validTypes.includes(file.type)) {
      alert('Invalid file type. Only MP4, MOV, and WEBM are allowed.');
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
    handleFile(file);
  };

  const handleDragOver = useCallback((event) => {
    event.preventDefault();
    setDragging(true);
  }, []);

  const handleDragLeave = useCallback(() => {
    setDragging(false);
  }, []);

  const handleDrop = useCallback((event) => {
    event.preventDefault();
    setDragging(false);
    const file = event.dataTransfer.files[0];
    handleFile(file);
  }, []);

  return (
    <div style={{ backgroundImage: `url(/images/ava3.jpg)`, backgroundOpacity: '50', objectFit: "fill", backgroundRepeat: "no-repeat", backgroundSize: "cover" }} className="m-auto object-contain brightness-10  min-h-screen flex flex-col gap-2 text-center justify-cente r px-28 items-center bg-gradient-to-b from-amber-300 to-[#c9822c] font-sniglet pt-24">
      <h2 className="text-2xl md:text-6xl py font-lucky text-slate-900">Upload your video</h2>
      <h3 className="text-lg my-1.5">Or you can choose to <Link href="/record" className="font-bold text-white bg-pinkbg px-5 py-2 rounded-2xl">Record your video</Link></h3>
      {!videoSrc ? (
        <label
          htmlFor="fileInput"
          className={`md:mx-0 mx-auto  flex flex-col items-center justify-center w-full max-w-[60%] md:h-[500px] shadow-lg shadow-gray-800 bg-amber-200  text-center  border-2 border-dashed rounded-lg cursor-pointer ${dragging ? 'border-red-500 bg-amber-100' : 'border-gray-300 hover:bg-amber-100'
            }`}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
        >
          <BiSolidCloudUpload size={50} color={dragging ? '#EE9F35' : '#333'} />
          <p className="mt-4 text-2xl text-slate-800 font-bold">Select Video to Upload</p>
          <p className="mt-1.5 text-gray-800 text-[13px]">Or Drag and Drop a File</p>
          <p className="mt-12 text-gray-500 text-sm">MP4, MOV, WEBM videos only</p>
          <p className="mt-12 text-gray-500 text-sm">720x1280 resolution or higher</p>
          <p className="mt-2 text-[#FE2C55] text-[13px] font-medium">Up to 10 minutes</p>
          <p className="mt-2 text-gray-500 text-[13px]">Less than 200MB</p>

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
            accept=".mp4,.mov,.webm"
          />
        </label>
      ) : (
        <div className="md:mx-0  mx-auto grid md:grid-cols-5 items-stretch gap-7 p-3 cursor-pointer rounded-2xl relative h-full  md:h -[20rem]">
          <div className="w-full col-span-3  ">
            <video
              ref={videoRef}
              src={videoSrc}
              className="w-full  md:h-[30rem]"
              autoPlay
              loop
              controls
              muted
            ></video>
          </div>
          <div className="col-span-2 flex flex-col gap-1.5 bg-[#f8f8f8] p-6 text-left">
            <h2 className="font-lucky text-3xl text-center text-darkbg">Bible Reading Details</h2>
            <div className="flex flex-col gap-2">
              <label htmlFor='fullname'>Kids Full name</label>
              <input type="text" name="fullname" placeholder="Enter full name" className='p-3 focus:outline-pinkbg focus:outline-1' />
            </div>

            <div className="flex flex-col gap-2">
              <label htmlFor='fullname'>Parent or Guardians Full name</label>
              <input type="text" placeholder="Parent(s) or Guardian's Name(optional)" className='p-3 focus:outline-pinkbg focus:outline-1' />
            </div>


            {/* Book Selector */}
            <label htmlFor='fullname'>Which Book of the bible did you read?</label>
            <select value={selectedBook} className='p-3' onChange={handleBookChange}>
              <option value="">Select a Book</option>
              {books.map((book) => (
                <option key={book.book_id} value={book.book_name}>
                  {book.book_name}
                </option>
              ))}
            </select>

            {/* Chapter Selector */}
            <label htmlFor='fullname'>What chapter(s) did you read?</label>
            <div className="flex items-center gap-4">
              <select  className='p-3 w-24 disabled:opacity-50 disabled:bg-slate-200' value={selectedChapterStart} onChange={handleChapterStartChange} disabled={!selectedBook}>
                <option value="">Select a Chapter</option>
                {chapters.map((chapter, index) => (
                  <option key={index} value={chapter}>
                    {chapter}
                  </option>
                ))}
              </select>
              -
              <select
                className="p-3 w-24 disabled:opacity-50 disabled:bg-slate-200"
                value={selectedChapterEnd}
                onChange={handleChapterEndChange}
                disabled={!selectedBook || isSingleChapter} // Disable if single chapter is checked
              >
                <option value="">Select a Chapter</option>
                {chapters.map((chapter, index) => (
                  <option key={index} value={chapter}>
                    {chapter}
                  </option>
                ))}
              </select>

              {/* <input type="checkbox"/> Only one chapter */}
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={isSingleChapter}
                  onChange={handleCheckboxChange}
                />
                <label className="text-sm">Only one chapter</label>
              </div>

            </div>
            <button disabled={!selectedBook && !selectedChapterStart } className=" text-black rounded-md px-5 py-2.5 text-xl font-lucky  bg-gradient-to-tr from-[#EE7822] to-[#EFB741] active:bg-gradient-to-bl hover:rounded disabled:opacity-20">Upload Video</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Page;

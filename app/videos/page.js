import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { getBooks } from '../components/read/readApi';

// Function to generate a random hex color
const getRandomColor = () => {
  const letters = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
};

const Page = () => {
  const images = [
    {
      book: 'Genesis',
      chapterStart: '1',
      chapterEnd: '2',
      src: '/images/sample.jpg',
      country: 'NGN',
    },
    {
      book: 'Genesis',
      chapterStart: '1',
      chapterEnd: '2',
      src: '/images/sample.jpg',
      country: 'NGN',
    },
    {
      book: 'Revelation',
      chapterStart: '1',
      chapterEnd: '2',
      src: '/images/sample.jpg',
      country: 'NGN',
    },
    {
      book: 'Esther',
      chapterStart: '1',
      chapterEnd: '2',
      src: '/images/sample.jpg',
      country: 'NGN',
    },
    {
      book: 'Deuteronomy',
      chapterStart: '1',
      chapterEnd: '2',
      src: '/images/sample.jpg',
      country: 'NGN',
    },
    {
      book: 'Revelation',
      chapterStart: '1',
      chapterEnd: '2',
      src: '/images/sample.jpg',
      country: 'NGN',
    },
    {
      book: 'Esther',
      chapterStart: '1',
      chapterEnd: '2',
      src: '/images/sample.jpg',
      country: 'NGN',
    },
    {
      book: 'Deuteronomy',
      chapterStart: '1',
      chapterEnd: '2',
      src: '/images/sample.jpg',
      country: 'NGN',
    },
  ];

  return (
    <div
      style={{ backgroundImage: `url(/images/pngbg.png)`, backgroundSize: 'contain' }}
      className="md:px-28 px-5 py-20 bg-[#CDE1E1] font-sniglet"
    >
      {/* Book List with Random Background Colors */}
      <div className="flex items-center example cursor-pointer gap-3 md:w-[55rem] py-5 px-10 mx-auto overflow-x-auto backdrop-blur-md bg-green-500 bg-opacity-20 [mask-image:_linear-gradient(to_right,transparent_0,_black_150px,_black_calc(100%-150px),transparent_100%)]">
        {getBooks().map((item, index) => {
          const randomColor = getRandomColor(); // Generate a random color for each book
          return (
            <div
              key={item.book_id}
              style={{ backgroundColor: randomColor }} // Apply the random color as inline style
              className="text-white px-4 text-nowrap py-2 rounded-full text-center"
            >
              {item.book_name}
            </div>
          );
        })}
      </div>

      {/* Image Grid */}
      <div className="grid md:grid-cols-3 gap-4 pt-4">
        {images.map((item, index) => (
          <Link href={`/videos/${index}`} key={index} className="relative group cursor-pointer bg-gray-700 hover:shadow-md">
            <Image
              src={item.src}
              width={300}
              height={300}
              alt={item.book + item.chapterStart + item.chapterEnd}
              className="w-full"
            />
            <div className="absolute bottom-4 hover:group-bg-opacity-40 right-4 backdrop-blur-sm rounded-full px-5 py-3 text-white bg-opacity-30 bg-pinkbg">
              <h3 className="">
                {item.book} {item.chapterStart} - {item.chapterEnd}
              </h3>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Page;
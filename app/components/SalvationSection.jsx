"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";

export default function SalvationSection() {
  const videoLinks = {
    english:
      "https://d1ent1.loveworldcloud.com/~kiddiesmedia/LOVETOONS_TV/app_promo/Salvation%20Video%20English(1).mp4",
    chinese:
      "https://d1ent1.loveworldcloud.com/~kiddiesmedia/LOVETOONS_TV/app_promo/Salvation%20Video%20Chinese.mp4",
    French:
      "https://d1ent1.loveworldcloud.com/~kiddiesmedia/LOVETOONS_TV/app_promo/Salvation%20Video%20French.mp4",
    Spanish:
      "https://d1ent1.loveworldcloud.com/~kiddiesmedia/LOVETOONS_TV/app_promo/Salvation%20Video%20Spanish.mp4",
  };

  const [selectedLanguage, setSelectedLanguage] = useState("english");

  return (
    <section className="bg-gray-900 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Section Heading */}

        <div className="flex flex-wrap -mx-4 justify-center">
          <div className="w-full sm:w-2/3 lg:w-1/2 px-4">
            <p className="text-3xl font-bold text-white text-center mb-8">
              Prayer of Salvation
            </p>
            <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
              {/* Language Selection */}
              <form className="mb-4">
                <label
                  htmlFor="languageSelect"
                  className="block text-white mb-2"
                >
                  Select Language:
                </label>
                <select
                  id="languageSelect"
                  value={selectedLanguage}
                  onChange={(e) => setSelectedLanguage(e.target.value)}
                  className="w-full p-2 rounded border border-gray-300 text-gray-800"
                >
                  {Object.keys(videoLinks).map((lang) => (
                    <option key={lang} value={lang}>
                      {lang.charAt(0).toUpperCase() + lang.slice(1)}
                    </option>
                  ))}
                </select>
              </form>

              {/* Video Player */}
              <div className="mt-3">
                <video
                  key={selectedLanguage} // reloads video on change
                  controls
                  controlsList="nodownload"
                  onContextMenu={(e) => e.preventDefault()}
                  poster="./img/Screenshot 2025-06-06 181955.png"
                  className="w-full rounded"
                >
                  <source src={videoLinks[selectedLanguage]} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              </div>
            </div>
          </div>

          <div className="w-full sm:w-2/3 lg:w-1/2 px-4">
            <p className="text-3xl font-bold text-white text-center mb-8">
              Bible Reading
            </p>
            <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
              <Link href="/bible-videos" className="block">
                <div className="flex flex-col items-center">
                  <Image
                    src="/images/fiesta.png"
                    alt="Bible Reading Fiesta"
                    width={1000}
                    height={1000}
                    className="w-full h-auto object-contain"
                  />
                  <p className="text-white text-center mt-4">
                    Watch our Bible reading videos for kids!
                  </p>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

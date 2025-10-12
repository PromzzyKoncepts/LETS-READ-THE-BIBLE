"use client"
import AudioRecorder from "../components/AudioRecorder";
import VideoRecorder from "../components/VideoRecorder";
import { useState, useRef } from "react";

const App = () => {
    let [recordOption, setRecordOption] = useState("video");
    const toggleRecordOption = (type) => {
        return () => {
            setRecordOption(type);
        };
    };
    return (
        <div  style={{ backgroundImage: `url(/images/record.jpg)`, backgroundOpacity: '50', objectFit: "fill", backgroundRepeat: "no-repeat", backgroundSize: "cover" }}   className="md:px-28  md:pt-24 pt-4 bg-[#F4C2C2] min-h-screen">
            <h1 className="md:text-7xl text-2xl text-darkbg font-lucky text-center"> Record your Bible Reading</h1>
            <p className=" text-slate-700 font-sniglet font-bold text-center text-sm md:text-base py-1 md:py-3">Ensure you have great lighting and in a quiet environment before recording!</p>
            <div className="button-flex">
                {/* <button onClick={toggleRecordOption("video")}>
                    Record Video
                </button> */}
                {/* <button onClick={toggleRecordOption("audio")}>
                    Record Audio
                </button> */}
            </div>
            <div>
                {recordOption === "video" ? <VideoRecorder /> : <AudioRecorder />}
            </div>
        </div>
    );
};
export default App;
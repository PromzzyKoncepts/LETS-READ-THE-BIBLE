"use client";

import React, { useState, useCallback, useRef } from "react";
import axios from "axios";
import { useDropzone } from "react-dropzone";
import toast, { Toaster } from "react-hot-toast";

export default function ImageUploadPage() {
  const [file, setFile] = useState(null);
  const [fullName, setFullName] = useState("");
  const [scripture, setScripture] = useState("");
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const fileInputRef = useRef(null);

  const onDrop = useCallback((acceptedFiles) => {
    if (acceptedFiles && acceptedFiles.length > 0) {
      handleFileSelection(acceptedFiles[0]);
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "image/jpeg": [".jpeg", ".jpg"],
      "image/png": [".png"],
    },
    maxFiles: 1,
  });

  const handleFileSelection = (selectedFile) => {
    if (!selectedFile.type.match("image.*")) {
      toast.error("Please select an image file (JPEG, JPG, or PNG)");
      return;
    }
    setFile(selectedFile);
  };

  const handleInputChange = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      handleFileSelection(e.target.files[0]);
    }
  };

  const handleUpload = async () => {
    if (!file) {
      toast.error("Please select an image to upload");
      return;
    }

    if (!fullName.trim()) {
      toast.error("Please enter your full name");
      return;
    }

    const apiFormData = new FormData();
    apiFormData.append("file", file);
    apiFormData.append("name", fullName);
    apiFormData.append("scripture", scripture);

    setIsUploading(true);
    setUploadProgress(0);

    const toastId = toast.loading("Uploading image...");

    try {
      const timestamp = Date.now();
      await axios.post(
        `https://lovetoons.org/api/datafile/fileupload.php?t=${timestamp}`,
        apiFormData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Accept: "*/*",
          },
          onUploadProgress: (progressEvent) => {
            if (progressEvent.total) {
              const progress = Math.round(
                (progressEvent.loaded * 100) / progressEvent.total
              );
              setUploadProgress(progress);
              toast.loading(`Uploading: ${progress}%`, { id: toastId });
            }
          },
        }
      );

      toast.success("Image uploaded successfully!", { id: toastId });
      setFile(null);
      setFullName("");
      setScripture("");
      setUploadProgress(0);
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    } catch (error) {
      console.error("Upload error:", error);
      toast.error("Failed to upload image", { id: toastId });
    } finally {
      setIsUploading(false);
    }
  };

  const triggerFileInput = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  return (
    <div className="min-h-screen font sniglet bg-gray-200 flex md:items-center justify-center p-4">
      <Toaster position="top-center" />

      <div className="w-full max-w-md bg-white rounded-lg shadow-md p-6">
        <h1 className="text-2xl font-bold text-darkbg mb-6 font-lucky">
          Upload Image
        </h1>

        <div
          {...getRootProps()}
          className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors ${
            isDragActive
              ? "border-blue-500 bg-blue-50"
              : "border-gray-300 hover:border-blue-400"
          } mb-6`}
        >
          <input {...getInputProps()} />
          <div className="flex flex-col items-center justify-center space-y-2">
            <svg
              className="w-12 h-12 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
              ></path>
            </svg>
            {isDragActive ? (
              <p className="text-blue-500 font-medium">Drop the image here</p>
            ) : (
              <>
                <p className="text-gray-600">
                  Drag & drop an image here, or click to select
                </p>
                <button
                  type="button"
                  onClick={triggerFileInput}
                  className="mt-2 px-4 py-2 bg-blue-50 text-blue-600 rounded-md hover:bg-blue-100 transition-colors"
                >
                  Select Image
                </button>
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleInputChange}
                  accept="image/jpeg, image/jpg, image/png"
                  className="hidden"
                />
              </>
            )}
          </div>
        </div>

        {file && (
          <div className="mb-6 p-4 bg-gray-50 rounded-md">
            <div className="flex items-center space-x-3">
              <div className="flex-shrink-0">
                <img
                  src={URL.createObjectURL(file)}
                  alt="Preview"
                  className="h-12 w-12 object-cover rounded"
                />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900 truncate">
                  {file.name}
                </p>
                <p className="text-sm text-gray-500">
                  {(file.size / 1024).toFixed(2)} KB
                </p>
              </div>
              <button
                onClick={() => {
                  setFile(null);
                  if (fileInputRef.current) {
                    fileInputRef.current.value = "";
                  }
                }}
                className="text-red-500 hover:text-red-700"
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                  ></path>
                </svg>
              </button>
            </div>
          </div>
        )}

        <div className="mb-6">
          <label
            htmlFor="fullName"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Your Full Name
          </label>
          <input
            type="text"
            id="fullName"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            placeholder="John Doe"
            disabled={isUploading}
          />
        </div>
        <div className="mb-6">
          <label
            htmlFor="scripture"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Scripture read
          </label>
          <input
            type="text"
            id="scripture"
            value={scripture}
            onChange={(e) => setScripture(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            placeholder="Genesis 3:16"
            disabled={isUploading}
          />
        </div>

        <button
          onClick={handleUpload}
          disabled={isUploading || !file || !fullName.trim()}
          className={`w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white ${
            isUploading || !file || !fullName.trim()
              ? "bg-blue-300 cursor-not-allowed"
              : "bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          }`}
        >
          {isUploading ? "Uploading..." : "Upload Image"}
        </button>
      </div>
    </div>
  );
}

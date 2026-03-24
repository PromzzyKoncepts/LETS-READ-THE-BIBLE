"use client";
import { useState, useCallback } from "react";
import axios from "axios";
import Image from "next/image";
import Cropper from "react-easy-crop";
import getCroppedImg from "/app/utils/cropImage";
import { FaTrash } from "react-icons/fa";
import { MdCancel } from "react-icons/md";
import {
  WhatsappIcon,
  WhatsappShareButton,
  TelegramShareButton,
  TelegramIcon,
} from "react-share";
import toast, { Toaster } from "react-hot-toast";
import { CldImage } from "next-cloudinary";

const baseUrl = "https://letsreadthebible.club";

export default function AvatarUploader() {
  const [image, setImage] = useState(null);
  const [croppedImage, setCroppedImage] = useState(null);
  const [avatarUrl, setAvatarUrl] = useState("");
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
  const [dragging, setDragging] = useState(false);
  const [loading, setLoading] = useState(false);

  const onCropComplete = useCallback((_, croppedAreaPixels) => {
    setCroppedAreaPixels(croppedAreaPixels);
  }, []);

  const handleCrop = async () => {
    if (!image || !croppedAreaPixels) return;
    const croppedImg = await getCroppedImg(image, croppedAreaPixels);
    setCroppedImage(croppedImg);
  };

  const base64ToFile = (base64, filename, mimeType) => {
    const byteCharacters = atob(base64.split(",")[1]);
    const byteNumbers = new Array(byteCharacters.length);
    for (let i = 0; i < byteCharacters.length; i++) {
      byteNumbers[i] = byteCharacters.charCodeAt(i);
    }
    const byteArray = new Uint8Array(byteNumbers);
    return new File([byteArray], filename, { type: mimeType });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!croppedImage) return;

    const formData = new FormData();
    if (
      typeof croppedImage === "string" &&
      croppedImage.startsWith("data:image")
    ) {
      formData.append(
        "image",
        base64ToFile(croppedImage, "cropped-image.png", "image/png")
      );
    } else if (croppedImage instanceof File || croppedImage instanceof Blob) {
      formData.append("image", croppedImage);
    } else {
      console.error("Unsupported image format");
      return;
    }

    try {
      setLoading(true);
      const response = await axios.post(
        `${baseUrl}/api/generate-avatar`,
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
          maxBodyLength: 100000000,
          maxContentLength: 100000000,
        }
      );
      if (response?.data?.mergedImageUrl) {
        setLoading(false);
        toast.success("Your avatar has been created!");
        setAvatarUrl(response.data.mergedImageUrl);
      }
    } catch (error) {
      setLoading(false);
      if (error.status === 413)
        toast.error("Image is too heavy, upload another");
      toast.error("Avatar creation failed, try again");
      console.error("Error uploading image:", error);
    }
  };

  const handleFile = (file) => {
    if (!file) return;
    const validTypes = ["image/png", "image/jpg", "image/jpeg"];
    if (!validTypes.includes(file.type)) return;
    const reader = new FileReader();
    reader.onloadend = (e) => setImage(e.target.result);
    reader.readAsDataURL(file);
  };

  const handleFileChange = (event) => handleFile(event.target.files[0]);
  const handleDragOver = useCallback((e) => {
    e.preventDefault();
    setDragging(true);
  }, []);
  const handleDragLeave = useCallback(() => setDragging(false), []);
  const handleDrop = useCallback((e) => {
    e.preventDefault();
    setDragging(false);
    handleFile(e.dataTransfer.files[0]);
  }, []);
  const clearImage = () => {
    setImage(null);
    setCroppedImage(null);
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,600&display=swap');

        body{
        overflow: scroll;}
        .av-root {
          font-family: 'DM Sans', sans-serif;
          min-height: 100svh;
          position: relative;
          overflow-x: hidden;
        }
        .av-bg {
          position: fixed; inset: 0; z-index: 0;
          background-image: url(/images/ava.jpg);
          background-size: cover;
          background-position: center;
          background-repeat: no-repeat;
        }
        .av-bg-overlay {
          position: fixed; inset: 0; z-index: 1;
          background: linear-gradient(160deg, rgba(12,8,30,.82) 0%, rgba(40,10,60,.7) 50%, rgba(12,8,30,.88) 100%);
        }

        .av-inner {
          position: relative; z-index: 2;
          max-width: 1100px;
          margin: 0 auto;
          padding: 7rem 1.25rem 4rem;
        }
        @media (min-width: 768px) { .av-inner { padding: 8rem 2rem 4rem; } }

        /* ── header ── */
        .av-header { text-align: center; margin-bottom: 2.5rem; }
        .av-eyebrow {
          font-size: .68rem; font-weight: 600;
          text-transform: uppercase; letter-spacing: .18em;
          color: #f5c257; margin-bottom: .4rem;
        }
        .av-title {
          font-family: 'Bebas Neue', sans-serif;
          font-size: clamp(2.2rem, 5vw, 3.8rem);
          letter-spacing: 2px; line-height: 1.1;
          color: #fff; margin-bottom: .4rem;
        }
        .av-title span { color: #f5c257; }
        .av-sub { color: rgba(255,255,255,.4); font-size: .85rem; font-weight: 300; }

        /* ── drop zone ── */
        .av-dropzone-wrap {
          display: flex; align-items: center; justify-content: center;
          padding: 1rem 0;
        }
        .av-dropzone {
          display: flex; flex-direction: column;
          align-items: center; justify-content: center;
          width: 100%; max-width: 480px;
          min-height: 340px;
          background: rgba(255,255,255,.06);
          border: 2px dashed rgba(255,255,255,.2);
          border-radius: 20px;
          cursor: pointer;
          transition: border-color .2s, background .2s;
          padding: 2rem 1.5rem;
          text-align: center;
          backdrop-filter: blur(8px);
        }
        .av-dropzone.dragging {
          border-color: #f5c257;
          background: rgba(245,194,87,.08);
        }
        .av-dropzone:hover { border-color: rgba(255,255,255,.4); background: rgba(255,255,255,.09); }
        .av-dropzone-icon { margin-bottom: 1rem; opacity: .9; }
        .av-dropzone-title {
          font-weight: 600; font-size: 1rem; color: #fff;
          margin-bottom: .35rem;
        }
        .av-dropzone-hint { font-size: .8rem; color: rgba(255,255,255,.4); margin-bottom: 1.25rem; }
        .av-dropzone-btn {
          background: linear-gradient(135deg, #c8851f, #f5c257);
          color: #1a0e00;
          border: none; border-radius: 999px;
          padding: .6rem 1.8rem;
          font-size: .88rem; font-weight: 700;
          cursor: pointer; font-family: 'DM Sans', sans-serif;
          transition: opacity .18s, transform .14s;
          box-shadow: 0 4px 18px rgba(200,133,31,.35);
        }
        .av-dropzone-btn:hover { opacity: .9; transform: translateY(-1px); }
        .av-types { margin-top: .75rem; font-size: .72rem; color: rgba(255,255,255,.25); }

        /* ── editor grid ── */
        .av-editor {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 1.5rem;
          align-items: start;
        }
        @media (max-width: 768px) {
          .av-editor { grid-template-columns: 1fr; }
        }

        /* cropper panel */
        .av-panel {
          background: rgba(255,255,255,.06);
          border: 1px solid rgba(255,255,255,.1);
          border-radius: 20px;
          overflow: hidden;
          backdrop-filter: blur(10px);
        }
        .av-panel-header {
          display: flex; align-items: center; justify-content: space-between;
          padding: .85rem 1.1rem;
          border-bottom: 1px solid rgba(255,255,255,.07);
        }
        .av-panel-label {
          font-size: .7rem; font-weight: 600;
          text-transform: uppercase; letter-spacing: .12em;
          color: rgba(255,255,255,.4);
        }
        .av-panel-badge {
          font-size: .72rem; font-weight: 600;
          background: rgba(245,194,87,.15); color: #f5c257;
          border: 1px solid rgba(245,194,87,.3);
          border-radius: 6px; padding: .2rem .6rem;
        }

        .av-crop-area {
          position: relative;
          width: 100%; height: 340px;
        }
        @media (min-width: 768px) { .av-crop-area { height: 420px; } }

        /* Force rectangle — override react-easy-crop's circle mask */
        .av-crop-area .reactEasyCrop_CropArea {
          border-radius: 0 !important;
        }

        .av-panel-footer {
          display: flex; align-items: center; justify-content: space-between;
          padding: .85rem 1.1rem;
          border-top: 1px solid rgba(255,255,255,.07);
          gap: .75rem;
        }
        .av-zoom-row { display: flex; align-items: center; gap: .6rem; flex: 1; }
        .av-zoom-label { font-size: .72rem; color: rgba(255,255,255,.4); white-space: nowrap; }
        .av-zoom-slider {
          flex: 1; accent-color: #f5c257;
          height: 3px; cursor: pointer;
        }

        .av-trash-btn {
          background: rgba(239,68,68,.15);
          border: 1px solid rgba(239,68,68,.3);
          color: #f87171;
          border-radius: 10px; padding: .5rem .75rem;
          cursor: pointer; display: flex; align-items: center; gap: .4rem;
          font-size: .78rem; font-weight: 600;
          font-family: 'DM Sans', sans-serif;
          transition: background .18s;
        }
        .av-trash-btn:hover { background: rgba(239,68,68,.25); }

        .av-crop-btn {
          background: linear-gradient(135deg, #c8851f, #f5c257);
          color: #1a0e00; border: none;
          border-radius: 10px; padding: .55rem 1.25rem;
          font-size: .85rem; font-weight: 700;
          cursor: pointer; font-family: 'DM Sans', sans-serif;
          transition: opacity .18s, transform .14s;
          white-space: nowrap;
        }
        .av-crop-btn:hover { opacity: .9; transform: translateY(-1px); }
        .av-crop-btn.done { background: linear-gradient(135deg,#16a34a,#4ade80); }

        /* preview panel */
        .av-preview-panel {
          background: rgba(255,255,255,.06);
          border: 1px solid rgba(255,255,255,.1);
          border-radius: 20px;
          overflow: hidden;
          backdrop-filter: blur(10px);
          display: flex; flex-direction: column;
        }
        .av-preview-img-wrap {
          padding: 1.5rem;
          display: flex; align-items: center; justify-content: center;
          min-height: 300px;
          position: relative;
        }
        .av-preview-placeholder {
          opacity: .3; filter: grayscale(1);
          width: 100%; max-width: 280px; height: auto;
          border-radius: 12px;
        }
        .av-preview-cropped {
          width: 100%; max-width: 300px; height: auto;
          border-radius: 0;
          box-shadow: 0 16px 48px rgba(0,0,0,.4);
          border: 2px solid rgba(255,255,255,.15);
        }
        .av-preview-footer {
          padding: 1rem 1.25rem;
          border-top: 1px solid rgba(255,255,255,.07);
          display: flex; flex-direction: column; gap: .75rem;
        }
        .av-generate-btn {
          width: 100%;
          background: linear-gradient(135deg, #16a34a, #4ade80);
          color: #052e0e; border: none;
          border-radius: 12px; padding: .85rem;
          font-size: .95rem; font-weight: 700;
          cursor: pointer; font-family: 'DM Sans', sans-serif;
          transition: opacity .18s, transform .14s, box-shadow .18s;
          box-shadow: 0 4px 18px rgba(22,163,74,.3);
          letter-spacing: .02em;
        }
        .av-generate-btn:hover { opacity: .9; transform: translateY(-1px); box-shadow: 0 8px 26px rgba(22,163,74,.4); }
        .av-generate-btn:disabled { opacity: .5; cursor: not-allowed; transform: none; }
        .av-generate-btn.bounce { animation: gentleBounce 1.2s ease-in-out infinite; }
        @keyframes gentleBounce {
          0%,100% { transform: translateY(0); }
          50%      { transform: translateY(-4px); }
        }

        .av-preview-hint {
          text-align: center; font-size: .75rem;
          color: rgba(255,255,255,.3); line-height: 1.5;
        }

        /* ── avatar result modal ── */
        .av-modal-overlay {
          position: fixed; inset: 0; z-index: 99;
          background: rgba(0,0,0,.8);
          backdrop-filter: blur(10px);
          display: flex; align-items: center; justify-content: center;
          padding: 1rem; cursor: pointer;
        }
        .av-modal {
          position: relative;
          background: rgba(20,15,40,.95);
          border: 1px solid rgba(255,255,255,.12);
          border-radius: 24px;
          padding: 2rem;
          max-width: 520px; width: 100%;
          display: flex; flex-direction: column;
          align-items: center; gap: 1.5rem;
          cursor: auto;
          box-shadow: 0 32px 80px rgba(0,0,0,.6);
          animation: popIn .3s cubic-bezier(.34,1.56,.64,1);
        }
        @keyframes popIn {
          from { transform: scale(.88) translateY(16px); opacity: 0; }
          to   { transform: scale(1) translateY(0); opacity: 1; }
        }
        .av-modal-close {
          position: absolute; top: .85rem; right: .85rem;
          background: none; border: none; cursor: pointer; color: #ef4444;
          display: flex; align-items: center; justify-content: center;
          padding: 4px;
          transition: transform .15s;
        }
        .av-modal-close:hover { transform: scale(1.15); }

        .av-modal-eyebrow {
          font-size: .68rem; font-weight: 600;
          text-transform: uppercase; letter-spacing: .18em; color: #f5c257;
        }
        .av-modal-title {
          font-family: 'Bebas Neue', sans-serif;
          font-size: 2rem; letter-spacing: 2px; color: #fff;
          margin-top: -.5rem;
        }

        .av-modal-img {
          border-radius: 16px;
          box-shadow: 0 16px 48px rgba(0,0,0,.5);
          border: 2px solid rgba(255,255,255,.12);
          width: 100%; max-width: 380px; height: auto;
        }

        .av-modal-actions {
          display: flex; align-items: center; gap: .75rem; flex-wrap: wrap;
          justify-content: center; width: 100%;
        }
        .av-download-btn {
          background: linear-gradient(135deg, #c8851f, #f5c257);
          color: #1a0e00; border: none;
          border-radius: 12px; padding: .75rem 1.5rem;
          font-size: .9rem; font-weight: 700;
          cursor: pointer; font-family: 'DM Sans', sans-serif;
          text-decoration: none;
          display: flex; align-items: center; gap: .5rem;
          transition: opacity .18s, transform .14s;
          box-shadow: 0 4px 18px rgba(200,133,31,.35);
          animation: gentleBounce 1.2s ease-in-out infinite;
        }
        .av-download-btn:hover { opacity: .9; transform: translateY(-1px); animation: none; }

        .av-share-row {
          display: flex; align-items: center; gap: .6rem;
        }
        .av-share-label { font-size: .75rem; color: rgba(255,255,255,.4); }
      `}</style>

      <div className="av-root">
        <div className="av-bg" />
        <div className="av-bg-overlay" />
        <Toaster position="top-right" />

        <div className="av-inner">
          {/* Header */}
          <div className="av-header">
            <p className="av-eyebrow">Bible Reading Fiesta</p>
            <h1 className="av-title">
              Create Your <span>Fiesta Avatar</span>
            </h1>
            <p className="av-sub">
              Upload your best picture and we&apos;ll generate a unique avatar
              for you
            </p>
          </div>

          {/* Drop zone */}
          {!image && (
            <div className="av-dropzone-wrap">
              <label
                htmlFor="fileInput"
                className={`av-dropzone ${dragging ? "dragging" : ""}`}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
              >
                <div className="av-dropzone-icon">
                  <Image
                    src="/images/upload.png"
                    width={200}
                    height={200}
                    alt="upload"
                    style={{ width: 80, height: "auto" }}
                  />
                </div>
                <p className="av-dropzone-title">Drop your photo here</p>
                <p className="av-dropzone-hint">
                  or click to browse from your device
                </p>
                <span className="av-dropzone-btn">Select Photo</span>
                <p className="av-types">PNG, JPG, JPEG accepted</p>
                <input
                  type="file"
                  id="fileInput"
                  onChange={handleFileChange}
                  hidden
                  accept=".jpg,.jpeg,.png"
                />
              </label>
            </div>
          )}

          {/* Editor */}
          {image && (
            <div className="av-editor">
              {/* Cropper panel */}
              <div className="av-panel">
                <div className="av-panel-header">
                  <span className="av-panel-label">Crop your photo</span>
                  <span className="av-panel-badge">Drag to reposition</span>
                </div>

                <div className="av-crop-area">
                  <Cropper
                    image={image}
                    crop={crop}
                    zoom={zoom}
                    aspect={1 / 1}
                    cropShape="rect"
                    showGrid={true}
                    onCropChange={setCrop}
                    onCropComplete={onCropComplete}
                    onZoomChange={setZoom}
                  />
                </div>

                <div className="av-panel-footer">
                  <div className="av-zoom-row">
                    <span className="av-zoom-label">Zoom</span>
                    <input
                      type="range"
                      className="av-zoom-slider"
                      min={1}
                      max={3}
                      step={0.05}
                      value={zoom}
                      onChange={(e) => setZoom(Number(e.target.value))}
                    />
                  </div>
                </div>
                <div className="av-panel-footer">
                  <button className="av-trash-btn" onClick={clearImage}>
                    <FaTrash size={12} /> Remove
                  </button>
                  <br />
                  <button
                    className={`av-crop-btn ${croppedImage ? "done" : ""}`}
                    onClick={handleCrop}
                  >
                    {croppedImage ? "✓ Cropped" : "Crop"}
                  </button>
                </div>
              </div>

              {/* Preview panel */}
              <div className="av-preview-panel">
                <div className="av-panel-header">
                  <span className="av-panel-label">Preview</span>
                  {croppedImage && (
                    <span
                      className="av-panel-badge"
                      style={{
                        background: "rgba(74,222,128,.12)",
                        color: "#4ade80",
                        borderColor: "rgba(74,222,128,.3)",
                      }}
                    >
                      Ready to generate
                    </span>
                  )}
                </div>

                <div className="av-preview-img-wrap">
                  {!croppedImage ? (
                    <Image
                      src="/images/profile.png"
                      alt="Preview placeholder"
                      width={300}
                      height={300}
                      className="av-preview-placeholder"
                    />
                  ) : (
                    <Image
                      src={croppedImage}
                      alt="Cropped preview"
                      width={300}
                      height={300}
                      className="av-preview-cropped"
                    />
                  )}
                </div>

                <div className="av-preview-footer">
                  {croppedImage && (
                    <button
                      onClick={handleSubmit}
                      disabled={loading}
                      className={`av-generate-btn ${
                        !avatarUrl && !loading ? "bounce" : ""
                      }`}
                    >
                      {loading
                        ? "✨ Generating… please wait"
                        : "Generate My Avatar →"}
                    </button>
                  )}
                  <p className="av-preview-hint">
                    {croppedImage
                      ? "Crop looks good? Hit Generate to create your avatar."
                      : "Crop your photo on the left to see a preview here."}
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Avatar result modal */}
        {avatarUrl && (
          <div className="av-modal-overlay" onClick={() => setAvatarUrl("")}>
            <div className="av-modal" onClick={(e) => e.stopPropagation()}>
              <button
                className="av-modal-close"
                onClick={() => setAvatarUrl("")}
              >
                <MdCancel size={26} />
              </button>

              <p className="av-modal-eyebrow">Your avatar is ready!</p>
              <p className="av-modal-title">Bible Fiesta Avatar</p>

              <CldImage
                src={avatarUrl}
                width="480"
                height="480"
                crop={{ type: "auto", source: true }}
                className="av-modal-img"
                alt="Generated Avatar"
              />

              <div className="av-modal-actions">
                <a
                  href={avatarUrl}
                  download="avatar.png"
                  className="av-download-btn"
                >
                  ⬇ Download Avatar
                </a>

                <div className="av-share-row">
                  <span className="av-share-label">Share:</span>
                  <a
                    target="_blank"
                    href="https://kingschat.online"
                    rel="noreferrer"
                  >
                    <Image
                      src="/images/kingschat.webp"
                      alt="KingsChat"
                      width={40}
                      height={40}
                      style={{ width: 40, height: 40, borderRadius: "50%" }}
                    />
                  </a>
                  <WhatsappShareButton
                    url={avatarUrl}
                    title="Join in the Read the Bible Campaign"
                  >
                    <WhatsappIcon size={40} round />
                  </WhatsappShareButton>
                  <TelegramShareButton url={avatarUrl}>
                    <TelegramIcon size={40} round />
                  </TelegramShareButton>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

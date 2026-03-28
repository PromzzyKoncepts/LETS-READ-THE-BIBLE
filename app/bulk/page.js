"use client";
import React, { useState, useRef } from "react";
import Papa from "papaparse";

const Page = () => {
  const [headers, setHeaders] = useState([]);
  const [rows, setRows] = useState([]);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadStatus, setUploadStatus] = useState(null);
  const [fileName, setFileName] = useState(null);
  const [addedBy, setAddedBy] = useState("");
  const [dragOver, setDragOver] = useState(false);
  const fileInputRef = useRef(null);

  const processFile = (file) => {
    if (!file || !file.name.endsWith(".csv")) {
      setUploadStatus({
        success: false,
        message: "Please upload a valid .csv file.",
      });
      return;
    }
    setFileName(file.name);
    setUploadStatus(null);

    Papa.parse(file, {
      header: true,
      skipEmptyLines: true,
      complete: (results) => {
        if (results.data.length > 0) {
          setHeaders(Object.keys(results.data[0]));
          setRows(results.data);
        }
      },
      error: () => {
        setUploadStatus({ success: false, message: "Error parsing CSV file." });
      },
    });
  };

  const handleChange = (e) => {
    const file = e.target.files[0];
    if (file) processFile(file);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragOver(false);
    const file = e.dataTransfer.files[0];
    if (file) processFile(file);
  };

  const handleUpload = async () => {
    if (rows.length === 0) return;

    setIsUploading(true);
    setUploadStatus(null);

    try {
      const response = await fetch(
        "https://lovetoons.org/php/bulk-registration.php",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            data: rows,
            addedBy: addedBy.trim() || null,
          }),
        }
      );

      const result = await response.json();

      if (response.ok) {
        setUploadStatus({
          success: true,
          message: result.message,
          insertedCount: result.insertedCount,
          skippedCount: result.skippedCount ?? 0,
        });
      } else {
        setUploadStatus({
          success: false,
          message: result.message || "Upload failed.",
        });
      }
    } catch {
      setUploadStatus({
        success: false,
        message: "Network error. Please try again.",
      });
    } finally {
      setIsUploading(false);
    }
  };

  const handleReset = () => {
    setHeaders([]);
    setRows([]);
    setFileName(null);
    setUploadStatus(null);
    setAddedBy("");
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,600;1,9..40,300&display=swap');

        * { box-sizing: border-box; margin: 0; padding: 0; }

        .bulk-root {
          min-height: 100vh;
          background: #0c0c1a;
          font-family: 'DM Sans', sans-serif;
          padding: 2rem 1rem 4rem;
          position: relative;
          overflow-x: hidden;
        }

        /* background orbs */
        .bulk-root::before, .bulk-root::after {
          content: '';
          position: fixed;
          border-radius: 50%;
          filter: blur(120px);
          pointer-events: none;
          z-index: 0;
        }
        .bulk-root::before {
          width: 500px; height: 500px;
          background: radial-gradient(circle, rgba(200,133,31,.18) 0%, transparent 70%);
          top: -100px; left: -100px;
        }
        .bulk-root::after {
          width: 400px; height: 400px;
          background: radial-gradient(circle, rgba(245,194,87,.10) 0%, transparent 70%);
          bottom: 0; right: -80px;
        }

        .bulk-inner {
          position: relative; z-index: 1;
          max-width: 1100px;
          margin: 0 auto;
        }

        /* ── HEADER ── */
        .bulk-header {
          text-align: center;
          padding: 2.5rem 0 2.2rem;
          border-bottom: 1px solid rgba(245,194,87,.12);
          margin-bottom: 2.5rem;
        }
        .bulk-header-badge {
          display: inline-flex; align-items: center; gap: .45rem;
          background: rgba(245,194,87,.1);
          border: 1px solid rgba(245,194,87,.25);
          border-radius: 999px;
          padding: .3rem .9rem;
          font-size: .7rem; font-weight: 600;
          color: #f5c257;
          text-transform: uppercase; letter-spacing: .1em;
          margin-bottom: 1rem;
        }
        .bulk-header h1 {
          font-family: 'Bebas Neue', sans-serif;
          font-size: clamp(2.2rem, 5vw, 3.2rem);
          color: #fff;
          letter-spacing: 3px;
          line-height: 1;
          margin-bottom: .4rem;
        }
        .bulk-header p {
          color: rgba(255,255,255,.45);
          font-size: .85rem;
          font-weight: 300;
        }

        /* ── UPLOAD ZONE ── */
        .upload-zone {
          border: 2px dashed rgba(245,194,87,.25);
          border-radius: 18px;
          background: rgba(255,255,255,.03);
          padding: 2.8rem 2rem;
          text-align: center;
          cursor: pointer;
          transition: border-color .2s, background .2s;
          margin-bottom: 1.5rem;
          position: relative;
        }
        .upload-zone.drag-over {
          border-color: #f5c257;
          background: rgba(245,194,87,.06);
        }
        .upload-zone:hover {
          border-color: rgba(245,194,87,.5);
          background: rgba(255,255,255,.05);
        }
        .upload-zone input[type="file"] {
          position: absolute; inset: 0; opacity: 0; cursor: pointer; width: 100%; height: 100%;
        }
        .upload-icon {
          width: 52px; height: 52px;
          background: linear-gradient(135deg, rgba(200,133,31,.25) 0%, rgba(245,194,87,.15) 100%);
          border-radius: 14px;
          display: flex; align-items: center; justify-content: center;
          margin: 0 auto 1rem;
          font-size: 1.5rem;
        }
        .upload-zone-title {
          font-size: 1rem; font-weight: 600; color: #fff;
          margin-bottom: .3rem;
        }
        .upload-zone-sub {
          font-size: .8rem; color: rgba(255,255,255,.4);
          font-weight: 300;
        }
        .upload-zone-file {
          display: inline-flex; align-items: center; gap: .5rem;
          margin-top: .85rem;
          background: rgba(245,194,87,.1);
          border: 1px solid rgba(245,194,87,.2);
          border-radius: 8px;
          padding: .4rem .85rem;
          font-size: .82rem; color: #f5c257;
        }

        /* ── TRACKER FIELD ── */
        .tracker-wrap {
          background: rgba(255,255,255,.03);
          border: 1.5px solid rgba(255,255,255,.08);
          border-radius: 14px;
          padding: 1.2rem 1.5rem;
          margin-bottom: 1.5rem;
          display: flex;
          align-items: center;
          gap: 1rem;
          flex-wrap: wrap;
        }
        .tracker-label {
          font-size: .72rem; font-weight: 600; color: rgba(255,255,255,.45);
          text-transform: uppercase; letter-spacing: .1em;
          white-space: nowrap;
          display: flex; align-items: center; gap: .4rem;
        }
        .tracker-label span {
          background: rgba(245,194,87,.15);
          border-radius: 4px;
          padding: .1rem .4rem;
          font-size: .65rem;
          color: #f5c257;
          font-weight: 700;
          letter-spacing: .06em;
        }
        .tracker-input-wrap {
          flex: 1; min-width: 200px;
          display: flex; align-items: center;
          background: rgba(255,255,255,.05);
          border: 1.5px solid rgba(255,255,255,.1);
          border-radius: 9px;
          padding: .55rem .85rem;
          gap: .5rem;
          transition: border-color .18s;
        }
        .tracker-input-wrap:focus-within {
          border-color: rgba(245,194,87,.5);
        }
        .tracker-input-wrap input {
          border: none; outline: none; background: transparent;
          font-size: .88rem; color: #fff; width: 100%;
          font-family: 'DM Sans', sans-serif;
        }
        .tracker-input-wrap input::placeholder { color: rgba(255,255,255,.25); }

        /* ── STATUS BANNER ── */
        .status-banner {
          border-radius: 12px;
          padding: 1rem 1.4rem;
          margin-bottom: 1.5rem;
          display: flex; align-items: flex-start; gap: .75rem;
          font-size: .88rem;
        }
        .status-banner.success {
          background: rgba(34,197,94,.1);
          border: 1px solid rgba(34,197,94,.25);
          color: #4ade80;
        }
        .status-banner.error {
          background: rgba(239,68,68,.1);
          border: 1px solid rgba(239,68,68,.25);
          color: #f87171;
        }
        .status-banner-icon { font-size: 1.1rem; flex-shrink: 0; }
        .status-banner-body { flex: 1; }
        .status-banner-body strong { display: block; margin-bottom: .2rem; font-weight: 600; }
        .status-stats {
          display: flex; gap: 1.5rem; margin-top: .5rem; flex-wrap: wrap;
        }
        .status-stat {
          font-size: .8rem;
          opacity: .8;
        }
        .status-stat strong { opacity: 1; }

        /* ── PREVIEW SECTION ── */
        .preview-header {
          display: flex; align-items: center; justify-content: space-between;
          margin-bottom: 1rem;
          flex-wrap: wrap; gap: .75rem;
        }
        .preview-title {
          font-family: 'Bebas Neue', sans-serif;
          font-size: 1.5rem;
          color: #fff;
          letter-spacing: 2px;
          display: flex; align-items: center; gap: .75rem;
        }
        .preview-count {
          background: linear-gradient(135deg, #c8851f 0%, #f5c257 100%);
          color: #1a0e00;
          font-family: 'DM Sans', sans-serif;
          font-size: .72rem;
          font-weight: 700;
          border-radius: 999px;
          padding: .25rem .75rem;
          letter-spacing: .04em;
        }
        .preview-actions { display: flex; gap: .65rem; align-items: center; }

        .btn-reset {
          border: 1.5px solid rgba(255,255,255,.15);
          background: transparent;
          color: rgba(255,255,255,.55);
          border-radius: 9px;
          padding: .55rem 1.1rem;
          font-size: .8rem;
          cursor: pointer;
          font-family: 'DM Sans', sans-serif;
          transition: all .18s;
        }
        .btn-reset:hover {
          border-color: rgba(255,255,255,.35);
          color: #fff;
        }

        .btn-upload {
          background: linear-gradient(135deg, #c8851f 0%, #f0b93a 100%);
          color: #1a0e00;
          border: none; border-radius: 9px;
          padding: .6rem 1.5rem;
          font-size: .875rem; font-weight: 700;
          cursor: pointer;
          font-family: 'DM Sans', sans-serif;
          transition: opacity .18s, transform .14s, box-shadow .18s;
          box-shadow: 0 4px 18px rgba(200,133,31,.35);
          display: flex; align-items: center; gap: .5rem;
          white-space: nowrap;
        }
        .btn-upload:hover:not(:disabled) {
          opacity: .92; transform: translateY(-1px);
          box-shadow: 0 8px 26px rgba(200,133,31,.42);
        }
        .btn-upload:disabled {
          opacity: .6; cursor: not-allowed;
        }

        /* ── TABLE ── */
        .table-wrap {
          border-radius: 16px;
          overflow: hidden;
          border: 1px solid rgba(255,255,255,.07);
          box-shadow: 0 20px 60px rgba(0,0,0,.4);
          max-height: 55vh;
          overflow-y: auto;
        }
        .table-wrap::-webkit-scrollbar { width: 6px; height: 6px; }
        .table-wrap::-webkit-scrollbar-track { background: transparent; }
        .table-wrap::-webkit-scrollbar-thumb { background: rgba(245,194,87,.25); border-radius: 3px; }

        table { width: 100%; border-collapse: collapse; min-width: 500px; }
        thead { position: sticky; top: 0; z-index: 2; }
        thead tr { background: rgba(12,12,26,.98); border-bottom: 2px solid rgba(245,194,87,.2); }
        thead th {
          padding: .85rem 1.1rem;
          text-align: left;
          font-size: .7rem; font-weight: 600;
          color: #f5c257;
          text-transform: uppercase; letter-spacing: .1em;
          white-space: nowrap;
        }
        tbody tr {
          border-bottom: 1px solid rgba(255,255,255,.04);
          transition: background .12s;
        }
        tbody tr:nth-child(even) { background: rgba(255,255,255,.02); }
        tbody tr:hover { background: rgba(245,194,87,.05); }
        tbody td {
          padding: .75rem 1.1rem;
          font-size: .82rem; color: rgba(255,255,255,.7);
          white-space: nowrap;
          max-width: 200px;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        @media (max-width: 640px) {
          .bulk-header h1 { letter-spacing: 1px; }
          .tracker-wrap { flex-direction: column; align-items: flex-start; }
          .preview-header { flex-direction: column; align-items: flex-start; }
        }
      `}</style>

      <div className="bulk-root">
        <div className="bulk-inner">
          {/* Header */}
          <div className="bulk-header">
            <div className="bulk-header-badge">⚡ LBRF</div>
            <h1>Bulk Registration</h1>
            <p>Upload a CSV file to register multiple participants at once</p>
          </div>

          {/* Drop Zone */}
          <div
            className={`upload-zone${dragOver ? " drag-over" : ""}`}
            onDragOver={(e) => {
              e.preventDefault();
              setDragOver(true);
            }}
            onDragLeave={() => setDragOver(false)}
            onDrop={handleDrop}
          >
            <input
              ref={fileInputRef}
              type="file"
              accept=".csv"
              onChange={handleChange}
            />
            <div className="upload-icon">📂</div>
            <div className="upload-zone-title">
              {fileName ? "File selected" : "Drop your CSV file here"}
            </div>
            <div className="upload-zone-sub">
              {fileName ? fileName : "or click to browse — .csv files only"}
            </div>
            {fileName && (
              <div className="upload-zone-file">
                ✓ {fileName} — {rows.length} records loaded
              </div>
            )}
          </div>

          {/* Tracker (who is adding this bulk) */}
          <div className="tracker-wrap">
            <label className="tracker-label">
              👤 Added by <span>OPTIONAL</span>
            </label>
            <div className="tracker-input-wrap">
              <svg
                width="13"
                height="13"
                viewBox="0 0 24 24"
                fill="none"
                stroke="rgba(255,255,255,.35)"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                <circle cx="12" cy="7" r="4" />
              </svg>
              <input
                type="text"
                placeholder="Your name or identifier (e.g. Pastor John)"
                value={addedBy}
                onChange={(e) => setAddedBy(e.target.value)}
              />
            </div>
          </div>

          {/* Status banner */}
          {uploadStatus && (
            <div
              className={`status-banner ${
                uploadStatus.success ? "success" : "error"
              }`}
            >
              <span className="status-banner-icon">
                {uploadStatus.success ? "✅" : "❌"}
              </span>
              <div className="status-banner-body">
                <strong>
                  {uploadStatus.success ? "Upload Successful" : "Upload Failed"}
                </strong>
                {uploadStatus.message}
                {uploadStatus.success && (
                  <div className="status-stats">
                    <span className="status-stat">
                      ✓ Inserted: <strong>{uploadStatus.insertedCount}</strong>
                    </span>
                    {uploadStatus.skippedCount > 0 && (
                      <span className="status-stat">
                        ⚠ Skipped (duplicates):{" "}
                        <strong>{uploadStatus.skippedCount}</strong>
                      </span>
                    )}
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Preview + Actions */}
          {headers.length > 0 && (
            <>
              <div className="preview-header">
                <div className="preview-title">
                  Preview
                  <span className="preview-count">{rows.length} records</span>
                </div>
                <div className="preview-actions">
                  <button className="btn-reset" onClick={handleReset}>
                    Clear
                  </button>
                  <button
                    className="btn-upload"
                    onClick={handleUpload}
                    disabled={isUploading}
                  >
                    {isUploading ? (
                      <>
                        <svg
                          width="14"
                          height="14"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2.5"
                          strokeLinecap="round"
                          style={{ animation: "spin 1s linear infinite" }}
                        >
                          <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" />
                        </svg>
                        Uploading…
                      </>
                    ) : (
                      <>↑ Upload {rows.length} Records</>
                    )}
                  </button>
                </div>
              </div>

              <div className="table-wrap">
                <table>
                  <thead>
                    <tr>
                      <th>#</th>
                      {headers.map((h, i) => (
                        <th key={i}>{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {rows.map((row, ri) => (
                      <tr key={ri}>
                        <td
                          style={{
                            color: "rgba(255,255,255,.25)",
                            fontSize: ".72rem",
                          }}
                        >
                          {ri + 1}
                        </td>
                        {headers.map((h, ci) => (
                          <td key={ci}>{row[h] ?? "—"}</td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </>
          )}
        </div>

        <style>{`
          @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        `}</style>
      </div>
    </>
  );
};

export default Page;

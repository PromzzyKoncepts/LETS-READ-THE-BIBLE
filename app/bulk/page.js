"use client"
import React, { useState } from 'react'
import Papa from "papaparse"

const Page = () => {
  const [headers, setHeaders] = useState([])
  const [rows, setRows] = useState([])
  const [isUploading, setIsUploading] = useState(false)
  const [uploadStatus, setUploadStatus] = useState(null)

  const handleChange = (e) => {
    const file = e.target.files[0]

    Papa.parse(file, {
      header: true,
      skipEmptyLines: true,
      complete: (results) => {
        console.log("Parsed results:", results)

        if (results.data.length > 0) {
          setHeaders(Object.keys(results.data[0]))
          setRows(results.data)
          setUploadStatus(null) // Reset status when new file is selected
        }
      },
      error: (error) => {
        console.error("Error parsing CSV:", error)
        setUploadStatus({
          success: false,
          message: 'Error parsing CSV file'
        })
      }
    })
  }

  const handleUpload = async () => {
    if (rows.length === 0) return
    
    setIsUploading(true)
    setUploadStatus(null)
    
    try {
      const response = await fetch('/api/bulk-registration', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ data: rows })
      })
      
      const result = await response.json()
      
      if (response.ok) {
        setUploadStatus({
          success: true,
          message: result.message,
          insertedCount: result.insertedCount
        })
      } else {
        setUploadStatus({
          success: false,
          message: result.message || 'Upload failed'
        })
      }
    } catch (error) {
      console.error('Error uploading data:', error)
      setUploadStatus({
        success: false,
        message: 'Network error. Please try again.'
      })
    } finally {
      setIsUploading(false)
    }
  }

  return (
    <div className="pt-24">
      <div className="mx-auto">
        <h1 className="text-5xl tracking-wide font-bold text-center font-lucky">Bulk registration</h1>

        <div className="flex flex-col items-center justify-center mx-auto">
          <label className="block py-3 text-xl font-medium text-gray-700">
            Upload CSV file only
          </label>
          <input
            type="file"
            accept=".csv"
            onChange={handleChange}
            className="block text-sm text-gray-500
                      file:mr-4 file:py-2 file:px-4
                      file:rounded-md file:border-0
                      file:text-sm file:font-semibold
                      file:bg-blue-50 file:text-blue-700
                      hover:file:bg-blue-100"
          />
        </div>

        {uploadStatus && (
          <div className={`text-center py-3 mx-auto max-w-md rounded-md ${
            uploadStatus.success ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
          }`}>
            {uploadStatus.message}
            {uploadStatus.insertedCount && (
              <div className="mt-2">
                Successfully registered {uploadStatus.insertedCount} users
              </div>
            )}
          </div>
        )}

        {headers.length > 0 && (
          <div className="text-center text-3xl font-bold font-sniglet py-3">
            Preview Document ({rows.length} records)
          </div>
        )}

        {headers.length > 0 && (
          <div className="w-[80%] max-h-[60vh] relative overflow-auto mx-auto shadow-md sm:rounded-lg">
            <table className="min-w-full">
              <thead className="bg-gray-100">
                <tr>
                  {headers.map((header, index) => (
                    <th
                      key={index}
                      className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider"
                    >
                      {header}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {rows.map((row, rowIndex) => (
                  <tr
                    key={rowIndex}
                    className={rowIndex % 2 === 0 ? 'bg-white' : 'bg-gray-50'}
                  >
                    {headers.map((header, colIndex) => (
                      <td
                        key={colIndex}
                        className="px-6 py-4 whitespace-nowrap text-sm text-gray-500"
                      >
                        {row[header]}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>

            <button 
              onClick={handleUpload}
              disabled={isUploading}
              className={`fixed bottom-8 right-44 rounded-full px-5 py-2 text-white border-2 border-white shadow-md shadow-slate-800 ${
                isUploading ? 'bg-gray-500' : 'bg-darkbg hover:bg-blue-700'
              }`}
            >
              {isUploading ? 'Uploading...' : 'Upload now'}
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

export default Page
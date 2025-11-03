"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import { MdClose, MdUpload, MdDelete, MdCheck } from "react-icons/md";

export default function ImageUploader({
  onUploadComplete,
  onUploadError,
  maxFiles = 5,
  maxFileSize = 5 * 1024 * 1024, // 5MB default
  acceptedFormats = "image/*",
  buttonText = "Upload Images",
  buttonClassName = "",
}) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [previews, setPreviews] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState({});
  const fileInputRef = useRef(null);

  // Handle file selection and create previews (NO UPLOAD YET)
  const handleFileSelect = (files) => {
    const fileArray = Array.from(files);

    // Check max files limit
    if (previews.length + fileArray.length > maxFiles) {
      alert(`Maximum ${maxFiles} files allowed`);
      return;
    }

    // Create preview objects
    const newPreviews = fileArray
      .map((file) => {
        // Validate file size
        if (file.size > maxFileSize) {
          onUploadError?.(
            `${file.name} is too large. Max size: ${
              maxFileSize / 1024 / 1024
            }MB`
          );
          return null;
        }

        return {
          id: Date.now() + Math.random(),
          file,
          preview: URL.createObjectURL(file),
          name: file.name,
          size: file.size,
        };
      })
      .filter(Boolean);

    setPreviews((prev) => [...prev, ...newPreviews]);
  };

  // Remove preview before upload
  const handleRemovePreview = (id) => {
    setPreviews((prev) => {
      const preview = prev.find((p) => p.id === id);
      if (preview?.preview) {
        URL.revokeObjectURL(preview.preview);
      }
      return prev.filter((p) => p.id !== id);
    });
  };

  // Upload all images to server
  const handleUploadAll = async () => {
    if (previews.length === 0) return;

    setUploading(true);
    const uploadedUrls = [];

    for (const preview of previews) {
      try {
        // Update progress
        setUploadProgress((prev) => ({
          ...prev,
          [preview.id]: { status: "uploading", progress: 0 },
        }));

        const formData = new FormData();
        formData.append("file", preview.file);

        const response = await fetch("/api/upload", {
          method: "POST",
          body: formData,
        });

        const data = await response.json();

        if (response.ok) {
          // Update progress to success
          setUploadProgress((prev) => ({
            ...prev,
            [preview.id]: { status: "success", progress: 100 },
          }));

          uploadedUrls.push({
            id: preview.id,
            url: data.url,
            file: preview.file,
          });

          // Callback for each successful upload
          onUploadComplete?.({
            file: preview.file,
            url: data.url,
            id: preview.id,
          });
        } else {
          throw new Error(data.error || "Upload failed");
        }
      } catch (error) {
        console.error("Upload error:", error);
        setUploadProgress((prev) => ({
          ...prev,
          [preview.id]: { status: "error", progress: 0 },
        }));
        onUploadError?.(error.message);
      }
    }

    setUploading(false);

    // Close modal after 1 second if all successful
    const allSuccess = Object.values(uploadProgress).every(
      (p) => p.status === "success"
    );
    if (allSuccess) {
      setTimeout(() => {
        handleCloseModal();
      }, 1000);
    }
  };

  const handleCloseModal = () => {
    // Clean up preview URLs
    previews.forEach((preview) => {
      if (preview.preview) {
        URL.revokeObjectURL(preview.preview);
      }
    });
    setPreviews([]);
    setUploadProgress({});
    setIsModalOpen(false);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    const files = e.dataTransfer.files;
    if (files.length) {
      handleFileSelect(files);
    }
  };

  return (
    <>
      {/* Trigger Button */}
      <button
        onClick={() => setIsModalOpen(true)}
        className={
          buttonClassName ||
          "px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
        }
      >
        {buttonText}
      </button>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden flex flex-col m-4">
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b">
              <h2 className="text-2xl font-bold text-gray-800">
                Upload Images
              </h2>
              <button
                onClick={handleCloseModal}
                disabled={uploading}
                className="p-2 hover:bg-gray-100 rounded-full transition"
              >
                <MdClose className="w-6 h-6" />
              </button>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto p-6">
              {/* Upload Area */}
              {!uploading && (
                <div
                  onDragOver={handleDragOver}
                  onDrop={handleDrop}
                  onClick={() => fileInputRef.current?.click()}
                  className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center cursor-pointer hover:border-blue-400 hover:bg-blue-50/50 transition-all"
                >
                  <input
                    ref={fileInputRef}
                    type="file"
                    multiple
                    accept={acceptedFormats}
                    onChange={(e) => handleFileSelect(e.target.files)}
                    className="hidden"
                  />

                  <div className="flex flex-col items-center gap-3">
                    <div className="p-4 bg-blue-50 rounded-full">
                      <MdUpload className="w-8 h-8 text-blue-600" />
                    </div>
                    <div>
                      <p className="text-lg font-medium text-gray-700">
                        Drop images here or click to browse
                      </p>
                      <p className="text-sm text-gray-500 mt-1">
                        Up to {maxFiles} images • Max{" "}
                        {maxFileSize / 1024 / 1024}MB each
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* Preview Grid */}
              {previews.length > 0 && (
                <div className="mt-6">
                  <div className="flex items-center justify-between mb-4">
                    <p className="text-sm font-medium text-gray-600">
                      {previews.length} image{previews.length > 1 ? "s" : ""}{" "}
                      selected
                    </p>
                    {!uploading && (
                      <button
                        onClick={() => {
                          previews.forEach((p) =>
                            URL.revokeObjectURL(p.preview)
                          );
                          setPreviews([]);
                        }}
                        className="text-sm text-red-600 hover:text-red-700 font-medium"
                      >
                        Clear All
                      </button>
                    )}
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                    {previews.map((preview) => {
                      const progress = uploadProgress[preview.id];
                      return (
                        <div
                          key={preview.id}
                          className="relative group aspect-square rounded-lg overflow-hidden bg-gray-100 border-2 border-gray-200"
                        >
                          {/* Image Preview */}
                          <Image
                            src={preview.preview}
                            alt={preview.name}
                            fill
                            className="object-cover"
                          />

                          {/* Upload Status Overlay */}
                          {progress?.status === "uploading" && (
                            <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                              <div className="text-white text-sm font-medium">
                                Uploading...
                              </div>
                            </div>
                          )}

                          {progress?.status === "success" && (
                            <div className="absolute inset-0 bg-green-500/80 flex items-center justify-center">
                              <MdCheck className="w-12 h-12 text-white" />
                            </div>
                          )}

                          {progress?.status === "error" && (
                            <div className="absolute inset-0 bg-red-500/80 flex items-center justify-center">
                              <div className="text-white text-sm">Failed</div>
                            </div>
                          )}

                          {/* Remove Button (only before upload) */}
                          {!uploading && !progress && (
                            <button
                              onClick={() => handleRemovePreview(preview.id)}
                              className="absolute top-2 right-2 p-1.5 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-600"
                            >
                              <MdDelete className="w-4 h-4" />
                            </button>
                          )}

                          {/* File Info */}
                          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-2">
                            <p className="text-white text-xs truncate">
                              {preview.name}
                            </p>
                            <p className="text-white/70 text-xs">
                              {(preview.size / 1024).toFixed(1)} KB
                            </p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>

            {/* Footer */}
            <div className="border-t p-6 bg-gray-50 flex justify-between items-center">
              <div className="text-sm text-gray-600">
                {uploading && (
                  <span className="text-blue-600 font-medium">
                    Uploading{" "}
                    {
                      Object.values(uploadProgress).filter(
                        (p) => p.status === "success"
                      ).length
                    }{" "}
                    / {previews.length}
                  </span>
                )}
              </div>
              <div className="flex gap-3">
                <button
                  onClick={handleCloseModal}
                  disabled={uploading}
                  className="px-6 py-2.5 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-100 transition disabled:opacity-50"
                >
                  Cancel
                </button>
                <button
                  onClick={handleUploadAll}
                  disabled={previews.length === 0 || uploading}
                  className="px-6 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {uploading
                    ? "Uploading..."
                    : `Upload ${previews.length} Image${
                        previews.length > 1 ? "s" : ""
                      }`}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

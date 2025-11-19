'use client';
import React, { useState, useRef } from 'react';
import Image from 'next/image';
import { FaUpload, FaTrash, FaImage } from 'react-icons/fa';

export interface ImageUploadProps {
  onUploaded: (imageUrl: string) => void;
}

export default function ImageUpload({
  onUploaded,
}: ImageUploadProps) {
  const [uploading, setUploading] = useState(false);
  const [dragActive, setDragActive] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const changeFileInputRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = async (file: File) => {
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith('image/')) {
      alert('Molimo izaberite sliku (JPG, PNG, GIF)');
      return;
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      alert('Slika je prevelika. Maksimalna veličina je 5MB.');
      return;
    }

    setUploading(true);

    try {
      const formData = new FormData();
      formData.append('slika', file);
      formData.append('id', Date.now().toString());

      const response = await fetch('/api/proizvodi/slika', {
        method: 'POST',
        body: formData,
      });

      const result = await response.json();

      if (response.ok) {
        onUploaded(result.slika);
      } else {
        alert(result.error || 'Greška pri uploadu slike');
      }
    } catch (error) {
      console.error('Upload error:', error);
      alert('Greška pri uploadu slike');
    } finally {
      setUploading(false);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      handleFileUpload(file);
    }
  };

  const handleButtonClick = () => {
    if (!uploading && fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleChangeButtonClick = () => {
    if (!uploading && changeFileInputRef.current) {
      changeFileInputRef.current.click();
    }
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    const files = e.dataTransfer.files;
    if (files && files[0]) {
      handleFileUpload(files[0]);
    }
  };

  return (
    <div className="mb-4">
      <label className="block text-gray-700 font-medium mb-2">
        Slika proizvoda
      </label>

      <div
        className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${dragActive
            ? 'border-blue-500 bg-blue-50'
            : 'border-gray-300 hover:border-gray-400'
          }`}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
      >
        {uploading ? (
          <div className="text-gray-600">
            <div className="animate-spin mx-auto mb-2 w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full"></div>
            Uploading...
          </div>
        ) : (
          <div>
            <FaImage className="mx-auto text-4xl text-gray-400 mb-4" />
            <p className="text-gray-600 mb-4">
              Prevucite sliku ovde ili kliknite da izaberete
            </p>
            <button
              type="button"
              className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 cursor-pointer transition inline-flex items-center gap-2"
              onClick={handleButtonClick}
              disabled={uploading}
            >
              <FaUpload />
              Izaberite sliku
            </button>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              style={{ display: 'none' }}
              disabled={uploading}
            />
            <p className="text-sm text-gray-500 mt-2">
              PNG, JPG, GIF do 5MB
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

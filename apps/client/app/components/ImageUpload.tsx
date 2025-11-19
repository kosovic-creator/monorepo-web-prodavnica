import React, { useState } from 'react';

export default function ImageUpload({ onUploaded }: { onUploaded: (url: string) => void }) {
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0] || null;
    setFile(f);
    setPreview(f ? URL.createObjectURL(f) : null);
    setError(null);
  };

  const handleUpload = async () => {
    if (!file) return;
    setLoading(true);
    setError(null);
    const formData = new FormData();
    formData.append('file', file);
    try {
      const res = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });
      const data = await res.json();
      if (res.ok && data.url) {
        onUploaded(data.url);
        setFile(null);
        setPreview(null);
      } else {
        setError(data.error || 'Greška pri uploadu');
      }
    } catch (e) {
      setError('Greška pri uploadu');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <input type="file" accept="image/*" onChange={handleFileChange} />
      {preview && (
        <div className="my-2">
          <img src={preview} alt="Preview" style={{ maxWidth: 200, maxHeight: 200 }} />
        </div>
      )}
      <button onClick={handleUpload} disabled={!file || loading} className="px-4 py-2 bg-blue-500 text-white rounded">
        {loading ? 'Upload...' : 'Upload'}
      </button>
      {error && <div className="text-red-500 mt-2">{error}</div>}
    </div>
  );
}

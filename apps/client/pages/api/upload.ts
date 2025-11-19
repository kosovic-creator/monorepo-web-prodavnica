import type { NextApiRequest, NextApiResponse } from 'next';
import formidable from 'formidable';
import fs from 'fs';
import path from 'path';
import { v4 as uuidv4 } from 'uuid';
import cloudinary from 'cloudinary';

cloudinary.v2.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const form = new formidable.IncomingForm({ keepExtensions: true });

  form.parse(req, async (err, fields, files) => {
    if (err) {
      return res.status(500).json({ error: 'Error parsing form' });
    }
    let file: formidable.File | undefined;
    if (Array.isArray(files.file)) {
      file = files.file[0];
    } else {
      file = files.file;
    }
    if (!file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }

    if (process.env.NODE_ENV === 'development') {
      // Save to local public/uploads
      const uploadsDir = path.join(process.cwd(), 'public', 'uploads');
      if (!fs.existsSync(uploadsDir)) fs.mkdirSync(uploadsDir, { recursive: true });
      const ext = path.extname(file.originalFilename || file.newFilename || '');
      const filename = uuidv4() + ext;
      const destPath = path.join(uploadsDir, filename);
      fs.copyFileSync(file.filepath, destPath);
      return res.status(200).json({ url: `/uploads/${filename}` });
    } else {
      // Upload to Cloudinary
      try {
        const result = await cloudinary.v2.uploader.upload(file.filepath, {
          folder: 'prodavnica',
        });
        return res.status(200).json({ url: result.secure_url });
      } catch (e) {
        return res.status(500).json({ error: 'Cloudinary upload failed' });
      }
    }
  });
}

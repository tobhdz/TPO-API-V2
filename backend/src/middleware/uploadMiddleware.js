import multer from 'multer';
import path from 'path';
import fs from 'fs';

const createStorage = (folder) => {
  const uploadPath = path.join('uploads', folder);
  
  if (!fs.existsSync(uploadPath)) {
    fs.mkdirSync(uploadPath, { recursive: true });
  }

  return multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, uploadPath);
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
      cb(null, uniqueSuffix + path.extname(file.originalname));
    }
  });
};

export const uploadTicket = multer({ storage: createStorage('tickets') });
export const uploadProfilePic = multer({ storage: createStorage('pfp') }); 
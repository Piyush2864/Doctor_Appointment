import multer from "multer";
import path from 'path';

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, "./public/temp")
    },
    filename: function (req, file, cb) {
      
      cb(null, Date.now() + '-' + file.originalname)
    }
  })

  const fileFilter = (req, fole, cb) => {
    const fileTypes = /jpeg|jpg|png|gif/;
    const extname = fileTypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = fileTypes.test(file.mimetype); 

    if(extname && mimetype) {
        return cb(null, true);
      }else{
        cb(new Error('Only image files are allowed!'), false)
      }
  };

export const upload = multer({ 
    storage, 
    fileFilter,
    limits: { fileSize: 5 * 1024 * 1024}
}).single('profilePicture');
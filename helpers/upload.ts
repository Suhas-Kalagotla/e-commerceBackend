import multer, { Multer, FileFilterCallback } from 'multer';
import { Request } from 'express';

const storage = multer.diskStorage({
  destination: (req: Request, file: Express.Multer.File, cb) => {
    cb(null, 'public/uploads');
  },
  filename: (req: Request, file: Express.Multer.File, cb) => {
    cb(null, Date.now() + '-' + file.originalname);
  }
});

const fileFilter = (req:Request ,file: Express.Multer.File, cb:any)=>{
    if(file.mimetype === 'image/jpeg' ||file.mimetype === 'image/jpg' || file.mimetype === 'image/png'){
        cb(null,true) 
    }else {
       cb(new Error('Unsupported file format. Upload only JPEG/JPG or PNG' ), false); 
    }
}

const upload: Multer = multer({ 
    storage: storage,
    limits : {fileSize : 1024 * 1024} , 
    fileFilter: fileFilter, 
});

export default upload;

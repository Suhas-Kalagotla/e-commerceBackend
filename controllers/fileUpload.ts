import express, { Request, Response } from 'express';
import upload from '../helpers/upload'; 
import multer from 'multer'

export const uploadFile = (req: Request, res: Response) => {
    upload.single('file')(req, res, (err: any) => {
        if (err instanceof multer.MulterError) {
            return res.status(400).json({ error: 'File upload error' });
        } else if (err) {
            return res.status(500).json({ error: 'Internal server error' });
        }

        if (!req.file) {
            return res.status(400).json({ error: 'No file uploaded' });
        }
        
        const filename = req.file.filename;
        return res.status(200).json({ message: 'File uploaded successfully', filename });
    });
}

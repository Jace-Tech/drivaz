import { response } from '../utils/response';
import { BadRequestError, CustomError } from '../utils/customError';
import dotenv from 'dotenv';
import { Router, Request, Response } from "express"

import { v2 as cloudinary } from "cloudinary"
dotenv.config()

cloudinary.config({
  api_key: process.env.CLOUD_KEY,
  cloud_name: process.env.CLOUD_NAME,
  api_secret: process.env.CLOUD_SECRET,
})

const uploadRoute = Router()

// UPLOAD PICTURES
uploadRoute.post("/", async (req: Request, res: Response) => {
  if(!req.body.image) throw new BadRequestError("Image not specified")
  const image = await cloudinary.uploader.upload(req.body.image)
  const data = {
    url: image.secure_url,
    type: image.type,
    width: image.width,
    height: image.height,
    size: image.bytes
  }
  res.status(200).send(response("Image url generated", data, true))
})

export default uploadRoute
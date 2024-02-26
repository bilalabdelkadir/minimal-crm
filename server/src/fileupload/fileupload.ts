import { Injectable } from '@nestjs/common';
import { CLOUDINARY } from './constants/fileupload.constants';
import { v2 } from 'cloudinary';

export const Fileupload = {
  provide: CLOUDINARY,
  useFactory: (): void => {
    v2.config({
      cloud_name: process.env.CLD_CLOUD_NAME,
      api_key: process.env.CLD_API_KEY,
      api_secret: process.env.CLD_API_SECRET,
    });
  },
};

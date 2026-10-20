import Multer from "multer";

export interface showCoverRequest {
  courseId: string;
}

export interface uploadCoverRequest{
  courseId: string;
  file?: Express.Multer.File;
}
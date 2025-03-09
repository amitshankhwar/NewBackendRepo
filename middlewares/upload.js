// import multer from "multer";
// import { CloudinaryStorage } from "multer-storage-cloudinary";
// import cloudinary from "../cloudinary.js"; // Correct the path

// const storage = new CloudinaryStorage({
//   cloudinary: cloudinary,
//   params: {
//     folder: "task_proofs",
//     allowed_formats: ["jpg", "png", "jpeg", "mp4", "pdf"],
//   },
// });

// const upload = multer({ storage });

// export default upload;
import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import cloudinary from "../cloudinary.js"; // Ensure correct path

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: async (req, file) => {
    return {
      folder: "task_proofs", // Folder in Cloudinary
      format: file.mimetype.split("/")[1], // Automatically detect format
      public_id: Date.now() + "-" + file.originalname.split(".")[0], // Unique filename
    };
  },
});

const upload = multer({ storage });

export default upload;

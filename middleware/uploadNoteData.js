export const uploadNoteData = multer({
    storage: multer.diskStorage({
      destination: function (req, file, cb) {
        cb(null, "./Data");
      },
      filename: function (req, file, cb) {
        console.log(file);
        cb(null, file.originalname);
      },
    }),
  }).single("Image");
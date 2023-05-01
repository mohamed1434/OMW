import multer from "multer";
import * as path from "path";
import { v4 as UUID } from "uuid";
/**
 * Function to rename uploaded file to prevent dplicateion or overriding
 * @param {*} req
 * @param {*} file
 * @param {*} callback
 */
export const editFileName = (req, file, callback) => {
  const fileExtName = path.extname(file.originalname);
  callback(
    null,
    `${UUID().replace(
      new RegExp(/[.*+\-?^${}()|[\]\\]/g, "g"),
      "g"
    )}${fileExtName}`
  );
};

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    // Implement dir creation
    // Upload  file directory .
    cb(null, "uploads");
  },
  filename: editFileName,
});

const upload = multer({ storage: storage });

export const uploadImages = (req, res, next) => {
    upload.array("image", 6)(req, res, (error) => {
      if (error) {
        error.httpStatusCode = 400;
        return next(error);
      }
      const files = req.files;
      if (!files.length) {
        const error = new Error("Please upload a file");
        error.httpStatusCode = 400;
        return next(error);
      }
      res.send(files);
    });
  };
  

export const getImages = (req, res) => {
  let filename = req.params.file;
  console.log(filename);
  const file = path.resolve(process.cwd(), `./uploads/${filename}`);
  console.log(file);
  res.download(file); // Set disposition and send it.
};

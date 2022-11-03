const multer = require ("multer");
const path = require("path");

const storage = multer.memoryStorage();

export const multerUpload = multer({ storage });

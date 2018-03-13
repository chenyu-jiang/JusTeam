//fileUpload middleware
const mimetypes = {
    "image/bmp": true,
    "image/x-windows-bmp": true,
    "image/gif": true,
    "image/x-icon": true,
    "image/jpeg": true,
    "image/png": true,
};
var uuidv4 = require("uuid/v4");
var router = require("express").Router();
var multer = require("multer");
var storage = multer.diskStorage({
    destination: function (req,file,cb) {
        //destination for storing files.
        //TODO: generate destination
        cb(null, './upload');
    },
    filename: function (req,file,cb) {
        //Avoid collision using uuid
        var extension = file.originalname.substring(file.originalname.lastIndexOf('.'), file.originalname.length);
        cb(null, uuidv4()+extension);
    }
});
var fileFilter = (req, file, cb) => {
    //check mimetypes
    try{
        if(mimetypes[file.mimetype] === true) {
            cb(null, true);
        }
        else cb(null, false);
    }
    catch(err) {
        cb(new Error(err));
    }
}
var upload = multer({storage: storage, fileFilter: fileFilter});

router.post("/pictures", upload.single('image'),function (req, res, next) {
    //Other responses
    res.end();
});

module.exports = router;

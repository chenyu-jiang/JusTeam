var fs = require("fs");
var path = require("path");

//fileUpload middleware
const picMimetypes = {
    "image/bmp": true,
    "image/x-windows-bmp": true,
    "image/gif": true,
    "image/x-icon": true,
    "image/jpeg": true,
    "image/png": true,
};

//NOTE: Not supported in early stage
// const vidMimetypes = {
//     //TODO: fill this
// };

var uuidv4 = require("uuid/v4");
var router = require("express").Router();
var multer = require("multer");
var postRecord = require("../../ExperienceSystem/postRecord");
// var accountSystem = require("");

//Upload Specifications
var textStorage = multer.diskStorage({
    destination: function(req, file, cb) {
        //destination for storing files.

        //TODO: generate destination

        cb(null, './upload/articles');
    },
    filename: function(req, file, cb) {
        //Avoid collision using uuidV4 (random)
        var extension = file.originalname.substring(file.originalname.lastIndexOf('.'), file.originalname.length);
        cb(null, uuidv4() + extension);
    }
});

var picStorage = multer.diskStorage({
    destination: function(req, file, cb) {
        //destination for storing files.

        //TODO: generate destination

        cb(null, './upload/pictures');
    },
    filename: function(req, file, cb) {
        //Avoid collision using uuidV4 (random)
        var extension = file.originalname.substring(file.originalname.lastIndexOf('.'), file.originalname.length);
        cb(null, uuidv4() + extension);
    }
});

//NOTE: Not supported in early stage
// var vidStorage = multer.diskStorage({
//     destination: function(req, file, cb) {
//         //destination for storing files.
//
//         //TODO: generate destination
//
//         cb(null, './upload/videos');
//     },
//     filename: function(req, file, cb) {
//         //Avoid collision using uuidV4 (random)
//         var extension = file.originalname.substring(file.originalname.lastIndexOf('.'), file.originalname.length);
//         cb(null, uuidv4() + extension);
//     }
// });

var picFileFilter = (req, file, cb) => {

    //TODO: Authentication

    //check mimetypes
    try {
        if (picMimetypes[file.mimetype] === true) {
            cb(null, true);
        } else cb(null, false);
    } catch (err) {
        cb(new Error(err));
    }
}

//NOTE: Not supported in early stage
// var vidFileFilter = (req, file, cb) => {
//
//     //TODO: Authentication
//
//     //check mimetypes
//     try {
//         if (vidMimetypes[file.mimetype] === true) {
//             cb(null, true);
//         } else cb(null, false);
//     } catch (err) {
//         cb(new Error(err));
//     }
//     //others
// }

var uploadPic = multer({storage: picStorage,fileFilter: picFileFilter});
var uploadText = multer({storage: textStorage});

//NOTE: Not supported in early stage
// var uploadVid = multer({storage: vidStorage,fileFilter: vidFileFilter});

router.post("/upload/pictures", uploadPic.single('image'), (req, res, next)=>{
    //return the path
    var resContent = {
        path: req.file.path
    };
    res.send(resContent);
});

router.post("/upload/articles", uploadText.single('article'), async (req, res, next)=>{
    var user = req.user.id;
    var resContent = {
        status: true
    };
    //save record in database
    try{
        var postID = undefined;
        req.body.postID = parseInt(req.body.postID);
        req.body.isNew = req.body.isNew === "true" ? true : false;
        var content = {
            "user" : user,
            "path" : path.resolve("./")+'/'+req.file.path,
            "postTitle" : req.body.postTitle,
            "tags" : JSON.parse(req.body.tags).tags,
            "isFinal": req.body.isFinal === "true" ? 1 : 0,
            "teamID": req.body.teamID,
            "eventID": req.body.eventID
        }
        postID = await postRecord.saveRecord(content, req.body.isNew, req.body.postID);
    } catch(err) {
        console.log(err);
        resContent.status = false;
    }
    res.send(resContent);
});

router.get("/setFinal", async (req, res, next)=> {
    var resContent = {
        "status": false
    }
    if(req.query.postID) {
        try{
            await postRecord.setFinal(req.query.postID);
            resContent.status = true;
        }
        catch(err) {
            console.log(err);
        }
    }
    res.send(resContent);
});

router.get("/articles", async (req, res, next)=> {
    var resContent = {
        "status": false,
        "content": undefined
    }
    if(req.query.postID) {
        try{
            var content = await postRecord.getRecord(req.query.postID);
            resContent.status = true;
            resContent.content = content;
        }
        catch(err) {
            console.log(err);
        }
    }
    res.send(resContent);
});

router.delete("/delete",async (req,res,next)=>{
    var resContent = {
        "status": false
    }
    var json = {
        "deleteByID": -1
    };
    if(req.query.postID) {
        try{
            json.deleteByID = req.query.postID;
            await postRecord.deleteRecord(json);
            resContent.status = true;
        }
        catch(err) {
            console.log(err);
        }
    }
    res.send(resContent);
});

//NOTE: Not supported in early stage
// router.post("/videos", uploadVid.single('video'), (req, res, next)=>{
//     //return the path
//     var resContent = {
//         path: req.file.path
//     };
//     res.write(JSON.stringify(resContent));
//     res.end();
// });

module.exports = router;
